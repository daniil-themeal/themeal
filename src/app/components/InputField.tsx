import { useState } from 'react';
import svgPaths from "../../imports/InputTextFieldNew/svg-1z5a37oa92";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  success?: boolean;
  type?: 'text' | 'email' | 'password' | 'tel';
}

export default function InputField({
  label,
  value,
  onChange,
  placeholder = '',
  error,
  success,
  type = 'text'
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Определяем состояние и стили
  const hasError = !!error;
  const hasSuccess = success && !hasError;
  const isDefault = !hasError && !hasSuccess;

  const bgColor = hasError
    ? 'bg-[#fde9e9]'
    : hasSuccess
    ? 'bg-[#f2fbeb]'
    : 'bg-[#f3f4f7]';

  const borderColor = hasError
    ? 'border-[#ec221f]'
    : hasSuccess
    ? 'border-[#7dd336]'
    : 'border-transparent';

  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      {/* Label */}
      <div className="relative shrink-0 w-full">
        <div className="content-stretch flex gap-[3px] items-baseline px-[2px] relative size-full">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-quicksand-semibold leading-[1.2] min-w-px not-italic relative text-[#8594ac] text-[14px] tracking-[0.14px] uppercase">
            {label}
          </p>
        </div>
      </div>

      {/* Input Container */}
      <div className={`${bgColor} h-[56px] relative rounded-[8px] shrink-0 w-full`}>
        <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
          <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative">
            {/* Icon Left - Mail/Location icon */}
            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[56px]">
              <div className="overflow-clip relative shrink-0 size-[24px]">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[19.556px] left-1/2 top-1/2 w-[16px]">
                  <div className="absolute inset-[-6.39%_-7.81%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5 22.0556">
                      <g>
                        <path d={svgPaths.p71ee200} stroke="#8594AC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                        <path d={svgPaths.p30e57640} stroke="#8594AC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Field */}
            <div className="content-stretch flex flex-[1_0_0] h-[56px] items-center min-w-px relative">
              <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className="bg-transparent border-none outline-none flex-[1_0_0] font-quicksand-semibold leading-[1.3] min-w-px text-[#383e48] text-[20px] h-full px-2"
              />
            </div>

            {/* Icon Right - Clear/Success/Error */}
            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[56px]">
              {hasSuccess ? (
                // Success checkmark
                <div className="overflow-clip relative shrink-0 size-[24px]">
                  <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4">
                    <div className="absolute inset-[-13.64%_-9.38%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 14">
                        <path d="M17.5 1.5L6.5 12.5L1.5 7.5" stroke="#72C031" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : value ? (
                // Clear button (X icon)
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="overflow-clip relative shrink-0 size-[24px] cursor-pointer hover:opacity-70 transition-opacity"
                >
                  <div className="absolute inset-1/4">
                    <div className="absolute inset-[-10.42%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5 14.5">
                        <path d={svgPaths.pf54ce80} stroke="#C7CED9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                      </svg>
                    </div>
                  </div>
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Border overlay for error/success states */}
        {!isDefault && (
          <div aria-hidden className={`absolute border-2 ${borderColor} border-solid inset-0 pointer-events-none rounded-[8px]`} />
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex items-start p-[2px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-quicksand-semibold leading-[1.5] min-w-px not-italic relative text-[#f04e4c] text-[12px]">
              {error}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
