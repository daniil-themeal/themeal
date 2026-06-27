import { useEffect, type RefObject } from 'react';

const SCROLL_LERP = 0.18;
const SCROLL_STOP_EPSILON = 0.5;
const SCROLL_EPSILON = 1;
/**
 * If the actual scrollTop diverges from what runSmoothScroll set on the previous tick
 * by more than this, treat it as an external (native / scripted) scroll and abandon the
 * smooth animation so it does not fight the user.
 */
const EXTERNAL_SCROLL_DRIFT_THRESHOLD = 2;
const PLAN_DESKTOP_MEDIA_QUERY = '(min-width: 768px)';
/**
 * Window after a real layout change in which we still abort in-flight smooth animations.
 * Wheel handlers are NOT gated by this — they always re-read fresh scrollHeight/clientHeight
 * and can start a new animation immediately, so the user is never locked out of scrolling.
 */
const LAYOUT_SETTLE_MS = 80;
/** Skip ResizeObserver entries whose size barely changed (subpixel rounding, etc). */
const LAYOUT_CHANGE_MIN_DELTA_PX = 1;

type SmoothScroller = {
  targetScrollTop: number;
  rafId: number | null;
  isAnimating: boolean;
  /** scrollTop value we wrote on the last lerp tick; used to detect external scrolls. */
  expectedScrollTop: number;
};

function createSmoothScroller(): SmoothScroller {
  return { targetScrollTop: 0, rafId: null, isAnimating: false, expectedScrollTop: 0 };
}

function getScrollDelta(event: WheelEvent): number {
  return event.deltaY;
}

function getMaxScrollTop(element: HTMLElement): number {
  return Math.max(0, element.scrollHeight - element.clientHeight);
}

function canScrollDown(element: HTMLElement): boolean {
  return element.scrollTop + element.clientHeight < element.scrollHeight - SCROLL_EPSILON;
}

function canScrollUp(element: HTMLElement): boolean {
  return element.scrollTop > SCROLL_EPSILON;
}

function canScrollVertically(element: HTMLElement): boolean {
  return element.scrollHeight > element.clientHeight + SCROLL_EPSILON;
}

function runSmoothScroll(
  element: HTMLElement,
  scroller: SmoothScroller,
  shouldAbort?: () => boolean,
) {
  if (shouldAbort?.()) {
    stopSmoothScroller(element, scroller);
    return;
  }

  scroller.isAnimating = true;
  clampScrollerTarget(element, scroller);

  const distance = scroller.targetScrollTop - element.scrollTop;

  if (Math.abs(distance) < SCROLL_STOP_EPSILON) {
    element.scrollTop = scroller.targetScrollTop;
    scroller.targetScrollTop = element.scrollTop;
    scroller.expectedScrollTop = element.scrollTop;
    scroller.isAnimating = false;
    scroller.rafId = null;
    return;
  }

  element.scrollTop += distance * SCROLL_LERP;
  scroller.expectedScrollTop = element.scrollTop;
  scroller.rafId = requestAnimationFrame(() => runSmoothScroll(element, scroller, shouldAbort));
}

function applySmoothDelta(
  element: HTMLElement,
  scroller: SmoothScroller,
  delta: number,
  shouldAbort?: () => boolean,
): number {
  if (delta === 0) return 0;

  if (shouldAbort?.()) return delta;

  if (scroller.rafId === null) {
    scroller.targetScrollTop = element.scrollTop;
    scroller.expectedScrollTop = element.scrollTop;
  }

  const maxScrollTop = getMaxScrollTop(element);
  const oldTarget = scroller.targetScrollTop;
  const newTarget = Math.max(0, Math.min(oldTarget + delta, maxScrollTop));
  const applied = newTarget - oldTarget;

  scroller.targetScrollTop = newTarget;

  if (Math.abs(applied) < SCROLL_EPSILON) {
    return delta;
  }

  if (scroller.rafId === null) {
    scroller.rafId = requestAnimationFrame(() =>
      runSmoothScroll(element, scroller, shouldAbort),
    );
  }

  return delta - applied;
}

function stopSmoothScroller(element: HTMLElement, scroller: SmoothScroller) {
  if (scroller.rafId !== null) {
    cancelAnimationFrame(scroller.rafId);
    scroller.rafId = null;
  }

  scroller.isAnimating = false;
  scroller.targetScrollTop = element.scrollTop;
  scroller.expectedScrollTop = element.scrollTop;
}

/**
 * Called from the scroll listener. If the actual scrollTop diverges from what our last
 * lerp tick wrote, the scroll came from outside (native wheel, scripted scrollTo, key,
 * touch). In that case we abandon the smooth animation so it does not pull the user back.
 */
function syncScrollerTarget(element: HTMLElement, scroller: SmoothScroller) {
  const driftFromExpected = Math.abs(element.scrollTop - scroller.expectedScrollTop);

  if (driftFromExpected <= EXTERNAL_SCROLL_DRIFT_THRESHOLD) {
    if (scroller.rafId === null) {
      scroller.targetScrollTop = element.scrollTop;
      scroller.expectedScrollTop = element.scrollTop;
    }
    return;
  }

  stopSmoothScroller(element, scroller);
}

function clampScrollerTarget(element: HTMLElement, scroller: SmoothScroller) {
  const maxScrollTop = getMaxScrollTop(element);
  if (scroller.targetScrollTop > maxScrollTop) {
    scroller.targetScrollTop = maxScrollTop;
  }
}

type UsePlanStepScrollChainingOptions = {
  enabled: boolean;
  bodyRef: RefObject<HTMLElement | null>;
  rightRef: RefObject<HTMLElement | null>;
};

export function usePlanStepScrollChaining({
  enabled,
  bodyRef,
  rightRef,
}: UsePlanStepScrollChainingOptions) {
  useEffect(() => {
    if (!enabled) return;

    const body = bodyRef.current;
    const right = rightRef.current;

    if (!body || !right) return;

    const bodyScroller = createSmoothScroller();
    const rightScroller = createSmoothScroller();
    const desktopMediaQuery = window.matchMedia(PLAN_DESKTOP_MEDIA_QUERY);

    const isDesktop = () => desktopMediaQuery.matches;
    let isLayoutChanging = false;
    let layoutSettleTimer: number | null = null;

    /**
     * Used ONLY by `runSmoothScroll` to abort an in-flight animation when the layout shifts.
     * Wheel handlers no longer gate on this — they always re-read fresh sizes so the user
     * is never locked out of scrolling, even when ResizeObserver fires repeatedly.
     */
    const shouldAbortSmoothScroll = () => isLayoutChanging;

    const stopAllSmoothScrollers = () => {
      stopSmoothScroller(body, bodyScroller);
      stopSmoothScroller(right, rightScroller);
    };

    const markLayoutChanging = () => {
      isLayoutChanging = true;
      stopAllSmoothScrollers();

      if (layoutSettleTimer !== null) {
        window.clearTimeout(layoutSettleTimer);
      }

      layoutSettleTimer = window.setTimeout(() => {
        isLayoutChanging = false;
        layoutSettleTimer = null;
      }, LAYOUT_SETTLE_MS);
    };

    const applyBodyOverflowDelta = (delta: number): number => {
      if (delta > 0 && !canScrollDown(body)) return delta;
      if (delta < 0 && !canScrollUp(body)) return delta;
      return applySmoothDelta(body, bodyScroller, delta, shouldAbortSmoothScroll);
    };

    const handleRightWheel = (event: WheelEvent) => {
      if (!isDesktop()) return;

      const delta = getScrollDelta(event);
      if (delta === 0) return;

      let remaining = delta;

      if (canScrollVertically(right)) {
        remaining = applySmoothDelta(right, rightScroller, remaining, shouldAbortSmoothScroll);
      }

      if (remaining !== 0) {
        remaining = applyBodyOverflowDelta(remaining);
      }

      if (remaining !== delta) {
        event.preventDefault();
      } else if (
        (delta > 0 && !canScrollDown(body) && !canScrollDown(right)) ||
        (delta < 0 && !canScrollUp(body) && !canScrollUp(right))
      ) {
        event.preventDefault();
      }
    };

    const handleBodyWheel = (event: WheelEvent) => {
      if (!isDesktop()) return;

      const target = event.target;
      if (!(target instanceof Node) || right.contains(target)) return;

      const delta = getScrollDelta(event);
      if (delta === 0) return;

      if (!canScrollVertically(right)) return;

      if (delta > 0) {
        if (canScrollDown(body)) {
          stopSmoothScroller(body, bodyScroller);
          return;
        }
        if (!canScrollDown(right)) {
          event.preventDefault();
          return;
        }
      } else {
        if (canScrollUp(body)) {
          stopSmoothScroller(body, bodyScroller);
          return;
        }
        if (!canScrollUp(right)) {
          event.preventDefault();
          return;
        }
      }

      applySmoothDelta(right, rightScroller, delta, shouldAbortSmoothScroll);
      event.preventDefault();
    };

    const handleBodyScroll = () => syncScrollerTarget(body, bodyScroller);
    const handleRightScroll = () => syncScrollerTarget(right, rightScroller);

    let lastBodyContentSize = { w: body.clientWidth, h: body.scrollHeight };
    let lastRightContentSize = { w: right.clientWidth, h: right.scrollHeight };

    const makeResizeHandler = (
      element: HTMLElement,
      lastSize: { w: number; h: number },
    ) => () => {
      const w = element.clientWidth;
      const h = element.scrollHeight;
      const dw = Math.abs(w - lastSize.w);
      const dh = Math.abs(h - lastSize.h);
      if (dw < LAYOUT_CHANGE_MIN_DELTA_PX && dh < LAYOUT_CHANGE_MIN_DELTA_PX) return;
      lastSize.w = w;
      lastSize.h = h;
      markLayoutChanging();
      clampScrollerTarget(body, bodyScroller);
      clampScrollerTarget(right, rightScroller);
    };

    const handleBodyResize = makeResizeHandler(body, lastBodyContentSize);
    const handleRightResize = makeResizeHandler(right, lastRightContentSize);

    const bodyResizeObserver = new ResizeObserver(handleBodyResize);
    const rightResizeObserver = new ResizeObserver(handleRightResize);

    bodyResizeObserver.observe(body);
    rightResizeObserver.observe(right);

    window.addEventListener('resize', markLayoutChanging);
    desktopMediaQuery.addEventListener('change', markLayoutChanging);

    right.addEventListener('wheel', handleRightWheel, { passive: false });
    body.addEventListener('wheel', handleBodyWheel, { passive: false });
    body.addEventListener('scroll', handleBodyScroll, { passive: true });
    right.addEventListener('scroll', handleRightScroll, { passive: true });

    return () => {
      bodyResizeObserver.disconnect();
      rightResizeObserver.disconnect();
      window.removeEventListener('resize', markLayoutChanging);
      desktopMediaQuery.removeEventListener('change', markLayoutChanging);
      if (layoutSettleTimer !== null) {
        window.clearTimeout(layoutSettleTimer);
      }
      right.removeEventListener('wheel', handleRightWheel);
      body.removeEventListener('wheel', handleBodyWheel);
      body.removeEventListener('scroll', handleBodyScroll);
      right.removeEventListener('scroll', handleRightScroll);
      stopSmoothScroller(body, bodyScroller);
      stopSmoothScroller(right, rightScroller);
    };
  }, [enabled, bodyRef, rightRef]);
}
