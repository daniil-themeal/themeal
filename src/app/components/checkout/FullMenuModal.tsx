import { useRef, useState } from 'react';

import type { Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';
import { ModalShell } from '../common/ModalShell';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import { XIcon } from '../common/icons';
import { iconColorClassName, iconColorStyle } from '../common/iconColorTokens';
import {
  FullMenuPanel,
  fullMenuPanelStyle,
  getFullMenuModalPanelStyle,
  type FullMenuPanelHandle,
} from './FullMenuPanel';

export function FullMenuModal({
  isOpen,
  onClose,
  plan,
  lightMealOption,
  onPlanChange,
  onLightMealOptionChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
  lightMealOption: LightMealOption;
  onPlanChange: (plan: Plan) => void;
  onLightMealOptionChange: (option: LightMealOption) => void;
}) {
  const panelRef = useRef<FullMenuPanelHandle>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mealDetailOpen, setMealDetailOpen] = useState(false);

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      variant="bottom-sheet"
      zIndex={Z_INDEX_TOKENS.overlay}
      panelStyle={getFullMenuModalPanelStyle()}
      swipeScrollContainerRef={scrollContainerRef}
      overlayClassName={mealDetailOpen ? 'pointer-events-none opacity-0' : ''}
      panelClassName={[
        'relative flex max-h-[88svh] w-full flex-col overflow-hidden rounded-t-[20px] bg-white shadow-2xl transition-opacity duration-150',
        'md:mx-[24px] md:w-[length:var(--full-menu-modal-width)] md:max-w-[calc(100vw-48px)] md:max-h-[85vh] md:rounded-[20px]',
        mealDetailOpen ? 'invisible opacity-0' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onEscape={() => panelRef.current?.closeMealDetail() ?? false}
    >
      {(requestClose) => (
        <div style={fullMenuPanelStyle} className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <button
            type="button"
            onClick={requestClose}
            className="group absolute top-0 right-0 z-10 flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
            aria-label="Close"
          >
            <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--full-menu-close-bg)] transition-colors duration-150 group-hover:bg-[var(--full-menu-close-bg-hover)]">
              <span className={iconColorClassName.emphasis} style={iconColorStyle.emphasis}>
                <XIcon size={16} />
              </span>
            </span>
          </button>

          <FullMenuPanel
            ref={panelRef}
            scrollContainerRef={scrollContainerRef}
            variant="modal"
            isActive={isOpen}
            plan={plan}
            lightMealOption={lightMealOption}
            onPlanChange={onPlanChange}
            onLightMealOptionChange={onLightMealOptionChange}
            onMealDetailOpenChange={setMealDetailOpen}
            className="min-h-0 flex-1"
          />
        </div>
      )}
    </ModalShell>
  );
}
