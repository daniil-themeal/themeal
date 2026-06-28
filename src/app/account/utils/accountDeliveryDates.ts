import { addDays, getMealDayKey, MONDAY, THURSDAY } from '../../components/checkout/mealCalendarUtils';
import type { DayOption } from '../../data/checkoutPricing';

function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

export function isAccountDeliveryDay(date: Date, dayOption: DayOption): boolean {
  const dayOfWeek = date.getDay();

  if (dayOption === 'weekdays') {
    return dayOfWeek === MONDAY || dayOfWeek === THURSDAY;
  }

  if (dayOption === 'weekdays+sat') {
    return dayOfWeek === MONDAY || dayOfWeek === THURSDAY || dayOfWeek === 6;
  }

  return dayOfWeek === MONDAY || dayOfWeek === THURSDAY || dayOfWeek === 6 || dayOfWeek === 0;
}

export function getUpcomingDeliveryDatesForDayOption(
  withinDays = 60,
  dayOption: DayOption,
  startOffsetDays = 2,
): Date[] {
  const dates: Date[] = [];
  const start = normalizeDate(addDays(new Date(), startOffsetDays));
  const end = addDays(start, withinDays);
  const cursor = new Date(start);

  while (cursor < end) {
    if (isAccountDeliveryDay(cursor, dayOption)) {
      dates.push(new Date(cursor));
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export function getPastDeliveryDatesForDayOption(count: number, dayOption: DayOption): Date[] {
  const dates: Date[] = [];
  const cursor = normalizeDate(addDays(new Date(), -1));

  while (dates.length < count) {
    if (isAccountDeliveryDay(cursor, dayOption)) {
      dates.push(new Date(cursor));
    }

    cursor.setDate(cursor.getDate() - 1);
  }

  return dates.reverse();
}

export function getNextAccountDeliveryDateIsoAfter(
  dateIso: string,
  dayOption: DayOption,
): string {
  let cursor = normalizeDate(addDays(new Date(`${dateIso}T00:00:00`), 1));

  for (let step = 0; step < 14; step += 1) {
    if (isAccountDeliveryDay(cursor, dayOption)) {
      return getMealDayKey(cursor);
    }

    cursor = addDays(cursor, 1);
  }

  return getMealDayKey(cursor);
}
