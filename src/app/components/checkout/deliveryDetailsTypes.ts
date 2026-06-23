import { getUpcomingDeliveryDates } from './mealCalendarUtils';

export type DeliveryDetailsData = {
  apartment: string;
  instructions: string;
  fullName: string;
  email: string;
  leaveAtDoor: boolean;
  selectedTimeSlot: string;
  selectedDate: Date;
};

/** JSON-safe form for sessionStorage / order payloads. */
export type SerializedDeliveryDetails = Omit<DeliveryDetailsData, 'selectedDate'> & {
  selectedDate: string;
};

export function serializeDeliveryDetails(details: DeliveryDetailsData): SerializedDeliveryDetails {
  return {
    ...details,
    selectedDate: details.selectedDate.toISOString(),
  };
}

export function deserializeDeliveryDetails(
  serialized: SerializedDeliveryDetails,
): DeliveryDetailsData {
  const parsedDate = new Date(serialized.selectedDate);
  const deliveryDates = getUpcomingDeliveryDates(60, 'weekdays');
  const fallbackDate = deliveryDates[0] ?? new Date();

  return {
    apartment: serialized.apartment ?? '',
    instructions: serialized.instructions ?? '',
    fullName: serialized.fullName ?? '',
    email: serialized.email ?? '',
    leaveAtDoor: Boolean(serialized.leaveAtDoor),
    selectedTimeSlot: serialized.selectedTimeSlot ?? '',
    selectedDate: Number.isNaN(parsedDate.getTime()) ? fallbackDate : parsedDate,
  };
}

export function createInitialDeliveryDetails(): DeliveryDetailsData {
  const deliveryDates = getUpcomingDeliveryDates(60, 'weekdays');

  return {
    apartment: '',
    instructions: '',
    fullName: '',
    email: '',
    leaveAtDoor: false,
    selectedTimeSlot: '',
    selectedDate: deliveryDates[0],
  };
}
