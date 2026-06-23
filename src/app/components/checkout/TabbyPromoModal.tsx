import type { CSSProperties, WheelEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { COLOR_TOKENS } from '../common/colorTokens';
import { ModalCloseOverlay } from '../common/Modal';
import { ModalShell } from '../common/ModalShell';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import {
  CHECKOUT_MODAL_SHELL_PANEL_CLASSNAME,
  CHECKOUT_MODAL_SHELL_ROOT_CLASSNAME,
  CHECKOUT_ROOT_CLASSNAME,
} from './checkoutModalShellTokens';
import { LoaderIcon } from '../common/icons/feather/LoaderIcon';
import { getTabbyInstallmentsPopupUrl } from '../../config/tabbyConfig';

type TabbyPromoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  price: number;
};

/** Tabby installments popup width at desktop modal size. */
const TABBY_IFRAME_WIDTH_PX = 560;
/** Tabby popup document height at ~560px modal width. */
const TABBY_IFRAME_HEIGHT_DESKTOP_PX = 1375;
/** Tabby popup document height at full mobile width (~390px). */
const TABBY_IFRAME_HEIGHT_MOBILE_PX = 1415;
const TABBY_IFRAME_MOBILE_BREAKPOINT_PX = 640;
const TABBY_PRELOAD_TIMEOUT_MS = 12_000;

const TABBY_MODAL_INNER_CLASSNAME =
  'flex w-full min-w-0 flex-col bg-[var(--meal-detail-card-bg)] sm:rounded-[20px]';

function getTabbyIframeHeight() {
  if (typeof window === 'undefined') return TABBY_IFRAME_HEIGHT_DESKTOP_PX;
  return window.innerWidth < TABBY_IFRAME_MOBILE_BREAKPOINT_PX
    ? TABBY_IFRAME_HEIGHT_MOBILE_PX
    : TABBY_IFRAME_HEIGHT_DESKTOP_PX;
}

type TabbyModalCssVariables = CSSProperties & {
  '--meal-detail-card-bg': string;
  '--modal-border': string;
};

const tabbyModalStyle: TabbyModalCssVariables = {
  '--meal-detail-card-bg': COLOR_TOKENS.base.white,
  '--modal-border': COLOR_TOKENS.neutral[100],
};

function findScrollContainer(start: HTMLElement | null): HTMLElement | null {
  let node = start?.parentElement ?? null;

  while (node) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return node;
    }
    node = node.parentElement;
  }

  return null;
}

function handleWheelOverIframe(event: WheelEvent<HTMLDivElement>) {
  const scrollContainer = findScrollContainer(event.currentTarget);
  if (!scrollContainer) return;

  scrollContainer.scrollTop += event.deltaY;
  event.preventDefault();
}

function TabbyModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative flex h-[56px] w-full shrink-0 items-center justify-end border-b border-[var(--modal-border)] bg-[var(--meal-detail-card-bg)] sm:rounded-t-[20px]">
      <ModalCloseOverlay
        onClose={onClose}
        aria-label="Close"
        closeColors={{
          '--circular-close-bg': COLOR_TOKENS.neutral[50],
          '--circular-close-bg-hover': COLOR_TOKENS.neutral[75],
        }}
      />
    </div>
  );
}

function TabbyIframeFrame({ popupUrl, height }: { popupUrl: string; height: number }) {
  return (
    <div
      className="w-full min-w-0 touch-pan-y overflow-hidden"
      onWheel={handleWheelOverIframe}
    >
      <iframe
        key={popupUrl}
        src={popupUrl}
        title="Tabby payment options"
        scrolling="no"
        className="pointer-events-none block w-full border-0"
        style={{ height }}
      />
    </div>
  );
}

export function TabbyPromoModal({ isOpen, onClose, price }: TabbyPromoModalProps) {
  const popupUrl = useMemo(() => getTabbyInstallmentsPopupUrl(price), [price]);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(getTabbyIframeHeight);
  const isPreloading = isOpen && !isIframeLoaded;

  useEffect(() => {
    setIsIframeLoaded(false);
  }, [isOpen, popupUrl]);

  useEffect(() => {
    if (!isOpen) return;

    const syncIframeHeight = () => {
      setIframeHeight(getTabbyIframeHeight());
    };

    syncIframeHeight();
    window.addEventListener('resize', syncIframeHeight);

    return () => {
      window.removeEventListener('resize', syncIframeHeight);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isPreloading) return;

    const timer = window.setTimeout(() => {
      setIsIframeLoaded(true);
    }, TABBY_PRELOAD_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isPreloading, popupUrl]);

  if (!isOpen) return null;

  return createPortal(
    <ModalShell
      isOpen
      onClose={onClose}
      variant="fullscreen"
      zIndex={Z_INDEX_TOKENS.modal}
      rootClassName={`${CHECKOUT_ROOT_CLASSNAME} ${CHECKOUT_MODAL_SHELL_ROOT_CLASSNAME}`}
      panelClassName={CHECKOUT_MODAL_SHELL_PANEL_CLASSNAME}
    >
      {(requestClose) => (
        <div style={tabbyModalStyle} className={TABBY_MODAL_INNER_CLASSNAME}>
          <TabbyModalHeader onClose={requestClose} />

          {isPreloading ? (
            <div
              className="flex min-h-[240px] flex-col items-center justify-center"
              role="status"
              aria-label="Loading Tabby payment options"
            >
              <LoaderIcon size={24} className="animate-spin text-[var(--order-summary-muted)]" />
              <iframe
                src={popupUrl}
                title="Tabby payment options"
                tabIndex={-1}
                aria-hidden
                scrolling="no"
                onLoad={() => setIsIframeLoaded(true)}
                className="pointer-events-none fixed border-0 opacity-0"
                style={{
                  left: '-9999px',
                  top: 0,
                  width: TABBY_IFRAME_WIDTH_PX,
                  height: iframeHeight,
                }}
              />
            </div>
          ) : (
            <TabbyIframeFrame popupUrl={popupUrl} height={iframeHeight} />
          )}
        </div>
      )}
    </ModalShell>,
    document.body,
  );
}
