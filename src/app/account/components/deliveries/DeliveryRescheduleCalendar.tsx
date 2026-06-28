import type { HomeMenuPlanConfig } from '../../types/account.types';
import {
  RescheduleCalendarGrid,
  RescheduleCalendarLegend,
  RescheduleCalendarWeekdays,
} from './RescheduleCalendarGrid';

type DeliveryRescheduleCalendarProps = {
  menuPlan: HomeMenuPlanConfig;
  sourceDateIso: string;
  scheduledDeliveryDates: string[];
  onSelectDate: (dateIso: string) => void;
};

export function DeliveryRescheduleCalendar({
  menuPlan,
  sourceDateIso,
  scheduledDeliveryDates,
  onSelectDate,
}: DeliveryRescheduleCalendarProps) {
  return (
    <section className="account-reschedule-calendar" aria-label="Choose day to move delivery">
      <h2 className="account-reschedule-calendar__title">Choose day to move delivery</h2>

      <RescheduleCalendarLegend />
      <RescheduleCalendarWeekdays />

      <div className="account-reschedule-calendar__scroll-wrap">
        <div
          className="account-reschedule-calendar__scroll-fade account-reschedule-calendar__scroll-fade--top"
          aria-hidden
        />
        <RescheduleCalendarGrid
          mode="pick"
          menuPlan={menuPlan}
          sourceDateIso={sourceDateIso}
          scheduledDeliveryDates={scheduledDeliveryDates}
          onSelectDate={onSelectDate}
        />
        <div
          className="account-reschedule-calendar__scroll-fade account-reschedule-calendar__scroll-fade--bottom"
          aria-hidden
        />
      </div>
    </section>
  );
}
