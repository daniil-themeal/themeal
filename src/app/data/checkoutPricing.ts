export type Plan = 'light' | 'base' | 'plus';
export type Duration = 'weekly' | 'monthly' | '2months';
export type DayOption = 'weekdays' | 'weekdays+sat' | 'full';

export type CheckoutPriceItem = {
  paidDays: number;
  pricePerDay: number;
  discountPercent: number | null;
  discountAed: number | null;
  oldPeriodPrice: number | null;
  pricePerMonth: number | null;
  periodPrice: number;
};

export type CheckoutPricingTable = Record<
  Duration,
  Record<DayOption, Record<Plan, CheckoutPriceItem>>
>;

export const PLAN_MEALS_COUNT: Record<Plan, number> = {
  light: 2,
  base: 3,
  plus: 4,
};

export const DEFAULT_CHECKOUT_PRICING: CheckoutPricingTable = {
  weekly: {
    weekdays: {
      light: {
        paidDays: 5,
        pricePerDay: 59.85,
        discountPercent: null,
        discountAed: null,
        oldPeriodPrice: null,
        pricePerMonth: null,
        periodPrice: 299.25,
      },
      base: {
        paidDays: 5,
        pricePerDay: 69.85,
        discountPercent: null,
        discountAed: null,
        oldPeriodPrice: null,
        pricePerMonth: null,
        periodPrice: 349.25,
      },
      plus: {
        paidDays: 5,
        pricePerDay: 79.85,
        discountPercent: null,
        discountAed: null,
        oldPeriodPrice: null,
        pricePerMonth: null,
        periodPrice: 399.25,
      },
    },
    'weekdays+sat': {
      light: {
        paidDays: 6,
        pricePerDay: 59.85,
        discountPercent: null,
        discountAed: null,
        oldPeriodPrice: null,
        pricePerMonth: null,
        periodPrice: 359.1,
      },
      base: {
        paidDays: 6,
        pricePerDay: 69.85,
        discountPercent: null,
        discountAed: null,
        oldPeriodPrice: null,
        pricePerMonth: null,
        periodPrice: 419.1,
      },
      plus: {
        paidDays: 6,
        pricePerDay: 79.85,
        discountPercent: null,
        discountAed: null,
        oldPeriodPrice: null,
        pricePerMonth: null,
        periodPrice: 479.1,
      },
    },
    full: {
      light: {
        paidDays: 7,
        pricePerDay: 59.85,
        discountPercent: null,
        discountAed: null,
        oldPeriodPrice: null,
        pricePerMonth: null,
        periodPrice: 418.95,
      },
      base: {
        paidDays: 7,
        pricePerDay: 69.85,
        discountPercent: null,
        discountAed: null,
        oldPeriodPrice: null,
        pricePerMonth: null,
        periodPrice: 488.95,
      },
      plus: {
        paidDays: 7,
        pricePerDay: 79.85,
        discountPercent: null,
        discountAed: null,
        oldPeriodPrice: null,
        pricePerMonth: null,
        periodPrice: 558.95,
      },
    },
  },

  monthly: {
    weekdays: {
      light: {
        paidDays: 20,
        pricePerDay: 49.94,
        discountPercent: -0.1655806182,
        discountAed: 198.2,
        oldPeriodPrice: 1197,
        pricePerMonth: 998.8,
        periodPrice: 998.8,
      },
      base: {
        paidDays: 20,
        pricePerDay: 59.94,
        discountPercent: -0.1418754474,
        discountAed: 198.2,
        oldPeriodPrice: 1397,
        pricePerMonth: 1198.8,
        periodPrice: 1198.8,
      },
      plus: {
        paidDays: 20,
        pricePerDay: 69.94,
        discountPercent: -0.1241077019,
        discountAed: 198.2,
        oldPeriodPrice: 1597,
        pricePerMonth: 1398.8,
        periodPrice: 1398.8,
      },
    },
    'weekdays+sat': {
      light: {
        paidDays: 24,
        pricePerDay: 49.94,
        discountPercent: -0.1655806182,
        discountAed: 237.84,
        oldPeriodPrice: 1436.4,
        pricePerMonth: 1198.56,
        periodPrice: 1198.56,
      },
      base: {
        paidDays: 24,
        pricePerDay: 59.94,
        discountPercent: -0.1418754474,
        discountAed: 237.84,
        oldPeriodPrice: 1676.4,
        pricePerMonth: 1438.56,
        periodPrice: 1438.56,
      },
      plus: {
        paidDays: 24,
        pricePerDay: 69.94,
        discountPercent: -0.1241077019,
        discountAed: 237.84,
        oldPeriodPrice: 1916.4,
        pricePerMonth: 1678.56,
        periodPrice: 1678.56,
      },
    },
    full: {
      light: {
        paidDays: 28,
        pricePerDay: 49.949,
        discountPercent: -0.1654302423,
        discountAed: 277.228,
        oldPeriodPrice: 1675.8,
        pricePerMonth: 1398.572,
        periodPrice: 1398.572,
      },
      base: {
        paidDays: 28,
        pricePerDay: 59.949,
        discountPercent: -0.1417465999,
        discountAed: 277.228,
        oldPeriodPrice: 1955.8,
        pricePerMonth: 1678.572,
        periodPrice: 1678.572,
      },
      plus: {
        paidDays: 28,
        pricePerDay: 69.949,
        discountPercent: -0.1239949906,
        discountAed: 277.228,
        oldPeriodPrice: 2235.8,
        pricePerMonth: 1958.572,
        periodPrice: 1958.572,
      },
    },
  },

  '2months': {
    weekdays: {
      light: {
        paidDays: 40,
        pricePerDay: 39.94,
        discountPercent: -0.3326649958,
        discountAed: 795.4,
        oldPeriodPrice: 2394,
        pricePerMonth: 799.3,
        periodPrice: 1598.6,
      },
      base: {
        paidDays: 40,
        pricePerDay: 49.94,
        discountPercent: -0.2850393701,
        discountAed: 795.4,
        oldPeriodPrice: 2794,
        pricePerMonth: 999.3,
        periodPrice: 1998.6,
      },
      plus: {
        paidDays: 40,
        pricePerDay: 59.94,
        discountPercent: -0.2493425172,
        discountAed: 795.4,
        oldPeriodPrice: 3194,
        pricePerMonth: 1199.3,
        periodPrice: 2398.6,
      },
    },
    'weekdays+sat': {
      light: {
        paidDays: 48,
        pricePerDay: 39.94,
        discountPercent: -0.3321428571,
        discountAed: 954.18,
        oldPeriodPrice: 2872.8,
        pricePerMonth: 959.31,
        periodPrice: 1918.62,
      },
      base: {
        paidDays: 48,
        pricePerDay: 49.94,
        discountPercent: -0.2845919828,
        discountAed: 954.18,
        oldPeriodPrice: 3352.8,
        pricePerMonth: 1199.31,
        periodPrice: 2398.62,
      },
      plus: {
        paidDays: 48,
        pricePerDay: 59.94,
        discountPercent: -0.2489511584,
        discountAed: 954.18,
        oldPeriodPrice: 3832.8,
        pricePerMonth: 1439.31,
        periodPrice: 2878.62,
      },
    },
    full: {
      light: {
        paidDays: 56,
        pricePerDay: 39.94,
        discountPercent: -0.3320682659,
        discountAed: 1112.96,
        oldPeriodPrice: 3351.6,
        pricePerMonth: 1119.32,
        periodPrice: 2238.64,
      },
      base: {
        paidDays: 56,
        pricePerDay: 49.94,
        discountPercent: -0.2845280704,
        discountAed: 1112.96,
        oldPeriodPrice: 3911.6,
        pricePerMonth: 1399.32,
        periodPrice: 2798.64,
      },
      plus: {
        paidDays: 56,
        pricePerDay: 59.94,
        discountPercent: -0.24889525,
        discountAed: 1112.96,
        oldPeriodPrice: 4471.6,
        pricePerMonth: 1679.32,
        periodPrice: 3358.64,
      },
    },
  },
};

export function getCheckoutPrice({
  pricingTable = DEFAULT_CHECKOUT_PRICING,
  plan,
  days,
  duration,
  persons = 1,
}: {
  pricingTable?: CheckoutPricingTable;
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons?: number;
}) {
  const item = pricingTable[duration][days][plan];

  return {
    ...item,
    pricePerDay: Number((item.pricePerDay * persons).toFixed(1)),
    periodPrice: item.periodPrice * persons,
    oldPeriodPrice: item.oldPeriodPrice ? item.oldPeriodPrice * persons : null,
    pricePerMonth: item.pricePerMonth ? item.pricePerMonth * persons : null,
    discountAed: item.discountAed ? item.discountAed * persons : null,
  };
}

export function getTotalMeals({
  plan,
  days,
  duration,
  persons = 1,
  pricingTable = DEFAULT_CHECKOUT_PRICING,
}: {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons?: number;
  pricingTable?: CheckoutPricingTable;
}) {
  return pricingTable[duration][days][plan].paidDays * PLAN_MEALS_COUNT[plan] * persons;
}

export function formatAed(value: number) {
  return Math.round(value).toString();
}

export function formatAedWithCurrency(value: number) {
  return `AED ${formatAed(value)}`;
}

export function formatPricePerDay(value: number) {
  return value.toFixed(1);
}

export function formatDiscountPercent(value: number | null) {
  if (value === null) return null;

  return `${Math.round(value * 100)}%`;
}