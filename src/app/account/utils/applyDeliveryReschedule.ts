import { addDays, getMealDayKey, MONTH_ABBR } from '../../components/checkout/mealCalendarUtils';
import type { DayOption } from '../../data/checkoutPricing';
import type { DeliveryListEntry, HomeDelivery } from '../types/account.types';
import { getNextAccountDeliveryDateIsoAfter, isAccountDeliveryDay } from './accountDeliveryDates';

const WEEKDAY_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

const FREE_SLOT_SCAN_LIMIT_DAYS = 120;

function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

export function isRescheduleEligibleTarget(targetDateIso: string, today = new Date()): boolean {
  const target = new Date(`${targetDateIso}T00:00:00`);
  const minDate = addDays(normalizeDate(today), 1);

  return normalizeDate(target) >= minDate;
}

function sortScheduledDeliveryDates(scheduledDeliveryDates: string[]): string[] {
  return [...scheduledDeliveryDates].sort((left, right) => left.localeCompare(right));
}

export function getPreviousScheduledDeliveryDateIso(
  scheduledDeliveryDates: string[],
  sourceDateIso: string,
): string | null {
  const sortedDates = sortScheduledDeliveryDates(scheduledDeliveryDates);
  const sourceIndex = sortedDates.indexOf(sourceDateIso);

  if (sourceIndex <= 0) {
    return null;
  }

  return sortedDates[sourceIndex - 1] ?? null;
}

export function getNextScheduledDeliveryDateIso(
  scheduledDeliveryDates: string[],
  sourceDateIso: string,
): string | null {
  const sortedDates = sortScheduledDeliveryDates(scheduledDeliveryDates);
  const sourceIndex = sortedDates.indexOf(sourceDateIso);

  if (sourceIndex < 0 || sourceIndex >= sortedDates.length - 1) {
    return null;
  }

  return sortedDates[sourceIndex + 1] ?? null;
}

export function getFreeDeliverySlotsBetweenNeighbors(
  scheduledDeliveryDates: string[],
  sourceDateIso: string,
  dayOption: DayOption,
  today = new Date(),
): string[] {
  const sortedDates = sortScheduledDeliveryDates(scheduledDeliveryDates);
  const scheduledSet = new Set(sortedDates);
  const previousDateIso = getPreviousScheduledDeliveryDateIso(sortedDates, sourceDateIso);
  const nextDateIso = getNextScheduledDeliveryDateIso(sortedDates, sourceDateIso);
  const upperExclusiveIso = nextDateIso ?? sourceDateIso;

  if (previousDateIso && upperExclusiveIso <= previousDateIso) {
    return [];
  }

  const slots: string[] = [];
  let cursor = previousDateIso
    ? addDays(new Date(`${previousDateIso}T00:00:00`), 1)
    : addDays(normalizeDate(today), 1);
  const endExclusive = new Date(`${upperExclusiveIso}T00:00:00`);
  let steps = 0;

  while (normalizeDate(cursor) < normalizeDate(endExclusive) && steps < FREE_SLOT_SCAN_LIMIT_DAYS) {
    const dateIso = getMealDayKey(cursor);

    if (
      isAccountDeliveryDay(cursor, dayOption) &&
      !scheduledSet.has(dateIso) &&
      dateIso !== sourceDateIso &&
      isRescheduleEligibleTarget(dateIso, today) &&
      (!previousDateIso || dateIso > previousDateIso) &&
      dateIso < upperExclusiveIso
    ) {
      slots.push(dateIso);
    }

    cursor = addDays(cursor, 1);
    steps += 1;
  }

  return slots;
}

export function isFreeDeliverySlotTarget(
  scheduledDeliveryDates: string[],
  sourceDateIso: string,
  targetDateIso: string,
  dayOption: DayOption,
  today = new Date(),
): boolean {
  if (scheduledDeliveryDates.includes(targetDateIso)) {
    return false;
  }

  return getFreeDeliverySlotsBetweenNeighbors(
    scheduledDeliveryDates,
    sourceDateIso,
    dayOption,
    today,
  ).includes(targetDateIso);
}

export function isOccupiedForwardRescheduleTarget(
  scheduledDeliveryDates: string[],
  sourceDateIso: string,
  targetDateIso: string,
): boolean {
  const sortedDates = sortScheduledDeliveryDates(scheduledDeliveryDates);
  const sourceIndex = sortedDates.indexOf(sourceDateIso);
  const targetIndex = sortedDates.indexOf(targetDateIso);

  if (sourceIndex < 0 || targetIndex < 0 || targetIndex <= sourceIndex) {
    return false;
  }

  const previousDateIso = getPreviousScheduledDeliveryDateIso(sortedDates, sourceDateIso);

  return !previousDateIso || targetDateIso >= previousDateIso;
}

export function isRescheduleScheduleOrderAllowed(
  scheduledDeliveryDates: string[],
  sourceDateIso: string,
  targetDateIso: string,
  dayOption: DayOption,
  today = new Date(),
): boolean {
  if (isOccupiedForwardRescheduleTarget(scheduledDeliveryDates, sourceDateIso, targetDateIso)) {
    return true;
  }

  return isFreeDeliverySlotTarget(
    scheduledDeliveryDates,
    sourceDateIso,
    targetDateIso,
    dayOption,
    today,
  );
}

export function isRescheduleTargetSelectable(
  scheduledDeliveryDates: string[],
  sourceDateIso: string,
  targetDateIso: string,
  dayOption: DayOption,
  today = new Date(),
): boolean {
  if (targetDateIso === sourceDateIso || !isRescheduleEligibleTarget(targetDateIso, today)) {
    return false;
  }

  if (isOccupiedForwardRescheduleTarget(scheduledDeliveryDates, sourceDateIso, targetDateIso)) {
    return true;
  }

  return isFreeDeliverySlotTarget(
    scheduledDeliveryDates,
    sourceDateIso,
    targetDateIso,
    dayOption,
    today,
  );
}

export function canRescheduleDelivery(delivery: Pick<DeliveryListEntry, 'scope'>): boolean {
  return delivery.scope === 'next';
}

export function isRescheduleSourceAllowed(
  scheduledDeliveryDates: string[],
  sourceDateIso: string,
): boolean {
  return scheduledDeliveryDates.includes(sourceDateIso);
}

export function buildForwardCascadeDates(
  sortedDates: string[],
  sourceDateIso: string,
  targetDateIso: string,
  dayOption: DayOption,
  today = new Date(),
): string[] | null {
  const dates = sortScheduledDeliveryDates(sortedDates);
  const sourceIdx = dates.indexOf(sourceDateIso);

  if (sourceIdx < 0 || targetDateIso === sourceDateIso) {
    return null;
  }

  if (!isRescheduleTargetSelectable(dates, sourceDateIso, targetDateIso, dayOption, today)) {
    return null;
  }

  const before = dates.slice(0, sourceIdx);
  const tail: string[] = [];
  let cursor = targetDateIso;
  const tailCount = dates.length - sourceIdx;

  for (let index = 0; index < tailCount; index += 1) {
    tail.push(cursor);
    cursor = getNextAccountDeliveryDateIsoAfter(cursor, dayOption);
  }

  return [...before, ...tail];
}

function updateDeliveryListEntry(entry: DeliveryListEntry, dateIso: string): DeliveryListEntry {
  const date = new Date(`${dateIso}T00:00:00`);

  return {
    ...entry,
    dateIso,
    day: date.getDate(),
    month: MONTH_ABBR[date.getMonth()],
  };
}

export function applyDeliveryReschedule(
  deliveries: DeliveryListEntry[],
  sourceDateIso: string,
  targetDateIso: string,
  dayOption: DayOption,
  today = new Date(),
): DeliveryListEntry[] {
  const sorted = [...deliveries].sort((left, right) => left.dateIso.localeCompare(right.dateIso));
  const scheduledDeliveryDates = sorted.map((delivery) => delivery.dateIso);

  const newDates = buildForwardCascadeDates(
    scheduledDeliveryDates,
    sourceDateIso,
    targetDateIso,
    dayOption,
    today,
  );

  if (!newDates) {
    return deliveries;
  }

  return sorted.map((entry, index) => updateDeliveryListEntry(entry, newDates[index] ?? entry.dateIso));
}

export function applyHomeDeliveryReschedule(
  delivery: HomeDelivery,
  targetDateIso: string,
): HomeDelivery {
  const date = new Date(`${targetDateIso}T00:00:00`);

  return {
    ...delivery,
    dateIso: targetDateIso,
    day: date.getDate(),
    month: MONTH_ABBR[date.getMonth()],
    weekday: WEEKDAY_FULL[date.getDay()],
  };
}

export function getScheduledDeliveryDateIsos(dates: Date[]): string[] {
  return dates.map((date) => getMealDayKey(date));
}
