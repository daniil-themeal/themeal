import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { Modal, ModalCloseOverlay } from '../common/Modal';
import { useEscapeLayer } from '../common/escapeStack';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import { CHECKOUT_ROOT_CLASSNAME } from './checkoutModalShellTokens';
import { LoaderIcon } from '../common/icons/feather/LoaderIcon';
import { getTabbyInstallmentsPopupUrl } from '../../config/tabbyConfig';

type TabbyPromoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  price: number;
};

/** Tabby installments popup width at desktop modal size. */
const TABBY_IFRAME_WIDTH_PX = 560;
/** Tabby installments popup height at modal width (~560px). */
const TABBY_IFRAME_HEIGHT_PX = 1370;
const TABBY_PRELOAD_TIMEOUT_MS = 12_000;

export function TabbyPromoModal({ isOpen, onClose, price }: TabbyPromoModalProps) {
  const popupUrl = useMemo(() => getTabbyInstallmentsPopupUrl(price), [price]);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const isPreloading = isOpen && !isIframeLoaded;

  useEffect(() => {
    setIsIframeLoaded(false);
  }, [isOpen, popupUrl]);

  useEffect(() => {
    if (!isPreloading) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isPreloading]);

  useEffect(() => {
    if (!isPreloading) return;

    const timer = window.setTimeout(() => {
      setIsIframeLoaded(true);
    }, TABBY_PRELOAD_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isPreloading, popupUrl]);

  useEscapeLayer(isPreloading, Z_INDEX_TOKENS.modal, onClose);

  if (!isOpen) return null;

  if (isPreloading) {
    return createPortal(
      <div
        className={`${CHECKOUT_ROOT_CLASSNAME} fixed inset-0 flex items-center justify-center bg-black/40 modal-overlay-enter`}
        style={{ zIndex: Z_INDEX_TOKENS.modal }}
        onClick={onClose}
      >
        <div className="flex items-center justify-center" role="status" aria-label="Loading Tabby payment options">
          <LoaderIcon size={24} className="animate-spin text-white" />
        </div>
        <iframe
          src={popupUrl}
          title="Tabby payment options"
          tabIndex={-1}
          aria-hidden
          onLoad={() => setIsIframeLoaded(true)}
          className="pointer-events-none fixed border-0 opacity-0"
          style={{
            left: '-9999px',
            top: 0,
            width: TABBY_IFRAME_WIDTH_PX,
            height: TABBY_IFRAME_HEIGHT_PX,
          }}
        />
      </div>,
      document.body,
    );
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      ariaLabel="Tabby payment options"
      showHeader={false}
      variant="bottom-sheet"
      sheetVerticalAlign="center-on-sm"
      zIndex={Z_INDEX_TOKENS.modal}
      rootClassName={CHECKOUT_ROOT_CLASSNAME}
      panelClassName={[
        'relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl',
        'sm:mx-[24px] sm:h-auto sm:max-h-[92svh] sm:max-w-[clamp(480px,calc(480px+(100vw-48rem)*80/448),560px)] sm:rounded-[20px]',
      ].join(' ')}
      innerClassName="max-sm:rounded-none sm:rounded-[20px]"
      bodyClassName="min-h-0 flex-1 overflow-y-auto"
    >
      {(requestClose) => (
        <>
          <div className="relative flex h-[56px] shrink-0 items-center justify-end bg-white max-sm:rounded-none sm:rounded-t-[20px]">
            <ModalCloseOverlay onClose={requestClose} aria-label="Close" />
          </div>

          <iframe
            key={popupUrl}
            src={popupUrl}
            title="Tabby payment options"
            className="block w-full border-0"
            style={{ height: TABBY_IFRAME_HEIGHT_PX }}
            scrolling="no"
          />
        </>
      )}
    </Modal>
  );
}
