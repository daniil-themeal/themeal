import { useEffect, type RefObject } from 'react';

const SCROLL_SYNC_DRIFT_THRESHOLD = 24;
const SCROLL_LERP = 0.18;
const SCROLL_STOP_EPSILON = 0.5;
const SCROLL_EPSILON = 1;
const MD_BREAKPOINT = '(min-width: 768px)';
const LAYOUT_SETTLE_MS = 150;

type SmoothScroller = {
  targetScrollTop: number;
  rafId: number | null;
  isAnimating: boolean;
};

function createSmoothScroller(): SmoothScroller {
  return { targetScrollTop: 0, rafId: null, isAnimating: false };
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
  label = 'unknown',
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
    scroller.isAnimating = false;
    scroller.rafId = null;
    return;
  }

  element.scrollTop += distance * SCROLL_LERP;
  scroller.rafId = requestAnimationFrame(() => runSmoothScroll(element, scroller, label, shouldAbort));
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
      runSmoothScroll(element, scroller, 'applySmoothDelta', shouldAbort),
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
}

function syncScrollerTarget(element: HTMLElement, scroller: SmoothScroller) {
  if (scroller.isAnimating) return;

  const drift = Math.abs(element.scrollTop - scroller.targetScrollTop);

  if (drift <= SCROLL_SYNC_DRIFT_THRESHOLD) {
    scroller.targetScrollTop = element.scrollTop;
    return;
  }

  if (scroller.rafId !== null) {
    cancelAnimationFrame(scroller.rafId);
    scroller.rafId = null;
  }

  scroller.targetScrollTop = element.scrollTop;
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
  isDesktopLayout?: () => boolean;
};

export function usePlanStepScrollChaining({
  enabled,
  bodyRef,
  rightRef,
  isDesktopLayout,
}: UsePlanStepScrollChainingOptions) {
  useEffect(() => {
    if (!enabled) return;

    const body = bodyRef.current;
    const right = rightRef.current;

    if (!body || !right) return;

    const bodyScroller = createSmoothScroller();
    const rightScroller = createSmoothScroller();
    const mediaQuery = window.matchMedia(MD_BREAKPOINT);

    const isDesktop = isDesktopLayout ?? (() => mediaQuery.matches);
    let isLayoutChanging = false;
    let layoutSettleTimer: number | null = null;

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
      if (!isDesktop() || isLayoutChanging) return;

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
      if (!isDesktop() || isLayoutChanging) return;

      const target = event.target;
      if (!(target instanceof Node) || right.contains(target)) return;

      const delta = getScrollDelta(event);
      if (delta === 0) return;

      if (!canScrollVertically(right)) return;

      if (delta > 0) {
        if (canScrollDown(body)) return;
        if (!canScrollDown(right)) {
          event.preventDefault();
          return;
        }
      } else {
        if (canScrollUp(body)) return;
        if (!canScrollUp(right)) {
          event.preventDefault();
          return;
        }
      }

      applySmoothDelta(right, rightScroller, delta, shouldAbortSmoothScroll);

      // Body hit its scroll boundary — always consume wheel here so the browser
      // does not fall through to page scroll while right column animates.
      event.preventDefault();
    };

    const handleBodyScroll = () => syncScrollerTarget(body, bodyScroller);
    const handleRightScroll = () => syncScrollerTarget(right, rightScroller);

    const handleScrollerLayoutChange = (_label: string, element: HTMLElement, scroller: SmoothScroller) => {
      markLayoutChanging();
      clampScrollerTarget(body, bodyScroller);
      clampScrollerTarget(right, rightScroller);
    };

    const bodyResizeObserver = new ResizeObserver(() => handleScrollerLayoutChange('body', body, bodyScroller));
    const rightResizeObserver = new ResizeObserver(() => handleScrollerLayoutChange('right', right, rightScroller));

    bodyResizeObserver.observe(body);
    rightResizeObserver.observe(right);

    window.addEventListener('resize', markLayoutChanging);
    mediaQuery.addEventListener('change', markLayoutChanging);

    right.addEventListener('wheel', handleRightWheel, { passive: false });
    body.addEventListener('wheel', handleBodyWheel, { passive: false });
    body.addEventListener('scroll', handleBodyScroll, { passive: true });
    right.addEventListener('scroll', handleRightScroll, { passive: true });

    return () => {
      bodyResizeObserver.disconnect();
      rightResizeObserver.disconnect();
      window.removeEventListener('resize', markLayoutChanging);
      mediaQuery.removeEventListener('change', markLayoutChanging);
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
  }, [enabled, bodyRef, rightRef, isDesktopLayout]);
}
