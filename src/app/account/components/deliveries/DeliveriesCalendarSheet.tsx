import { createPortal } from 'react-dom';

import { ModalShell } from '../../../components/common/ModalShell';
import { Z_INDEX_TOKENS } from '../../../components/common/zIndexTokens';
import { useAccountOverlayScrollLock } from '../../hooks/useAccountOverlayScrollLock';
import type { HomeMenuPlanConfig } from '../../types/account.types';
import { DeliveriesOverviewCalendar } from './DeliveriesOverviewCalendar';

type DeliveriesCalendarSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  menuPlan: HomeMenuPlanConfig;
  scheduledDeliveryDates: string[];
};

export function DeliveriesCalendarSheet({
  isOpen,
  onClose,
  menuPlan,
  scheduledDeliveryDates,
}: DeliveriesCalendarSheetProps) {
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

          <div className="account-delivery-sheet__reschedule-body">
            <DeliveriesOverviewCalendar
              menuPlan={menuPlan}
              scheduledDeliveryDates={scheduledDeliveryDates}
            />
          </div>
        </div>
      )}
    </ModalShell>,
    document.body,
  );
}
