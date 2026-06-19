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

export function createInitialDeliveryDetails(): DeliveryDetailsData {
  const deliveryDates = getUpcomingDeliveryDates(60);

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
