import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { Button } from '../common/Button';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { PhoneInput } from '../common/PhoneInput';
import { validateUaePhone } from './phoneValidation';

const CODE_LENGTH = 4;

type SmsCodeScreenProps = {
  phone: string;
  onPhoneChange: (value: string) => void;
  error?: string;
  isVerifying?: boolean;
  onChangeNumber: () => void;
  onContinue?: () => void;
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
  '--sms-code-title-font-size-md': string;
  '--sms-code-title-font-size-lg': string;
  '--sms-code-digit-font-size': string;
  '--sms-code-digit-font-size-md': string;
  '--sms-code-body-font-size': string;
  '--sms-code-phone-font-size': string;
};

type RingColorStyle = CSSProperties & {
  '--tw-ring-color': string;
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
  '--sms-code-title-font-size': FONT_SIZE_TOKENS[25],
  '--sms-code-title-font-size-md': FONT_SIZE_TOKENS[32],
  '--sms-code-title-font-size-lg': FONT_SIZE_TOKENS[40],
  '--sms-code-digit-font-size': FONT_SIZE_TOKENS[32],
  '--sms-code-digit-font-size-md': FONT_SIZE_TOKENS[40],
  '--sms-code-body-font-size': FONT_SIZE_TOKENS[16],
  '--sms-code-phone-font-size': FONT_SIZE_TOKENS[20],
};

function getDigitInputRingColor({
  hasError,
  isActive,
  isVisuallySelected,
}: {
  hasError: boolean;
  isActive: boolean;
  isVisuallySelected: boolean;
}) {
  if (hasError) {
    return COLOR_TOKENS.danger[500];
  }

  if (isActive || isVisuallySelected) {
    return COLOR_TOKENS.primary[500];
  }

  return COLOR_TOKENS.neutral[200];
}

export function SmsCodeScreen({
  phone,
  onPhoneChange,
  error,
  isVerifying = false,
  onChangeNumber,
  onContinue,
  onCodeChange,
  onCodeComplete,
}: SmsCodeScreenProps) {
  const [mode, setMode] = useState<SmsCodeMode>('code');
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const joinedCode = useMemo(() => code.join(''), [code]);
  const formattedPhone = `+971 ${phone}`;
  const hasError = Boolean(error);
  const isCodeComplete = joinedCode.length === CODE_LENGTH && !joinedCode.includes('');

  useEffect(() => {
    if (mode === 'code') {
      inputRefs.current[0]?.focus();
    }
  }, [mode]);

  useEffect(() => {
    onCodeChange?.(joinedCode);

    if (isCodeComplete) {
      onCodeComplete?.(joinedCode);
    }
  }, [joinedCode, isCodeComplete, onCodeChange, onCodeComplete]);

  const focusInput = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, CODE_LENGTH - 1));

    inputRefs.current[nextIndex]?.focus();
    setFocusedIndex(nextIndex);
  };

  const replaceAllWithDigit = (digit: string) => {
    const nextCode = Array(CODE_LENGTH).fill('');
    nextCode[0] = digit;

    setCode(nextCode);
    setIsAllSelected(false);

    window.requestAnimationFrame(() => {
      focusInput(1);
    });
  };

  const fillFromIndex = (startIndex: number, digits: string[]) => {
    setCode((prev) => {
      const nextCode = [...prev];

      digits.forEach((digit, offset) => {
        const targetIndex = startIndex + offset;

        if (targetIndex < CODE_LENGTH) {
          nextCode[targetIndex] = digit;
        }
      });

      return nextCode;
    });

    setIsAllSelected(false);

    const nextFocusIndex = Math.min(startIndex + digits.length, CODE_LENGTH - 1);

    window.requestAnimationFrame(() => {
      focusInput(nextFocusIndex);
    });
  };

  const handleChange = (index: number, value: string) => {
    if (isVerifying) return;

    const digits = value.replace(/\D/g, '').slice(0, CODE_LENGTH).split('');

    if (digits.length === 0) {
      setCode((prev) => {
        const nextCode = [...prev];
        nextCode[index] = '';
        return nextCode;
      });

      setIsAllSelected(false);
      return;
    }

    if (isAllSelected) {
      if (digits.length === 1) {
        replaceAllWithDigit(digits[0]);
        return;
      }

      const nextCode = Array(CODE_LENGTH).fill('');

      digits.slice(0, CODE_LENGTH).forEach((digit, digitIndex) => {
        nextCode[digitIndex] = digit;
      });

      setCode(nextCode);
      setIsAllSelected(false);

      window.requestAnimationFrame(() => {
        focusInput(Math.min(digits.length, CODE_LENGTH - 1));
      });

      return;
    }

    if (digits.length > 1) {
      fillFromIndex(index, digits);
      return;
    }

    setCode((prev) => {
      const nextCode = [...prev];
      nextCode[index] = digits[0];
      return nextCode;
    });

    setIsAllSelected(false);

    if (index < CODE_LENGTH - 1) {
      window.requestAnimationFrame(() => {
        focusInput(index + 1);
      });
    }
  };

  const handlePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (isVerifying) return;

    const digits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, CODE_LENGTH)
      .split('');

    if (digits.length === 0) return;

    if (isAllSelected) {
      const nextCode = Array(CODE_LENGTH).fill('');

      digits.forEach((digit, digitIndex) => {
        nextCode[digitIndex] = digit;
      });

      setCode(nextCode);
      setIsAllSelected(false);

      window.requestAnimationFrame(() => {
        focusInput(Math.min(digits.length, CODE_LENGTH - 1));
      });

      return;
    }

    fillFromIndex(index, digits);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isVerifying) return;

    const isSelectAllShortcut =
      (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a';

    if (isSelectAllShortcut) {
      event.preventDefault();
      setIsAllSelected(true);
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();

      if (isAllSelected) {
        setCode(Array(CODE_LENGTH).fill(''));
        setIsAllSelected(false);
        focusInput(0);
        return;
      }

      if (code[index]) {
        setCode((prev) => {
          const nextCode = [...prev];
          nextCode[index] = '';
          return nextCode;
        });

        return;
      }

      if (index > 0) {
        setCode((prev) => {
          const nextCode = [...prev];
          nextCode[index - 1] = '';
          return nextCode;
        });

        focusInput(index - 1);
      }

      return;
    }

    if (event.key === 'Delete') {
      event.preventDefault();

      if (isAllSelected) {
        setCode(Array(CODE_LENGTH).fill(''));
        setIsAllSelected(false);
        focusInput(0);
        return;
      }

      setCode((prev) => {
        const nextCode = [...prev];
        nextCode[index] = '';
        return nextCode;
      });

      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setIsAllSelected(false);
      focusInput(index - 1);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setIsAllSelected(false);
      focusInput(index + 1);
      return;
    }

    if (event.key === 'Escape') {
      if (isAllSelected) {
        event.stopPropagation();
        setIsAllSelected(false);
      }
    }
  };

  const handleChangeNumberClick = () => {
    setMode('phone');
    setIsAllSelected(false);
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
    setCode(Array(CODE_LENGTH).fill(''));
    setFocusedIndex(0);
    setIsAllSelected(false);

    window.requestAnimationFrame(() => {
      inputRefs.current[0]?.focus();
    });
  };

  const handleContinueToNextStep = () => {
    if (isVerifying) return;

    onContinue?.();
  };

  return (
    <div
      className="flex min-h-full bg-[var(--sms-code-page-bg)]"
      style={smsCodeScreenStyle}
    >
      <div className="mx-auto flex min-h-full w-full max-w-[1200px] flex-col justify-center px-[20px] pt-[24px] md:px-[32px] lg:justify-center lg:px-[32px] lg:py-[56px]">
        <div className="mx-auto flex w-full max-w-[420px] flex-col items-center md:max-w-[520px] lg:max-w-[640px]">
          <h1 className="text-center font-sans text-[length:var(--sms-code-title-font-size)] font-bold leading-[120%] text-[var(--sms-code-text)] md:text-[length:var(--sms-code-title-font-size-md)] lg:text-[length:var(--sms-code-title-font-size-lg)]">
            {mode === 'code' ? 'Enter the code from SMS' : 'Change phone number'}
          </h1>

          {mode === 'code' ? (
            <>
              <div className="mt-[32px] flex justify-center gap-[16px] md:gap-[20px]">
                {code.map((digit, index) => {
                  const isActive = focusedIndex === index;
                  const isVisuallySelected = isAllSelected && joinedCode.length > 0;
                  const ringColor = getDigitInputRingColor({
                    hasError,
                    isActive,
                    isVisuallySelected,
                  });

                  return (
                    <input
                      key={index}
                      ref={(node) => {
                        inputRefs.current[index] = node;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? 'one-time-code' : 'off'}
                      value={digit}
                      disabled={isVerifying}
                      onChange={(event) => handleChange(index, event.target.value)}
                      onPaste={(event) => handlePaste(index, event)}
                      onKeyDown={(event) => handleKeyDown(index, event)}
                      onFocus={() => {
                        setFocusedIndex(index);
                        setIsAllSelected(false);
                      }}
                      onMouseDown={() => {
                        setFocusedIndex(index);
                      }}
                      aria-label={`SMS code digit ${index + 1}`}
                      aria-invalid={hasError}
                      className={[
                        'h-[72px] w-[56px] rounded-[12px] text-center font-sans',
                        'text-[length:var(--sms-code-digit-font-size)] font-bold leading-none text-[var(--sms-code-text)]',
                        'outline-none ring-1 transition-colors disabled:cursor-not-allowed disabled:opacity-60',
                        'focus:ring-2 md:h-[88px] md:w-[72px] md:text-[length:var(--sms-code-digit-font-size-md)]',
                        isActive || isVisuallySelected
                          ? 'bg-[var(--sms-code-digit-active-bg)] ring-2'
                          : 'bg-[var(--sms-code-digit-bg)]',
                      ].join(' ')}
                      style={{ '--tw-ring-color': ringColor } as RingColorStyle}
                    />
                  );
                })}
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

              <Button
                type="button"
                variant="primary"
                size="medium"
                fullWidth
                disabled={isVerifying}
                className="mt-[40px] max-w-[420px]"
                onClick={handleContinueToNextStep}
              >
                Continue
              </Button>
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