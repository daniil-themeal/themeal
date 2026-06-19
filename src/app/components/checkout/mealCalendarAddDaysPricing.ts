import {
  getCheckoutPrice,
  type DayOption,
  type Duration,
  type Plan,
} from '../../data/checkoutPricing';

export type ExtraMealDaysQuote = {
  extraDaysLabel: string;
  periodPrice: number;
  pricePerDay: number;
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

export function getExtraMealDaysQuote({
  plan,
  days,
  duration,
  persons = 1,
  extraMealDayCount,
}: {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons?: number;
  extraMealDayCount: number;
}): ExtraMealDaysQuote {
  const base = getCheckoutPrice({ plan, days, duration, persons });

  return {
    extraDaysLabel: formatExtraDaysLabel(extraMealDayCount),
    periodPrice: base.periodPrice + extraMealDayCount * base.pricePerDay,
    pricePerDay: base.pricePerDay,
  };
}
