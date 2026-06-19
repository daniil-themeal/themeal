import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

export const CHECKOUT_PLAN_DESKTOP_ON_PX = 768;
export const CHECKOUT_PLAN_DESKTOP_OFF_PX = 744;
const LAYOUT_SETTLE_MS = 200;

function resolveDesktopLayout(width: number, current: boolean): boolean {
  if (current) return width >= CHECKOUT_PLAN_DESKTOP_OFF_PX;
  return width >= CHECKOUT_PLAN_DESKTOP_ON_PX;
}

function clampBodyScrollTop(body: HTMLElement): number {
  const maxScrollTop = Math.max(0, body.scrollHeight - body.clientHeight);
  const scrollTopBefore = body.scrollTop;

  if (scrollTopBefore > maxScrollTop) {
    body.scrollTop = maxScrollTop;
  }

  return scrollTopBefore;
}

export function useCheckoutPlanDesktopLayout(
  enabled: boolean,
  bodyRef: RefObject<HTMLElement | null>,
) {
  const [isDesktopLayout, setIsDesktopLayout] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= CHECKOUT_PLAN_DESKTOP_ON_PX : false,
  );
  const isDesktopLayoutRef = useRef(isDesktopLayout);
  isDesktopLayoutRef.current = isDesktopLayout;

  useLayoutEffect(() => {
    if (!enabled) return;

    let settleTimer: number | null = null;
    let pendingWidth = window.innerWidth;

    const applyLayoutMode = () => {
      const next = resolveDesktopLayout(pendingWidth, isDesktopLayoutRef.current);
      if (next === isDesktopLayoutRef.current) return;

      setIsDesktopLayout(next);
    };

    const scheduleLayoutUpdate = () => {
      pendingWidth = window.innerWidth;

      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
      }

      settleTimer = window.setTimeout(() => {
        settleTimer = null;
        applyLayoutMode();
      }, LAYOUT_SETTLE_MS);
    };

    window.addEventListener('resize', scheduleLayoutUpdate);

    return () => {
      window.removeEventListener('resize', scheduleLayoutUpdate);

      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
      }
    };
  }, [enabled]);

  useLayoutEffect(() => {
    if (!enabled) return;

    const body = bodyRef.current;
    if (!body) return;

    requestAnimationFrame(() => {
      clampBodyScrollTop(body);
    });
  }, [enabled, isDesktopLayout, bodyRef]);

  return isDesktopLayout;
}
