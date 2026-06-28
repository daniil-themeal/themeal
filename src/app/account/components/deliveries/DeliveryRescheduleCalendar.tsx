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

      <RescheduleCalendarGrid
        mode="pick"
        menuPlan={menuPlan}
        sourceDateIso={sourceDateIso}
        scheduledDeliveryDates={scheduledDeliveryDates}
        onSelectDate={onSelectDate}
      />
    </section>
  );
}
