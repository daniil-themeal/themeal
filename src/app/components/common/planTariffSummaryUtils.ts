import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import { getMealTypesForPlan, type LightMealOption } from '../../data/testMeals';

export const PLAN_TARIFF_LABELS: Record<Plan, string> = {
  light: 'Light (2 meals)',
  base: 'Base (3 meals)',
  plus: 'Plus (4 meals)',
};

export const PLAN_TARIFF_DURATION_LABELS: Record<Duration, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  '2months': '2 months',
};

export const PLAN_TARIFF_DAY_LABELS: Record<DayOption, string> = {
  weekdays: 'Weekdays',
  'weekdays+sat': 'Weekdays + Sat',
  full: 'Full week',
};

const INGREDIENT_CHIP_LABELS: Record<string, string> = {
  'no-red-meat': 'No red meat',
  'no-fish': 'No fish and seafood',
};

export function getPlanTariffTitle(plan: Plan) {
  return PLAN_TARIFF_LABELS[plan];
}

export function getPlanTariffChips({
  plan,
  days,
  duration,
  ingredients,
  lightMealOption,
}: {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  ingredients: string[];
  lightMealOption: LightMealOption;
}) {
  const mealTypeLabel = getMealTypesForPlan(plan, lightMealOption).join(' + ');

  return [
    mealTypeLabel,
    PLAN_TARIFF_DURATION_LABELS[duration],
    PLAN_TARIFF_DAY_LABELS[days],
    ...ingredients.map((key) => INGREDIENT_CHIP_LABELS[key] ?? key),
  ];
}
