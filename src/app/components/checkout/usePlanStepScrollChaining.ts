import { useEffect, type RefObject } from 'react';

const SCROLL_EPSILON = 1;
const MD_BREAKPOINT = '(min-width: 768px)';

function getScrollDelta(event: WheelEvent): number {
  return event.deltaY;
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

function scrollByDelta(element: HTMLElement, delta: number): boolean {
  const maxScrollTop = element.scrollHeight - element.clientHeight;
  const nextScrollTop = Math.max(0, Math.min(element.scrollTop + delta, maxScrollTop));

  if (Math.abs(nextScrollTop - element.scrollTop) < SCROLL_EPSILON) {
    return false;
  }

  element.scrollTop = nextScrollTop;
  return true;
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

    const mediaQuery = window.matchMedia(MD_BREAKPOINT);

    const isDesktop = () => mediaQuery.matches;

    const handleRightWheel = (event: WheelEvent) => {
      if (!isDesktop()) return;

      const delta = getScrollDelta(event);
      scrollByDelta(right, delta);
      event.preventDefault();
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

        if (scrollByDelta(right, delta)) {
          event.preventDefault();
        }

        return;
      }

      if (canScrollUp(body)) return;

      if (scrollByDelta(right, delta)) {
        event.preventDefault();
      }
    };

    right.addEventListener('wheel', handleRightWheel, { passive: false });
    body.addEventListener('wheel', handleBodyWheel, { passive: false });

    return () => {
      right.removeEventListener('wheel', handleRightWheel);
      body.removeEventListener('wheel', handleBodyWheel);
    };
  }, [enabled, bodyRef, rightRef]);
}
