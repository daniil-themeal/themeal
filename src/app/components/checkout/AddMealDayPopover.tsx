import { useCallback, useMemo, useState, type MouseEvent, type ReactElement } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { Button, getButtonStyles } from '../common/Button';
import { MealDayPopoverPricing } from './MealDayPopoverPricing';
import { MealDayScopeButton } from './MealDayScopeButton';
import { SATURDAY, SUNDAY } from './mealCalendarUtils';
import { BORDER_RADIUS_TOKENS } from '../common/borderRadiusTokens';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';

import type { ExtraMealDaysQuote } from './mealCalendarAddDaysPricing';

export type AddMealDayTargetWeekday = typeof SATURDAY | typeof SUNDAY;

type AddMealDayPopoverProps = {
  quoteSat: ExtraMealDaysQuote | null;
  quoteSun: ExtraMealDaysQuote | null;
  quoteBoth: ExtraMealDaysQuote | null;
  canAddSat: boolean;
  canAddSun: boolean;
  onAdd: (targetWeekdays: AddMealDayTargetWeekday[]) => void;
  children: ReactElement;
};

export function AddMealDayPopover({
  quoteSat,
  quoteSun,
  quoteBoth,
  canAddSat,
  canAddSun,
  onAdd,
  children,
}: AddMealDayPopoverProps) {
  const [open, setOpen] = useState(false);
  const [selectedWeekdays, setSelectedWeekdays] = useState<Set<AddMealDayTargetWeekday>>(
    () => new Set(),
  );

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) {
      setSelectedWeekdays(new Set());
    }
    setOpen(nextOpen);
  }, []);

  const handleSelect =
    (targetWeekday: AddMealDayTargetWeekday) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setSelectedWeekdays((current) => {
        const next = new Set(current);
        if (next.has(targetWeekday)) {
          next.delete(targetWeekday);
        } else {
          next.add(targetWeekday);
        }
        return next;
      });
    };

  const previewQuote = useMemo(() => {
    if (selectedWeekdays.size === 0) {
      return null;
    }

    const hasSat = selectedWeekdays.has(SATURDAY);
    const hasSun = selectedWeekdays.has(SUNDAY);

    if (hasSat && hasSun) {
      return quoteBoth;
    }

    if (hasSat) {
      return quoteSat;
    }

    if (hasSun) {
      return quoteSun;
    }

    return null;
  }, [quoteBoth, quoteSat, quoteSun, selectedWeekdays]);

  const handleConfirm = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (selectedWeekdays.size === 0) {
        return;
      }
      onAdd([...selectedWeekdays]);
      setOpen(false);
    },
    [onAdd, selectedWeekdays],
  );

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
                  dayShort="Sat"
                  selected={selectedWeekdays.has(SATURDAY)}
                  disabled={!canAddSat}
                  onClick={handleSelect(SATURDAY)}
                />

                <MealDayScopeButton
                  dayShort="Sun"
                  selected={selectedWeekdays.has(SUNDAY)}
                  disabled={!canAddSun}
                  onClick={handleSelect(SUNDAY)}
                />
              </div>

              {previewQuote ? (
                <MealDayPopoverPricing
                  actionCostAed={previewQuote.actionCostAed}
                  periodPrice={previewQuote.periodPrice}
                  mode="add"
                />
              ) : null}

              <Button
                type="button"
                variant="primary"
                size="small"
                fullWidth
                disabled={selectedWeekdays.size === 0}
                onClick={handleConfirm}
                style={{
                  ...getButtonStyles('primary', false),
                  '--button-shadow': 'none',
                  '--button-shadow-hover': 'none',
                }}
              >
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
