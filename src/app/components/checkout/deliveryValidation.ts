import type { DeliveryDetailsData } from './deliveryDetailsTypes';

export type DeliveryDetailsFieldErrors = {
  apartment?: string;
  fullName?: string;
  email?: string;
  selectedTimeSlot?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateDeliveryDetails(details: DeliveryDetailsData) {
  const errors: DeliveryDetailsFieldErrors = {};

  if (!details.apartment.trim()) {
    errors.apartment = 'Enter apartment or villa number';
  }

  if (!details.fullName.trim()) {
    errors.fullName = 'Enter your full name';
  }

  const email = details.email.trim();

  if (!email) {
    errors.email = 'Enter your e-mail';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid e-mail address';
  }

  if (!details.selectedTimeSlot) {
    errors.selectedTimeSlot = 'Select delivery time';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  } as const;
}
