export const DELIVERY_TIME_SLOTS = ['7AM – 11AM', '12PM – 4PM', '6PM – 10PM'] as const;

export type DeliveryTimeSlot = (typeof DELIVERY_TIME_SLOTS)[number];

export function isDeliveryTimeSlot(value: string): value is DeliveryTimeSlot {
  return (DELIVERY_TIME_SLOTS as readonly string[]).includes(value);
}
