export const SMS_CODE_LENGTH = 4;

export const SMS_CODE_ERROR = 'Incorrect code. Try again.';

export function isValidTestSmsCode(code: string): boolean {
  return code.length === SMS_CODE_LENGTH && /^(\d)\1{3}$/.test(code);
}
