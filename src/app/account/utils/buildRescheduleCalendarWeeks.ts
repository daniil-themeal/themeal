import {
  addDays,
  MONTH_ABBR,
  WEEKDAY_SHORT,
} from '../../components/checkout/mealCalendarUtils';

export { WEEKDAY_SHORT };

export type RescheduleCalendarSection = {
  monthLabel: string | null;
  week: Date[];
};

function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

function getMondayOnOrBefore(date: Date): Date {
  const normalized = normalizeDate(date);
  const dayOfWeek = normalized.getDay();
  const daysBack = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  return addDays(normalized, -daysBack);
}

function getSundayOnOrAfter(date: Date): Date {
  const normalized = normalizeDate(date);
  const dayOfWeek = normalized.getDay();
  const daysForward = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

  return addDays(normalized, daysForward);
}

export function getRescheduleCalendarWeeks(start: Date, end: Date): Date[][] {
  const cursor = getMondayOnOrBefore(start);
  const lastDay = getSundayOnOrAfter(end);
  const weeks: Date[][] = [];

  while (cursor <= lastDay) {
    const week: Date[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
}

export function getRescheduleCalendarRange(
  sourceDateIso: string,
  endDateIso?: string,
): { start: Date; end: Date } {
  const source = new Date(`${sourceDateIso}T00:00:00`);
  const start = normalizeDate(new Date(source.getFullYear(), source.getMonth(), 1));
  let end = normalizeDate(new Date(source.getFullYear(), source.getMonth() + 3, 0));

  if (endDateIso) {
    const extendedEnd = normalizeDate(new Date(`${endDateIso}T00:00:00`));

    if (extendedEnd > end) {
      end = getSundayOnOrAfter(extendedEnd);
    }
  }

  return { start, end };
}

export function getRescheduleCalendarSections(
  sourceDateIso: string,
  endDateIso?: string,
): RescheduleCalendarSection[] {
  const { start, end } = getRescheduleCalendarRange(sourceDateIso, endDateIso);
  const weeks = getRescheduleCalendarWeeks(start, end);
  let previousMonth: number | null = null;

  return weeks.map((week) => {
    const monday = week[0];
    const monthLabel =
      monday.getMonth() !== previousMonth ? MONTH_ABBR[monday.getMonth()] : null;
    previousMonth = monday.getMonth();

    return { monthLabel, week };
  });
}

export function isDateInRescheduleRange(
  date: Date,
  sourceDateIso: string,
  endDateIso?: string,
): boolean {
  const { start, end } = getRescheduleCalendarRange(sourceDateIso, endDateIso);
  const normalized = normalizeDate(date);

  return normalized >= start && normalized <= end;
}
