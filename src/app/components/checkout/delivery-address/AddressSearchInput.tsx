import { useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';

import { InputClearButton } from '../../common/InputClearButton';
import { COLOR_TOKENS } from '../../common/colorTokens';
import { getFieldSizeStyle } from '../../common/fieldSizeTokens';
import { FONT_SIZE_TOKENS } from '../../common/fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from '../../common/textTrimTokens';

type AddressSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  placeholder?: string;
};

type AddressSearchInputCssVariables = CSSProperties & {
  '--address-search-bg': string;
  '--address-search-ring': string;
  '--address-search-focus-ring': string;
  '--address-search-text': string;
  '--address-search-placeholder': string;
  '--address-search-font-size': string;
};

const addressSearchInputStyle: AddressSearchInputCssVariables = {
  '--address-search-bg': COLOR_TOKENS.neutral[50],
  '--address-search-ring': COLOR_TOKENS.neutral[200],
  '--address-search-focus-ring': COLOR_TOKENS.primary[500],
  '--address-search-text': COLOR_TOKENS.neutral[900],
  '--address-search-placeholder': COLOR_TOKENS.neutral[200],
  '--address-search-font-size': FONT_SIZE_TOKENS[16],
};

export function AddressSearchInput({
  value,
  onChange,
  onClear,
  onFocus,
  onKeyDown,
  autoFocus = false,
  placeholder = 'Type your address',
}: AddressSearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const showClearButton = Boolean(value) && isFocused;

  return (
    <div
      className={[
        'flex h-[48px] items-center rounded-[8px] bg-[var(--address-search-bg)] pl-[16px] ring-1 ring-[var(--address-search-ring)] focus-within:ring-2 focus-within:ring-[var(--address-search-focus-ring)]',
        showClearButton ? 'pr-0' : 'pr-[16px]',
      ].join(' ')}
      style={{ ...addressSearchInputStyle, ...getFieldSizeStyle('large') }}
    >
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => setIsFocused(false)}
        onKeyDown={onKeyDown}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={[
          TEXT_TRIM_CLASS_NAME,
          'w-full bg-transparent font-quicksand-semibold text-[length:var(--address-search-font-size)] leading-[1.4] text-[var(--address-search-text)] outline-none placeholder:text-[var(--address-search-placeholder)]',
        ].join(' ')}
      />

      {showClearButton ? (
        <InputClearButton
          onClick={onClear}
          aria-label="Clear address"
          className="ml-[8px]"
        />
      ) : null}
    </div>
  );
}
