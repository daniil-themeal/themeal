import { useCallback, useState, type MouseEvent, type ReactElement } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { Button } from '../common/Button';
import { MealDayPopoverPricing } from './MealDayPopoverPricing';
import { MealDayScopeButton } from './MealDayScopeButton';
import { BORDER_RADIUS_TOKENS } from '../common/borderRadiusTokens';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';

import type { ExtraMealDaysQuote } from './mealCalendarAddDaysPricing';

type AddMealDayPopoverProps = {
  quotePlus1: ExtraMealDaysQuote;
  quotePlus2: ExtraMealDaysQuote;
  canAddTwo: boolean;
  onAdd: (daysPerWeek: 1 | 2) => void;
  children: ReactElement;
};

export function AddMealDayPopover({
  quotePlus1,
  quotePlus2,
  canAddTwo,
  onAdd,
  children,
}: AddMealDayPopoverProps) {
  const [open, setOpen] = useState(false);
  const [selectedDaysPerWeek, setSelectedDaysPerWeek] = useState<1 | 2>(1);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) {
      setSelectedDaysPerWeek(1);
    }
    setOpen(nextOpen);
  }, []);

  const handleSelect = useCallback(
    (daysPerWeek: 1 | 2) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setSelectedDaysPerWeek(daysPerWeek);
    },
    [],
  );

  const handleConfirm = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onAdd(selectedDaysPerWeek);
      setOpen(false);
    },
    [onAdd, selectedDaysPerWeek],
  );

  const previewQuote = selectedDaysPerWeek === 2 ? quotePlus2 : quotePlus1;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <PopoverPrimitive.Trigger asChild>
        <div className="relative h-full w-full cursor-pointer">{children}</div>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="top"
          sideOffset={8}
          align="center"
          className="w-[min(280px,calc(100vw-32px))] outline-none"
          style={{
            zIndex: Z_INDEX_TOKENS.checkout,
            filter: 'drop-shadow(0 12px 32px rgba(47, 56, 70, 0.16))',
          }}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div
            className="overflow-hidden p-[16px]"
            style={{
              backgroundColor: COLOR_TOKENS.base.white,
              borderRadius: BORDER_RADIUS_TOKENS[12],
            }}
          >
            <div className="flex flex-col gap-[12px]">
              <p
                className={[
                  TEXT_TRIM_CLASS_NAME,
                  'font-sans text-[length:var(--add-meal-day-title-fs)] font-bold leading-[130%]',
                ].join(' ')}
                style={{
                  color: COLOR_TOKENS.neutral[900],
                  ['--add-meal-day-title-fs' as string]: FONT_SIZE_TOKENS[14],
                }}
              >
                Add meal day
              </p>

              <div className="flex gap-[8px]">
                <MealDayScopeButton
                  label="+1"
                  selected={selectedDaysPerWeek === 1}
                  onClick={handleSelect(1)}
                />

                <MealDayScopeButton
                  label="+2"
                  selected={selectedDaysPerWeek === 2}
                  disabled={!canAddTwo}
                  onClick={handleSelect(2)}
                />
              </div>

              <MealDayPopoverPricing
                actionCostAed={previewQuote.actionCostAed}
                periodPrice={previewQuote.periodPrice}
                mode="add"
              />

              <Button type="button" variant="primary" size="small" fullWidth onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </div>

          <PopoverPrimitive.Arrow
            width={16}
            height={8}
            style={{ fill: COLOR_TOKENS.base.white }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
