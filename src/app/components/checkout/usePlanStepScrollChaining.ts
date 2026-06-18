import { useEffect, type RefObject } from 'react';

const SCROLL_EPSILON = 1;
const SCROLL_LERP = 0.18;
const SCROLL_STOP_EPSILON = 0.5;
const MD_BREAKPOINT = '(min-width: 768px)';

type SmoothScroller = {
  targetScrollTop: number;
  rafId: number | null;
};

function createSmoothScroller(): SmoothScroller {
  return { targetScrollTop: 0, rafId: null };
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

function runSmoothScroll(element: HTMLElement, scroller: SmoothScroller) {
  const distance = scroller.targetScrollTop - element.scrollTop;

  if (Math.abs(distance) < SCROLL_STOP_EPSILON) {
    element.scrollTop = scroller.targetScrollTop;
    scroller.rafId = null;
    return;
  }

  element.scrollTop += distance * SCROLL_LERP;
  scroller.rafId = requestAnimationFrame(() => runSmoothScroll(element, scroller));
}

function applySmoothDelta(
  element: HTMLElement,
  scroller: SmoothScroller,
  delta: number,
): number {
  if (delta === 0) return 0;

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
    scroller.rafId = requestAnimationFrame(() => runSmoothScroll(element, scroller));
  }

  return delta - applied;
}

function stopSmoothScroller(scroller: SmoothScroller) {
  if (scroller.rafId === null) return;

  cancelAnimationFrame(scroller.rafId);
  scroller.rafId = null;
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
    const mediaQuery = window.matchMedia(MD_BREAKPOINT);

    const isDesktop = () => mediaQuery.matches;

    const handleRightWheel = (event: WheelEvent) => {
      if (!isDesktop()) return;

      const delta = getScrollDelta(event);
      if (delta === 0) return;

      let remaining = delta;

      if (canScrollVertically(right)) {
        remaining = applySmoothDelta(right, rightScroller, remaining);
      }

      if (remaining !== 0) {
        remaining = applySmoothDelta(body, bodyScroller, remaining);
      }

      if (remaining !== delta) {
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
        if (canScrollDown(body)) return;
      } else if (canScrollUp(body)) {
        return;
      }

      const remaining = applySmoothDelta(right, rightScroller, delta);

      if (remaining !== delta) {
        event.preventDefault();
      }
    };

    right.addEventListener('wheel', handleRightWheel, { passive: false });
    body.addEventListener('wheel', handleBodyWheel, { passive: false });

    return () => {
      right.removeEventListener('wheel', handleRightWheel);
      body.removeEventListener('wheel', handleBodyWheel);
      stopSmoothScroller(bodyScroller);
      stopSmoothScroller(rightScroller);
    };
  }, [enabled, bodyRef, rightRef]);
}
