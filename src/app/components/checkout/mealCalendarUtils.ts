import type { DayOption, Duration } from '../../data/checkoutPricing';

import { MONTH_ABBR } from '../common/dateFormatTokens';

export { MONTH_ABBR };

export const WEEKDAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export const MONDAY = 1;
export const THURSDAY = 4;
export const SATURDAY = 6;
export const SUNDAY = 0;

type MealBlock = {
  deliveryWeekday: number;
  daysCount: number;
  startOffset?: number;
};

const MEAL_BLOCKS_BY_DAY_OPTION: Record<DayOption, MealBlock[]> = {
  weekdays: [
    { deliveryWeekday: MONDAY, daysCount: 3 },
    { deliveryWeekday: THURSDAY, daysCount: 2 },
  ],
  'weekdays+sat': [
    { deliveryWeekday: MONDAY, daysCount: 3 },
    { deliveryWeekday: THURSDAY, daysCount: 3 },
  ],
  full: [
    { deliveryWeekday: MONDAY, daysCount: 3 },
    { deliveryWeekday: THURSDAY, daysCount: 2 },
    { deliveryWeekday: SATURDAY, daysCount: 2 },
  ],
};

function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

function getMealBlockForDelivery(deliveryWeekday: number, dayOption: DayOption): MealBlock | undefined {
  return MEAL_BLOCKS_BY_DAY_OPTION[dayOption].find(
    (block) => block.deliveryWeekday === deliveryWeekday,
  );
}

// DatePill: w-[56px] + gap-[8px]
const DATE_PILL_SCROLL_STEP = 64;

export type MealDayRadiusPosition = 'start' | 'end' | 'single';

function isElementVisibleInContainer(container: HTMLElement, element: HTMLElement): boolean {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  return elementRect.right > containerRect.left && elementRect.left < containerRect.right;
}

function getVisibleEdgeIndices(
  container: HTMLElement,
  pills: Array<HTMLElement | null>,
): { firstVisible: number; lastVisible: number } | null {
  let firstVisible = -1;
  let lastVisible = -1;

  pills.forEach((pill, index) => {
    if (!pill || !isElementVisibleInContainer(container, pill)) return;

    if (firstVisible === -1) firstVisible = index;
    lastVisible = index;
  });

  if (firstVisible === -1) return null;

  return { firstVisible, lastVisible };
}

export function scrollDatePillsOnEdgeClick(
  container: HTMLElement,
  pills: Array<HTMLElement | null>,
  clickedIndex: number,
): void {
  const edges = getVisibleEdgeIndices(container, pills);
  if (!edges) return;

  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  const { firstVisible, lastVisible } = edges;

  const isInRightScrollZone =
    clickedIndex >= lastVisible - 1 && clickedIndex <= lastVisible;
  const isInLeftScrollZone =
    clickedIndex >= firstVisible && clickedIndex <= firstVisible + 1;

  if (isInRightScrollZone && clickedIndex < pills.length - 1) {
    container.scrollTo({
      left: Math.min(container.scrollLeft + DATE_PILL_SCROLL_STEP, maxScrollLeft),
      behavior: 'smooth',
    });
    return;
  }

  if (isInLeftScrollZone && clickedIndex > 0) {
    container.scrollTo({
      left: Math.max(container.scrollLeft - DATE_PILL_SCROLL_STEP, 0),
      behavior: 'smooth',
    });
  }
}

export function isDatePillVisibleInContainer(
  container: HTMLElement,
  pill: HTMLElement,
): boolean {
  return isElementVisibleInContainer(container, pill);
}

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

export function getMealDayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getDeliveryDaysLabel(dayOption: DayOption): string {
  if (dayOption === 'full') {
    return 'Mondays, Thursdays, and Saturdays';
  }

  return 'Mondays and Thursdays';
}

export function getUpcomingDeliveryDates(
  withinDays = 60,
  _dayOption: DayOption = 'weekdays',
): Date[] {
  const dates: Date[] = [];
  const start = normalizeDate(addDays(new Date(), 2));

  const end = addDays(start, withinDays);
  const cursor = new Date(start);

  while (cursor < end) {
    const dayOfWeek = cursor.getDay();

    if (dayOfWeek === MONDAY || dayOfWeek === THURSDAY) {
      dates.push(new Date(cursor));
    }
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

export function isDeliveryDay(date: Date, dayOption: DayOption): boolean {
  const dayOfWeek = date.getDay();

  if (dayOfWeek === MONDAY || dayOfWeek === THURSDAY) {
    return true;
  }

  return dayOption === 'full' && dayOfWeek === SATURDAY;
}

export function isDefaultMealDay({
  date,
  startDate,
  endDate,
  dayOption,
}: {
  date: Date;
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
}): boolean {
  if (!isInPeriod(date, startDate, endDate)) {
    return false;
  }

  const normalizedStart = normalizeDate(startDate);
  const cursor = new Date(normalizedStart);
  const periodEnd = normalizeDate(endDate);

  while (cursor < periodEnd) {
    if (isDeliveryDay(cursor, dayOption) && cursor >= normalizedStart) {
      const block = getMealBlockForDelivery(cursor.getDay(), dayOption);

      if (block) {
        const startOffset = block.startOffset ?? 0;

        for (let offset = startOffset; offset < startOffset + block.daysCount; offset += 1) {
          const mealDate = addDays(cursor, offset);

          if (
            isSameDay(date, mealDate) &&
            isInPeriod(mealDate, startDate, endDate)
          ) {
            return true;
          }
        }
      }
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return false;
}

export function isSubscriptionMealDay({
  date,
  startDate,
  endDate,
  dayOption,
  extraMealDayKeys,
}: {
  date: Date;
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
  extraMealDayKeys?: ReadonlySet<string>;
}) {
  if (!isInPeriod(date, startDate, endDate)) return false;
  if (isDefaultMealDay({ date, startDate, endDate, dayOption })) return true;

  return extraMealDayKeys?.has(getMealDayKey(date)) ?? false;
}

export function isAddableMealDayCell({
  date,
  startDate,
  endDate,
  dayOption,
  extraMealDayKeys,
}: {
  date: Date;
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
  extraMealDayKeys?: ReadonlySet<string>;
}) {
  return (
    isInPeriod(date, startDate, endDate) &&
    !isSubscriptionMealDay({ date, startDate, endDate, dayOption, extraMealDayKeys })
  );
}

export function getAddableWeekdays(dayOption: DayOption): number[] {
  if (dayOption === 'weekdays') {
    return [SATURDAY, SUNDAY];
  }

  if (dayOption === 'weekdays+sat') {
    return [SUNDAY];
  }

  return [];
}

export function getWeeklyExtraMealDayKeys({
  startDate,
  endDate,
  dayOption,
  targetWeekday,
}: {
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
  targetWeekday: number;
}): string[] {
  const keys: string[] = [];
  const cursor = new Date(startDate);

  while (cursor < endDate) {
    const dayOfWeek = cursor.getDay();

    if (
      dayOfWeek === targetWeekday &&
      isInPeriod(cursor, startDate, endDate) &&
      !isDefaultMealDay({ date: cursor, startDate, endDate, dayOption })
    ) {
      keys.push(getMealDayKey(cursor));
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return keys;
}

export function isExtraMealWeekdayFullyAdded({
  startDate,
  endDate,
  dayOption,
  extraMealDayKeys,
  targetWeekday,
}: {
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
  extraMealDayKeys?: ReadonlySet<string>;
  targetWeekday: number;
}): boolean {
  if (!extraMealDayKeys?.size) {
    return false;
  }

  const expectedKeys = getWeeklyExtraMealDayKeys({
    startDate,
    endDate,
    dayOption,
    targetWeekday,
  });

  if (expectedKeys.length === 0) {
    return false;
  }

  return expectedKeys.every((key) => extraMealDayKeys.has(key));
}

export function getActiveExtraMealWeekdays({
  startDate,
  endDate,
  dayOption,
  extraMealDayKeys,
}: {
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
  extraMealDayKeys?: ReadonlySet<string>;
}): number[] {
  return getAddableWeekdays(dayOption).filter((targetWeekday) =>
    isExtraMealWeekdayFullyAdded({
      startDate,
      endDate,
      dayOption,
      extraMealDayKeys,
      targetWeekday,
    }),
  );
}

export function isRemovableExtraMealDayCell({
  date,
  startDate,
  endDate,
  dayOption,
  extraMealDayKeys,
}: {
  date: Date;
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
  extraMealDayKeys?: ReadonlySet<string>;
}) {
  return (
    isInPeriod(date, startDate, endDate) &&
    !isDefaultMealDay({ date, startDate, endDate, dayOption }) &&
    (extraMealDayKeys?.has(getMealDayKey(date)) ?? false)
  );
}

export function getWeeklyRemovableExtraMealDayKeysForWeekday({
  startDate,
  endDate,
  dayOption,
  extraMealDayKeys,
  targetWeekday,
}: {
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
  extraMealDayKeys: ReadonlySet<string>;
  targetWeekday: number;
}): string[] {
  const keys: string[] = [];
  const cursor = new Date(startDate);

  while (cursor < endDate) {
    const dayOfWeek = cursor.getDay();
    const key = getMealDayKey(cursor);

    if (
      dayOfWeek === targetWeekday &&
      isInPeriod(cursor, startDate, endDate) &&
      !isDefaultMealDay({ date: cursor, startDate, endDate, dayOption }) &&
      extraMealDayKeys.has(key)
    ) {
      keys.push(key);
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return keys;
}

export function getWeeklyRemovableExtraMealDayKeys({
  anchorDate,
  startDate,
  endDate,
  dayOption,
  extraMealDayKeys,
  daysPerWeek,
}: {
  anchorDate: Date;
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
  extraMealDayKeys: ReadonlySet<string>;
  daysPerWeek: 1 | 2;
}): string[] {
  const addableWeekdays = getAddableWeekdays(dayOption);
  const anchorWeekday = anchorDate.getDay();
  const targetWeekdays = daysPerWeek === 1 ? [anchorWeekday] : addableWeekdays;
  const keys: string[] = [];
  const cursor = new Date(startDate);

  while (cursor < endDate) {
    const dayOfWeek = cursor.getDay();
    const key = getMealDayKey(cursor);

    if (
      targetWeekdays.includes(dayOfWeek) &&
      isInPeriod(cursor, startDate, endDate) &&
      !isDefaultMealDay({ date: cursor, startDate, endDate, dayOption }) &&
      extraMealDayKeys.has(key)
    ) {
      keys.push(key);
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return keys;
}

function getContiguousIndexGroups(indices: number[]): number[][] {
  if (indices.length === 0) {
    return [];
  }

  const groups: number[][] = [[indices[0]]];

  for (let index = 1; index < indices.length; index += 1) {
    const previousIndex = indices[index - 1];
    const currentIndex = indices[index];

    if (currentIndex === previousIndex + 1) {
      groups[groups.length - 1].push(currentIndex);
    } else {
      groups.push([currentIndex]);
    }
  }

  return groups;
}

export function getMealDayRadiusByIndex({
  week,
  startDate,
  endDate,
  dayOption,
  extraMealDayKeys,
}: {
  week: Date[];
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
  extraMealDayKeys?: ReadonlySet<string>;
}) {
  const mealDayIndices = week
    .map((date, index) =>
      isSubscriptionMealDay({ date, startDate, endDate, dayOption, extraMealDayKeys })
        ? index
        : -1,
    )
    .filter((index) => index >= 0);

  const radiusByIndex: Array<MealDayRadiusPosition | null> = week.map(() => null);

  for (const group of getContiguousIndexGroups(mealDayIndices)) {
    if (group.length === 1) {
      radiusByIndex[group[0]] = 'single';
      continue;
    }

    radiusByIndex[group[0]] = 'start';
    radiusByIndex[group[group.length - 1]] = 'end';
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
