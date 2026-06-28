import { useMemo } from 'react';

import { getMealDayKey } from '../../../components/checkout/mealCalendarUtils';
import type { HomeMenuPlanConfig } from '../../types/account.types';
import {
  RescheduleCalendarGrid,
  RescheduleCalendarLegend,
  RescheduleCalendarWeekdays,
} from './RescheduleCalendarGrid';

type DeliveriesOverviewCalendarProps = {
  menuPlan: HomeMenuPlanConfig;
  scheduledDeliveryDates: string[];
};

function getTodayDateIso(): string {
  return getMealDayKey(new Date());
}

export function DeliveriesOverviewCalendar({
  menuPlan,
  scheduledDeliveryDates,
}: DeliveriesOverviewCalendarProps) {
  const sortedDates = useMemo(
    () => [...scheduledDeliveryDates].sort((left, right) => left.localeCompare(right)),
    [scheduledDeliveryDates],
  );

  const sourceDateIso = sortedDates[0] ?? getTodayDateIso();

  const calendarEndDateIso = useMemo(() => {
    if (sortedDates.length === 0) {
      return sourceDateIso;
    }

    return sortedDates.reduce((latest, dateIso) =>
      dateIso.localeCompare(latest) > 0 ? dateIso : latest,
    );
  }, [sortedDates, sourceDateIso]);

  return (
    <section
      className="account-reschedule-calendar account-reschedule-calendar--overview"
      aria-label="Delivery calendar"
    >
      <RescheduleCalendarLegend />
      <RescheduleCalendarWeekdays />

      <div className="account-reschedule-calendar__scroll-wrap">
        <div
          className="account-reschedule-calendar__scroll-fade account-reschedule-calendar__scroll-fade--top"
          aria-hidden
        />
        <RescheduleCalendarGrid
          mode="overview"
          menuPlan={menuPlan}
          sourceDateIso={sourceDateIso}
          scheduledDeliveryDates={sortedDates}
          calendarEndDateIso={calendarEndDateIso}
          scrollClassName="account-reschedule-calendar__scroll--preview"
        />
        <div
          className="account-reschedule-calendar__scroll-fade account-reschedule-calendar__scroll-fade--bottom"
          aria-hidden
        />
      </div>
    </section>
  );
}
