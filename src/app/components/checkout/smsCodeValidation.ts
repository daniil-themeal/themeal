export const SMS_CODE_LENGTH = 4;

export const SMS_CODE_ERROR = 'Incorrect code. Try again.';

/** How long filled digits stay visible after a correct code before continuing. */
export const SMS_CODE_SUCCESS_HOLD_MS = 650;

export function isValidTestSmsCode(code: string): boolean {
  return code.length === SMS_CODE_LENGTH && /^(\d)\1{3}$/.test(code);
}
