export type PhoneSessionCheckoutStep = 'plan' | 'verification' | 'delivery' | 'payment';
export type PhoneSessionDeliveryStep = 'address' | 'details';

export type PhoneSession = {
  phone: string;
  isVerified: boolean;
  checkoutStep?: PhoneSessionCheckoutStep;
  deliveryStep?: PhoneSessionDeliveryStep;
};

const STORAGE_KEY = 'themeal_phone_session';

function isCheckoutStep(value: unknown): value is PhoneSessionCheckoutStep {
  return value === 'plan' || value === 'verification' || value === 'delivery' || value === 'payment';
}

function isDeliveryStep(value: unknown): value is PhoneSessionDeliveryStep {
  return value === 'address' || value === 'details';
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
  };
}
