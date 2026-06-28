import { createPortal } from 'react-dom';

import { ModalShell } from '../../../components/common/ModalShell';
import { Z_INDEX_TOKENS } from '../../../components/common/zIndexTokens';
import { useAccountOverlayScrollLock } from '../../hooks/useAccountOverlayScrollLock';
import type { HomeMenuPlanConfig } from '../../types/account.types';
import { DeliveryRescheduleFlow } from './DeliveryRescheduleFlow';

type DeliveryRescheduleSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  menuPlan: HomeMenuPlanConfig;
  sourceDateIso: string;
  scheduledDeliveryDates: string[];
  onConfirm: (targetDateIso: string) => void;
};

export function DeliveryRescheduleSheet({
  isOpen,
  onClose,
  menuPlan,
  sourceDateIso,
  scheduledDeliveryDates,
  onConfirm,
}: DeliveryRescheduleSheetProps) {
  useAccountOverlayScrollLock(isOpen);

  return createPortal(
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      variant="bottom-sheet"
      sheetVerticalAlign="center-on-md"
      zIndex={Z_INDEX_TOKENS.overlay}
      panelClassName="account-delivery-sheet__panel account-delivery-sheet__panel--reschedule"
    >
      {() => (
        <div className="account-delivery-sheet account-delivery-sheet--reschedule">
          <div className="account-delivery-sheet__handle-wrap" aria-hidden>
            <span className="account-delivery-sheet__handle" />
          </div>

          <DeliveryRescheduleFlow
            menuPlan={menuPlan}
            sourceDateIso={sourceDateIso}
            scheduledDeliveryDates={scheduledDeliveryDates}
            onConfirm={onConfirm}
            resetKey={isOpen ? sourceDateIso : 'closed'}
          />
        </div>
      )}
    </ModalShell>,
    document.body,
  );
}
