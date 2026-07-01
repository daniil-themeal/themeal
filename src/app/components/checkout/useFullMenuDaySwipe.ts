import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

const DRAG_CLICK_THRESHOLD = 6;
const SWIPE_RATIO = 0.18;
const SWIPE_MIN_PX = 72;
const PEEK_DEAD_ZONE_MIN_PX = 32;
const PEEK_DEAD_ZONE_RATIO = 0.08;
const RUBBER_BAND_MAX = 48;
const RUBBER_BAND_FACTOR = 0.28;

type DragMode = 'daySwipe' | 'mealScroll' | null;

type UseFullMenuDaySwipeOptions = {
  dayCount: number;
  day: number;
  onDayChange: (nextDay: number, direction: 'left' | 'right') => void;
  getMealScrollEl: () => HTMLDivElement | null;
  isMealScrollLocked: () => boolean;
};

function applyEdgeResistance(raw: number, day: number, dayCount: number) {
  if (raw > 0 && day <= 0) {
    return Math.min(RUBBER_BAND_MAX, raw * RUBBER_BAND_FACTOR);
  }
  if (raw < 0 && day >= dayCount - 1) {
    return Math.max(-RUBBER_BAND_MAX, raw * RUBBER_BAND_FACTOR);
  }
  return raw;
}

function mapVisualDayDragOffset(raw: number, deadZone: number) {
  const abs = Math.abs(raw);
  if (abs <= deadZone) return 0;
  return Math.sign(raw) * (abs - deadZone);
}

function shouldDaySwipe(
  scrollEl: HTMLDivElement | null,
  deltaX: number,
  isMealScrollLocked: boolean,
) {
  if (isMealScrollLocked) return true;
  if (!scrollEl) return true;

  const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
  if (maxScroll <= 1) return true;

  const atStart = scrollEl.scrollLeft <= 2;
  const atEnd = scrollEl.scrollLeft >= maxScroll - 2;

  if (deltaX > 0 && atStart) return true;
  if (deltaX < 0 && atEnd) return true;
  return false;
}

/** Drag/swipe meal area to switch days; edge handoff for inner meal carousel scroll on mobile. */
export function useFullMenuDaySwipe({
  dayCount,
  day,
  onDayChange,
  getMealScrollEl,
  isMealScrollLocked,
}: UseFullMenuDaySwipeOptions) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<DragMode>(null);
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const [slideWidth, setSlideWidth] = useState(0);

  const suppressClickRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragModeRef = useRef<DragMode>(null);
  const pointerStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const mealScrollStartLeftRef = useRef(0);
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

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      setSlideWidth(viewport.clientWidth);
    };

    measure();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(viewport);
    window.addEventListener('resize', measure);

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [dayCount, swipeEnabled]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !swipeEnabled) return;

    const blockTouchScroll = (event: TouchEvent) => {
      if (!isDraggingRef.current) return;
      event.preventDefault();
    };

    viewport.addEventListener('touchmove', blockTouchScroll, { passive: false });

    return () => {
      viewport.removeEventListener('touchmove', blockTouchScroll);
    };
  }, [swipeEnabled]);

  const getSlideWidth = () => slideWidth || viewportRef.current?.clientWidth || 0;

  const getPeekDeadZone = () =>
    Math.max(PEEK_DEAD_ZONE_MIN_PX, getSlideWidth() * PEEK_DEAD_ZONE_RATIO);

  const resolveDragMode = (deltaX: number): DragMode => {
    return shouldDaySwipe(getMealScrollEl(), deltaX, isMealScrollLocked())
      ? 'daySwipe'
      : 'mealScroll';
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!swipeEnabled) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    dragModeRef.current = null;
    setDragMode(null);
    suppressClickRef.current = false;
    pointerStartXRef.current = event.clientX;
    dragStartOffsetRef.current = dragOffsetRef.current;
    mealScrollStartLeftRef.current = getMealScrollEl()?.scrollLeft ?? 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    if (event.pointerType === 'touch') {
      event.preventDefault();
    }
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const deltaX = event.clientX - pointerStartXRef.current;

    if (Math.abs(deltaX) <= DRAG_CLICK_THRESHOLD) return;

    if (!dragModeRef.current) {
      const mode = resolveDragMode(deltaX);
      dragModeRef.current = mode;
      setDragMode(mode);
      pointerStartXRef.current = event.clientX;
      dragStartOffsetRef.current = dragOffsetRef.current;
      mealScrollStartLeftRef.current = getMealScrollEl()?.scrollLeft ?? 0;
      suppressClickRef.current = true;
    }

    const activeDeltaX = event.clientX - pointerStartXRef.current;

    if (dragModeRef.current === 'daySwipe') {
      const raw = dragStartOffsetRef.current + activeDeltaX;
      const visual = applyEdgeResistance(
        mapVisualDayDragOffset(raw, getPeekDeadZone()),
        dayRef.current,
        dayCount,
      );
      dragOffsetRef.current = visual;
      setDragOffset(visual);
    } else {
      const scrollEl = getMealScrollEl();
      if (scrollEl) {
        scrollEl.scrollLeft = mealScrollStartLeftRef.current - activeDeltaX;
      }
    }

    event.preventDefault();
  };

  const finishDrag = (target: HTMLDivElement) => {
    if (!isDraggingRef.current) return;

    if (dragModeRef.current === 'daySwipe') {
      const width = getSlideWidth();
      const threshold = Math.max(SWIPE_MIN_PX, width * SWIPE_RATIO);
      const offset = dragOffsetRef.current;
      const currentDay = dayRef.current;

      if (offset < -threshold && currentDay < dayCount - 1) {
        onDayChange(currentDay + 1, 'left');
      } else if (offset > threshold && currentDay > 0) {
        onDayChange(currentDay - 1, 'right');
      }

      dragOffsetRef.current = 0;
      setDragOffset(0);
    }

    isDraggingRef.current = false;
    dragModeRef.current = null;
    setIsDragging(false);
    setDragMode(null);

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

  const baseOffset = slideWidth > 0 ? -day * slideWidth : 0;
  const trackStyle = {
    transform: `translateX(${baseOffset + dragOffset}px)`,
  };

  const slideStyle =
    slideWidth > 0
      ? { flex: `0 0 ${slideWidth}px`, width: `${slideWidth}px` }
      : { flex: '0 0 100%', width: '100%' };

  return {
    viewportRef,
    swipeEnabled,
    isDragging,
    dragMode,
    trackStyle,
    slideStyle,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    guardMealClick,
    suppressClickRef,
  };
}
