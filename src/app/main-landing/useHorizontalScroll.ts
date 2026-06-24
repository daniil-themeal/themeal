import { useCallback, useEffect, useRef, type MouseEvent, type RefObject } from 'react';

const DRAG_THRESHOLD = 6;
const CLICK_SUPPRESS_MS = 80;

type ScrollOpts = {
  allowVerticalTouch?: boolean;
  /** Map mouse wheel to horizontal scroll. Default true. */
  wheel?: boolean;
};

/** Horizontal scroll: native touch swipe, mouse drag, optional wheel → scrollLeft. */
export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>(opts: ScrollOpts = {}) {
  const { allowVerticalTouch = false, wheel = true } = opts;
  const ref = useRef<T>(null);
  const suppressClickRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  const resetScroll = useCallback(() => {
    if (ref.current) ref.current.scrollLeft = 0;
  }, []);

  useEffect(() => {
    if (!wheel) return;
    const el = ref.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (delta === 0) return;
      el.scrollLeft += delta;
      event.preventDefault();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [wheel]);

  const onMouseDown = (event: MouseEvent<T>) => {
    if (event.button !== 0) return;
    const el = ref.current;
    if (!el) return;

    suppressClickRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = el.scrollLeft;

    const onMouseMove = (moveEvent: globalThis.MouseEvent) => {
      if (!ref.current) return;
      const deltaX = moveEvent.clientX - dragStartXRef.current;
      if (Math.abs(deltaX) > DRAG_THRESHOLD) suppressClickRef.current = true;
      ref.current.scrollLeft = dragStartScrollLeftRef.current - deltaX;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, CLICK_SUPPRESS_MS);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const guardClick = (handler: () => void) => () => {
    if (suppressClickRef.current) return;
    handler();
  };

  const className = allowVerticalTouch ? 'h-scroll--pan-xy' : 'h-scroll';

  return {
    ref: ref as RefObject<HTMLDivElement>,
    onMouseDown,
    guardClick,
    resetScroll,
    className,
  };
}
