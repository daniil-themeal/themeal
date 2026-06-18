import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

import { Button } from '../common/Button';
import { SmsCodeInput } from '../common/SmsCodeInput';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import {
  CHECKOUT_FONT_CLAMP_25_40,
  CHECKOUT_FONT_CLAMP_32_40,
} from './checkoutSpacing';
import { PhoneInput } from '../common/PhoneInput';
import { validateUaePhone } from './phoneValidation';

type SmsCodeScreenProps = {
  phone: string;
  onPhoneChange: (value: string) => void;
  error?: string;
  isVerifying?: boolean;
  onChangeNumber: () => void;
  onCodeChange?: (code: string) => void;
  onCodeComplete?: (code: string) => void;
};

type SmsCodeMode = 'code' | 'phone';

type SmsCodeScreenCssVariables = CSSProperties & {
  '--sms-code-page-bg': string;
  '--sms-code-text': string;
  '--sms-code-muted': string;
  '--sms-code-primary': string;
  '--sms-code-primary-hover': string;
  '--sms-code-danger': string;
  '--sms-code-digit-bg': string;
  '--sms-code-digit-active-bg': string;
  '--sms-code-digit-ring': string;
  '--sms-code-field-bg': string;
  '--sms-code-field-ring': string;
  '--sms-code-placeholder': string;
  '--sms-code-title-font-size': string;
  '--sms-code-digit-font-size': string;
  '--sms-code-body-font-size': string;
  '--sms-code-phone-font-size': string;
};

const smsCodeScreenStyle: SmsCodeScreenCssVariables = {
  '--sms-code-page-bg': COLOR_TOKENS.base.cream,
  '--sms-code-text': COLOR_TOKENS.neutral[900],
  '--sms-code-muted': COLOR_TOKENS.neutral[500],
  '--sms-code-primary': COLOR_TOKENS.primary[500],
  '--sms-code-primary-hover': COLOR_TOKENS.primary[600],
  '--sms-code-danger': COLOR_TOKENS.danger[500],
  '--sms-code-digit-bg': COLOR_TOKENS.neutral[75],
  '--sms-code-digit-active-bg': COLOR_TOKENS.neutral[100],
  '--sms-code-digit-ring': COLOR_TOKENS.neutral[200],
  '--sms-code-field-bg': COLOR_TOKENS.neutral[75],
  '--sms-code-field-ring': COLOR_TOKENS.neutral[200],
  '--sms-code-placeholder': COLOR_TOKENS.neutral[200],
  '--sms-code-title-font-size': CHECKOUT_FONT_CLAMP_25_40,
  '--sms-code-digit-font-size': CHECKOUT_FONT_CLAMP_32_40,
  '--sms-code-body-font-size': FONT_SIZE_TOKENS[16],
  '--sms-code-phone-font-size': FONT_SIZE_TOKENS[20],
};

export function SmsCodeScreen({
  phone,
  onPhoneChange,
  error,
  isVerifying = false,
  onChangeNumber,
  onCodeChange,
  onCodeComplete,
}: SmsCodeScreenProps) {
  const [mode, setMode] = useState<SmsCodeMode>('code');
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [code, setCode] = useState('');

  const formattedPhone = `+971 ${phone}`;
  const hasError = Boolean(error);

  useEffect(() => {
    if (mode === 'code') {
      setCode('');
    }
  }, [mode]);

  const handleCodeChange = (nextCode: string) => {
    setCode(nextCode);
    onCodeChange?.(nextCode);
  };

  const handleChangeNumberClick = () => {
    setMode('phone');
    setPhoneError(undefined);
  };

  const handlePhoneChange = (value: string) => {
    onPhoneChange(value);
    setPhoneError(undefined);
  };

  const handleContinueWithPhone = () => {
    const phoneValidation = validateUaePhone(phone);

    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error);
      return;
    }

    if (phoneValidation.formatted) {
      onPhoneChange(phoneValidation.formatted);
    }

    setMode('code');
    setCode('');
  };

  return (
    <div
      className="flex min-h-full bg-[var(--sms-code-page-bg)]"
      style={smsCodeScreenStyle}
    >
      <div className="mx-auto flex min-h-full w-full max-w-[1200px] flex-col justify-center px-[20px] pt-[24px] md:px-[32px] lg:justify-center lg:px-[32px] lg:py-[56px]">
        <div className="mx-auto flex w-full max-w-[420px] flex-col items-center md:max-w-[520px] lg:max-w-[640px]">
          <h1 className="text-center font-sans text-[length:var(--sms-code-title-font-size)] font-bold leading-[120%] text-[var(--sms-code-text)]">
            {mode === 'code' ? 'Enter the code from SMS' : 'Change phone number'}
          </h1>

          {mode === 'code' ? (
            <>
              <div className="mt-[32px] w-full">
                <SmsCodeInput
                  value={code}
                  onChange={handleCodeChange}
                  onComplete={onCodeComplete}
                  error={hasError}
                  disabled={isVerifying}
                  autoFocus
                />
              </div>

              {error ? (
                <p className="mt-[12px] text-center font-sans text-[length:var(--sms-code-body-font-size)] font-semibold leading-[140%] text-[var(--sms-code-danger)]">
                  {error}
                </p>
              ) : null}

              <p className="mt-[28px] text-center font-sans text-[length:var(--sms-code-body-font-size)] font-semibold leading-[140%] text-[var(--sms-code-muted)]">
                <button
                  type="button"
                  disabled={isVerifying}
                  className="cursor-pointer font-sans font-bold text-[var(--sms-code-primary)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Send again
                </button>{' '}
                the code after 60 seconds
              </p>

              <p className="mt-[12px] text-center font-sans text-[length:var(--sms-code-body-font-size)] font-semibold leading-[140%] text-[var(--sms-code-muted)]">
                <button
                  type="button"
                  onClick={handleChangeNumberClick}
                  disabled={isVerifying}
                  className="cursor-pointer font-sans font-bold text-[var(--sms-code-primary)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Change number
                </button>{' '}
                <span className="font-sans font-bold">
                  {formattedPhone}
                </span>
              </p>
            </>
          ) : (
            <div className="mt-[32px] flex w-full max-w-[420px] flex-col gap-[16px]">
              <PhoneInput
                id="sms-code-phone"
                value={phone}
                onChange={handlePhoneChange}
                error={phoneError}
              />

              <Button
                type="button"
                variant="primary"
                size="medium"
                fullWidth
                onClick={handleContinueWithPhone}
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
