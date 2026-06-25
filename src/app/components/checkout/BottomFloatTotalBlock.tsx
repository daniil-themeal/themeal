import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

import {
  DEFAULT_CHECKOUT_PRICING,
  formatAed,
  formatPricePerDay,
  type CheckoutPricingTable,
  type DayOption,
  type Duration,
  type Plan,
} from '../../data/checkoutPricing';
import { getCheckoutOrderPricing } from './mealCalendarAddDaysPricing';
import type { LightMealOption } from '../../data/testMeals';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Button } from '../common/Button';
import { COLOR_TOKENS } from '../common/colorTokens';
import { ChevronRightIcon } from '../common/icons';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { TEXT_TRIM_FIT_CLASS_NAME } from '../common/textTrimTokens';
import { CHECKOUT_FONT_CLAMP_14_16, CHECKOUT_CARD_PADDING_CLAMP, CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP } from './checkoutSpacing';
import { FullMenuPanel } from './FullMenuPanel';

const MENU_EXIT_ANIMATION_FALLBACK_MS = 260;

type BottomFloatTotalBlockCssVariables = CSSProperties & {
  '--checkout-card-padding': string;
  '--checkout-scroll-edge-fade-width': string;
  '--checkout-float-surface': string;
  '--checkout-float-muted': string;
  '--checkout-float-text': string;
  '--checkout-float-active': string;
  '--checkout-float-active-soft': string;
  '--checkout-float-active-hover': string;
  '--checkout-float-active-muted': string;
  '--checkout-float-divider': string;
  '--checkout-float-font-size-sm': string;
  '--checkout-float-font-size-md': string;
  '--checkout-float-meal-title-font-size': string;
  '--checkout-float-meal-meta-font-size': string;
  '--checkout-float-font-size-lg': string;
  '--checkout-float-discount': string;
};

const bottomFloatTotalBlockStyle: BottomFloatTotalBlockCssVariables = {
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--checkout-scroll-edge-fade-width': CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP,
  '--checkout-float-surface': COLOR_TOKENS.base.white,
  '--checkout-float-muted': COLOR_TOKENS.neutral[500],
  '--checkout-float-text': COLOR_TOKENS.neutral[900],
  '--checkout-float-active': COLOR_TOKENS.primary[500],
  '--checkout-float-active-soft': COLOR_TOKENS.primary[50],
  '--checkout-float-active-hover': COLOR_TOKENS.neutral[100],
  '--checkout-float-active-muted': COLOR_TOKENS.primary[300],
  '--checkout-float-divider': COLOR_TOKENS.neutral[100],
  '--checkout-float-font-size-sm': FONT_SIZE_TOKENS[12],
  '--checkout-float-font-size-md': FONT_SIZE_TOKENS[16],
  '--checkout-float-meal-title-font-size': CHECKOUT_FONT_CLAMP_14_16,
  '--checkout-float-meal-meta-font-size': FONT_SIZE_TOKENS[12],
  '--checkout-float-font-size-lg': FONT_SIZE_TOKENS[20],
  '--checkout-float-discount': COLOR_TOKENS.neutral[300],
};

const checkoutFloatPriceLgClassName = [
  TEXT_TRIM_FIT_CLASS_NAME,
  'font-sans text-[length:var(--checkout-float-font-size-lg)] font-bold leading-none text-[var(--checkout-float-active)]',
].join(' ');

const checkoutFloatPriceSmClassName = [
  TEXT_TRIM_FIT_CLASS_NAME,
  'font-sans text-[length:var(--checkout-float-font-size-sm)] font-bold leading-none',
].join(' ');

export function BottomFloatTotalBlock({
  plan,
  days,
  duration,
  persons = 1,
  lightMealOption,
  onScrollToSummary,
  hidden = false,
  extraMealDayKeys = [],
  pricingTable = DEFAULT_CHECKOUT_PRICING,
}: {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons?: number;
  lightMealOption: LightMealOption;
  onScrollToSummary: () => void;
  hidden?: boolean;
  extraMealDayKeys?: string[];
  pricingTable?: CheckoutPricingTable;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [mealDetailOpen, setMealDetailOpen] = useState(false);

  const menuClosingRef = useRef(false);
  const menuCloseTimerRef = useRef<number | null>(null);

  const orderPricing = getCheckoutOrderPricing({
    pricingTable,
    plan,
    days,
    duration,
    persons,
    extraMealDayKeys,
  });

  const menuVisible = menuOpen || menuClosing;

  const clearMenuCloseTimer = useCallback(() => {
    if (menuCloseTimerRef.current !== null) {
      window.clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }
  }, []);

  const finishMenuClose = useCallback(() => {
    clearMenuCloseTimer();
    menuClosingRef.current = false;
    setMenuClosing(false);
    setMenuOpen(false);
  }, [clearMenuCloseTimer]);

  const openMenu = useCallback(() => {
    clearMenuCloseTimer();
    menuClosingRef.current = false;
    setMenuClosing(false);
    setMenuOpen(true);
  }, [clearMenuCloseTimer]);

  const requestMenuClose = useCallback(() => {
    if (!menuOpen || menuClosingRef.current) return;

    menuClosingRef.current = true;
    setMenuClosing(true);

    menuCloseTimerRef.current = window.setTimeout(() => {
      finishMenuClose();
    }, MENU_EXIT_ANIMATION_FALLBACK_MS);
  }, [finishMenuClose, menuOpen]);

  const toggleMenu = () => {
    if (menuOpen) {
      requestMenuClose();
      return;
    }

    openMenu();
  };

  const handleScrollToSummary = () => {
    if (menuOpen) {
      requestMenuClose();
    }

    onScrollToSummary();
  };

  useEffect(() => {
    return () => {
      clearMenuCloseTimer();
    };
  }, [clearMenuCloseTimer]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[150] flex flex-col items-end pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-in-out md:hidden ${
        hidden || mealDetailOpen ? 'translate-y-full' : 'translate-y-0'
      }`}
      style={bottomFloatTotalBlockStyle}
    >
      <div className="relative z-20 px-[length:var(--checkout-card-padding)]">
        <Button
          type="button"
          variant="neutral"
          size="x-small"
          onClick={toggleMenu}
          className="!rounded-tl-[4px] !rounded-tr-[4px] !rounded-bl-none !rounded-br-none [corner-shape:round]"
          rightIcon={
            <ChevronRightIcon
              size={16}
              className={`transition-transform duration-200 ${menuOpen ? 'rotate-90' : ''}`}
            />
          }
        >
          {menuOpen ? 'Hide menu' : 'Show menu'}
        </Button>
      </div>

      <div className="w-full shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="bg-[var(--checkout-float-surface)]">
          <div className="relative">
            {menuVisible && (
              <div
                className={`${menuClosing ? 'modal-exit-mobile-full' : 'modal-enter-mobile-full'} relative z-0 overflow-hidden bg-[var(--checkout-float-surface)]`}
                onAnimationEnd={(event) => {
                  if (event.currentTarget !== event.target) return;

                  if (menuClosingRef.current) {
                    finishMenuClose();
                  }
                }}
              >
                <FullMenuPanel
                  variant="float"
                  isActive={menuOpen}
                  plan={plan}
                  lightMealOption={lightMealOption}
                  days={days}
                  duration={duration}
                  onMealDetailOpenChange={setMealDetailOpen}
                />
              </div>
            )}

            <div className="relative z-10 w-full bg-[var(--checkout-float-surface)]">
              <div className="w-full">
                <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-[16px] px-[length:var(--checkout-card-padding)] py-[8px]">
                  <div className="flex min-w-0 w-full flex-col items-center justify-start gap-[8px]">
                    <div className="flex min-w-0 items-end gap-[5px] tabular-nums">
                      {orderPricing.oldPeriodPrice ? (
                        <AnimatedNumber
                          value={orderPricing.oldPeriodPrice}
                          format={formatAed}
                          animate
                          className={[
                            checkoutFloatPriceSmClassName,
                            'text-[var(--checkout-float-muted)] line-through',
                          ].join(' ')}
                        />
                      ) : null}

                      <div className="flex items-end gap-[4px]">
                        <span className={checkoutFloatPriceLgClassName}>AED</span>
                        <AnimatedNumber
                          value={orderPricing.periodPrice}
                          format={formatAed}
                          animate
                          className={checkoutFloatPriceLgClassName}
                        />
                      </div>

                      {orderPricing.oldPeriodPrice ? (
                        <AnimatedNumber
                          value={orderPricing.oldPeriodPrice}
                          format={formatAed}
                          animate={false}
                          className={[checkoutFloatPriceSmClassName, 'text-transparent opacity-0'].join(' ')}
                        />
                      ) : null}
                    </div>

                    <p
                      className={[
                        checkoutFloatPriceSmClassName,
                        'text-right text-[var(--checkout-float-text)]',
                      ].join(' ')}
                    >
                      AED{' '}
                      <AnimatedNumber
                        value={orderPricing.pricePerDay}
                        format={formatPricePerDay}
                        animate
                        className={checkoutFloatPriceSmClassName}
                      />
                      /day
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    size="small"
                    className="min-w-[120px] shrink-0 rounded-[4px]"
                    onClick={handleScrollToSummary}
                  >
                    Order
                  </Button>
                </div>
              </div>

              <div className="h-px w-full bg-[var(--checkout-float-divider)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
