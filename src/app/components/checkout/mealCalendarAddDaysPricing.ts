import {
  DEFAULT_CHECKOUT_PRICING,
  getCheckoutPrice,
  PLAN_MEALS_COUNT,
  type CheckoutPricingTable,
  type DayOption,
  type Duration,
  type Plan,
} from '../../data/checkoutPricing';

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
