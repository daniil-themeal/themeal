import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';

import { AnimatedNumber } from '../common/AnimatedNumber';
import { Button } from '../common/Button';
import { CheckoutTodayTotal } from '../common/CheckoutTodayTotal';
import { PhoneInput } from '../common/PhoneInput';
import { TempPhoneResetButton } from '../common/TempPhoneResetButton';
import { COLOR_TOKENS } from '../common/colorTokens';
import { CHECKOUT_ANIMATION_DURATION_MS, easeInOutCubic } from '../common/easing';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import {
  getPlanTariffChips,
  getPlanTariffTitle,
} from '../common/planTariffSummaryUtils';
import { PlanTariffSummary } from '../common/PlanTariffSummary';
import { TextLink } from '../common/TextLink';
import {
  getMealsForPlan,
  testMenuDays,
  type LightMealOption,
} from '../../data/testMeals';
import type { Meal as MealDetail } from '../../types/meal';
import {
  DEFAULT_CHECKOUT_PRICING,
  getCheckoutPrice,
  getTotalMeals,
  type CheckoutPricingTable,
  type DayOption,
  type Duration,
  type Plan,
} from '../../data/checkoutPricing';
import { MealDetailModal } from './MealDetailModal';
import { OrderSummaryPromoCode } from './OrderSummaryPromoCode';
import { TabbyPromoWidget } from './TabbyPromoWidget';
import { CHECKOUT_CARD_PADDING_CLAMP } from './checkoutSpacing';

function getMaxScrollLeft(element: HTMLElement) {
  return Math.max(0, element.scrollWidth - element.clientWidth);
}

function scrollToLeft(element: HTMLElement, left: number): Promise<void> {
  const targetLeft = Math.max(0, Math.min(left, getMaxScrollLeft(element)));

  if (Math.abs(element.scrollLeft - targetLeft) < 1) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const startLeft = element.scrollLeft;
    const distance = targetLeft - startLeft;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / CHECKOUT_ANIMATION_DURATION_MS, 1);
      element.scrollLeft = startLeft + distance * easeInOutCubic(progress);

      if (progress < 1) {
        window.requestAnimationFrame(animate);
        return;
      }

      element.scrollLeft = targetLeft;
      resolve();
    };

    window.requestAnimationFrame(animate);
  });
}

function waitForNextFrame(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

const SVG_PLUS = 'M6.83333 1V12.6667M1 6.83333H12.6667';

type OrderSummaryCssVariables = CSSProperties & {
  '--checkout-card-padding': string;
  '--order-summary-bg': string;
  '--order-summary-text': string;
  '--order-summary-muted': string;
  '--order-summary-subtle': string;
  '--order-summary-primary': string;
  '--order-summary-divider': string;
  '--order-summary-field-bg': string;
  '--order-summary-field-bg-hover': string;
  '--order-summary-field-bg-active': string;
  '--order-summary-control-icon': string;
  '--order-summary-section-label-font-size': string;
  '--order-summary-title-font-size': string;
  '--order-summary-title-font-size-md': string;
  '--order-summary-body-font-size': string;
  '--order-summary-small-font-size': string;
  '--order-summary-price-font-size': string;
  '--order-summary-section-gap': string;
};

const orderSummaryStyle: OrderSummaryCssVariables = {
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--order-summary-bg': COLOR_TOKENS.base.white,
  '--order-summary-text': COLOR_TOKENS.neutral[900],
  '--order-summary-muted': COLOR_TOKENS.neutral[500],
  '--order-summary-subtle': COLOR_TOKENS.neutral[300],
  '--order-summary-primary': COLOR_TOKENS.primary[500],
  '--order-summary-divider': COLOR_TOKENS.neutral[100],
  '--order-summary-field-bg': COLOR_TOKENS.neutral[50],
  '--order-summary-field-bg-hover': COLOR_TOKENS.neutral[100],
  '--order-summary-field-bg-active': COLOR_TOKENS.neutral[200],
  '--order-summary-control-icon': COLOR_TOKENS.neutral[500],
  '--order-summary-section-label-font-size': FONT_SIZE_TOKENS[12],
  '--order-summary-title-font-size': FONT_SIZE_TOKENS[16],
  '--order-summary-title-font-size-md': FONT_SIZE_TOKENS[20],
  '--order-summary-body-font-size': FONT_SIZE_TOKENS[14],
  '--order-summary-small-font-size': FONT_SIZE_TOKENS[12],
  '--order-summary-price-font-size': FONT_SIZE_TOKENS[20],
  '--order-summary-section-gap': 'clamp(20px, calc(20px + (100vw - 20rem) * 4 / 448), 24px)',
};

function Divider() {
  return <div className="h-px bg-[var(--order-summary-divider)]" />;
}

const personControlButtonClassName =
  'flex h-[40px] cursor-pointer items-center justify-center rounded-full bg-[var(--order-summary-field-bg)] px-[12px] transition-colors duration-150 hover:bg-[var(--order-summary-field-bg-hover)] active:bg-[var(--order-summary-field-bg-active)]';

export function OrderSummary({
  plan,
  days,
  duration,
  ingredients,
  persons,
  lightMealOption,
  onPersonsChange,
  onOpenMenu,
  onOrder,
  phone,
  onPhoneChange,
  phoneError,
  isPhoneVerified = false,
  onResetPhone,
  pricingTable = DEFAULT_CHECKOUT_PRICING,
  totalMealsAnchorRef,
}: {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  ingredients: string[];
  persons: number;
  lightMealOption: LightMealOption;
  onPersonsChange: (n: number) => void;
  onOpenMenu?: () => void;
  onOrder?: () => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  phoneError?: ReactNode;
  isPhoneVerified?: boolean;
  onResetPhone?: () => void;
  pricingTable?: CheckoutPricingTable;
  totalMealsAnchorRef?: RefObject<HTMLDivElement | null>;
}) {
  const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null);
  const [visibleMeals, setVisibleMeals] = useState<MealDetail[]>(() =>
    getMealsForPlan(testMenuDays[0], plan, lightMealOption),
  );

  const dragStartXRef = useRef(0);
  const dragMovedRef = useRef(false);
  const mealsScrollRef = useRef<HTMLDivElement | null>(null);
  const prevMealsCountRef = useRef(visibleMeals.length);
  const animationTokenRef = useRef(0);

  const pricing = getCheckoutPrice({ pricingTable, plan, days, duration, persons });
  const mealsCount = getTotalMeals({ pricingTable, plan, days, duration, persons });
  const previewMeals = useMemo(
    () => getMealsForPlan(testMenuDays[0], plan, lightMealOption),
    [plan, lightMealOption],
  );

  useEffect(() => {
    const prevCount = prevMealsCountRef.current;
    const nextCount = previewMeals.length;
    const token = animationTokenRef.current + 1;
    animationTokenRef.current = token;

    const isActive = () => animationTokenRef.current === token;

    if (nextCount > prevCount) {
      setVisibleMeals(previewMeals.slice(0, prevCount));

      const runAddAnimation = async () => {
        await waitForNextFrame();
        if (!isActive()) return;

        const scrollContainer = mealsScrollRef.current;
        if (!scrollContainer) {
          setVisibleMeals(previewMeals);
          return;
        }

        await scrollToLeft(scrollContainer, getMaxScrollLeft(scrollContainer));
        if (!isActive()) return;

        setVisibleMeals(previewMeals);

        await waitForNextFrame();
        if (!isActive()) return;

        const updatedScrollContainer = mealsScrollRef.current;
        if (!updatedScrollContainer) return;

        await scrollToLeft(updatedScrollContainer, getMaxScrollLeft(updatedScrollContainer));
        if (!isActive()) return;

        await scrollToLeft(updatedScrollContainer, 0);
      };

      void runAddAnimation();
    } else {
      setVisibleMeals(previewMeals);
      mealsScrollRef.current?.scrollTo({ left: 0 });
    }

    prevMealsCountRef.current = nextCount;

    return () => {
      animationTokenRef.current += 1;
    };
  }, [previewMeals]);
  const planTariffChips = getPlanTariffChips({
    plan,
    days,
    duration,
    ingredients,
    lightMealOption,
  });

  return (
    <>
      <div className="flex w-full min-w-0 flex-col gap-[16px] max-md:max-w-none md:pt-[56px]" style={orderSummaryStyle}>
        <div className="rounded-[16px] bg-[var(--order-summary-bg)] py-[28px]">
          <div className="flex flex-col gap-[var(--order-summary-section-gap)]">
            <div className="px-[length:var(--checkout-card-padding)]">
              <PlanTariffSummary title={getPlanTariffTitle(plan)} chips={planTariffChips} />
            </div>

            <Divider />

            <div className="flex items-center gap-[8px] px-[length:var(--checkout-card-padding)]">
              <p className="flex-[1_0_0] font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)] md:text-[length:var(--order-summary-title-font-size-md)]">How many people?</p>

              <div className="flex items-center gap-[16px]">
                <button type="button" onClick={() => onPersonsChange(Math.max(1, persons - 1))} className={personControlButtonClassName} aria-label="Decrease people count">
                  <svg width="14" height="2" viewBox="0 0 14 2" fill="none"><path d="M1 1H13" stroke="var(--order-summary-control-icon)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                </button>
                <p className="w-[16px] text-center font-sans text-[length:var(--order-summary-title-font-size)] font-semibold text-[var(--order-summary-text)]">
                  <AnimatedNumber value={persons} />
                </p>
                <button type="button" onClick={() => onPersonsChange(persons + 1)} className={personControlButtonClassName} aria-label="Increase people count">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d={SVG_PLUS} stroke="var(--order-summary-control-icon)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                </button>
              </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center justify-between gap-[16px] px-[length:var(--checkout-card-padding)]">
                <p className="font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)] md:text-[length:var(--order-summary-title-font-size-md)]">What you'll eat</p>
                <TextLink size="12" onClick={onOpenMenu}>
                  View full menu
                </TextLink>
              </div>

              <div className="relative">
                <div
                  ref={mealsScrollRef}
                  className="flex cursor-grab select-none gap-[16px] overflow-x-auto overflow-y-visible py-0 px-[length:var(--checkout-card-padding)] scrollbar-hide active:cursor-grabbing"
                  onMouseDown={(event) => {
                    const el = event.currentTarget;
                    const startX = event.pageX - el.offsetLeft;
                    const scrollLeft = el.scrollLeft;
                    dragStartXRef.current = event.pageX;
                    dragMovedRef.current = false;
                    const onMouseMove = (moveEvent: MouseEvent) => {
                      if (Math.abs(moveEvent.pageX - dragStartXRef.current) > 6) dragMovedRef.current = true;
                      el.scrollLeft = scrollLeft - (moveEvent.pageX - el.offsetLeft - startX);
                    };
                    const onMouseUp = () => {
                      document.removeEventListener('mousemove', onMouseMove);
                      document.removeEventListener('mouseup', onMouseUp);
                      window.setTimeout(() => { dragMovedRef.current = false; }, 80);
                    };
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                  }}
                  onTouchStart={(event) => {
                    const el = event.currentTarget;
                    const startX = event.touches[0].pageX - el.offsetLeft;
                    const scrollLeft = el.scrollLeft;
                    dragStartXRef.current = event.touches[0].pageX;
                    dragMovedRef.current = false;
                    const onTouchMove = (moveEvent: TouchEvent) => {
                      if (Math.abs(moveEvent.touches[0].pageX - dragStartXRef.current) > 6) dragMovedRef.current = true;
                      el.scrollLeft = scrollLeft - (moveEvent.touches[0].pageX - el.offsetLeft - startX);
                    };
                    const onTouchEnd = () => {
                      document.removeEventListener('touchmove', onTouchMove);
                      document.removeEventListener('touchend', onTouchEnd);
                      window.setTimeout(() => { dragMovedRef.current = false; }, 80);
                    };
                    document.addEventListener('touchmove', onTouchMove, { passive: true });
                    document.addEventListener('touchend', onTouchEnd);
                  }}
                >
                  {visibleMeals.map((meal) => (
                    <button key={meal.id} type="button" onClick={() => { if (dragMovedRef.current) return; setSelectedMeal(meal); }} className="group relative z-0 flex w-[150px] shrink-0 cursor-pointer flex-col gap-[12px] text-left hover:z-10 focus-visible:z-10">
                      <div className="flex h-[114px] w-full items-center justify-center overflow-visible">
                        <img src={meal.img} alt={meal.name} className="pointer-events-none h-[108px] w-full rounded-[8px] object-cover origin-center transition-transform duration-200 group-hover:scale-105" />
                      </div>
                      <p className="w-full px-[4px] line-clamp-2 [text-box-trim:none] [text-box-edge:auto] font-sans text-[length:var(--order-summary-body-font-size)] font-semibold leading-[140%] text-[var(--order-summary-text)] transition-colors group-hover:text-[var(--order-summary-primary)]">
                        {meal.name}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="pointer-events-none absolute bottom-[4px] left-0 top-0 z-20 w-[20px] md:w-[24px]" style={{ background: `linear-gradient(to left, transparent, ${COLOR_TOKENS.base.white})` }} />
                <div className="pointer-events-none absolute bottom-[4px] right-0 top-0 z-20 w-[20px] md:w-[24px]" style={{ background: `linear-gradient(to right, transparent, ${COLOR_TOKENS.base.white})` }} />
              </div>
            </div>

            <Divider />

            <div
              ref={totalMealsAnchorRef}
              className="flex scroll-mt-4 scroll-mb-[72px] items-center gap-[16px] px-[length:var(--checkout-card-padding)]"
            >
              <p className="flex-[1_0_0] whitespace-nowrap font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)] md:text-[length:var(--order-summary-title-font-size-md)]">Total meals <span className="font-medium">(over <AnimatedNumber value={pricing.paidDays} /> days)</span></p>
              <div className="h-[4px] flex-[1_0_0]" />
              <p className="text-center font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[150%] text-[var(--order-summary-text)] md:text-[length:var(--order-summary-title-font-size-md)]">
                <AnimatedNumber value={mealsCount} />
              </p>
            </div>

            <Divider />

            <div className="px-[length:var(--checkout-card-padding)]">
              <OrderSummaryPromoCode />
            </div>

            <Divider />

            <div className="h-fit w-full px-[length:var(--checkout-card-padding)]">
              <CheckoutTodayTotal
                oldPeriodPrice={pricing.oldPeriodPrice}
                periodPrice={pricing.periodPrice}
                pricePerDay={pricing.pricePerDay}
              />
            </div>

            <div className="flex flex-col gap-[12px] px-[length:var(--checkout-card-padding)]">
              {!isPhoneVerified ? (
                <PhoneInput
                  id="order-summary-phone"
                  value={phone}
                  onChange={onPhoneChange}
                  error={phoneError}
                />
              ) : phone ? (
                <div className="flex items-center justify-center gap-[4px]">
                  <p className="text-center font-sans text-[length:var(--order-summary-small-font-size)] font-medium leading-[140%] text-[var(--order-summary-muted)]">
                    +971 {phone}
                  </p>
                  {onResetPhone ? <TempPhoneResetButton onClick={onResetPhone} /> : null}
                </div>
              ) : null}

              <Button type="button" variant="primary" size="medium" fullWidth onClick={onOrder}>Continue to Delivery</Button>

              <p className="text-center font-sans text-[length:var(--order-summary-small-font-size)] font-medium leading-[140%] text-[var(--order-summary-muted)]">By continuing, you accept our <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span></p>
            </div>
          </div>
        </div>

        <TabbyPromoWidget
          price={pricing.periodPrice}
          pricePerMonth={pricing.pricePerMonth}
          source="cart"
        />
      </div>

      {selectedMeal
        ? createPortal(
            <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />,
            document.body,
          )
        : null}
    </>
  );
}
