import { useRef, useState } from 'react';



import type { Plan } from '../../data/checkoutPricing';

import type { LightMealOption } from '../../data/testMeals';

import { ModalShell } from '../common/ModalShell';

import { Z_INDEX_TOKENS } from '../common/zIndexTokens';

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

}: {

  isOpen: boolean;

  onClose: () => void;

  plan: Plan;

  lightMealOption: LightMealOption;

}) {

  const panelRef = useRef<FullMenuPanelHandle>(null);

  const [mealDetailOpen, setMealDetailOpen] = useState(false);



  return (

    <ModalShell

      isOpen={isOpen}

      onClose={onClose}

      variant="bottom-sheet"

      zIndex={Z_INDEX_TOKENS.overlay}

      panelStyle={getFullMenuModalPanelStyle()}

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

          <FullMenuPanel

            ref={panelRef}

            variant="modal"

            isActive={isOpen}

            plan={plan}

            lightMealOption={lightMealOption}

            onRequestClose={requestClose}

            onMealDetailOpenChange={setMealDetailOpen}

            className="min-h-0 flex-1"

          />

        </div>

      )}

    </ModalShell>

  );

}

