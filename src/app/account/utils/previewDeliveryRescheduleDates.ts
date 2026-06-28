import type { DayOption } from '../../data/checkoutPricing';
import { buildForwardCascadeDates } from './applyDeliveryReschedule';

export function previewScheduledDates(
  dates: string[],
  sourceDateIso: string,
  targetDateIso: string,
  dayOption: DayOption,
): string[] {
  const sortedDates = [...dates].sort((left, right) => left.localeCompare(right));

  return (
    buildForwardCascadeDates(sortedDates, sourceDateIso, targetDateIso, dayOption) ?? sortedDates
  );
}
