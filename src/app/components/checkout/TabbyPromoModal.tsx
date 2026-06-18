import { ModalShell } from '../common/ModalShell';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import { XIcon } from '../common/icons';
import { iconColorClassName, iconColorStyle } from '../common/iconColorTokens';

type TabbyPromoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  price: number;
};

export function TabbyPromoModal({ isOpen, onClose }: TabbyPromoModalProps) {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      variant="centered-scroll"
      zIndex={Z_INDEX_TOKENS.modal}
      rootClassName="bg-black/40 px-[16px] py-[24px] sm:px-[24px]"
      panelClassName="flex w-full max-w-[400px] flex-col overflow-hidden rounded-[16px] bg-white shadow-2xl"
    >
      {(requestClose) => (
        <div className="flex min-h-[240px] flex-col">
          <div className="flex shrink-0 items-center justify-end px-[12px] py-[8px]">
            <button
              type="button"
              onClick={requestClose}
              className="flex size-[40px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f9fafb] transition-colors hover:bg-[#f3f4f6]"
              aria-label="Close"
            >
              <XIcon size={20} className={iconColorClassName} style={iconColorStyle('neutral', 500)} />
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
}
