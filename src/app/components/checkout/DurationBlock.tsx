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

type DurationBlockCssVariables = CSSProperties & {
  '--duration-title-font-size': string;
  '--duration-title-font-size-md': string;
  '--duration-card-title-font-size': string;
  '--duration-card-title-font-size-md': string;
  '--duration-meta-font-size': string;
  '--duration-meta-font-size-md': string;
  '--duration-card-bg': string;
  '--duration-card-selected-bg': string;
  '--duration-card-selected-border': string;
  '--duration-text': string;
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
  '--duration-title-font-size': FONT_SIZE_TOKENS[20],
  '--duration-title-font-size-md': FONT_SIZE_TOKENS[25],
  '--duration-card-title-font-size': FONT_SIZE_TOKENS[16],
  '--duration-card-title-font-size-md': FONT_SIZE_TOKENS[20],
  '--duration-meta-font-size': FONT_SIZE_TOKENS[12],
  '--duration-meta-font-size-md': FONT_SIZE_TOKENS[14],
  '--duration-badge-font-size': FONT_SIZE_TOKENS[12],
  '--duration-card-bg': COLOR_TOKENS.base.white,
  '--duration-card-selected-bg': COLOR_TOKENS.primary[50],
  '--duration-card-selected-border': COLOR_TOKENS.primary[200],
  '--duration-text': COLOR_TOKENS.neutral[900],
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
      <span className="flex flex-col items-start rounded-[40px] bg-[var(--duration-discount-bg)] p-[2px] font-['Quicksand'] text-[length:var(--duration-meta-font-size)] font-bold leading-[130%] text-[var(--duration-discount-text)]">
        {pct}
      </span>

      <p className="font-['Quicksand'] text-[length:var(--duration-meta-font-size)] font-bold leading-[130%] text-[var(--duration-save-text)]">
        {save}
      </p>
    </div>
  );
}

function DurationCard({
  duration,
  plan,
  days,
  selected,
  onSelect,
  pricingTable,
}: {
  duration: Duration;
  plan: Plan;
  days: DayOption;
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
        selected
          ? 'border-[var(--duration-card-selected-border)] bg-[var(--duration-card-selected-bg)]'
          : 'border-transparent bg-[var(--duration-card-bg)]',
      ].join(' ')}
    >
      {meta.badge ? (
        <Badge variant={meta.badge} className="absolute right-[18px] top-[-4px] z-[1]" />
      ) : null}

      <div className="flex flex-col items-end gap-[12px] p-[20px] md:px-[24px]">
        <div className="flex w-full items-center gap-[12px]">
          <div className="flex flex-[1_0_0] flex-col items-start gap-[4px]">
            <p className="font-['Quicksand'] text-[length:var(--duration-card-title-font-size)] font-bold leading-[130%] text-[var(--duration-text)] md:text-[length:var(--duration-card-title-font-size-md)]">
              {meta.label}
            </p>

            {discountPct && discountSave ? (
              <DiscountBadge pct={discountPct} save={discountSave} />
            ) : null}
          </div>

          <div className="flex flex-col items-end gap-[4px]">
            <p className="whitespace-nowrap text-right font-['Quicksand'] text-[length:var(--duration-card-title-font-size)] font-bold leading-[130%] text-[var(--duration-active)] md:text-[length:var(--duration-card-title-font-size-md)]">
              AED {formatPricePerDay(price.pricePerDay)}/day
            </p>

            {price.pricePerMonth ? (
              <p className="whitespace-nowrap text-right font-['Quicksand'] text-[length:var(--duration-meta-font-size)] font-medium leading-[130%] text-[var(--duration-muted)] md:text-[length:var(--duration-meta-font-size-md)]">
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
  pricingTable = DEFAULT_CHECKOUT_PRICING,
}: {
  selected: Duration;
  onSelect: (d: Duration) => void;
  plan: Plan;
  days: DayOption;
  pricingTable?: CheckoutPricingTable;
}) {
  return (
    <div
      className="flex w-full flex-col items-start gap-[16px]"
      style={durationBlockStyle}
    >
      <p className="w-full px-[4px] font-['Quicksand'] text-[length:var(--duration-title-font-size)] font-bold leading-[130%] text-[var(--duration-text)] md:text-[length:var(--duration-title-font-size-md)]">
        Subscription duration
      </p>

      <div className="flex w-full flex-col gap-[8px] md:gap-[12px]">
        {durations.map((duration) => (
          <DurationCard
            key={duration}
            duration={duration}
            plan={plan}
            days={days}
            pricingTable={pricingTable}
            selected={selected === duration}
            onSelect={() => onSelect(duration)}
          />
        ))}
      </div>
    </div>
  );
} 