import type { DeliveryDetailsData } from './deliveryDetailsTypes';
import {
  getDeliveryEmailFieldError,
  validateDeliveryDetails,
  type DeliveryDetailsFieldErrors,
} from './deliveryValidation';

export type DeliveryTextField = 'apartment' | 'fullName' | 'email';

export type DeliveryFormValidationState = {
  submitAttempted: boolean;
  touchedFields: DeliveryTextField[];
};

export const DELIVERY_TEXT_FIELDS: DeliveryTextField[] = ['apartment', 'fullName', 'email'];

export function createInitialDeliveryFormValidation(): DeliveryFormValidationState {
  return {
    submitAttempted: false,
    touchedFields: [],
  };
}

export function isDeliveryFormValidationState(
  value: unknown,
): value is DeliveryFormValidationState {
  if (!value || typeof value !== 'object') return false;

  const state = value as Partial<DeliveryFormValidationState>;

  if (typeof state.submitAttempted !== 'boolean') return false;
  if (!Array.isArray(state.touchedFields)) return false;

  return state.touchedFields.every(
    (field) => field === 'apartment' || field === 'fullName' || field === 'email',
  );
}

export function restoreDeliveryFieldErrors(
  deliveryDetails: DeliveryDetailsData,
  validation: DeliveryFormValidationState,
): DeliveryDetailsFieldErrors {
  if (validation.submitAttempted) {
    return validateDeliveryDetails(deliveryDetails).errors;
  }

  const touchedFields = new Set(validation.touchedFields);

  if (!touchedFields.has('email')) {
    return {};
  }

  const emailError = getDeliveryEmailFieldError(deliveryDetails.email, { requireValue: false });

  return emailError ? { email: emailError } : {};
}
