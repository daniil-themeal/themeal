import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

import { Z_INDEX_TOKENS } from './zIndexTokens';

export const MODAL_SHELL_EXIT_FALLBACK_MS = 260;

export type ModalShellVariant = 'bottom-sheet' | 'centered-scroll';

type ModalShellProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | ((requestClose: () => void) => ReactNode);
  variant?: ModalShellVariant;
  zIndex?: number;
  rootClassName?: string;
  overlayClassName?: string;
  panelClassName?: string;
  disableOverlayClick?: boolean;
  pointerEventsNoneWhenClosing?: boolean;
  onEscape?: () => boolean;
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
  disableOverlayClick = false,
  pointerEventsNoneWhenClosing = true,
  onEscape,
}: ModalShellProps) {
  const {
    isClosing,
    isClosingRef,
    requestClose,
    resetCloseState,
    handlePanelAnimationEnd,
  } = useModalShell(onClose);

  useEffect(() => {
    if (!isOpen) return;

    resetCloseState();

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (onEscape?.()) return;
        requestClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onEscape, requestClose, resetCloseState]);

  if (!isOpen) return null;

  const animationClassName = isClosing ? 'modal-exit-responsive' : 'modal-enter-responsive';
  const panelClasses = [animationClassName, panelClassName].filter(Boolean).join(' ');
  const panelChildren =
    typeof children === 'function' ? children(requestClose) : children;

  if (variant === 'centered-scroll') {
    return (
      <div
        className={['fixed inset-0 overflow-y-auto scrollbar-hide', rootClassName]
          .filter(Boolean)
          .join(' ')}
        style={{ zIndex }}
        onClick={disableOverlayClick ? undefined : requestClose}
      >
        <div className="min-h-full sm:flex sm:items-center sm:justify-center">
          <div
            className={panelClasses}
            onClick={(event) => event.stopPropagation()}
            onAnimationEnd={handlePanelAnimationEnd}
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
        'fixed inset-0 flex items-end justify-center md:items-center',
        isClosing && pointerEventsNoneWhenClosing ? 'pointer-events-none' : '',
        rootClassName,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ zIndex }}
    >
      <div
        className={['absolute inset-0 bg-black/40', overlayClassName].filter(Boolean).join(' ')}
        onClick={disableOverlayClick ? undefined : requestClose}
      />

      <div
        className={panelClasses}
        onClick={(event) => event.stopPropagation()}
        onAnimationEnd={handlePanelAnimationEnd}
      >
        {panelChildren}
      </div>
    </div>
  );
}
