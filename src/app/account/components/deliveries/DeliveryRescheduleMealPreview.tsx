import { useMemo } from 'react';

import { MONTH_ABBR } from '../../../components/checkout/mealCalendarUtils';
import type { HomeMenuPlanConfig } from '../../types/account.types';
import { previewScheduledDates } from '../../utils/previewDeliveryRescheduleDates';
import {
  RescheduleCalendarGrid,
  RescheduleCalendarLegend,
  RescheduleCalendarWeekdays,
} from './RescheduleCalendarGrid';

type DeliveryRescheduleMealPreviewProps = {
  menuPlan: HomeMenuPlanConfig;
  sourceDateIso: string;
  targetDateIso: string;
  scheduledDeliveryDates: string[];
};

export function DeliveryRescheduleMealPreview({
  menuPlan,
  sourceDateIso,
  targetDateIso,
  scheduledDeliveryDates,
}: DeliveryRescheduleMealPreviewProps) {
  const previewDeliveryDates = useMemo(
    () => previewScheduledDates(scheduledDeliveryDates, sourceDateIso, targetDateIso, menuPlan.days),
    [menuPlan.days, scheduledDeliveryDates, sourceDateIso, targetDateIso],
  );

  const calendarEndDateIso = useMemo(() => {
    if (previewDeliveryDates.length === 0) {
      return targetDateIso;
    }

    return previewDeliveryDates.reduce((latest, dateIso) =>
      dateIso.localeCompare(latest) > 0 ? dateIso : latest,
    );
  }, [previewDeliveryDates, targetDateIso]);

  const targetDate = new Date(`${targetDateIso}T00:00:00`);
  const targetLabel = `${targetDate.getDate()} ${MONTH_ABBR[targetDate.getMonth()]}`;

  return (
    <section
      className="account-reschedule-calendar account-reschedule-calendar--with-footer"
      aria-label="Review your meal plan"
    >
      <h2 className="account-reschedule-calendar__title">Review your meal plan</h2>
      <p className="account-reschedule-calendar__subtitle">
        Delivery moves to {targetLabel}
      </p>

      <RescheduleCalendarLegend />
      <RescheduleCalendarWeekdays />

      <div className="account-reschedule-calendar__scroll-wrap">
        <div
          className="account-reschedule-calendar__scroll-fade account-reschedule-calendar__scroll-fade--top"
          aria-hidden
        />
        <RescheduleCalendarGrid
          mode="preview"
          menuPlan={menuPlan}
          sourceDateIso={sourceDateIso}
          targetDateIso={targetDateIso}
          scheduledDeliveryDates={previewDeliveryDates}
          calendarEndDateIso={calendarEndDateIso}
          scrollClassName="account-reschedule-calendar__scroll--with-footer account-reschedule-calendar__scroll--preview"
        />
        <div
          className="account-reschedule-calendar__scroll-fade account-reschedule-calendar__scroll-fade--bottom"
          aria-hidden
        />
      </div>
    </section>
  );
}
