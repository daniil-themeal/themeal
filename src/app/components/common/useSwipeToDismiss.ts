import { useEffect, useRef, type RefObject } from 'react';

const MODAL_ENTER_ANIMATION_MS = 420;

const MOBILE_MEDIA_QUERY = '(max-width: 639px)';
const SCROLL_TOP_EPSILON = 1;
const HEADER_DRAG_ZONE_PX = 48;
const DISMISS_THRESHOLD_PX = 80;
const DISMISS_THRESHOLD_RATIO = 0.25;
const HORIZONTAL_DOMINANCE_RATIO = 1;
const SNAP_BACK_MS = 200;

type SwipeDragState = {
  pointerId: number;
  startX: number;
  startY: number;
  startOffsetY: number;
  startedInHeaderZone: boolean;
  scrollContainer: HTMLElement | null;
  isDragging: boolean;
};

type UseSwipeToDismissOptions = {
  enabled: boolean;
  disabled?: boolean;
  onDismiss: () => void;
  panelRef: RefObject<HTMLElement | null>;
  overlayRef?: RefObject<HTMLElement | null>;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  waitForEnterAnimation?: boolean;
};

function isMobileViewport() {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

function isScrollable(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const overflowY = style.overflowY;

  if (overflowY !== 'auto' && overflowY !== 'scroll' && overflowY !== 'overlay') {
    return false;
  }

  return element.scrollHeight > element.clientHeight + SCROLL_TOP_EPSILON;
}

export function findScrollableAncestor(
  target: EventTarget | null,
  boundary: HTMLElement,
): HTMLElement | null {
  if (!(target instanceof Node)) return null;

  let node: Node | null = target;

  while (node instanceof HTMLElement && boundary.contains(node)) {
    if (isScrollable(node)) {
      return node;
    }

    if (node === boundary) break;
    node = node.parentElement;
  }

  return null;
}

function resolveScrollContainer(
  scrollContainerRef: RefObject<HTMLElement | null> | undefined,
  target: EventTarget | null,
  panel: HTMLElement,
): HTMLElement | null {
  if (scrollContainerRef?.current) {
    return scrollContainerRef.current;
  }

  return findScrollableAncestor(target, panel);
}

function canStartDrag(
  scrollContainer: HTMLElement | null,
  startedInHeaderZone: boolean,
) {
  if (startedInHeaderZone) return true;
  if (!scrollContainer) return true;
  return scrollContainer.scrollTop <= SCROLL_TOP_EPSILON;
}

function getDismissThreshold(panelHeight: number) {
  return Math.min(DISMISS_THRESHOLD_PX, panelHeight * DISMISS_THRESHOLD_RATIO);
}

function applyPanelTransform(panel: HTMLElement, offsetY: number) {
  panel.style.transform = offsetY > 0 ? `translateY(${offsetY}px)` : '';
}

function applyOverlayOpacity(overlay: HTMLElement | null, offsetY: number, panelHeight: number) {
  if (!overlay) return;

  const progress = Math.min(1, offsetY / Math.max(panelHeight, 1));
  overlay.style.opacity = String(Math.max(0, 1 - progress * 0.5));
}

function clearPanelStyles(panel: HTMLElement) {
  panel.style.transform = '';
  panel.style.transition = '';
}

function clearOverlayStyles(overlay: HTMLElement | null) {
  if (!overlay) return;
  overlay.style.opacity = '';
  overlay.style.transition = '';
}

export function useSwipeToDismiss({
  enabled,
  disabled = false,
  onDismiss,
  panelRef,
  overlayRef,
  scrollContainerRef,
  waitForEnterAnimation = true,
}: UseSwipeToDismissOptions) {
  const dragStateRef = useRef<SwipeDragState | null>(null);
  const enterAnimationDoneRef = useRef(!waitForEnterAnimation);

  useEffect(() => {
    if (!enabled || disabled) return;

    const panel = panelRef.current;
    if (!panel) return;

    enterAnimationDoneRef.current = !waitForEnterAnimation;

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.currentTarget !== panel || event.target !== panel) return;
      enterAnimationDoneRef.current = true;
    };

    const enterTimer = waitForEnterAnimation
      ? window.setTimeout(() => {
          enterAnimationDoneRef.current = true;
        }, MODAL_ENTER_ANIMATION_MS)
      : null;

    panel.addEventListener('animationend', handleAnimationEnd);

    const resetDrag = () => {
      dragStateRef.current = null;
      panel.classList.remove('modal-swipe-dragging');
      clearPanelStyles(panel);
      clearOverlayStyles(overlayRef?.current ?? null);
    };

    const snapBack = () => {
      panel.classList.remove('modal-swipe-dragging');
      panel.classList.add('modal-swipe-snap-back');
      clearPanelStyles(panel);
      clearOverlayStyles(overlayRef?.current ?? null);

      window.setTimeout(() => {
        panel.classList.remove('modal-swipe-snap-back');
      }, SNAP_BACK_MS);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!isMobileViewport() || !enterAnimationDoneRef.current) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (dragStateRef.current) return;

      const panelRect = panel.getBoundingClientRect();
      const startedInHeaderZone =
        event.clientY - panelRect.top <= HEADER_DRAG_ZONE_PX;
      const scrollContainer = resolveScrollContainer(
        scrollContainerRef,
        event.target,
        panel,
      );

      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startOffsetY: 0,
        startedInHeaderZone,
        scrollContainer,
        isDragging: false,
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState || dragState.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - dragState.startX;
      const deltaY = event.clientY - dragState.startY;

      if (!dragState.isDragging) {
        if (Math.abs(deltaX) > Math.abs(deltaY) * HORIZONTAL_DOMINANCE_RATIO) {
          dragStateRef.current = null;
          return;
        }

        if (deltaY <= 0) return;

        if (
          !canStartDrag(
            dragState.scrollContainer,
            dragState.startedInHeaderZone,
          )
        ) {
          dragStateRef.current = null;
          return;
        }

        dragState.isDragging = true;
        panel.classList.add('modal-swipe-dragging');
        panel.setPointerCapture(event.pointerId);
      }

      event.preventDefault();

      const rawOffset = Math.max(0, deltaY);
      const offsetY = rawOffset;

      dragState.startOffsetY = offsetY;
      applyPanelTransform(panel, offsetY);
      applyOverlayOpacity(
        overlayRef?.current ?? null,
        offsetY,
        panel.getBoundingClientRect().height,
      );
    };

    const handlePointerUp = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState || dragState.pointerId !== event.pointerId) return;

      if (panel.hasPointerCapture(event.pointerId)) {
        panel.releasePointerCapture(event.pointerId);
      }

      if (!dragState.isDragging) {
        dragStateRef.current = null;
        return;
      }

      const offsetY = dragState.startOffsetY;
      const threshold = getDismissThreshold(panel.getBoundingClientRect().height);

      dragStateRef.current = null;
      panel.classList.remove('modal-swipe-dragging');

      if (offsetY >= threshold) {
        clearPanelStyles(panel);
        clearOverlayStyles(overlayRef?.current ?? null);
        onDismiss();
        return;
      }

      snapBack();
    };

    const handlePointerCancel = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState || dragState.pointerId !== event.pointerId) return;

      if (panel.hasPointerCapture(event.pointerId)) {
        panel.releasePointerCapture(event.pointerId);
      }

      if (dragState.isDragging) {
        snapBack();
      } else {
        resetDrag();
      }
    };

    panel.addEventListener('pointerdown', handlePointerDown);
    panel.addEventListener('pointermove', handlePointerMove);
    panel.addEventListener('pointerup', handlePointerUp);
    panel.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      if (enterTimer !== null) {
        window.clearTimeout(enterTimer);
      }

      panel.removeEventListener('animationend', handleAnimationEnd);
      panel.removeEventListener('pointerdown', handlePointerDown);
      panel.removeEventListener('pointermove', handlePointerMove);
      panel.removeEventListener('pointerup', handlePointerUp);
      panel.removeEventListener('pointercancel', handlePointerCancel);
      resetDrag();
    };
  }, [
    disabled,
    enabled,
    onDismiss,
    overlayRef,
    panelRef,
    scrollContainerRef,
    waitForEnterAnimation,
  ]);
}
