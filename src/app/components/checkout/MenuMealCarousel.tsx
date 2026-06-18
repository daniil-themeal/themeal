import { useEffect, useMemo, useRef, useState } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';

const CODE_LENGTH = 4;

export function SmsCodeScreen({
  onChangeNumber,
  onCodeComplete,
}: {
  onChangeNumber: () => void;
  onCodeComplete?: (code: string) => void;
}) {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const joinedCode = useMemo(() => code.join(''), [code]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (joinedCode.length === CODE_LENGTH && !joinedCode.includes('')) {
      onCodeComplete?.(joinedCode);
    }
  }, [joinedCode, onCodeComplete]);

  const setDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);

    setCode((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedCode = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, CODE_LENGTH);

    if (!pastedCode) return;

    const nextCode = Array(CODE_LENGTH).fill('');

    pastedCode.split('').forEach((digit, index) => {
      nextCode[index] = digit;
    });

    setCode(nextCode);

    const nextFocusIndex = Math.min(pastedCode.length, CODE_LENGTH - 1);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="min-h-full" style={{ backgroundColor: COLOR_TOKENS.base.cream }}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col px-[20px] pt-[56px] pb-[120px] md:px-[24px] lg:px-[32px]">
        <div className="mx-auto flex w-full max-w-[420px] flex-col items-center">
          <div className="w-full rounded-[16px] bg-white px-[20px] py-[32px] md:px-[24px] md:py-[40px]">
            <h1 className="font-quicksand-bold text-[24px] leading-[1.2] text-[#383e48] text-center md:text-[28px]">
              Enter the code from SMS
            </h1>

            <div className="mt-[28px] flex justify-center gap-[10px]">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(node) => {
                    inputRefs.current[index] = node;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  value={digit}
                  onChange={(event) => setDigit(index, event.target.value)}
                  onPaste={handlePaste}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  aria-label={`SMS code digit ${index + 1}`}
                  className="h-[56px] w-[56px] rounded-[12px] bg-[#f3f4f7] text-center font-quicksand-bold text-[24px] leading-[1.3] text-[#383e48] outline-none ring-1 ring-transparent transition-shadow focus:ring-2 focus:ring-[#9a38ef] md:h-[64px] md:w-[64px]"
                />
              ))}
            </div>

            <p className="mt-[24px] text-center font-quicksand-medium text-[14px] leading-[1.4] text-[#8594ac]">
              Send again the code after 60 seconds
            </p>

            <button
              type="button"
              onClick={onChangeNumber}
              className="mt-[12px] w-full cursor-pointer text-center font-quicksand-bold text-[14px] leading-[1.4] text-[#9a38ef]"
            >
              Change number in UAE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}