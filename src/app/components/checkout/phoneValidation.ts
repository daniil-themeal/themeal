const UAE_MOBILE_PREFIXES = ['50', '52', '54', '55', '56', '58'] as const;

export function formatUaePhoneInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 9);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 5) {
    return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
}

export function normalizeUaePhone(value: string) {
  const digits = value.replace(/\D/g, '');

  if (digits.length !== 9) {
    return null;
  }

  return `+971${digits}`;
}

export function validateUaePhone(value: string) {
  const digits = value.replace(/\D/g, '');

  if (!digits) {
    return {
      isValid: false,
      error: 'Enter your phone number',
    } as const;
  }

  if (digits.length !== 9) {
    return {
      isValid: false,
      error: 'Enter a valid UAE mobile number',
    } as const;
  }

  const prefix = digits.slice(0, 2);

  if (!UAE_MOBILE_PREFIXES.includes(prefix as (typeof UAE_MOBILE_PREFIXES)[number])) {
    return {
      isValid: false,
      error: 'Enter a valid UAE mobile number',
    } as const;
  }

  return {
    isValid: true,
    error: undefined,
    normalized: `+971${digits}`,
    formatted: formatUaePhoneInput(digits),
  } as const;
}
