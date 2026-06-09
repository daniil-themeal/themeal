import type { ReactNode } from 'react';

import { Button } from './Button';
import { FIELD_SIZE_CONFIG, type FieldSize } from './fieldSizeTokens';
import { FormLabel } from './FormLabel';
import { PromoCodeIcon } from './icons/PromoCodeIcon';
import { InputButtonRow } from './InputButtonRow';
import { TextInput } from './TextInput';

export type PromoCodeBlockProps = {
  value: string;
  onChange: (value: string) => void;
  onActivate?: () => void;
  id?: string;
  label?: ReactNode;
  placeholder?: string;
  actionLabel?: string;
  inputSize?: FieldSize;
  className?: string;
};

export function PromoCodeBlock({
  value,
  onChange,
  onActivate,
  id = 'promo-code',
  label = 'Have a promo code?',
  placeholder = 'Add promocode',
  actionLabel = 'Activate',
  inputSize = 'large',
  className = '',
}: PromoCodeBlockProps) {
  const iconSize = FIELD_SIZE_CONFIG[inputSize].iconSizePx as 20 | 24;

  return (
    <div className={['flex w-full flex-col gap-[12px]', className].filter(Boolean).join(' ')}>
      <FormLabel as="span">{label}</FormLabel>

      <InputButtonRow
        input={
          <TextInput
            id={id}
            label=""
            aria-label="Promo code"
            size={inputSize}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            leftIcon={<PromoCodeIcon size={iconSize} />}
          />
        }
        action={
          <Button
            type="button"
            variant="neutral"
            size="48"
            disabled={!value.trim()}
            className="w-full sm:w-[140px]"
            onClick={onActivate}
          >
            {actionLabel}
          </Button>
        }
      />
    </div>
  );
}
