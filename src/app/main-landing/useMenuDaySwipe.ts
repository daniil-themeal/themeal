import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

const DRAG_CLICK_THRESHOLD = 6;
const SWIPE_RATIO = 0.18;
const SWIPE_MIN_PX = 72;
const RUBBER_BAND_MAX = 48;
const RUBBER_BAND_FACTOR = 0.28;

function applyEdgeResistance(raw: number, day: number, dayCount: number) {
  if (raw > 0 && day <= 0) {
    return Math.min(RUBBER_BAND_MAX, raw * RUBBER_BAND_FACTOR);
  }
  if (raw < 0 && day >= dayCount - 1) {
    return Math.max(-RUBBER_BAND_MAX, raw * RUBBER_BAND_FACTOR);
  }
  return raw;
}

/** Drag/swipe the meal grid to switch menu days with edge rubber-band. */
export function useMenuDaySwipe(
  dayCount: number,
  day: number,
  onDayChange: (nextDay: number, direction: 'left' | 'right') => void,
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeEnabled, setSwipeEnabled] = useState(true);

  const suppressClickRef = useRef(false);
  const isDraggingRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const dayRef = useRef(day);
  dayRef.current = day;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSwipeEnabled(!mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    dragOffsetRef.current = 0;
    setDragOffset(0);
  }, [day]);

  const getSlideWidth = () => viewportRef.current?.clientWidth ?? 0;

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!swipeEnabled) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    suppressClickRef.current = false;
    pointerStartXRef.current = event.clientX;
    dragStartOffsetRef.current = dragOffsetRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const deltaX = event.clientX - pointerStartXRef.current;
    if (Math.abs(deltaX) > DRAG_CLICK_THRESHOLD) {
      suppressClickRef.current = true;
    }

    const raw = dragStartOffsetRef.current + deltaX;
    const next = applyEdgeResistance(raw, dayRef.current, dayCount);
    dragOffsetRef.current = next;
    setDragOffset(next);

    if (Math.abs(deltaX) > DRAG_CLICK_THRESHOLD) {
      event.preventDefault();
    }
  };

  const finishDrag = (target: HTMLDivElement) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);
    target.style.cursor = '';

    const slideWidth = getSlideWidth();
    const threshold = Math.max(SWIPE_MIN_PX, slideWidth * SWIPE_RATIO);
    const offset = dragOffsetRef.current;
    const currentDay = dayRef.current;

    if (offset < -threshold && currentDay < dayCount - 1) {
      onDayChange(currentDay + 1, 'left');
    } else if (offset > threshold && currentDay > 0) {
      onDayChange(currentDay - 1, 'right');
    }

    dragOffsetRef.current = 0;
    setDragOffset(0);

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 80);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    finishDrag(event.currentTarget);
  };

  const onPointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    finishDrag(event.currentTarget);
  };

  const guardMealClick = useCallback((handler: () => void) => () => {
    if (suppressClickRef.current) return;
    handler();
  }, []);

  const trackStyle = {
    transform: `translateX(calc(-${day * 100}% + ${dragOffset}px))`,
  };

  return {
    viewportRef,
    swipeEnabled,
    isDragging,
    trackStyle,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    guardMealClick,
  };
}
