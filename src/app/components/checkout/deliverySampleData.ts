import type { DayOption } from '../../data/checkoutPricing';
import { testUaeAddresses } from '../../data/testAddresses';

import type { DeliveryDetailsData } from './deliveryDetailsTypes';
import { getUpcomingDeliveryDates } from './mealCalendarUtils';

export function getSampleDeliveryAddress() {
  return (
    testUaeAddresses.find((address) => address.deliveryAvailability === 'available') ??
    testUaeAddresses[0]
  );
}

export function getSampleDeliveryDetailsFill(days: DayOption): Partial<DeliveryDetailsData> {
  const deliveryDates = getUpcomingDeliveryDates(60, days);

  return {
    apartment: '1204',
    instructions: 'Ring the bell at the main entrance.',
    fullName: 'Alex Test',
    email: 'alex.test@example.com',
    leaveAtDoor: false,
    selectedTimeSlot: '7AM – 11AM',
    selectedDate: deliveryDates[0],
  };
}
