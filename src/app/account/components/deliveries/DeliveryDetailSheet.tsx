import { FullMenuPanel } from '../../../components/checkout/FullMenuPanel';
import { ModalShell } from '../../../components/common/ModalShell';
import { Z_INDEX_TOKENS } from '../../../components/common/zIndexTokens';
import type { DeliveryDetailData } from '../../types/account.types';
import { DeliveryDetailLogistics } from './DeliveryDetailLogistics';
import { DeliveryRescheduleFlow } from './DeliveryRescheduleFlow';

export type DeliveryDetailSheetView = 'detail' | 'reschedule';

type DeliveryDetailSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  detail: DeliveryDetailData | null;
  view?: DeliveryDetailSheetView;
  scheduledDeliveryDates?: string[];
  onReschedule?: () => void;
  onRescheduleConfirm?: (dateIso: string) => void;
};

export function DeliveryDetailSheet({
  isOpen,
  onClose,
  detail,
  view = 'detail',
  scheduledDeliveryDates = [],
  onReschedule,
  onRescheduleConfirm,
}: DeliveryDetailSheetProps) {
  const isRescheduleView = view === 'reschedule';

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      variant="bottom-sheet"
      zIndex={Z_INDEX_TOKENS.overlay}
      panelClassName={[
        'account-delivery-sheet__panel',
        isRescheduleView ? 'account-delivery-sheet__panel--reschedule' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      sheetVerticalAlign="bottom"
    >
      {() =>
        detail ? (
          <div
            className={[
              'account-delivery-sheet',
              isRescheduleView ? 'account-delivery-sheet--reschedule' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="account-delivery-sheet__handle-wrap" aria-hidden>
              <span className="account-delivery-sheet__handle" />
            </div>

            {isRescheduleView ? (
              <DeliveryRescheduleFlow
                menuPlan={detail.menuPlan}
                sourceDateIso={detail.dateIso}
                scheduledDeliveryDates={scheduledDeliveryDates}
                onConfirm={(dateIso) => onRescheduleConfirm?.(dateIso)}
                resetKey={isOpen ? detail.dateIso : 'closed'}
              />
            ) : (
              <div className="account-delivery-sheet__scroll">
                <DeliveryDetailLogistics detail={detail} onReschedule={onReschedule} />

                <section className="account-delivery-sheet__menu" aria-label="Menu">
                  <FullMenuPanel
                    variant="embedded"
                    isActive={isOpen}
                    plan={detail.menuPlan.plan}
                    lightMealOption={detail.menuPlan.lightMealOption}
                    days={detail.menuPlan.days}
                    duration={detail.menuPlan.duration}
                    menuDays={detail.menuDays}
                    showRateMealsButton={!detail.canEditLogistics}
                  />
                </section>
              </div>
            )}
          </div>
        ) : null
      }
    </ModalShell>
  );
}
