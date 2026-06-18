import type { CSSProperties } from 'react';

import {
  DEFAULT_CHECKOUT_PRICING,
  formatAedWithCurrency,
  formatDiscountPercent,
  formatPricePerDay,
  getCheckoutPrice,
  type CheckoutPricingTable,
  type DayOption,
  type Duration,
  type Plan,
} from '../../data/checkoutPricing';
import { Badge } from '../common/Badge';
import type { BadgeVariant } from '../common/Badge';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { CHECKOUT_FONT_CLAMP_16_20 } from './checkoutSpacing';
import { CheckoutSectionHeader } from './CheckoutSectionHeader';

type DurationBlockCssVariables = CSSProperties & {
  '--duration-card-title-font-size': string;
  '--duration-meta-font-size': string;
  '--duration-meta-font-size-md': string;
  '--duration-card-bg': string;
  '--duration-card-selected-bg': string;
  '--duration-card-selected-border': string;
  '--duration-text': string;
  '--duration-card-selected-text': string;
  '--duration-muted': string;
  '--duration-active': string;
  '--duration-discount-bg': string;
  '--duration-discount-text': string;
  '--duration-save-text': string;
  '--duration-orange-badge-bg': string;
  '--duration-green-badge-bg': string;
  '--duration-badge-text': string;
};

const durationBlockStyle: DurationBlockCssVariables = {
  '--duration-card-title-font-size': CHECKOUT_FONT_CLAMP_16_20,
  '--duration-meta-font-size': FONT_SIZE_TOKENS[12],
  '--duration-meta-font-size-md': FONT_SIZE_TOKENS[14],
  '--duration-badge-font-size': FONT_SIZE_TOKENS[12],
  '--duration-card-bg': COLOR_TOKENS.base.white,
  '--duration-card-selected-bg': COLOR_TOKENS.primary[50],
  '--duration-card-selected-border': COLOR_TOKENS.primary[200],
  '--duration-text': COLOR_TOKENS.neutral[900],
  '--duration-card-selected-text': COLOR_TOKENS.primary[500],
  '--duration-muted': COLOR_TOKENS.neutral[600],
  '--duration-active': COLOR_TOKENS.primary[500],
  '--duration-discount-bg': COLOR_TOKENS.secondary[500],
  '--duration-discount-text': COLOR_TOKENS.neutral[50],
  '--duration-save-text': COLOR_TOKENS.success[700],
};

const durationMeta: Record<Duration, { label: string; badge: BadgeVariant | null }> = {
  weekly: { label: 'Weekly', badge: null },
  monthly: { label: 'Monthly', badge: 'most-popular' },
  '2months': { label: '2 months', badge: 'best-value' },
};

const durations: Duration[] = ['weekly', 'monthly', '2months'];

function DiscountBadge({
  pct,
  save,
}: {
  pct: string;
  save: string;
}) {
  return (
    <div className="flex items-center gap-[6px]">
      <span className="flex flex-col items-start rounded-[40px] bg-[var(--duration-discount-bg)] p-[2px] font-sans text-[length:var(--duration-meta-font-size)] font-bold leading-[130%] text-[var(--duration-discount-text)]">
        {pct}
      </span>

      <p className="font-sans text-[length:var(--duration-meta-font-size)] font-bold leading-[130%] text-[var(--duration-save-text)]">
        {save}
      </p>
    </div>
  );
}

function DurationCard({
  duration,
  plan,
  days,
  persons,
  selected,
  onSelect,
  pricingTable,
}: {
  duration: Duration;
  plan: Plan;
  days: DayOption;
  persons: number;
  selected: boolean;
  onSelect: () => void;
  pricingTable: CheckoutPricingTable;
}) {
  const meta = durationMeta[duration];

  const price = getCheckoutPrice({
    pricingTable,
    plan,
    days,
    duration,
    persons,
  });

  const discountPct = formatDiscountPercent(price.discountPercent);
  const discountSave = price.discountAed
    ? `Save AED ${Math.round(price.discountAed)}`
    : null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'relative w-full cursor-pointer rounded-[16px] border border-solid text-left transition-colors duration-150',
        !selected && 'hover:border-[var(--duration-active)]',
        selected
          ? 'border-[var(--duration-card-selected-border)] bg-[var(--duration-card-selected-bg)]'
          : 'border-transparent bg-[var(--duration-card-bg)]',
      ].join(' ')}
    >
      {meta.badge ? (
        <Badge variant={meta.badge} className="absolute right-[var(--checkout-selector-card-padding)] top-[-4px] z-[1]" />
      ) : null}

      <div className="flex flex-col items-end gap-[12px] p-[var(--checkout-selector-card-padding)]">
        <div className="flex w-full items-center gap-[12px]">
          <div className="flex flex-[1_0_0] flex-col items-start gap-[12px]">
            <p
              className={[
                'font-sans text-[length:var(--duration-card-title-font-size)] font-bold leading-[130%]',
                selected ? 'text-[var(--duration-card-selected-text)]' : 'text-[var(--duration-text)]',
              ].join(' ')}
            >
              {meta.label}
            </p>

            {discountPct && discountSave ? (
              <DiscountBadge pct={discountPct} save={discountSave} />
            ) : null}
          </div>

          <div className="flex flex-col items-end gap-[12px]">
            <p className="whitespace-nowrap text-right font-sans text-[length:var(--duration-card-title-font-size)] font-bold leading-[130%] text-[var(--duration-active)]">
              AED {formatPricePerDay(price.pricePerDay)}/day
            </p>

            {price.pricePerMonth ? (
              <p className="whitespace-nowrap text-right font-sans text-[length:var(--duration-meta-font-size)] font-medium leading-[130%] text-[var(--duration-muted)] md:text-[length:var(--duration-meta-font-size-md)]">
                {duration === '2months' ? '≈ ' : ''}
                {formatAedWithCurrency(price.pricePerMonth)} per month
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}

export function DurationBlock({
  selected,
  onSelect,
  plan,
  days,
  persons = 1,
  pricingTable = DEFAULT_CHECKOUT_PRICING,
}: {
  selected: Duration;
  onSelect: (d: Duration) => void;
  plan: Plan;
  days: DayOption;
  persons?: number;
  pricingTable?: CheckoutPricingTable;
}) {
  return (
    <div
      className="flex w-full min-w-0 flex-col items-start gap-[20px]"
      style={durationBlockStyle}
    >
      <CheckoutSectionHeader title="Subscription duration" />

      <div className="flex w-full flex-col gap-[8px] md:gap-[12px]">
        {durations.map((duration) => (
          <DurationCard
            key={duration}
            duration={duration}
            plan={plan}
            days={days}
            persons={persons}
            pricingTable={pricingTable}
            selected={selected === duration}
            onSelect={() => onSelect(duration)}
          />
        ))}
      </div>
    </div>
  );
} 