import type { DeliveryDetailsData } from './deliveryDetailsTypes';

export type DeliveryDetailsFieldErrors = {
  apartment?: string;
  fullName?: string;
  email?: string;
  selectedTimeSlot?: string;
};

export type DeliveryDetailsFieldKey = keyof DeliveryDetailsFieldErrors;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isApartmentValid(value: string) {
  return value.trim().length > 0;
}

export function isFullNameValid(value: string) {
  return value.trim().length > 0;
}

export function isEmailFieldValid(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function getDeliveryEmailFieldError(
  email: string,
  { requireValue = true }: { requireValue?: boolean } = {},
): string | undefined {
  const trimmed = email.trim();

  if (!trimmed) {
    return requireValue ? 'Enter your e-mail' : undefined;
  }

  if (!isEmailFieldValid(trimmed)) {
    return 'Enter a valid e-mail address';
  }

  return undefined;
}

export function getDeliveryFieldError(
  field: DeliveryDetailsFieldKey,
  details: DeliveryDetailsData,
): string | undefined {
  if (field === 'apartment') {
    return isApartmentValid(details.apartment) ? undefined : 'Enter apartment or villa number';
  }

  if (field === 'fullName') {
    return isFullNameValid(details.fullName) ? undefined : 'Enter your full name';
  }

  if (field === 'email') {
    return getDeliveryEmailFieldError(details.email);
  }

  return details.selectedTimeSlot ? undefined : 'Select delivery time';
}

const DELIVERY_FIELD_KEYS: DeliveryDetailsFieldKey[] = [
  'apartment',
  'fullName',
  'email',
  'selectedTimeSlot',
];

export function validateDeliveryDetails(details: DeliveryDetailsData) {
  const errors: DeliveryDetailsFieldErrors = {};

  for (const field of DELIVERY_FIELD_KEYS) {
    const error = getDeliveryFieldError(field, details);

    if (error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  } as const;
}
