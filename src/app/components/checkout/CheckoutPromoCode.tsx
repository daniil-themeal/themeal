import { useEffect, useState, type CSSProperties } from 'react';

import { getPromoCodeDiscount, validatePromoCode, VALID_PROMO_CODES } from '../../config/promoCodes';
import { formatAed } from '../../data/checkoutPricing';
import { PromoCodeEstimateHint } from './PromoCodeEstimateHint';
import { Button } from '../common/Button';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FIELD_SIZE_CONFIG } from '../common/fieldSizeTokens';
import { FormLabel } from '../common/FormLabel';
import { IconButton } from '../common/IconButton';
import { InputButtonRow } from '../common/InputButtonRow';
import { RadioCheckIcon } from '../common/icons/RadioCheckIcon';
import { PromoCodeIcon } from '../common/icons/PromoCodeIcon';
import { XIcon } from '../common/icons/feather/XIcon';
import { TextInput } from '../common/TextInput';

type PromoCodeView = 'collapsed' | 'input' | 'applied';
type CheckoutPromoCodeVariant = 'summary' | 'payment';

type CheckoutPromoCodeCssVariables = CSSProperties & {
  '--promo-code-text': string;
  '--promo-code-muted': string;
  '--promo-code-primary': string;
  '--promo-code-title-fs': string;
};

const VARIANT_STYLE: Record<CheckoutPromoCodeVariant, CheckoutPromoCodeCssVariables> = {
  summary: {
    '--promo-code-text': 'var(--order-summary-text)',
    '--promo-code-muted': 'var(--order-summary-muted)',
    '--promo-code-primary': 'var(--order-summary-primary)',
    '--promo-code-title-fs': 'var(--order-summary-title-font-size)',
  },
  payment: {
    '--promo-code-text': 'var(--payment-text)',
    '--promo-code-muted': 'var(--payment-muted)',
    '--promo-code-primary': 'var(--payment-primary)',
    '--promo-code-title-fs': 'var(--payment-section-title-fs)',
  },
};

const titleButtonClassName =
  'block w-full cursor-pointer text-left font-sans text-[length:var(--promo-code-title-fs)] font-bold leading-[130%] text-[var(--promo-code-primary)] transition-opacity hover:opacity-80';

function getInitialView(variant: CheckoutPromoCodeVariant, appliedCode: string): PromoCodeView {
  if (appliedCode) return 'applied';
  return variant === 'payment' ? 'input' : 'collapsed';
}

function PromoCodeDevHint({ onSelect }: { onSelect: (code: string) => void }) {
  return (
    <p className="font-sans text-[10px] font-medium leading-[140%] text-[var(--promo-code-muted)]">
      {VALID_PROMO_CODES.map((code, index) => (
        <span key={code}>
          {index > 0 ? ', ' : null}
          <span
            role="button"
            tabIndex={0}
            className="cursor-pointer"
            onClick={() => onSelect(code)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelect(code);
              }
            }}
          >
            {code}
          </span>
        </span>
      ))}
    </p>
  );
}

export type CheckoutPromoCodeProps = {
  appliedCode: string;
  onAppliedCodeChange: (code: string) => void;
  variant: CheckoutPromoCodeVariant;
  inputId?: string;
};

export function CheckoutPromoCode({
  appliedCode,
  onAppliedCodeChange,
  variant,
  inputId = 'checkout-promo-code',
}: CheckoutPromoCodeProps) {
  const [view, setView] = useState<PromoCodeView>(() => getInitialView(variant, appliedCode));
  const [draftCode, setDraftCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isActivating, setIsActivating] = useState(false);

  useEffect(() => {
    if (appliedCode) {
      setView('applied');
      return;
    }

    setView((current) => (current === 'applied' ? 'input' : current));
  }, [appliedCode, variant]);

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

      onAppliedCodeChange(trimmedCode.toUpperCase());
      setError(null);
      setDraftCode('');
      setView('applied');
    } finally {
      setIsActivating(false);
    }
  };

  const handleRemove = () => {
    setDraftCode('');
    onAppliedCodeChange('');
    setError(null);
    setView('input');
  };

  const handleHintSelect = (code: string) => {
    if (view === 'applied') {
      onAppliedCodeChange('');
    }

    if (view === 'collapsed' || view === 'applied') {
      setView('input');
    }

    setDraftCode(code);
    setError(null);
  };

  const variantStyle = VARIANT_STYLE[variant];
  const showEstimateHint = variant === 'summary';

  if (view === 'collapsed') {
    return (
      <div className="flex flex-col gap-[8px]" style={variantStyle}>
        <PromoCodeDevHint onSelect={handleHintSelect} />
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

  if (view === 'applied' && appliedCode) {
    const discount = getPromoCodeDiscount(appliedCode);

    return (
      <div className="flex flex-col gap-[8px]" style={variantStyle}>
        <PromoCodeDevHint onSelect={handleHintSelect} />
        <div className="flex w-full items-center gap-[4px]">
          <div
            className="inline-flex min-w-0 w-fit max-w-full items-center gap-[8px] rounded-full pl-[16px] pr-[8px]"
            style={{
              height: FIELD_SIZE_CONFIG.large.heightPx,
              backgroundColor: COLOR_TOKENS.warning[100],
            }}
          >
            <span className="shrink-0" style={{ color: COLOR_TOKENS.warning[500] }}>
              <RadioCheckIcon size={20} checkColor={COLOR_TOKENS.warning[800]} />
            </span>
            <span
              className="font-sans font-semibold leading-normal text-[var(--promo-code-text)]"
              style={{ fontSize: FIELD_SIZE_CONFIG.large.fontSize }}
            >
              {appliedCode}
            </span>
            {discount !== null ? (
              <span
                className="shrink-0 pl-[12px] font-sans font-bold leading-normal text-[var(--promo-code-text)]"
                style={{ fontSize: FIELD_SIZE_CONFIG.large.fontSize }}
              >
                -AED {formatAed(discount)}
              </span>
            ) : null}
            <IconButton
              type="button"
              ghost
              size="x-small"
              aria-label="Remove promo code"
              className="shrink-0"
              style={{
                '--button-text': COLOR_TOKENS.warning[800],
                '--button-bg-hover': COLOR_TOKENS.warning[300],
              }}
              icon={<XIcon size={16} />}
              onClick={handleRemove}
            />
          </div>
          {showEstimateHint ? <PromoCodeEstimateHint /> : null}
        </div>
      </div>
    );
  }

  const activateButtonClassName =
    'w-full min-w-0 @[280px]:w-auto @[280px]:shrink-0 @[280px]:px-[12px]';

  const activateAction = (
    <Button
      type="button"
      variant="warning"
      size="medium"
      loading={isActivating}
      disabled={!draftCode.trim()}
      className={activateButtonClassName}
      onClick={() => void handleActivate()}
    >
      Activate
    </Button>
  );

  const inputRow = (
    <InputButtonRow
      align="center"
      error={error}
      actionClassName={showEstimateHint ? 'gap-[8px]' : undefined}
      input={
        <TextInput
          id={inputId}
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
        showEstimateHint ? (
          <>
            {activateAction}
            <PromoCodeEstimateHint />
          </>
        ) : (
          activateAction
        )
      }
    />
  );

  if (variant === 'payment') {
    return (
      <div className="flex flex-col gap-[12px]" style={variantStyle}>
        <PromoCodeDevHint onSelect={handleHintSelect} />
        <FormLabel as="span">Have a promo code?</FormLabel>
        {inputRow}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[8px]" style={variantStyle}>
      <PromoCodeDevHint onSelect={handleHintSelect} />
      {inputRow}
    </div>
  );
}
