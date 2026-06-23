import type { SerializedDeliveryDetails } from './components/checkout/deliveryDetailsTypes';

export type PhoneSessionCheckoutStep = 'plan' | 'verification' | 'delivery' | 'payment';
export type PhoneSessionDeliveryStep = 'address' | 'details';

export type PhoneSession = {
  phone: string;
  isVerified: boolean;
  checkoutStep?: PhoneSessionCheckoutStep;
  deliveryStep?: PhoneSessionDeliveryStep;
  selectedAddressId?: string;
  deliveryDetails?: SerializedDeliveryDetails;
};

const STORAGE_KEY = 'themeal_phone_session';

function isCheckoutStep(value: unknown): value is PhoneSessionCheckoutStep {
  return value === 'plan' || value === 'verification' || value === 'delivery' || value === 'payment';
}

function isDeliveryStep(value: unknown): value is PhoneSessionDeliveryStep {
  return value === 'address' || value === 'details';
}

function isSerializedDeliveryDetails(value: unknown): value is SerializedDeliveryDetails {
  if (!value || typeof value !== 'object') return false;

  const details = value as Partial<SerializedDeliveryDetails>;

  return (
    typeof details.apartment === 'string' &&
    typeof details.instructions === 'string' &&
    typeof details.fullName === 'string' &&
    typeof details.email === 'string' &&
    typeof details.leaveAtDoor === 'boolean' &&
    typeof details.selectedTimeSlot === 'string' &&
    typeof details.selectedDate === 'string'
  );
}

export function loadPhoneSession(): PhoneSession | null {
  if (typeof sessionStorage === 'undefined') return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<PhoneSession>;
    if (typeof parsed.phone !== 'string' || typeof parsed.isVerified !== 'boolean') {
      return null;
    }

    const session: PhoneSession = {
      phone: parsed.phone,
      isVerified: parsed.isVerified,
    };

    if (isCheckoutStep(parsed.checkoutStep)) {
      session.checkoutStep = parsed.checkoutStep;
    }
    if (isDeliveryStep(parsed.deliveryStep)) {
      session.deliveryStep = parsed.deliveryStep;
    }
    if (typeof parsed.selectedAddressId === 'string') {
      session.selectedAddressId = parsed.selectedAddressId;
    }
    if (isSerializedDeliveryDetails(parsed.deliveryDetails)) {
      session.deliveryDetails = parsed.deliveryDetails;
    }

    return session;
  } catch {
    return null;
  }
}

export function savePhoneSession(session: PhoneSession): void {
  if (typeof sessionStorage === 'undefined') return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore quota / private mode errors
  }
}

export function clearPhoneSession(): void {
  if (typeof sessionStorage === 'undefined') return;

  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function mergePhoneSession(
  current: PhoneSession | null,
  patch: Partial<PhoneSession>,
): PhoneSession {
  return {
    phone: patch.phone ?? current?.phone ?? '',
    isVerified: patch.isVerified ?? current?.isVerified ?? false,
    checkoutStep: patch.checkoutStep ?? current?.checkoutStep,
    deliveryStep: patch.deliveryStep ?? current?.deliveryStep,
    selectedAddressId: patch.selectedAddressId ?? current?.selectedAddressId,
    deliveryDetails: patch.deliveryDetails ?? current?.deliveryDetails,
  };
}
