import { DELIVERY_TIME_SLOTS } from '../../components/checkout/deliveryTimeSlots';
import {
  getSampleDeliveryAddress,
  getSampleDeliveryDetailsFill,
} from '../../components/checkout/deliverySampleData';
import { getMealDayKey, MONTH_ABBR } from '../../components/checkout/mealCalendarUtils';
import type {
  AccountMealplanContext,
  DeliveriesScreenData,
  DeliveryListEntry,
  HomeMenuPlanConfig,
  PersonDeliveries,
} from '../types/account.types';
import {
  getPastDeliveryDatesForDayOption,
  getUpcomingDeliveryDatesForDayOption,
} from './accountDeliveryDates';

const DELIVERIES_TIME_SLOT = DELIVERY_TIME_SLOTS[0];
export const NEXT_DELIVERY_COUNT = 8;
export const PREVIOUS_DELIVERY_COUNT = 8;

function buildDeliveryAddress(): string {
  const sampleAddress = getSampleDeliveryAddress();
  const sampleDetails = getSampleDeliveryDetailsFill('weekdays');
  const apartment = sampleDetails.apartment ? `Apt ${sampleDetails.apartment}. ` : '';

  return `${apartment}${sampleAddress.title}, ${sampleAddress.subtitle}`;
}

function toDeliveryListEntry(
  date: Date,
  personIndex: number,
  address: string,
  scope: 'next' | 'previous',
): DeliveryListEntry {
  const dateIso = getMealDayKey(date);

  return {
    id: `${scope}-${dateIso}-p${personIndex}`,
    personIndex,
    scope,
    dateIso,
    day: date.getDate(),
    month: MONTH_ABBR[date.getMonth()],
    timeSlot: DELIVERIES_TIME_SLOT,
    address,
  };
}

function buildPersonDeliveries(
  personIndex: number,
  menuPlan: HomeMenuPlanConfig,
  address: string,
): PersonDeliveries {
  const upcomingDates = getUpcomingDeliveryDatesForDayOption(60, menuPlan.days).slice(
    0,
    NEXT_DELIVERY_COUNT,
  );
  const pastDates = getPastDeliveryDatesForDayOption(PREVIOUS_DELIVERY_COUNT, menuPlan.days);

  return {
    personIndex,
    nextDeliveries: upcomingDates.map((date) =>
      toDeliveryListEntry(date, personIndex, address, 'next'),
    ),
    previousDeliveries: pastDates.map((date) =>
      toDeliveryListEntry(date, personIndex, address, 'previous'),
    ),
  };
}

type BuildDeliveriesScreenDataOptions = {
  mealplan: AccountMealplanContext;
  menuPlan: HomeMenuPlanConfig;
};

export function buildDeliveriesScreenData({
  mealplan,
  menuPlan,
}: BuildDeliveriesScreenDataOptions): DeliveriesScreenData {
  const address = buildDeliveryAddress();

  return {
    mealplan,
    persons: Array.from({ length: mealplan.personCount }, (_, personIndex) =>
      buildPersonDeliveries(personIndex, menuPlan, address),
    ),
  };
}
