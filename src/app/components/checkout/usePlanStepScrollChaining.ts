import { useEffect, type RefObject } from 'react';

const SCROLL_EPSILON = 1;
const PLAN_DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

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

function clampBodyScrollTop(body: HTMLElement) {
  const maxScrollTop = getMaxScrollTop(body);

  if (body.scrollTop > maxScrollTop) {
    body.scrollTop = maxScrollTop;
  }
}

function applyScrollDelta(element: HTMLElement, delta: number): number {
  if (delta === 0) return 0;

  const maxScrollTop = getMaxScrollTop(element);
  const oldScrollTop = element.scrollTop;
  const newScrollTop = Math.max(0, Math.min(oldScrollTop + delta, maxScrollTop));
  const applied = newScrollTop - oldScrollTop;

  if (Math.abs(applied) < SCROLL_EPSILON) {
    return delta;
  }

  element.scrollTop = newScrollTop;
  return delta - applied;
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

    const desktopMediaQuery = window.matchMedia(PLAN_DESKTOP_MEDIA_QUERY);
    const isDesktop = () => desktopMediaQuery.matches;

    const handleLayoutBreakpointChange = () => {
      requestAnimationFrame(() => clampBodyScrollTop(body));
    };

    desktopMediaQuery.addEventListener('change', handleLayoutBreakpointChange);

    const applyBodyOverflowDelta = (delta: number): number => {
      if (delta > 0 && !canScrollDown(body)) return delta;
      if (delta < 0 && !canScrollUp(body)) return delta;
      return applyScrollDelta(body, delta);
    };

    const handleRightWheel = (event: WheelEvent) => {
      if (!isDesktop()) return;

      const delta = getScrollDelta(event);
      if (delta === 0) return;

      let remaining = delta;

      if (canScrollVertically(right)) {
        remaining = applyScrollDelta(right, remaining);
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

      applyScrollDelta(right, delta);
      event.preventDefault();
    };

    right.addEventListener('wheel', handleRightWheel, { passive: false });
    body.addEventListener('wheel', handleBodyWheel, { passive: false });

    return () => {
      desktopMediaQuery.removeEventListener('change', handleLayoutBreakpointChange);
      right.removeEventListener('wheel', handleRightWheel);
      body.removeEventListener('wheel', handleBodyWheel);
    };
  }, [enabled, bodyRef, rightRef]);
}
