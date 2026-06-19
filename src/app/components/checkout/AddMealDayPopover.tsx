import {
  useCallback,
  useRef,
  useState,
  type MouseEvent,
  type ReactElement,
} from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { Button } from '../common/Button';
import { CheckoutTodayTotal } from '../common/CheckoutTodayTotal';
import { BORDER_RADIUS_TOKENS } from '../common/borderRadiusTokens';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';

import type { ExtraMealDaysQuote } from './mealCalendarAddDaysPricing';

const POPOVER_CLOSE_DELAY_MS = 120;

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
  const [previewDaysPerWeek, setPreviewDaysPerWeek] = useState<1 | 2>(1);
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, POPOVER_CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const handleOpen = useCallback(() => {
    clearCloseTimer();
    setPreviewDaysPerWeek(1);
    setOpen(true);
  }, [clearCloseTimer]);

  const handleAdd = useCallback(
    (daysPerWeek: 1 | 2) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onAdd(daysPerWeek);
      setOpen(false);
    },
    [onAdd],
  );

  const previewQuote = previewDaysPerWeek === 2 ? quotePlus2 : quotePlus1;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <div
          className="relative h-full w-full"
          onMouseEnter={handleOpen}
          onMouseLeave={scheduleClose}
          onFocus={handleOpen}
          onBlur={scheduleClose}
        >
          {children}
        </div>
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
          onMouseEnter={handleOpen}
          onMouseLeave={scheduleClose}
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

              <CheckoutTodayTotal
                title="Total"
                periodPrice={previewQuote.periodPrice}
                pricePerDay={previewQuote.pricePerDay}
                animate={false}
                style={{
                  '--today-total-title-fs': FONT_SIZE_TOKENS[14],
                  '--today-total-title-fs-md': FONT_SIZE_TOKENS[14],
                  '--today-total-price-fs': FONT_SIZE_TOKENS[16],
                }}
              />

              <div className="flex gap-[8px]">
                <Button
                  type="button"
                  variant="neutral"
                  outline
                  size="small"
                  fullWidth
                  onClick={handleAdd(1)}
                  onMouseEnter={() => setPreviewDaysPerWeek(1)}
                  onFocus={() => setPreviewDaysPerWeek(1)}
                >
                  +1
                </Button>

                <Button
                  type="button"
                  variant="neutral"
                  outline
                  size="small"
                  fullWidth
                  disabled={!canAddTwo}
                  onClick={handleAdd(2)}
                  onMouseEnter={() => setPreviewDaysPerWeek(2)}
                  onFocus={() => setPreviewDaysPerWeek(2)}
                >
                  +2
                </Button>
              </div>
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
