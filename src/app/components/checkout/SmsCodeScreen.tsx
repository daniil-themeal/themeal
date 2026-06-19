import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { Button } from '../common/Button';
import { InputButtonRow } from '../common/InputButtonRow';
import { SmsCodeInput } from '../common/SmsCodeInput';
import { XIcon } from '../common/icons';
import { iconColorClassName, iconColorStyle } from '../common/iconColorTokens';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import {
  CHECKOUT_CARD_PADDING_CLAMP,
  CHECKOUT_FONT_CLAMP_20_25,
  CHECKOUT_FONT_CLAMP_25_40,
  CHECKOUT_FONT_CLAMP_32_40,
  MEAL_DETAIL_CONTENT_PADDING_CLAMP,
} from './checkoutSpacing';
import { PhoneInput } from '../common/PhoneInput';
import { MODAL_SHELL_ENTER_ANIMATION_MS } from '../common/ModalShell';
import { validateUaePhone } from './phoneValidation';

type SmsCodeScreenProps = {
  phone: string;
  onPhoneChange: (value: string) => void;
  onPhoneContinue?: (normalizedPhone: string) => void;
  error?: string;
  isVerifying?: boolean;
  layout?: 'page' | 'modal';
  onClose?: () => void;
  onCodeChange?: (code: string) => void;
  onCodeComplete?: (code: string) => void;
};

type SmsCodeMode = 'code' | 'phone';

function getInitialMode(phone: string): SmsCodeMode {
  return validateUaePhone(phone).isValid ? 'code' : 'phone';
}

type SmsCodeScreenCssVariables = CSSProperties & {
  '--checkout-card-padding': string;
  '--meal-detail-content-p': string;
  '--full-menu-bg': string;
  '--full-menu-border': string;
  '--full-menu-title': string;
  '--full-menu-close-bg': string;
  '--full-menu-close-bg-hover': string;
  '--full-menu-heading-font-size': string;
  '--sms-code-page-bg': string;
  '--sms-code-text': string;
  '--sms-code-muted': string;
  '--sms-code-primary': string;
  '--sms-code-primary-hover': string;
  '--sms-code-danger': string;
  '--sms-code-digit-bg': string;
  '--sms-code-digit-active-bg': string;
  '--sms-code-digit-success-bg': string;
  '--sms-code-digit-success-text': string;
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
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--meal-detail-content-p': MEAL_DETAIL_CONTENT_PADDING_CLAMP,
  '--full-menu-bg': COLOR_TOKENS.base.white,
  '--full-menu-border': COLOR_TOKENS.neutral[100],
  '--full-menu-title': COLOR_TOKENS.neutral[900],
  '--full-menu-close-bg': COLOR_TOKENS.neutral[50],
  '--full-menu-close-bg-hover': COLOR_TOKENS.neutral[75],
  '--full-menu-heading-font-size': CHECKOUT_FONT_CLAMP_20_25,
  '--sms-code-page-bg': COLOR_TOKENS.base.cream,
  '--sms-code-text': COLOR_TOKENS.neutral[900],
  '--sms-code-muted': COLOR_TOKENS.neutral[500],
  '--sms-code-primary': COLOR_TOKENS.primary[500],
  '--sms-code-primary-hover': COLOR_TOKENS.primary[600],
  '--sms-code-danger': COLOR_TOKENS.danger[500],
  '--sms-code-digit-bg': COLOR_TOKENS.neutral[75],
  '--sms-code-digit-active-bg': COLOR_TOKENS.neutral[100],
  '--sms-code-digit-success-bg': COLOR_TOKENS.primary[500],
  '--sms-code-digit-success-text': COLOR_TOKENS.base.white,
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
  onPhoneContinue,
  error,
  isVerifying = false,
  layout = 'page',
  onClose,
  onCodeChange,
  onCodeComplete,
}: SmsCodeScreenProps) {
  const isModal = layout === 'modal';
  const [mode, setMode] = useState<SmsCodeMode>(() => getInitialMode(phone));
  const openedDirectlyInCodeModeRef = useRef(mode === 'code');
  const [isChangingNumber, setIsChangingNumber] = useState(false);
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

  const handleCodeComplete = (completedCode: string) => {
    setCode(completedCode);
    onCodeComplete?.(completedCode);
  };

  const handleChangeNumberClick = () => {
    setIsChangingNumber(true);
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

    onPhoneContinue?.(phoneValidation.normalized);
    setIsChangingNumber(false);
    setMode('code');
    setCode('');
  };

  const phoneTitle = isChangingNumber ? 'Change phone number' : 'Enter your phone number';
  const screenTitle = mode === 'code' ? 'Enter the code from SMS' : phoneTitle;
  const showModalHeader = isModal && Boolean(onClose);

  const rootClassName = isModal
    ? 'flex min-h-0 flex-1 flex-col overflow-hidden'
    : 'flex min-h-full bg-[var(--sms-code-page-bg)]';

  const containerClassName = isModal
    ? 'flex min-h-0 flex-1 flex-col overflow-hidden'
    : 'mx-auto flex min-h-full w-full max-w-[1200px] flex-col justify-center px-[20px] pt-[24px] md:px-[32px] lg:justify-center lg:px-[32px] lg:py-[56px]';

  const contentClassName = isModal
    ? [
        'flex w-full flex-col',
        showModalHeader
          ? 'p-[length:var(--checkout-card-padding)] md:p-[length:var(--meal-detail-content-p)]'
          : '',
      ]
        .filter(Boolean)
        .join(' ')
    : 'mx-auto flex w-full max-w-[420px] flex-col items-center md:max-w-[520px] lg:max-w-[640px]';

  const titleClassName = isModal
    ? 'text-center font-sans text-[20px] font-bold leading-[120%] text-[var(--sms-code-text)] sm:text-[length:var(--sms-code-title-font-size)]'
    : 'text-center font-sans text-[length:var(--sms-code-title-font-size)] font-bold leading-[120%] text-[var(--sms-code-text)]';

  const codeSectionMt = isModal ? (showModalHeader ? '' : 'mt-[24px]') : 'mt-[32px]';
  const phoneSectionMt = isModal ? (showModalHeader ? '' : 'mt-[24px]') : 'mt-[32px]';
  const resendMt = isModal ? 'mt-[20px]' : 'mt-[28px]';
  const smsCodeAutoFocusDelay =
    isModal && openedDirectlyInCodeModeRef.current ? MODAL_SHELL_ENTER_ANIMATION_MS : 0;

  return (
    <div className={rootClassName} style={smsCodeScreenStyle}>
      {showModalHeader ? (
        <div className="flex h-[56px] shrink-0 items-center gap-[8px] border-b border-[var(--full-menu-border)] bg-[var(--full-menu-bg)]">
          <p className="min-w-0 flex-1 pl-[16px] font-sans text-[length:var(--full-menu-heading-font-size)] font-bold leading-[130%] text-[var(--full-menu-title)] md:pl-[20px]">
            {screenTitle}
          </p>

          <button
            type="button"
            onClick={onClose}
            className="group flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
            aria-label="Close"
          >
            <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--full-menu-close-bg)] transition-colors duration-150 group-hover:bg-[var(--full-menu-close-bg-hover)]">
              <span className={iconColorClassName.emphasis} style={iconColorStyle.emphasis}>
                <XIcon size={16} />
              </span>
            </span>
          </button>
        </div>
      ) : null}

      <div className={containerClassName}>
        <div className={contentClassName}>
          {!showModalHeader ? (
            <h1 className={titleClassName}>
              {screenTitle}
            </h1>
          ) : null}

          {mode === 'code' ? (
            <>
              <div className={`${codeSectionMt} w-full`}>
                <SmsCodeInput
                  value={code}
                  onChange={handleCodeChange}
                  onComplete={handleCodeComplete}
                  error={hasError}
                  success={isVerifying}
                  disabled={isVerifying}
                  autoFocus
                  autoFocusDelay={smsCodeAutoFocusDelay}
                />
              </div>

              {error ? (
                <p className="mt-[12px] text-center font-sans text-[length:var(--sms-code-body-font-size)] font-semibold leading-[140%] text-[var(--sms-code-danger)]">
                  {error}
                </p>
              ) : null}

              <p className={`${resendMt} text-center font-sans text-[length:var(--sms-code-body-font-size)] font-semibold leading-[140%] text-[var(--sms-code-muted)]`}>
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
          ) : isModal ? (
            <InputButtonRow
              rowBreakpoint={400}
              align="start"
              className={phoneSectionMt}
              input={
                <PhoneInput
                  id="sms-code-phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  error={phoneError}
                  className="w-full"
                />
              }
              action={
                <Button
                  type="button"
                  variant="primary"
                  size="medium"
                  className="w-full @[400px]:w-auto @[400px]:shrink-0"
                  onClick={handleContinueWithPhone}
                >
                  Continue
                </Button>
              }
            />
          ) : (
            <div className={`${phoneSectionMt} flex w-full flex-col gap-[16px]`}>
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
