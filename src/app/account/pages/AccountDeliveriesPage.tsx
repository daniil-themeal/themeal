import { useMemo, useState } from 'react';

import { SystemMessage } from '../../components/common/SystemMessage';
import { AccountMealplanSwitcher } from '../components/AccountMealplanSwitcher';
import { DeliveriesList } from '../components/deliveries/DeliveriesList';
import { DeliveriesScopeTabs } from '../components/deliveries/DeliveriesScopeTabs';
import {
  DeliveryDetailSheet,
  type DeliveryDetailSheetView,
} from '../components/deliveries/DeliveryDetailSheet';
import { useAccountMockStore } from '../context/AccountMockStore';
import { useTransientMessage } from '../hooks/useTransientMessage';
import type { DeliveriesScope, DeliveryListEntry } from '../types/account.types';
import { buildDeliveryDetailData } from '../utils/buildDeliveryDetailData';
import { canRescheduleDelivery } from '../utils/applyDeliveryReschedule';

export function AccountDeliveriesPage() {
  const {
    mealplans,
    activePlan,
    activePlanIndex,
    activePersonIndex,
    setActivePlanIndex,
    rescheduleDelivery,
  } = useAccountMockStore();

  const [scope, setScope] = useState<DeliveriesScope>('next');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryListEntry | null>(null);
  const [sheetView, setSheetView] = useState<DeliveryDetailSheetView>('detail');
  const rescheduleSuccessMessage = useTransientMessage();

  const activePersonDeliveries =
    activePlan.deliveries.find((entry) => entry.personIndex === activePersonIndex) ??
    activePlan.deliveries[0];

  const deliveries =
    scope === 'next'
      ? activePersonDeliveries.nextDeliveries
      : activePersonDeliveries.previousDeliveries;

  const selectedDeliveryIndex = selectedDelivery
    ? deliveries.findIndex((delivery) => delivery.id === selectedDelivery.id)
    : -1;

  const deliveryDetail = useMemo(() => {
    if (!selectedDelivery || selectedDeliveryIndex < 0) {
      return null;
    }

    return buildDeliveryDetailData(selectedDelivery, activePlan.menuPlan, {
      deliveryIndex: selectedDeliveryIndex + 1,
      deliveryTotal: deliveries.length,
    });
  }, [activePlan.menuPlan, deliveries.length, selectedDelivery, selectedDeliveryIndex]);

  const scheduledDeliveryDates = useMemo(
    () => activePersonDeliveries.nextDeliveries.map((delivery) => delivery.dateIso),
    [activePersonDeliveries.nextDeliveries],
  );

  const handleCloseSheet = () => {
    setSelectedDelivery(null);
    setSheetView('detail');
  };

  const handleScopeChange = (nextScope: DeliveriesScope) => {
    setScope(nextScope);
    setSheetView('detail');
  };

  const canRescheduleSelectedDelivery =
    selectedDelivery != null && canRescheduleDelivery(selectedDelivery);

  const handleRescheduleConfirm = (targetDateIso: string) => {
    if (!selectedDelivery || !canRescheduleDelivery(selectedDelivery)) {
      return;
    }

    rescheduleDelivery({
      planIndex: activePlanIndex,
      personIndex: activePersonIndex,
      sourceDateIso: selectedDelivery.dateIso,
      targetDateIso,
    });

    setSelectedDelivery(null);
    setSheetView('detail');
    rescheduleSuccessMessage.show();
  };

  return (
    <div className="account-deliveries">
      <AccountMealplanSwitcher
        title={activePlan.mealplan.planTitle}
        planCount={mealplans.length}
        activePlanIndex={activePlanIndex}
        onPlanChange={setActivePlanIndex}
      />

      <div className="account-deliveries__body">
        {rescheduleSuccessMessage.isVisible ? (
          <div className="account-page-message">
            <SystemMessage variant="success">Delivery date successfully changed</SystemMessage>
          </div>
        ) : null}

        <DeliveriesScopeTabs value={scope} onChange={handleScopeChange} />
        <DeliveriesList deliveries={deliveries} onDeliveryClick={setSelectedDelivery} />
      </div>

      <DeliveryDetailSheet
        isOpen={selectedDelivery !== null}
        onClose={handleCloseSheet}
        detail={deliveryDetail}
        view={sheetView}
        scheduledDeliveryDates={scheduledDeliveryDates}
        onReschedule={
          canRescheduleSelectedDelivery ? () => setSheetView('reschedule') : undefined
        }
        onRescheduleConfirm={handleRescheduleConfirm}
      />
    </div>
  );
}
