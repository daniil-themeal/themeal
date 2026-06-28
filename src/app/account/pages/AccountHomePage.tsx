import { useMemo, useState } from 'react';

import { SystemMessage } from '../../components/common/SystemMessage';
import { CheckIcon } from '../../components/common/icons/feather/CheckIcon';
import { AccountMealplanSwitcher } from '../components/AccountMealplanSwitcher';
import { DeliveryRescheduleSheet } from '../components/deliveries/DeliveryRescheduleSheet';
import { HomePlanBlock } from '../components/home/HomePlanBlock';
import { HomePromoCarousel } from '../components/home/HomePromoCarousel';
import { AccountPageMessage } from '../components/shared/AccountPageMessage';
import { useAccountMockStore } from '../context/AccountMockStore';
import { useTransientMessage } from '../hooks/useTransientMessage';
import {
  buildDeliveryMenuDays,
  homeDeliveryFromListEntry,
} from '../utils/buildHomeScreenData';

export function AccountHomePage() {
  const {
    promos,
    mealplans,
    activePlan,
    activePlanIndex,
    activePersonIndex,
    setActivePlanIndex,
    rescheduleDelivery,
  } = useAccountMockStore();

  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const rescheduleSuccessMessage = useTransientMessage();

  const activePerson =
    activePlan.persons.find((person) => person.personIndex === activePersonIndex) ??
    activePlan.persons[0];

  const activePersonDeliveries =
    activePlan.deliveries.find((entry) => entry.personIndex === activePersonIndex) ??
    activePlan.deliveries[0];

  const nearestDeliveryEntry = activePersonDeliveries.nextDeliveries[0];

  const nearestDelivery = useMemo(() => {
    if (!nearestDeliveryEntry) {
      return activePerson.delivery;
    }

    return homeDeliveryFromListEntry(nearestDeliveryEntry, activePlan.menuPlan, {
      index: 1,
      total: activePersonDeliveries.nextDeliveries.length,
      leaveAtDoor: activePerson.delivery.leaveAtDoor,
    });
  }, [
    activePerson.delivery,
    activePersonDeliveries.nextDeliveries,
    activePlan.menuPlan,
    nearestDeliveryEntry,
  ]);

  const nearestMenuDays = useMemo(
    () => buildDeliveryMenuDays(activePlan.menuPlan, nearestDelivery),
    [activePlan.menuPlan, nearestDelivery],
  );

  const scheduledDeliveryDates = useMemo(
    () => activePersonDeliveries.nextDeliveries.map((delivery) => delivery.dateIso),
    [activePersonDeliveries.nextDeliveries],
  );

  const handleRescheduleConfirm = (targetDateIso: string) => {
    rescheduleDelivery({
      planIndex: activePlanIndex,
      personIndex: activePersonIndex,
      sourceDateIso: nearestDelivery.dateIso,
      targetDateIso,
    });
    setIsRescheduleOpen(false);
    rescheduleSuccessMessage.show();
  };

  return (
    <div className="account-home">
      <HomePromoCarousel banners={promos} />
      <div className="account-home__plan-wrap">
        <AccountMealplanSwitcher
          title={activePlan.mealplan.planTitle}
          planCount={mealplans.length}
          activePlanIndex={activePlanIndex}
          onPlanChange={setActivePlanIndex}
        />
        <HomePlanBlock
          plan={activePlan.plan}
          delivery={nearestDelivery}
          menuPlan={activePlan.menuPlan}
          menuDays={nearestMenuDays}
          onReschedule={() => setIsRescheduleOpen(true)}
        />
      </div>

      <DeliveryRescheduleSheet
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        menuPlan={activePlan.menuPlan}
        sourceDateIso={nearestDelivery.dateIso}
        scheduledDeliveryDates={scheduledDeliveryDates}
        onConfirm={handleRescheduleConfirm}
      />

      <AccountPageMessage isVisible={rescheduleSuccessMessage.isVisible}>
        <SystemMessage
          variant="success"
          className="account-page-message__banner"
          icon={<CheckIcon size={20} />}
        >
          Delivery date successfully changed
        </SystemMessage>
      </AccountPageMessage>
    </div>
  );
}
