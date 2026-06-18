import { useEffect, useState, type RefObject } from 'react';

type HorizontalScrollEdgeFades = {
  showStartFade: boolean;
  showEndFade: boolean;
};

function getMaxScrollLeft(element: HTMLElement) {
  return Math.max(0, element.scrollWidth - element.clientWidth);
}

function readHorizontalScrollEdgeFades(
  element: HTMLElement,
  alwaysVisibleWhenScrollable = false,
): HorizontalScrollEdgeFades {
  const maxScrollLeft = getMaxScrollLeft(element);
  const canScroll = maxScrollLeft > 1;

  if (alwaysVisibleWhenScrollable && canScroll) {
    return { showStartFade: true, showEndFade: true };
  }

  return {
    showStartFade: canScroll && element.scrollLeft > 1,
    showEndFade: canScroll && element.scrollLeft < maxScrollLeft - 1,
  };
}

type UseHorizontalScrollEdgeFadesOptions = {
  /** Keep both edge fades visible whenever the row can scroll. */
  alwaysVisibleWhenScrollable?: boolean;
};

export function useHorizontalScrollEdgeFades(
  scrollRef: RefObject<HTMLElement | null>,
  contentKey?: unknown,
  options?: UseHorizontalScrollEdgeFadesOptions,
): HorizontalScrollEdgeFades {
  const alwaysVisibleWhenScrollable = options?.alwaysVisibleWhenScrollable ?? false;
  const [fades, setFades] = useState<HorizontalScrollEdgeFades>({
    showStartFade: false,
    showEndFade: false,
  });

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateFades = () => {
      setFades(readHorizontalScrollEdgeFades(element, alwaysVisibleWhenScrollable));
    };

    updateFades();
    element.addEventListener('scroll', updateFades, { passive: true });

    const resizeObserver = new ResizeObserver(updateFades);
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener('scroll', updateFades);
      resizeObserver.disconnect();
    };
  }, [scrollRef, contentKey, alwaysVisibleWhenScrollable]);

  return fades;
}
