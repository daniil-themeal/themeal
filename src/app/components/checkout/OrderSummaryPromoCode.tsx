import { useState } from 'react';

import { getPromoCodeDiscount, validatePromoCode, VALID_PROMO_CODES } from '../../config/promoCodes';
import { formatAed } from '../../data/checkoutPricing';
import { PromoCodeEstimateHint } from './PromoCodeEstimateHint';
import { Button } from '../common/Button';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FIELD_SIZE_CONFIG } from '../common/fieldSizeTokens';
import { InputButtonRow } from '../common/InputButtonRow';
import { RadioCheckIcon } from '../common/icons/RadioCheckIcon';
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
  const [isActivating, setIsActivating] = useState(false);

  const handleActivate = async () => {
    const trimmedCode = draftCode.trim();

    if (!trimmedCode || isActivating) return;

    setIsActivating(true);

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 500));

      if (!validatePromoCode(trimmedCode)) {
        setError('Invalid promo code');
        return;
      }

      setAppliedCode(trimmedCode.toUpperCase());
      setError(null);
      setView('applied');
    } finally {
      setIsActivating(false);
    }
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
    const discount = getPromoCodeDiscount(appliedCode);

    return (
      <div className="flex flex-col gap-[8px]">
        <PromoCodeDevHint />
        <div className="flex w-full items-center gap-[8px]">
          <div
            className="inline-flex min-w-0 w-fit max-w-full items-center gap-[8px] rounded-full px-[16px]"
            style={{
              height: FIELD_SIZE_CONFIG.large.heightPx,
              backgroundColor: COLOR_TOKENS.warning[100],
            }}
          >
            <span className="shrink-0" style={{ color: COLOR_TOKENS.warning[500] }}>
              <RadioCheckIcon size={16} />
            </span>
            <span
              className="truncate font-sans font-semibold leading-normal text-[var(--order-summary-text)]"
              style={{ fontSize: FIELD_SIZE_CONFIG.large.fontSize }}
            >
              {appliedCode}
            </span>
            {discount !== null ? (
              <span
                className="shrink-0 pl-[12px] font-sans font-bold leading-normal text-[var(--order-summary-text)]"
                style={{ fontSize: FIELD_SIZE_CONFIG.large.fontSize }}
              >
                -AED {formatAed(discount)}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            className="flex size-[24px] shrink-0 cursor-pointer items-center justify-center text-[var(--order-summary-muted)] transition-opacity hover:opacity-70"
            aria-label="Remove promo code"
            onClick={handleRemove}
          >
            <XIcon size={16} />
          </button>
          <PromoCodeEstimateHint />
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
                color={COLOR_TOKENS.neutral[200]}
              />
            }
          />
        }
        action={
          <div className="flex w-full items-center justify-end gap-[8px] sm:w-auto">
            <Button
              type="button"
              variant="warning"
              size="medium"
              loading={isActivating}
              disabled={!draftCode.trim()}
              className="min-w-0 flex-1 sm:w-[140px] sm:flex-none"
              onClick={() => void handleActivate()}
            >
              Activate
            </Button>
            <PromoCodeEstimateHint />
          </div>
        }
      />
    </div>
  );
}
