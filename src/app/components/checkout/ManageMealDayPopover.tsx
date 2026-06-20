import { useCallback, useMemo, useState, type MouseEvent, type ReactElement } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import { Button, getButtonStyles } from '../common/Button';
import {
  getMealDayChangeQuote,
  getMealDayDisplayQuote,
  type MealDayTargetWeekday,
} from './mealCalendarAddDaysPricing';
import { MealDayPopoverPricing } from './MealDayPopoverPricing';
import { MealDayScopeButton } from './MealDayScopeButton';
import { SATURDAY, SUNDAY } from './mealCalendarUtils';
import { BORDER_RADIUS_TOKENS } from '../common/borderRadiusTokens';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';

export type { MealDayTargetWeekday };

type ManageMealDayPopoverProps = {
  plan: Plan;
  duration: Duration;
  dayOption: DayOption;
  startDate: Date;
  endDate: Date;
  persons?: number;
  extraMealDayKeys: ReadonlySet<string>;
  canAddSat: boolean;
  canAddSun: boolean;
  addedWeekdays: ReadonlySet<MealDayTargetWeekday>;
  onConfirm: (params: { keysToAdd: string[]; keysToRemove: string[] }) => void;
  onOpenChange?: (open: boolean) => void;
  children: ReactElement;
};

export function ManageMealDayPopover({
  plan,
  duration,
  dayOption,
  startDate,
  endDate,
  persons = 1,
  extraMealDayKeys,
  canAddSat,
  canAddSun,
  addedWeekdays,
  onConfirm,
  onOpenChange,
  children,
}: ManageMealDayPopoverProps) {
  const [open, setOpen] = useState(false);
  const [selectedWeekdays, setSelectedWeekdays] = useState<Set<MealDayTargetWeekday>>(
    () => new Set(),
  );

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        setSelectedWeekdays(new Set(addedWeekdays));
      }
      setOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [addedWeekdays, onOpenChange],
  );

  const handleSelect =
    (targetWeekday: MealDayTargetWeekday) => (event: MouseEvent<HTMLButtonElement>) => {
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

  const applyDelta = useMemo(
    () =>
      getMealDayChangeQuote({
        plan,
        days: dayOption,
        duration,
        persons,
        existingKeys: extraMealDayKeys,
        selectedWeekdays,
        addedWeekdays,
        dayOption,
        startDate,
        endDate,
      }),
    [
      addedWeekdays,
      dayOption,
      duration,
      endDate,
      extraMealDayKeys,
      persons,
      plan,
      selectedWeekdays,
      startDate,
    ],
  );

  const displayQuote = useMemo(
    () =>
      getMealDayDisplayQuote({
        plan,
        days: dayOption,
        duration,
        persons,
        selectedWeekdays,
        addedWeekdays,
        dayOption,
        startDate,
        endDate,
      }),
    [
      addedWeekdays,
      dayOption,
      duration,
      endDate,
      persons,
      plan,
      selectedWeekdays,
      startDate,
    ],
  );

  const handleConfirm = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (!applyDelta) {
        return;
      }

      onConfirm({
        keysToAdd: applyDelta.keysToAdd,
        keysToRemove: applyDelta.keysToRemove,
      });
      handleOpenChange(false);
    },
    [applyDelta, handleOpenChange, onConfirm],
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
                  ['--add-meal-day-title-fs' as string]: FONT_SIZE_TOKENS[16],
                }}
              >
                Add meal day
              </p>

              <div className="flex gap-[8px]">
                <MealDayScopeButton
                  dayShort="Sat"
                  selected={selectedWeekdays.has(SATURDAY)}
                  disabled={!canAddSat && !addedWeekdays.has(SATURDAY)}
                  onClick={handleSelect(SATURDAY)}
                />

                <MealDayScopeButton
                  dayShort="Sun"
                  selected={selectedWeekdays.has(SUNDAY)}
                  disabled={!canAddSun && !addedWeekdays.has(SUNDAY)}
                  onClick={handleSelect(SUNDAY)}
                />
              </div>

              {displayQuote ? (
                <MealDayPopoverPricing
                  actionCostAed={displayQuote.actionCostAed}
                  periodPrice={displayQuote.periodPrice}
                />
              ) : null}

              <Button
                type="button"
                variant="primary"
                size="small"
                fullWidth
                disabled={applyDelta === null}
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
