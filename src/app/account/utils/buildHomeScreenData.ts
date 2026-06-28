import {
  getSampleDeliveryAddress,
  getSampleDeliveryDetailsFill,
} from '../../components/checkout/deliverySampleData';
import { getDeliveryMenuDays, getMealDayKey, MONTH_ABBR } from '../../components/checkout/mealCalendarUtils';
import type {
  AccountPersonHomeData,
  DeliveryListEntry,
  HomeDelivery,
  HomeMenuPlanConfig,
} from '../types/account.types';
import { getUpcomingDeliveryDatesForDayOption } from './accountDeliveryDates';
import { DELIVERY_ADDRESS_NOTE } from './deliveryLogisticsCopy';

const WEEKDAY_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

type BuildHomeDeliveryOptions = {
  menuPlan: HomeMenuPlanConfig;
  deliveryIndex?: number;
  deliveryTotal?: number;
  dateOffset?: number;
};

export function homeDeliveryFromListEntry(
  entry: DeliveryListEntry,
  menuPlan: HomeMenuPlanConfig,
  { index, total, leaveAtDoor = false }: { index: number; total: number; leaveAtDoor?: boolean },
): HomeDelivery {
  const date = new Date(`${entry.dateIso}T00:00:00`);

  return {
    index,
    total,
    dateIso: entry.dateIso,
    day: entry.day,
    month: entry.month,
    weekday: WEEKDAY_FULL[date.getDay()],
    timeSlot: entry.timeSlot,
    address: entry.address,
    addressNote: DELIVERY_ADDRESS_NOTE,
    leaveAtDoor,
  };
}

export function syncPersonHomeFromDeliveries(
  person: AccountPersonHomeData,
  nextDeliveries: DeliveryListEntry[],
  menuPlan: HomeMenuPlanConfig,
  featuredListIndex: number,
): AccountPersonHomeData {
  const featuredEntry =
    nextDeliveries[featuredListIndex] ?? nextDeliveries[nextDeliveries.length - 1] ?? null;

  if (!featuredEntry) {
    return person;
  }

  const sampleDetails = getSampleDeliveryDetailsFill(menuPlan.days);
  const delivery = homeDeliveryFromListEntry(featuredEntry, menuPlan, {
    index: featuredListIndex + 1,
    total: nextDeliveries.length,
    leaveAtDoor: sampleDetails.leaveAtDoor ?? person.delivery.leaveAtDoor,
  });

  return {
    ...person,
    delivery,
    menuDays: buildDeliveryMenuDays(menuPlan, delivery),
  };
}

export function buildNextDelivery({
  menuPlan,
  deliveryIndex = 1,
  deliveryTotal = 8,
  dateOffset = 0,
}: BuildHomeDeliveryOptions): HomeDelivery {
  const deliveryDates = getUpcomingDeliveryDatesForDayOption(60, menuPlan.days);
  const nextDeliveryDate = deliveryDates[dateOffset] ?? deliveryDates[0] ?? new Date();
  const sampleAddress = getSampleDeliveryAddress();
  const sampleDetails = getSampleDeliveryDetailsFill(menuPlan.days);
  const apartment = sampleDetails.apartment ? `Apt ${sampleDetails.apartment}. ` : '';

  return {
    index: deliveryIndex,
    total: deliveryTotal,
    dateIso: getMealDayKey(nextDeliveryDate),
    day: nextDeliveryDate.getDate(),
    month: MONTH_ABBR[nextDeliveryDate.getMonth()],
    weekday: WEEKDAY_FULL[nextDeliveryDate.getDay()],
    timeSlot: sampleDetails.selectedTimeSlot ?? '7AM – 11AM',
    address: `${apartment}${sampleAddress.title}, ${sampleAddress.subtitle}`,
    addressNote: DELIVERY_ADDRESS_NOTE,
    leaveAtDoor: sampleDetails.leaveAtDoor ?? false,
  };
}

export function buildDeliveryMenuDays(menuPlan: HomeMenuPlanConfig, delivery: HomeDelivery) {
  const deliveryDate = new Date(`${delivery.dateIso}T00:00:00`);

  return getDeliveryMenuDays(deliveryDate, menuPlan.days);
}
