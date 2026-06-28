import type { DeliveryDetailData, DeliveryListEntry, HomeDelivery, HomeMenuPlanConfig } from '../types/account.types';
import { canRescheduleDelivery } from './applyDeliveryReschedule';
import { DELIVERY_TIME_SLOTS } from '../../components/checkout/deliveryTimeSlots';
import { buildDeliveryMenuDays } from './buildHomeScreenData';
import { DELIVERY_ADDRESS_NOTE, PAST_DELIVERY_ADDRESS_NOTE } from './deliveryLogisticsCopy';

const WEEKDAY_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

const DETAIL_TIME_SLOT = DELIVERY_TIME_SLOTS[0];

type BuildDeliveryDetailDataOptions = {
  deliveryIndex: number;
  deliveryTotal: number;
  leaveAtDoor?: boolean;
};

export function buildDeliveryDetailData(
  entry: DeliveryListEntry,
  menuPlan: HomeMenuPlanConfig,
  { deliveryIndex, deliveryTotal, leaveAtDoor = false }: BuildDeliveryDetailDataOptions,
): DeliveryDetailData {
  const deliveryDate = new Date(`${entry.dateIso}T00:00:00`);
  const deliveryStub: HomeDelivery = {
    index: deliveryIndex,
    total: deliveryTotal,
    dateIso: entry.dateIso,
    day: entry.day,
    month: entry.month,
    weekday: WEEKDAY_FULL[deliveryDate.getDay()],
    timeSlot: entry.timeSlot,
    address: entry.address,
    leaveAtDoor,
  };

  return {
    deliveryIndex,
    deliveryTotal,
    dateIso: entry.dateIso,
    day: entry.day,
    month: entry.month,
    weekday: WEEKDAY_FULL[deliveryDate.getDay()],
    timeSlot: DETAIL_TIME_SLOT,
    address: entry.address,
    addressNote: canRescheduleDelivery(entry) ? DELIVERY_ADDRESS_NOTE : PAST_DELIVERY_ADDRESS_NOTE,
    leaveAtDoor,
    canEditLogistics: canRescheduleDelivery(entry),
    menuPlan,
    menuDays: buildDeliveryMenuDays(menuPlan, deliveryStub),
  };
}
