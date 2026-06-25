import { useEffect, type RefObject } from 'react';

const SCROLL_SYNC_DRIFT_THRESHOLD = 24;
const SCROLL_LERP = 0.18;
const SCROLL_STOP_EPSILON = 0.5;
const SCROLL_EPSILON = 1;
const PLAN_DESKTOP_MEDIA_QUERY = '(min-width: 768px)';
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

    // #region agent log
    const debugLog = (
      location: string,
      message: string,
      data: Record<string, unknown>,
      hypothesisId: string,
    ) => {
      fetch('http://127.0.0.1:7774/ingest/74a9562f-1e4a-456e-88d5-c6f7971d9185', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'dbfb70' },
        body: JSON.stringify({
          sessionId: 'dbfb70',
          location,
          message,
          data,
          timestamp: Date.now(),
          hypothesisId,
        }),
      }).catch(() => {});
    };
    let lastBodyScrollTop = body.scrollTop;
    let lastSmoothLogAt = 0;
    // #endregion

    const isDesktop = () => desktopMediaQuery.matches;
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

      // #region agent log
      debugLog(
        'usePlanStepScrollChaining.ts:markLayoutChanging',
        'layout changing – smooth scroll aborted',
        {
          bodyScrollTop: body.scrollTop,
          bodyScrollHeight: body.scrollHeight,
          rightScrollHeight: right.scrollHeight,
        },
        'H1',
      );
      // #endregion

      if (layoutSettleTimer !== null) {
        window.clearTimeout(layoutSettleTimer);
      }

      layoutSettleTimer = window.setTimeout(() => {
        isLayoutChanging = false;
        layoutSettleTimer = null;
        // #region agent log
        debugLog(
          'usePlanStepScrollChaining.ts:layoutSettled',
          'layout settled',
          { bodyScrollTop: body.scrollTop },
          'H1',
        );
        // #endregion
      }, LAYOUT_SETTLE_MS);
    };

    const applyBodyOverflowDelta = (delta: number): number => {
      if (delta > 0 && !canScrollDown(body)) return delta;
      if (delta < 0 && !canScrollUp(body)) return delta;
      if (isLayoutChanging) {
        // #region agent log
        debugLog(
          'usePlanStepScrollChaining.ts:applyBodyOverflowDelta',
          'body overflow delta aborted by layout lock',
          { delta, bodyScrollTop: body.scrollTop },
          'H1',
        );
        // #endregion
        return delta;
      }
      const remaining = applySmoothDelta(body, bodyScroller, delta, shouldAbortSmoothScroll);
      // #region agent log
      if (remaining !== delta) {
        const now = Date.now();
        if (now - lastSmoothLogAt > 80) {
          lastSmoothLogAt = now;
          debugLog(
            'usePlanStepScrollChaining.ts:applyBodyOverflowDelta',
            'smooth scroll applied to body from right overflow',
            {
              delta,
              remaining,
              bodyScrollTop: body.scrollTop,
              bodyTarget: bodyScroller.targetScrollTop,
            },
            'H2',
          );
        }
      }
      // #endregion
      return remaining;
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

      const scrollDown = canScrollDown(body);
      const scrollUp = canScrollUp(body);
      let branch = 'unknown';

      if (delta > 0) {
        if (scrollDown) {
          branch = 'native-scroll-down';
          // #region agent log
          if (bodyScroller.isAnimating || bodyScroller.rafId !== null) {
            debugLog(
              'usePlanStepScrollChaining.ts:handleBodyWheel',
              'native scroll while body smooth-scroller active',
              {
                branch,
                delta,
                bodyScrollTop: body.scrollTop,
                bodyTarget: bodyScroller.targetScrollTop,
                isAnimating: bodyScroller.isAnimating,
              },
              'H2',
            );
          }
          // #endregion
          return;
        }
        if (!canScrollDown(right)) {
          branch = 'prevent-at-bottom';
          event.preventDefault();
          // #region agent log
          debugLog(
            'usePlanStepScrollChaining.ts:handleBodyWheel',
            'wheel prevented at bottom edge',
            { branch, delta, bodyScrollTop: body.scrollTop },
            'H3',
          );
          // #endregion
          return;
        }
        branch = 'redirect-to-right-down';
      } else {
        if (scrollUp) {
          branch = 'native-scroll-up';
          // #region agent log
          if (bodyScroller.isAnimating || bodyScroller.rafId !== null) {
            debugLog(
              'usePlanStepScrollChaining.ts:handleBodyWheel',
              'native scroll while body smooth-scroller active',
              {
                branch,
                delta,
                bodyScrollTop: body.scrollTop,
                bodyTarget: bodyScroller.targetScrollTop,
                isAnimating: bodyScroller.isAnimating,
              },
              'H2',
            );
          }
          // #endregion
          return;
        }
        if (!canScrollUp(right)) {
          branch = 'prevent-at-top';
          event.preventDefault();
          // #region agent log
          debugLog(
            'usePlanStepScrollChaining.ts:handleBodyWheel',
            'wheel prevented at top edge',
            { branch, delta, bodyScrollTop: body.scrollTop },
            'H3',
          );
          // #endregion
          return;
        }
        branch = 'redirect-to-right-up';
      }

      applySmoothDelta(right, rightScroller, delta, shouldAbortSmoothScroll);
      event.preventDefault();
      // #region agent log
      debugLog(
        'usePlanStepScrollChaining.ts:handleBodyWheel',
        'wheel redirected to right column',
        { branch, delta, bodyScrollTop: body.scrollTop },
        'H3',
      );
      // #endregion
    };

    const handleBodyScroll = () => {
      // #region agent log
      const scrollDelta = body.scrollTop - lastBodyScrollTop;
      if (Math.abs(scrollDelta) > 0 && Math.abs(scrollDelta) < 8) {
        debugLog(
          'usePlanStepScrollChaining.ts:handleBodyScroll',
          'small body scroll tick (possible jitter)',
          {
            scrollTop: body.scrollTop,
            scrollDelta,
            targetScrollTop: bodyScroller.targetScrollTop,
            isAnimating: bodyScroller.isAnimating,
            drift: Math.abs(body.scrollTop - bodyScroller.targetScrollTop),
          },
          'H4',
        );
      }
      lastBodyScrollTop = body.scrollTop;
      // #endregion
      const driftBefore = Math.abs(body.scrollTop - bodyScroller.targetScrollTop);
      syncScrollerTarget(body, bodyScroller);
      // #region agent log
      if (driftBefore > SCROLL_SYNC_DRIFT_THRESHOLD) {
        debugLog(
          'usePlanStepScrollChaining.ts:syncScrollerTarget',
          'large drift resync on body',
          {
            scrollTop: body.scrollTop,
            targetScrollTop: bodyScroller.targetScrollTop,
            driftBefore,
          },
          'H4',
        );
      }
      // #endregion
    };
    const handleRightScroll = () => syncScrollerTarget(right, rightScroller);

    const handleScrollerLayoutChange = () => {
      markLayoutChanging();
      clampScrollerTarget(body, bodyScroller);
      clampScrollerTarget(right, rightScroller);
    };

    const bodyResizeObserver = new ResizeObserver(handleScrollerLayoutChange);
    const rightResizeObserver = new ResizeObserver(handleScrollerLayoutChange);

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
