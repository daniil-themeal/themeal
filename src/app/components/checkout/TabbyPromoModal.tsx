import { useMemo, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';

import { ModalShell } from '../common/ModalShell';
import { COLOR_TOKENS } from '../common/colorTokens';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import { XIcon } from '../common/icons';
import { iconColorClassName, iconColorStyle } from '../common/iconColorTokens';
import { getTabbyInstallmentsPopupUrl } from '../../config/tabbyConfig';

type TabbyPromoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  price: number;
};

const tabbyModalStyle = {
  '--tabby-modal-close-bg': COLOR_TOKENS.neutral[50],
  '--tabby-modal-close-bg-hover': COLOR_TOKENS.neutral[75],
} as CSSProperties;

/** Tabby installments popup height at modal width (~560px). */
const TABBY_IFRAME_HEIGHT_PX = 1370;

export function TabbyPromoModal({ isOpen, onClose, price }: TabbyPromoModalProps) {
  const popupUrl = useMemo(() => getTabbyInstallmentsPopupUrl(price), [price]);

  return createPortal(
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      variant="fullscreen"
      zIndex={Z_INDEX_TOKENS.modal}
      rootClassName="bg-white pb-[env(safe-area-inset-bottom)] sm:bg-black/40 sm:p-[24px]"
      panelClassName="w-full bg-white sm:max-w-[clamp(480px,calc(480px+(100vw-48rem)*80/448),560px)] sm:overflow-hidden sm:rounded-[20px] sm:shadow-2xl"
    >
      {(requestClose) => (
        <div
          style={tabbyModalStyle}
          className="flex flex-col bg-white sm:overflow-hidden sm:rounded-[20px]"
          role="dialog"
          aria-modal="true"
          aria-label="Tabby payment options"
        >
          <div className="relative flex h-[56px] shrink-0 items-center justify-end bg-white sm:rounded-t-[20px]">
            <button
              type="button"
              onClick={requestClose}
              className="group absolute top-0 right-0 z-10 flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
              aria-label="Close"
            >
              <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--tabby-modal-close-bg)] transition-colors duration-150 group-hover:bg-[var(--tabby-modal-close-bg-hover)]">
                <span className={iconColorClassName.emphasis} style={iconColorStyle.emphasis}>
                  <XIcon size={16} />
                </span>
              </span>
            </button>
          </div>

          <div className="overflow-hidden">
            <iframe
              src={popupUrl}
              title="Tabby payment options"
              className="block w-full border-0"
              style={{ height: TABBY_IFRAME_HEIGHT_PX }}
              scrolling="no"
            />
          </div>
        </div>
      )}
    </ModalShell>,
    document.body,
  );
}
