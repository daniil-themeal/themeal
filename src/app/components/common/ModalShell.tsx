import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';

import { useEscapeLayer } from './escapeStack';
import { SPACING_CONTENT_ATTR, SPACING_ROOT_ATTR } from '../../landing-stas/getSpacingMeasureRoot';
import { useSwipeToDismiss } from './useSwipeToDismiss';
import { Z_INDEX_TOKENS } from './zIndexTokens';

export const MODAL_SHELL_EXIT_FALLBACK_MS = 260;
export const MODAL_SHELL_ENTER_ANIMATION_MS = 420;

export type ModalShellVariant = 'bottom-sheet' | 'centered-scroll' | 'fullscreen';

type ModalShellProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | ((requestClose: () => void) => ReactNode);
  variant?: ModalShellVariant;
  zIndex?: number;
  rootClassName?: string;
  overlayClassName?: string;
  panelClassName?: string;
  panelStyle?: CSSProperties;
  /** Bottom sheet only: keep panel on the bottom edge at all breakpoints. */
  sheetVerticalAlign?: 'bottom' | 'center-on-md';
  disableOverlayClick?: boolean;
  pointerEventsNoneWhenClosing?: boolean;
  onEscape?: () => boolean;
  enableSwipeToDismiss?: boolean;
  swipeScrollContainerRef?: RefObject<HTMLElement | null>;
};

export function useModalShell(onClose: () => void) {
  const [isClosing, setIsClosing] = useState(false);
  const isClosingRef = useRef(false);
  const fallbackTimerRef = useRef<number | null>(null);

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  const finishClose = useCallback(() => {
    clearFallbackTimer();
    onClose();
  }, [clearFallbackTimer, onClose]);

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    setIsClosing(true);

    fallbackTimerRef.current = window.setTimeout(() => {
      finishClose();
    }, MODAL_SHELL_EXIT_FALLBACK_MS);
  }, [finishClose]);

  const resetCloseState = useCallback(() => {
    isClosingRef.current = false;
    setIsClosing(false);
    clearFallbackTimer();
  }, [clearFallbackTimer]);

  const handlePanelAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      if (event.currentTarget !== event.target) return;

      if (isClosingRef.current) {
        finishClose();
      }
    },
    [finishClose],
  );

  return {
    isClosing,
    isClosingRef,
    requestClose,
    finishClose,
    resetCloseState,
    handlePanelAnimationEnd,
  };
}

export function ModalShell({
  isOpen,
  onClose,
  children,
  variant = 'bottom-sheet',
  zIndex = Z_INDEX_TOKENS.modal,
  rootClassName = '',
  overlayClassName = '',
  panelClassName = '',
  panelStyle,
  sheetVerticalAlign = 'center-on-md',
  disableOverlayClick = false,
  pointerEventsNoneWhenClosing = true,
  onEscape,
  enableSwipeToDismiss = true,
  swipeScrollContainerRef,
}: ModalShellProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const {
    isClosing,
    requestClose,
    resetCloseState,
    handlePanelAnimationEnd,
  } = useModalShell(onClose);

  useSwipeToDismiss({
    enabled: isOpen && enableSwipeToDismiss,
    disabled: isClosing,
    onDismiss: requestClose,
    panelRef,
    overlayRef: variant === 'bottom-sheet' ? overlayRef : undefined,
    scrollContainerRef: swipeScrollContainerRef,
  });

  useEscapeLayer(isOpen, zIndex, () => {
    if (onEscape?.()) return;
    requestClose();
  });

  useEffect(() => {
    if (!isOpen) return;

    resetCloseState();

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isOpen, resetCloseState]);

  if (!isOpen) return null;

  const animationClassName = isClosing ? 'modal-exit-responsive' : 'modal-enter-responsive';
  const overlayAnimationClassName = isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter';
  const panelClasses = [animationClassName, panelClassName].filter(Boolean).join(' ');
  const overlayClasses = [
    'absolute inset-0 bg-black/40',
    overlayAnimationClassName,
    overlayClassName,
  ]
    .filter(Boolean)
    .join(' ');
  const panelChildren =
    typeof children === 'function' ? children(requestClose) : children;
  const showSwipeHandle = variant === 'bottom-sheet';

  if (variant === 'fullscreen') {
    return (
      <div
        className={[
          'fixed inset-0 flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden scrollbar-hide',
          'sm:h-auto sm:max-h-none sm:block sm:overflow-y-auto sm:pointer-events-none',
          rootClassName,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ zIndex }}
        {...{ [SPACING_ROOT_ATTR]: '' }}
        onClick={disableOverlayClick ? undefined : requestClose}
      >
        <div
          className={[
            'absolute inset-0 hidden bg-black/40 sm:block',
            overlayAnimationClassName,
            overlayClassName,
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={disableOverlayClick ? undefined : requestClose}
        />

        <div className="relative z-[1] flex min-h-0 flex-1 flex-col sm:pointer-events-auto sm:min-h-full sm:flex sm:items-center sm:justify-center">
          <div
            ref={panelRef}
            className={['min-h-0 flex-1 overflow-y-auto scrollbar-hide sm:flex-none', panelClasses]
              .filter(Boolean)
              .join(' ')}
            style={panelStyle}
            onClick={(event) => event.stopPropagation()}
            onAnimationEnd={handlePanelAnimationEnd}
            {...{ [SPACING_CONTENT_ATTR]: '' }}
          >
            {panelChildren}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'centered-scroll') {
    return (
      <div
        className={['fixed inset-0 overflow-y-auto scrollbar-hide', rootClassName]
          .filter(Boolean)
          .join(' ')}
        style={{ zIndex }}
        {...{ [SPACING_ROOT_ATTR]: '' }}
        onClick={disableOverlayClick ? undefined : requestClose}
      >
        <div className="min-h-full sm:flex sm:items-center sm:justify-center">
          <div
            ref={panelRef}
            className={panelClasses}
            style={panelStyle}
            onClick={(event) => event.stopPropagation()}
            onAnimationEnd={handlePanelAnimationEnd}
            {...{ [SPACING_CONTENT_ATTR]: '' }}
          >
            {panelChildren}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        'fixed inset-0 flex justify-center',
        sheetVerticalAlign === 'bottom' ? 'items-end' : 'items-end md:items-center',
        isClosing && pointerEventsNoneWhenClosing ? 'pointer-events-none' : '',
        rootClassName,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ zIndex }}
      {...{ [SPACING_ROOT_ATTR]: '' }}
    >
      <div
        ref={overlayRef}
        className={overlayClasses}
        onClick={disableOverlayClick ? undefined : requestClose}
      />

      <div
        ref={panelRef}
        className={panelClasses}
        style={panelStyle}
        onClick={(event) => event.stopPropagation()}
        onAnimationEnd={handlePanelAnimationEnd}
        {...{ [SPACING_CONTENT_ATTR]: '' }}
      >
        {showSwipeHandle ? <div aria-hidden="true" className="modal-swipe-handle" /> : null}
        {panelChildren}
      </div>
    </div>
  );
}
