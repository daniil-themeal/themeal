import type { CSSProperties, ReactNode } from 'react';

import { formatAed, formatPricePerDay } from '../../data/checkoutPricing';
import { AnimatedNumber } from './AnimatedNumber';
import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';

type CheckoutTodayTotalCssVariables = CSSProperties & {
  '--today-total-title-fs': string;
  '--today-total-title-fs-md': string;
  '--today-total-body-fs': string;
  '--today-total-price-fs': string;
  '--today-total-text': string;
  '--today-total-subtle': string;
  '--today-total-primary': string;
};

const checkoutTodayTotalStyle: CheckoutTodayTotalCssVariables = {
  '--today-total-title-fs': FONT_SIZE_TOKENS[16],
  '--today-total-title-fs-md': FONT_SIZE_TOKENS[20],
  '--today-total-body-fs': FONT_SIZE_TOKENS[14],
  '--today-total-price-fs': FONT_SIZE_TOKENS[20],
  '--today-total-text': COLOR_TOKENS.neutral[900],
  '--today-total-subtle': COLOR_TOKENS.neutral[300],
  '--today-total-primary': COLOR_TOKENS.primary[500],
};

export type CheckoutTodayTotalProps = {
  periodPrice: number;
  pricePerDay: number;
  oldPeriodPrice?: number | null;
  title?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function CheckoutTodayTotal({
  periodPrice,
  pricePerDay,
  oldPeriodPrice = null,
  title = 'Today',
  className = '',
  style,
}: CheckoutTodayTotalProps) {
  return (
    <div
      className={['flex flex-col gap-[12px]', className].filter(Boolean).join(' ')}
      style={{ ...checkoutTodayTotalStyle, ...style }}
    >
      <div className="box-content flex items-end justify-between gap-[8px]">
        <p className="font-sans text-[length:var(--today-total-title-fs)] font-bold leading-[130%] text-[var(--today-total-text)] md:text-[length:var(--today-total-title-fs-md)]">
          {title}
        </p>

        <div className="flex items-end gap-[5px]">
          {oldPeriodPrice ? (
            <p className="font-sans text-[length:var(--today-total-body-fs)] font-bold leading-[150%] text-[var(--today-total-subtle)] line-through">
              <AnimatedNumber value={oldPeriodPrice} format={formatAed} />
            </p>
          ) : null}

          <p className="font-sans text-[length:var(--today-total-price-fs)] font-bold leading-[150%] text-[var(--today-total-primary)]">
            AED
          </p>

          <p className="font-sans text-[length:var(--today-total-price-fs)] font-bold leading-[150%] text-[var(--today-total-primary)]">
            <AnimatedNumber value={periodPrice} format={formatAed} />
          </p>
        </div>
      </div>

      <p className="text-right font-sans text-[length:var(--today-total-body-fs)] font-bold leading-[150%] text-[var(--today-total-text)]">
        AED <AnimatedNumber value={pricePerDay} format={formatPricePerDay} />/day
      </p>
    </div>
  );
}
