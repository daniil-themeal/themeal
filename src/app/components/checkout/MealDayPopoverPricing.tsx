import { formatAed } from '../../data/checkoutPricing';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';

type MealDayPopoverPricingProps = {
  actionCostAed: number;
  periodPrice: number;
  mode?: 'add' | 'remove';
};

export function MealDayPopoverPricing({
  actionCostAed,
  periodPrice,
  mode = 'add',
}: MealDayPopoverPricingProps) {
  const actionPrefix = mode === 'remove' ? '−' : '+';

  return (
    <div className="flex w-full min-w-0 flex-col gap-[8px]">
      <div className="flex w-full min-w-0 flex-wrap items-end justify-between gap-x-[8px] gap-y-[4px]">
        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'min-w-0 font-sans text-[length:var(--meal-day-popover-action-title-fs)] font-bold leading-[130%]',
          ].join(' ')}
          style={{
            color: COLOR_TOKENS.neutral[900],
            ['--meal-day-popover-action-title-fs' as string]: FONT_SIZE_TOKENS[14],
          }}
        >
          {actionPrefix}
        </p>

        <div className="flex flex-wrap items-end justify-end gap-[5px]">
          <p
            className={[
              TEXT_TRIM_CLASS_NAME,
              'font-sans text-[length:var(--meal-day-popover-action-price-fs)] font-bold leading-[150%]',
            ].join(' ')}
            style={{
              color: COLOR_TOKENS.primary[500],
              ['--meal-day-popover-action-price-fs' as string]: FONT_SIZE_TOKENS[16],
            }}
          >
            AED
          </p>

          <p
            className={[
              TEXT_TRIM_CLASS_NAME,
              'font-sans text-[length:var(--meal-day-popover-action-price-fs)] font-bold leading-[150%]',
            ].join(' ')}
            style={{
              color: COLOR_TOKENS.primary[500],
              ['--meal-day-popover-action-price-fs' as string]: FONT_SIZE_TOKENS[16],
            }}
          >
            <AnimatedNumber value={actionCostAed} format={formatAed} animate={false} />
          </p>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-wrap items-end justify-between gap-x-[8px] gap-y-[4px]">
        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'min-w-0 font-sans text-[length:var(--meal-day-popover-total-title-fs)] font-bold leading-[130%]',
          ].join(' ')}
          style={{
            color: COLOR_TOKENS.neutral[900],
            ['--meal-day-popover-total-title-fs' as string]: FONT_SIZE_TOKENS[14],
          }}
        >
          Total
        </p>

        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'text-right font-sans text-[length:var(--meal-day-popover-total-price-fs)] font-bold leading-[150%]',
          ].join(' ')}
          style={{
            color: COLOR_TOKENS.neutral[900],
            ['--meal-day-popover-total-price-fs' as string]: FONT_SIZE_TOKENS[14],
          }}
        >
          AED <AnimatedNumber value={periodPrice} format={formatAed} animate={false} />
        </p>
      </div>
    </div>
  );
}
