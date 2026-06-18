import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_CLAMP_32_40 } from './fontSizeClampTokens';
import { SMS_CODE_LENGTH } from '../checkout/smsCodeValidation';

type RingColorStyle = CSSProperties & {
  '--tw-ring-color': string;
};

type SmsCodeInputProps = {
  value: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  size?: 'default' | 'compact';
  autoFocus?: boolean;
  /** Delay before focusing the first digit (e.g. modal enter animation). */
  autoFocusDelay?: number;
  className?: string;
};

function getDigitInputRingColor({
  hasError,
  isSuccess,
  isActive,
  isVisuallySelected,
}: {
  hasError: boolean;
  isSuccess: boolean;
  isActive: boolean;
  isVisuallySelected: boolean;
}) {
  if (hasError) {
    return COLOR_TOKENS.danger[500];
  }

  if (isSuccess || isActive || isVisuallySelected) {
    return COLOR_TOKENS.primary[500];
  }

  return COLOR_TOKENS.neutral[200];
}

function valueToDigits(value: string): string[] {
  const digits = value.replace(/\D/g, '').slice(0, SMS_CODE_LENGTH).split('');
  const result = Array(SMS_CODE_LENGTH).fill('');

  digits.forEach((digit, index) => {
    result[index] = digit;
  });

  return result;
}

export function SmsCodeInput({
  value,
  onChange,
  onComplete,
  error = false,
  success = false,
  disabled = false,
  size = 'default',
  autoFocus = false,
  autoFocusDelay = 0,
  className = '',
}: SmsCodeInputProps) {
  const code = useMemo(() => valueToDigits(value), [value]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const lastCompletedCodeRef = useRef<string | null>(null);

  const joinedCode = useMemo(() => code.join(''), [code]);

  const focusFirstDigit = useCallback(() => {
    const input = inputRefs.current[0];

    if (!input || disabled) {
      return false;
    }

    input.focus({ preventScroll: true });
    setFocusedIndex(0);
    return true;
  }, [disabled]);

  useEffect(() => {
    if (!autoFocus || disabled) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let rafId: number | undefined;

    const attemptFocus = (retriesLeft = 4) => {
      rafId = requestAnimationFrame(() => {
        if (focusFirstDigit() || retriesLeft <= 0) {
          return;
        }

        timeoutId = window.setTimeout(() => {
          attemptFocus(retriesLeft - 1);
        }, 16);
      });
    };

    timeoutId = window.setTimeout(() => {
      attemptFocus();
    }, autoFocusDelay);

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (rafId !== undefined) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [autoFocus, autoFocusDelay, disabled, focusFirstDigit]);

  useEffect(() => {
    if (error) {
      lastCompletedCodeRef.current = null;
    }
  }, [error]);

  const tryComplete = (nextCode: string[]) => {
    const nextJoined = nextCode.join('');
    const isComplete =
      nextJoined.length === SMS_CODE_LENGTH && !nextCode.includes('');

    if (!isComplete) {
      lastCompletedCodeRef.current = null;
      return;
    }

    if (lastCompletedCodeRef.current === nextJoined) return;

    lastCompletedCodeRef.current = nextJoined;
    onComplete?.(nextJoined);
  };

  const setCode = (nextCode: string[]) => {
    const nextJoined = nextCode.join('');
    onChange(nextJoined);
    tryComplete(nextCode);
  };

  const focusInput = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, SMS_CODE_LENGTH - 1));

    inputRefs.current[nextIndex]?.focus();
    setFocusedIndex(nextIndex);
  };

  const replaceAllWithDigit = (digit: string) => {
    const nextCode = Array(SMS_CODE_LENGTH).fill('');
    nextCode[0] = digit;

    setCode(nextCode);
    setIsAllSelected(false);

    window.requestAnimationFrame(() => {
      focusInput(1);
    });
  };

  const fillFromIndex = (startIndex: number, digits: string[]) => {
    const nextCode = [...code];

    digits.forEach((digit, offset) => {
      const targetIndex = startIndex + offset;

      if (targetIndex < SMS_CODE_LENGTH) {
        nextCode[targetIndex] = digit;
      }
    });

    setCode(nextCode);
    setIsAllSelected(false);

    const nextFocusIndex = Math.min(startIndex + digits.length, SMS_CODE_LENGTH - 1);

    window.requestAnimationFrame(() => {
      focusInput(nextFocusIndex);
    });
  };

  const handleChange = (index: number, nextValue: string) => {
    if (disabled) return;

    const digits = nextValue.replace(/\D/g, '').slice(0, SMS_CODE_LENGTH).split('');

    if (digits.length === 0) {
      const nextCode = [...code];
      nextCode[index] = '';
      setCode(nextCode);
      setIsAllSelected(false);
      return;
    }

    if (isAllSelected) {
      if (digits.length === 1) {
        replaceAllWithDigit(digits[0]);
        return;
      }

      const nextCode = Array(SMS_CODE_LENGTH).fill('');

      digits.slice(0, SMS_CODE_LENGTH).forEach((digit, digitIndex) => {
        nextCode[digitIndex] = digit;
      });

      setCode(nextCode);
      setIsAllSelected(false);

      window.requestAnimationFrame(() => {
        focusInput(Math.min(digits.length, SMS_CODE_LENGTH - 1));
      });

      return;
    }

    if (digits.length > 1) {
      fillFromIndex(index, digits);
      return;
    }

    const nextCode = [...code];
    nextCode[index] = digits[0];
    setCode(nextCode);
    setIsAllSelected(false);

    if (index < SMS_CODE_LENGTH - 1) {
      window.requestAnimationFrame(() => {
        focusInput(index + 1);
      });
    }
  };

  const handlePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (disabled) return;

    const digits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, SMS_CODE_LENGTH)
      .split('');

    if (digits.length === 0) return;

    if (isAllSelected) {
      const nextCode = Array(SMS_CODE_LENGTH).fill('');

      digits.forEach((digit, digitIndex) => {
        nextCode[digitIndex] = digit;
      });

      setCode(nextCode);
      setIsAllSelected(false);

      window.requestAnimationFrame(() => {
        focusInput(Math.min(digits.length, SMS_CODE_LENGTH - 1));
      });

      return;
    }

    fillFromIndex(index, digits);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

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
        setCode(Array(SMS_CODE_LENGTH).fill(''));
        setIsAllSelected(false);
        focusInput(0);
        return;
      }

      if (code[index]) {
        const nextCode = [...code];
        nextCode[index] = '';
        setCode(nextCode);
        return;
      }

      if (index > 0) {
        const nextCode = [...code];
        nextCode[index - 1] = '';
        setCode(nextCode);
        focusInput(index - 1);
      }

      return;
    }

    if (event.key === 'Delete') {
      event.preventDefault();

      if (isAllSelected) {
        setCode(Array(SMS_CODE_LENGTH).fill(''));
        setIsAllSelected(false);
        focusInput(0);
        return;
      }

      const nextCode = [...code];
      nextCode[index] = '';
      setCode(nextCode);
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

    if (event.key === 'Escape' && isAllSelected) {
      event.stopPropagation();
      setIsAllSelected(false);
    }
  };

  const isCompact = size === 'compact';
  const isSuccess = success && !error;

  return (
    <div
      className={[
        'flex justify-center',
        isCompact ? 'gap-[8px]' : 'gap-[16px] md:gap-[20px]',
        className,
      ].join(' ')}
    >
      {code.map((digit, index) => {
        const isActive = focusedIndex === index;
        const isVisuallySelected = isAllSelected && joinedCode.length > 0;
        const ringColor = getDigitInputRingColor({
          hasError: error,
          isSuccess,
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
            disabled={disabled}
            autoFocus={autoFocus && index === 0 && autoFocusDelay === 0}
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
            aria-invalid={error}
            className={[
              'rounded-[12px] text-center font-sans font-bold leading-none',
              'outline-none ring-1 transition-colors disabled:cursor-not-allowed',
              isSuccess ? 'disabled:opacity-100' : 'disabled:opacity-60',
              'focus:ring-2',
              isCompact
                ? [
                    'lead-sms-digit h-[56px] min-w-0 flex-1 text-[length:var(--fs-16)]',
                    isSuccess
                      ? 'lead-sms-digit--success'
                      : isActive || isVisuallySelected
                        ? 'lead-sms-digit--active'
                        : '',
                  ].join(' ')
                : [
                    'h-[72px] w-[56px] text-[length:var(--sms-code-digit-font-size)] md:h-[88px] md:w-[72px]',
                    isSuccess
                      ? 'bg-[var(--sms-code-digit-success-bg)] ring-2'
                      : isActive || isVisuallySelected
                        ? 'bg-[var(--sms-code-digit-active-bg)] ring-2'
                        : 'bg-[var(--sms-code-digit-bg)]',
                  ].join(' '),
              isSuccess
                ? 'text-[var(--sms-code-digit-success-text)]'
                : !isCompact
                  ? 'text-[var(--sms-code-text)]'
                  : 'text-[var(--ink)]',
            ].join(' ')}
            style={
              {
                '--tw-ring-color': ringColor,
                ...(isCompact
                  ? {}
                  : { '--sms-code-digit-font-size': FONT_SIZE_CLAMP_32_40 }),
                ...(isCompact ? {} : {}),
              } as RingColorStyle & CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
