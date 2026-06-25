export const TRIAL_PRICE_PER_PERSON = 199;
export const TRIAL_DAYS = 3;
export const TRIAL_MEALS_PER_DAY = 4;

export type TrialPricing = {
  periodPrice: number;
  oldPeriodPrice: number | null;
  pricePerDay: number;
  totalMeals: number;
  totalPaidDays: number;
};

export function getTrialPricing(persons: number): TrialPricing {
  const safePersons = Math.max(1, Math.floor(persons));
  const periodPrice = TRIAL_PRICE_PER_PERSON * safePersons;

  return {
    periodPrice,
    oldPeriodPrice: null,
    pricePerDay: periodPrice / TRIAL_DAYS,
    totalMeals: TRIAL_MEALS_PER_DAY * TRIAL_DAYS * safePersons,
    totalPaidDays: TRIAL_DAYS,
  };
}
