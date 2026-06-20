import {
  DEFAULT_CHECKOUT_PRICING,
  getCheckoutPrice,
  PLAN_MEALS_COUNT,
  type CheckoutPricingTable,
  type DayOption,
  type Duration,
  type Plan,
} from '../../data/checkoutPricing';

import {
  getWeeklyExtraMealDayKeys,
  getWeeklyRemovableExtraMealDayKeysForWeekday,
  SATURDAY,
  SUNDAY,
} from './mealCalendarUtils';

export type MealDayTargetWeekday = typeof SATURDAY | typeof SUNDAY;

export type ExtraMealDaysQuote = {
  extraDaysLabel: string;
  periodPrice: number;
  pricePerDay: number;
  actionCostAed: number;
};

export type CheckoutOrderPricing = ReturnType<typeof getCheckoutPrice> & {
  extraMealDayCount: number;
  totalPaidDays: number;
  totalMeals: number;
};

export function formatExtraDaysLabel(extraMealDayCount: number): string {
  return extraMealDayCount === 1 ? '+1 day' : `+${extraMealDayCount} days`;
}

export function getProjectedExtraMealDayCount(
  existingKeys: Iterable<string>,
  newKeys: Iterable<string>,
): number {
  return new Set([...existingKeys, ...newKeys]).size;
}

export function getProjectedExtraMealDayCountAfterRemove(
  existingKeys: Iterable<string>,
  keysToRemove: Iterable<string>,
): number {
  const next = new Set(existingKeys);

  for (const key of keysToRemove) {
    next.delete(key);
  }

  return next.size;
}

export function getExtraMealDaysQuote({
  plan,
  days,
  duration,
  persons = 1,
  extraMealDayCount,
  previousExtraMealDayCount = 0,
}: {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons?: number;
  extraMealDayCount: number;
  previousExtraMealDayCount?: number;
}): ExtraMealDaysQuote {
  const base = getCheckoutPrice({ plan, days, duration, persons });
  const dayDelta = extraMealDayCount - previousExtraMealDayCount;

  return {
    extraDaysLabel: formatExtraDaysLabel(extraMealDayCount),
    periodPrice: base.periodPrice + extraMealDayCount * base.pricePerDay,
    pricePerDay: base.pricePerDay,
    actionCostAed: Math.abs(dayDelta) * base.pricePerDay,
  };
}

export function getMealDayWeekdayDelta(
  selectedWeekdays: ReadonlySet<MealDayTargetWeekday>,
  addedWeekdays: ReadonlySet<MealDayTargetWeekday>,
): { toAdd: MealDayTargetWeekday[]; toRemove: MealDayTargetWeekday[] } {
  const toAdd: MealDayTargetWeekday[] = [];
  const toRemove: MealDayTargetWeekday[] = [];

  for (const weekday of selectedWeekdays) {
    if (!addedWeekdays.has(weekday)) {
      toAdd.push(weekday);
    }
  }

  for (const weekday of addedWeekdays) {
    if (!selectedWeekdays.has(weekday)) {
      toRemove.push(weekday);
    }
  }

  return { toAdd, toRemove };
}

export function hasMealDayWeekdayDelta(
  selectedWeekdays: ReadonlySet<MealDayTargetWeekday>,
  addedWeekdays: ReadonlySet<MealDayTargetWeekday>,
): boolean {
  const { toAdd, toRemove } = getMealDayWeekdayDelta(selectedWeekdays, addedWeekdays);

  return toAdd.length > 0 || toRemove.length > 0;
}

export function getMealDayChangeQuote({
  plan,
  days,
  duration,
  persons = 1,
  existingKeys,
  selectedWeekdays,
  addedWeekdays,
  dayOption,
  startDate,
  endDate,
}: {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons?: number;
  existingKeys: ReadonlySet<string>;
  selectedWeekdays: ReadonlySet<MealDayTargetWeekday>;
  addedWeekdays: ReadonlySet<MealDayTargetWeekday>;
  dayOption: DayOption;
  startDate: Date;
  endDate: Date;
}): {
  keysToAdd: string[];
  keysToRemove: string[];
} | null {
  const { toAdd, toRemove } = getMealDayWeekdayDelta(selectedWeekdays, addedWeekdays);

  if (toAdd.length === 0 && toRemove.length === 0) {
    return null;
  }

  const keysToAdd = toAdd.flatMap((targetWeekday) =>
    getWeeklyExtraMealDayKeys({
      startDate,
      endDate,
      dayOption,
      targetWeekday,
    }),
  );
  const keysToRemove = toRemove.flatMap((targetWeekday) =>
    getWeeklyRemovableExtraMealDayKeysForWeekday({
      startDate,
      endDate,
      dayOption,
      extraMealDayKeys: existingKeys,
      targetWeekday,
    }),
  );

  return { keysToAdd, keysToRemove };
}

export function getMealDayDisplayQuote({
  plan,
  days,
  duration,
  persons = 1,
  selectedWeekdays,
  addedWeekdays,
  dayOption,
  startDate,
  endDate,
}: {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons?: number;
  selectedWeekdays: ReadonlySet<MealDayTargetWeekday>;
  addedWeekdays: ReadonlySet<MealDayTargetWeekday>;
  dayOption: DayOption;
  startDate: Date;
  endDate: Date;
}): ExtraMealDaysQuote | null {
  if (selectedWeekdays.size === 0) {
    return null;
  }

  const hasDelta = hasMealDayWeekdayDelta(selectedWeekdays, addedWeekdays);

  if (!hasDelta && selectedWeekdays.size < 2) {
    return null;
  }

  const keysForRemaining = [...selectedWeekdays].flatMap((targetWeekday) =>
    getWeeklyExtraMealDayKeys({
      startDate,
      endDate,
      dayOption,
      targetWeekday,
    }),
  );
  const extraMealDayCount = keysForRemaining.length;
  const base = getCheckoutPrice({ plan, days, duration, persons });

  return {
    extraDaysLabel: formatExtraDaysLabel(extraMealDayCount),
    periodPrice: base.periodPrice + extraMealDayCount * base.pricePerDay,
    pricePerDay: base.pricePerDay,
    actionCostAed: extraMealDayCount * base.pricePerDay,
  };
}

export function getCheckoutOrderPricing({
  plan,
  days,
  duration,
  persons = 1,
  extraMealDayKeys = [],
  pricingTable = DEFAULT_CHECKOUT_PRICING,
}: {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons?: number;
  extraMealDayKeys?: string[];
  pricingTable?: CheckoutPricingTable;
}): CheckoutOrderPricing {
  const base = getCheckoutPrice({ pricingTable, plan, days, duration, persons });
  const extraMealDayCount = extraMealDayKeys.length;

  return {
    ...base,
    extraMealDayCount,
    totalPaidDays: base.paidDays + extraMealDayCount,
    periodPrice: base.periodPrice + extraMealDayCount * base.pricePerDay,
    oldPeriodPrice: base.oldPeriodPrice
      ? base.oldPeriodPrice + extraMealDayCount * base.pricePerDay
      : null,
    totalMeals: (base.paidDays + extraMealDayCount) * PLAN_MEALS_COUNT[plan] * persons,
  };
}
