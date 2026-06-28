import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';
import type { MenuDay } from '../../types/meal';

export type AccountUser = {
  displayName: string;
  phone: string;
  email?: string;
};

export type HomePromoBanner = {
  id: string;
  imageSrc: string;
  imageAlt: string;
};

export type HomePlanChip = {
  id: string;
  label: string;
};

export type HomePlan = {
  id: string;
  title: string;
  chips: HomePlanChip[];
  activeUntil: string;
};

export type HomeDelivery = {
  index: number;
  total: number;
  dateIso: string;
  day: number;
  month: string;
  weekday: string;
  timeSlot: string;
  address: string;
  leaveAtDoor: boolean;
};

export type HomeMenuPlanConfig = {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  lightMealOption: LightMealOption;
};

export type AccountMealplanContext = {
  planId: string;
  planTitle: string;
  personCount: number;
};

export type AccountPersonHomeData = {
  personIndex: number;
  delivery: HomeDelivery;
  menuDays: MenuDay[];
};

export type HomeScreenData = {
  promos: HomePromoBanner[];
  plan: HomePlan;
  menuPlan: HomeMenuPlanConfig;
  mealplan: AccountMealplanContext;
  persons: AccountPersonHomeData[];
};

export type DeliveriesScope = 'next' | 'previous';

export type DeliveryListEntry = {
  id: string;
  personIndex: number;
  scope: DeliveriesScope;
  dateIso: string;
  day: number;
  month: string;
  timeSlot: string;
  address: string;
};

export type PersonDeliveries = {
  personIndex: number;
  nextDeliveries: DeliveryListEntry[];
  previousDeliveries: DeliveryListEntry[];
};

export type DeliveriesScreenData = {
  mealplan: AccountMealplanContext;
  persons: PersonDeliveries[];
};

export type AccountMealplanRecord = {
  mealplan: AccountMealplanContext;
  menuPlan: HomeMenuPlanConfig;
  plan: HomePlan;
  persons: AccountPersonHomeData[];
  deliveries: PersonDeliveries[];
  featuredDeliveryListIndex: number;
};

export type DeliveryDetailData = {
  deliveryIndex: number;
  deliveryTotal: number;
  dateIso: string;
  day: number;
  month: string;
  weekday: string;
  timeSlot: string;
  address: string;
  addressNote?: string;
  leaveAtDoor: boolean;
  canEditLogistics: boolean;
  menuPlan: HomeMenuPlanConfig;
  menuDays: MenuDay[];
};
