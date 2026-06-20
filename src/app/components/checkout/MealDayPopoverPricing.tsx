import type { CSSProperties } from 'react';

import { formatAed } from '../../data/checkoutPricing';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';

type MealDayPopoverPricingCssVariables = CSSProperties & {
  '--today-total-title-fs': string;
  '--today-total-title-fs-md': string;
  '--today-total-body-fs': string;
  '--today-total-price-fs': string;
  '--today-total-text': string;
  '--today-total-subtle': string;
  '--today-total-primary': string;
};

const mealDayPopoverPricingStyle: MealDayPopoverPricingCssVariables = {
  '--today-total-title-fs': FONT_SIZE_TOKENS[14],
  '--today-total-title-fs-md': FONT_SIZE_TOKENS[14],
  '--today-total-body-fs': FONT_SIZE_TOKENS[14],
  '--today-total-price-fs': FONT_SIZE_TOKENS[16],
  '--today-total-text': COLOR_TOKENS.neutral[900],
  '--today-total-subtle': COLOR_TOKENS.neutral[300],
  '--today-total-primary': COLOR_TOKENS.primary[500],
};

type MealDayPopoverPricingProps = {
  actionCostAed: number;
  periodPrice: number;
};

export function MealDayPopoverPricing({
  actionCostAed,
  periodPrice,
}: MealDayPopoverPricingProps) {
  return (
    <div
      className="flex w-full min-w-0 flex-col gap-[8px]"
      style={mealDayPopoverPricingStyle}
    >
      <div className="flex w-full min-w-0 flex-wrap items-end justify-between gap-x-[8px] gap-y-[4px]">
        <p className="min-w-0 font-sans text-[length:var(--today-total-title-fs)] font-bold leading-[130%] text-[var(--today-total-text)] md:text-[length:var(--today-total-title-fs-md)]">
          Total
        </p>

        <div className="flex flex-wrap items-end justify-end gap-[5px]">
          <p className="font-sans text-[length:var(--today-total-price-fs)] font-bold leading-[150%] text-[var(--today-total-primary)]">
            +
          </p>

          <p className="font-sans text-[length:var(--today-total-price-fs)] font-bold leading-[150%] text-[var(--today-total-primary)]">
            AED
          </p>

          <p className="font-sans text-[length:var(--today-total-price-fs)] font-bold leading-[150%] text-[var(--today-total-primary)]">
            <AnimatedNumber value={actionCostAed} format={formatAed} animate={false} />
          </p>
        </div>
      </div>

      <p className="text-right font-sans text-[length:var(--today-total-body-fs)] font-bold leading-[150%] text-[var(--today-total-text)]">
        AED <AnimatedNumber value={periodPrice} format={formatAed} animate={false} />
      </p>
    </div>
  );
}
