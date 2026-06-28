import type {
  AccountMealplanRecord,
  AccountUser,
  HomeMenuPlanConfig,
  HomeScreenData,
} from '../types/account.types';
import { buildAccountMealplanRecord } from '../utils/buildAccountMealplanRecord';

export const mockAccountUser: AccountUser = {
  displayName: 'Stanislav',
  phone: '+971 50 123 4567',
};

export const mockMenuPlan: HomeMenuPlanConfig = {
  plan: 'base',
  days: 'weekdays',
  duration: 'monthly',
  lightMealOption: 'breakfast-main',
};

const stanislavMealplan = {
  planId: 'stanislav-mealplan',
  planTitle: 'Stanislav’s Mealplan',
  personCount: 2,
} as const;

const familyWeekendsMealplan = {
  planId: 'family-weekends-mealplan',
  planTitle: 'Family Weekends',
  personCount: 1,
} as const;

const familyWeekendsMenuPlan: HomeMenuPlanConfig = {
  plan: 'base',
  days: 'weekdays+sat',
  duration: 'monthly',
  lightMealOption: 'breakfast-main',
};

export const mockAccountPromos = [
  {
    id: 'promo-together',
    imageSrc: '/account/home/promo-together.png',
    imageAlt: 'Together cheaper',
  },
  {
    id: 'promo-hundo',
    imageSrc: '/account/home/promo-hundo.png',
    imageAlt: 'Find us at HUNDO',
  },
  {
    id: 'promo-delivery',
    imageSrc: '/account/home/promo-delivery.png',
    imageAlt: 'Free delivery',
  },
] as const;

export const mockAccountMealplans: AccountMealplanRecord[] = [
  buildAccountMealplanRecord({
    mealplan: stanislavMealplan,
    menuPlan: mockMenuPlan,
    plan: {
      id: stanislavMealplan.planId,
      title: stanislavMealplan.planTitle,
      chips: [
        { id: 'chip-base', label: 'Base (Breakfast + Lunch + Dinner)' },
        { id: 'chip-monthly', label: 'Monthly' },
        { id: 'chip-weekdays', label: 'Weekdays' },
        { id: 'chip-exclusions', label: 'No exclusions' },
        { id: 'chip-persons', label: '2 persons' },
      ],
      activeUntil: '03.05.2026',
    },
  }),
  buildAccountMealplanRecord({
    mealplan: familyWeekendsMealplan,
    menuPlan: familyWeekendsMenuPlan,
    plan: {
      id: familyWeekendsMealplan.planId,
      title: familyWeekendsMealplan.planTitle,
      chips: [
        { id: 'chip-base', label: 'Base (Breakfast + Lunch + Dinner)' },
        { id: 'chip-monthly', label: 'Monthly' },
        { id: 'chip-weekends', label: 'Weekdays + Sat' },
        { id: 'chip-exclusions', label: 'No exclusions' },
        { id: 'chip-persons', label: '1 person' },
      ],
      activeUntil: '15.08.2026',
    },
  }),
];

const primaryMealplan = mockAccountMealplans[0];

export const mockHomeScreen: HomeScreenData = {
  promos: [...mockAccountPromos],
  plan: primaryMealplan.plan,
  menuPlan: primaryMealplan.menuPlan,
  mealplan: primaryMealplan.mealplan,
  persons: primaryMealplan.persons,
};

export const mockDeliveriesScreen = {
  mealplan: primaryMealplan.mealplan,
  persons: primaryMealplan.deliveries,
};
