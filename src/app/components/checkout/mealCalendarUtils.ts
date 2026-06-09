import type { DayOption, Duration } from '../../data/checkoutPricing';

export const MONTH_ABBR = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export const WEEKDAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export type MealDayRadiusPosition = 'start' | 'end' | 'single';

export function addDays(date: Date, days: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getUpcomingDeliveryDates(withinDays = 60): Date[] {
  const dates: Date[] = [];
  const start = addDays(new Date(), 2);
  start.setHours(0, 0, 0, 0);

  const end = addDays(start, withinDays);
  const cursor = new Date(start);

  while (cursor < end) {
    const dayOfWeek = cursor.getDay();
    if (dayOfWeek === 3 || dayOfWeek === 0) dates.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export function getSubscriptionDays(duration: Duration): number {
  if (duration === 'weekly') return 7;
  if (duration === 'monthly') return 28;
  return 56;
}

export function getCalendarWeeks(startDate: Date, duration: Duration): Date[][] {
  const totalDays = getSubscriptionDays(duration);
  const dayOfWeek = startDate.getDay();
  const daysBack = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = addDays(startDate, -daysBack);
  const weeksCount = Math.min(Math.ceil((totalDays + daysBack) / 7) + 1, 8);

  const weeks: Date[][] = [];
  const cursor = new Date(monday);

  for (let weekIndex = 0; weekIndex < weeksCount; weekIndex += 1) {
    const week: Date[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
}

export function isInPeriod(date: Date, start: Date, end: Date): boolean {
  return date >= start && date < end;
}

export function isMealDay(date: Date, days: DayOption): boolean {
  const dayOfWeek = date.getDay();

  if (days === 'weekdays') return dayOfWeek >= 1 && dayOfWeek <= 5;
  if (days === 'weekdays+sat') return dayOfWeek >= 1 && dayOfWeek <= 6;

  return true;
}

export function isDeliveryDay(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 3 || dayOfWeek === 0;
}

export function isSubscriptionMealDay({
  date,
  startDate,
  endDate,
  dayOption,
}: {
  date: Date;
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
}) {
  return isInPeriod(date, startDate, endDate) && isMealDay(date, dayOption);
}

export function getMealDayRadiusByIndex({
  week,
  startDate,
  endDate,
  dayOption,
}: {
  week: Date[];
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
}) {
  const mealDayIndices = week
    .map((date, index) =>
      isSubscriptionMealDay({ date, startDate, endDate, dayOption }) ? index : -1,
    )
    .filter((index) => index >= 0);

  const radiusByIndex: Array<MealDayRadiusPosition | null> = week.map(() => null);

  if (mealDayIndices.length === 1) {
    radiusByIndex[mealDayIndices[0]] = 'single';
    return radiusByIndex;
  }

  if (mealDayIndices.length > 1) {
    radiusByIndex[mealDayIndices[0]] = 'start';
    radiusByIndex[mealDayIndices[mealDayIndices.length - 1]] = 'end';
  }

  return radiusByIndex;
}

export function getMealDayRadiusClassName(position: MealDayRadiusPosition | null) {
  if (position === 'start') {
    return 'rounded-l-[8px]';
  }

  if (position === 'end') {
    return 'rounded-r-[8px]';
  }

  if (position === 'single') {
    return 'rounded-l-[8px] rounded-r-[8px]';
  }

  return '';
}
