import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';

export type CheckoutOrderSelection = {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons: number;
  ingredients: string[];
  lightMealOption: LightMealOption;
  extraMealDayKeys: string[];
};
