import { useState } from 'react';

import { validatePromoCode, VALID_PROMO_CODES } from '../../config/promoCodes';
import { Button } from '../common/Button';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FIELD_SIZE_CONFIG } from '../common/fieldSizeTokens';
import { InputButtonRow } from '../common/InputButtonRow';
import { PromoCodeIcon } from '../common/icons/PromoCodeIcon';
import { XIcon } from '../common/icons/feather/XIcon';
import { TextInput } from '../common/TextInput';

type PromoCodeView = 'collapsed' | 'input' | 'applied';

const titleButtonClassName =
  'block w-full cursor-pointer text-left font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-primary)] transition-opacity hover:opacity-80 md:text-[length:var(--order-summary-title-font-size-md)]';

function PromoCodeDevHint() {
  return (
    <p className="font-sans text-[10px] font-medium leading-[140%] text-[var(--order-summary-muted)]">
      {VALID_PROMO_CODES.join(', ')}
    </p>
  );
}

export function OrderSummaryPromoCode() {
  const [view, setView] = useState<PromoCodeView>('collapsed');
  const [draftCode, setDraftCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleActivate = () => {
    const trimmedCode = draftCode.trim();

    if (!trimmedCode) return;

    if (!validatePromoCode(trimmedCode)) {
      setError('Invalid promo code');
      return;
    }

    setAppliedCode(trimmedCode.toUpperCase());
    setError(null);
    setView('applied');
  };

  const handleRemove = () => {
    setDraftCode('');
    setAppliedCode('');
    setError(null);
    setView('input');
  };

  if (view === 'collapsed') {
    return (
      <div className="flex flex-col gap-[8px]">
        <PromoCodeDevHint />
        <button
          type="button"
          className={titleButtonClassName}
          onClick={() => setView('input')}
        >
          Have promocode?
        </button>
      </div>
    );
  }

  if (view === 'applied') {
    return (
      <div className="flex flex-col gap-[8px]">
        <PromoCodeDevHint />
        <div
          className="inline-flex w-fit items-center gap-[8px] rounded-full px-[12px] py-[8px]"
          style={{ backgroundColor: COLOR_TOKENS.warning[100] }}
        >
          <span className="font-sans text-[length:var(--order-summary-body-font-size)] font-semibold leading-[140%] text-[var(--order-summary-text)]">
            {appliedCode}
          </span>
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center text-[var(--order-summary-text)] transition-opacity hover:opacity-70"
            aria-label="Remove promo code"
            onClick={handleRemove}
          >
            <XIcon size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[8px]">
      <PromoCodeDevHint />
      <InputButtonRow
        error={error}
        input={
          <TextInput
            id="order-summary-promo-code"
            label=""
            aria-label="Promo code"
            value={draftCode}
            onChange={(event) => {
              setDraftCode(event.target.value.toUpperCase());
              if (error) setError(null);
            }}
            placeholder="Add promocode"
            state={error ? 'error' : 'default'}
            leftIcon={
              <PromoCodeIcon
                size={FIELD_SIZE_CONFIG.large.iconSizePx as 20 | 24}
              />
            }
          />
        }
        action={
          <Button
            type="button"
            variant="neutral"
            size="medium"
            disabled={!draftCode.trim()}
            className="w-full sm:w-[140px]"
            onClick={handleActivate}
          >
            Activate
          </Button>
        }
      />
    </div>
  );
}
