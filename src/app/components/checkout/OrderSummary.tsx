import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';

import { AnimatedNumber } from '../common/AnimatedNumber';
import { Button } from '../common/Button';
import { IconButton } from '../common/IconButton';
import { CheckoutTodayTotal } from '../common/CheckoutTodayTotal';
import { TempPhoneResetButton } from '../common/TempPhoneResetButton';
import { COLOR_TOKENS } from '../common/colorTokens';
import { Divider } from '../common/Divider';
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
import { LEGAL_ROUTES } from '../../legal/routes';
import type { Meal as MealDetail } from '../../types/meal';
import {
  DEFAULT_CHECKOUT_PRICING,
  getCheckoutPrice,
  getFinalPeriodPrice,
  getTotalMeals,
  type CheckoutPricingTable,
  type DayOption,
  type Duration,
  type Plan,
} from '../../data/checkoutPricing';
import { getPromoCodeDiscount } from '../../config/promoCodes';
import { MealDetailModal } from './MealDetailModal';
import { CheckoutPromoCode } from './CheckoutPromoCode';
import { ChevronDownIcon, MinusIcon, PlusIcon } from '../common/icons';
import { TabbyPromoWidget } from './TabbyPromoWidget';
import { CheckoutScrollEdgeFades } from './CheckoutScrollEdgeFades';
import { CheckoutScrollEdgeGutter } from './CheckoutScrollEdgeGutter';
import { CHECKOUT_CARD_PADDING_CLAMP, CHECKOUT_FONT_CLAMP_16_20, CHECKOUT_PLAN_COLUMN_PADDING_BOTTOM_CLAMP, CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP, CHECKOUT_SECTION_GAP_CLAMP } from './checkoutSpacing';
import { useHorizontalScrollEdgeFades } from './useHorizontalScrollEdgeFades';

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

type OrderSummaryCssVariables = CSSProperties & {
  '--checkout-card-padding': string;
  '--checkout-plan-column-pb': string;
  '--checkout-scroll-edge-fade-width': string;
  '--order-summary-bg': string;
  '--order-summary-text': string;
  '--order-summary-muted': string;
  '--order-summary-subtle': string;
  '--order-summary-primary': string;
  '--order-summary-divider': string;
  '--order-summary-section-label-font-size': string;
  '--order-summary-title-font-size': string;
  '--order-summary-body-font-size': string;
  '--order-summary-small-font-size': string;
  '--order-summary-price-font-size': string;
  '--order-summary-section-gap': string;
};

const orderSummaryStyle: OrderSummaryCssVariables = {
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--checkout-plan-column-pb': CHECKOUT_PLAN_COLUMN_PADDING_BOTTOM_CLAMP,
  '--checkout-scroll-edge-fade-width': CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP,
  '--order-summary-bg': COLOR_TOKENS.base.white,
  '--order-summary-text': COLOR_TOKENS.neutral[900],
  '--order-summary-muted': COLOR_TOKENS.neutral[500],
  '--order-summary-subtle': COLOR_TOKENS.neutral[300],
  '--order-summary-primary': COLOR_TOKENS.primary[500],
  '--order-summary-divider': COLOR_TOKENS.neutral[100],
  '--order-summary-section-label-font-size': FONT_SIZE_TOKENS[12],
  '--order-summary-title-font-size': CHECKOUT_FONT_CLAMP_16_20,
  '--order-summary-body-font-size': FONT_SIZE_TOKENS[14],
  '--order-summary-small-font-size': FONT_SIZE_TOKENS[12],
  '--order-summary-price-font-size': FONT_SIZE_TOKENS[20],
  '--order-summary-section-gap': CHECKOUT_SECTION_GAP_CLAMP,
};

const orderSummarySectionPx = 'px-[length:var(--checkout-card-padding)]';

const orderSummaryDividerClassName = 'my-[length:var(--order-summary-section-gap)] w-full shrink-0';

function OrderSummaryDivider({ color }: { color: string }) {
  return <Divider color={color} className={orderSummaryDividerClassName} />;
}

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
  isPhoneVerified = false,
  onResetPhone,
  pricingTable = DEFAULT_CHECKOUT_PRICING,
  todayTotalAnchorRef,
  appliedPromoCode = '',
  onAppliedPromoCodeChange,
  onMealDetailOpenChange,
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
  isPhoneVerified?: boolean;
  onResetPhone?: () => void;
  pricingTable?: CheckoutPricingTable;
  todayTotalAnchorRef?: RefObject<HTMLDivElement | null>;
  appliedPromoCode?: string;
  onAppliedPromoCodeChange?: (code: string) => void;
  onMealDetailOpenChange?: (open: boolean) => void;
}) {
  const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null);
  const [isMealsExpanded, setIsMealsExpanded] = useState(true);
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
  const promoDiscount = appliedPromoCode ? getPromoCodeDiscount(appliedPromoCode) : null;
  const finalPeriodPrice = getFinalPeriodPrice(pricing.periodPrice, promoDiscount);
  const previewMeals = useMemo(
    () => getMealsForPlan(testMenuDays[0], plan, lightMealOption),
    [plan, lightMealOption],
  );
  const { showStartFade, showEndFade } = useHorizontalScrollEdgeFades(
    mealsScrollRef,
    visibleMeals.length,
  );
  useEffect(() => {
    onMealDetailOpenChange?.(Boolean(selectedMeal));
  }, [selectedMeal, onMealDetailOpenChange]);

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
      <div className="flex w-full min-w-0 flex-col gap-[16px] max-md:max-w-none max-md:pb-[length:var(--checkout-plan-column-pb)]" style={orderSummaryStyle}>
        <div className="rounded-[16px] bg-[var(--order-summary-bg)] py-[28px]">
          <div className="flex flex-col">
            <div className={orderSummarySectionPx}>
              <PlanTariffSummary title={getPlanTariffTitle(plan)} chips={planTariffChips} />
            </div>

            <OrderSummaryDivider color="var(--order-summary-divider)" />

            <div className={['flex items-center gap-[8px]', orderSummarySectionPx].join(' ')}>
              <p className="flex-[1_0_0] font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)]">How many people?</p>

              <div className="flex items-center gap-[16px]">
                <IconButton
                  type="button"
                  soft
                  size="small"
                  aria-label="Decrease people count"
                  icon={<MinusIcon size={16} />}
                  onClick={() => onPersonsChange(Math.max(1, persons - 1))}
                />
                <p className="w-[16px] text-center font-sans text-[length:var(--order-summary-title-font-size)] font-semibold text-[var(--order-summary-text)]">
                  <AnimatedNumber value={persons} animate={false} />
                </p>
                <IconButton
                  type="button"
                  soft
                  size="small"
                  aria-label="Increase people count"
                  icon={<PlusIcon size={16} />}
                  onClick={() => onPersonsChange(persons + 1)}
                />
              </div>
            </div>

            <OrderSummaryDivider color="var(--order-summary-divider)" />

            <div className={`flex flex-col ${isMealsExpanded ? 'gap-[16px]' : ''}`}>
              <div className={['flex items-center justify-between gap-[16px]', orderSummarySectionPx].join(' ')}>
                <button
                  type="button"
                  onClick={() => setIsMealsExpanded((expanded) => !expanded)}
                  aria-expanded={isMealsExpanded}
                  aria-controls="order-summary-meals-carousel"
                  className="group flex min-w-0 flex-1 cursor-pointer items-center gap-[8px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--order-summary-primary)] focus-visible:ring-offset-2"
                >
                  <span className="font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)]">
                    What you'll eat
                  </span>
                  <ChevronDownIcon
                    size={20}
                    className={`shrink-0 text-[var(--order-summary-subtle)] transition-transform duration-200 group-hover:text-[var(--order-summary-muted)] ${isMealsExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
                <TextLink size="14" onClick={onOpenMenu}>
                  View full menu
                </TextLink>
              </div>

              {isMealsExpanded ? (
              <div className="relative" id="order-summary-meals-carousel">
                <div
                  ref={mealsScrollRef}
                  className="flex cursor-grab select-none overflow-x-auto overflow-y-visible py-0 scrollbar-hide active:cursor-grabbing"
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
                  <CheckoutScrollEdgeGutter />
                  <div className="flex shrink-0 gap-[16px]">
                  {visibleMeals.map((meal) => (
                    <button key={meal.id} type="button" onClick={() => { if (dragMovedRef.current) return; setSelectedMeal(meal); }} className="group relative z-0 flex w-[150px] shrink-0 cursor-pointer flex-col gap-[12px] text-left hover:z-10 focus-visible:z-10">
                      <div className="flex h-[114px] w-full items-center justify-center overflow-visible">
                        <img src={meal.img} alt={meal.name} className="pointer-events-none h-[108px] w-full rounded-[8px] object-cover origin-center transition-transform duration-200 group-hover:scale-105" />
                      </div>
                      <div className="w-full overflow-hidden px-[4px]">
                        <p
                          className={[
                            'line-clamp-2 w-full [text-box-edge:auto] [text-box-trim:none] font-sans text-[length:var(--order-summary-body-font-size)] font-semibold leading-[140%] text-[var(--order-summary-text)] transition-colors group-hover:text-[var(--order-summary-primary)]',
                          ].join(' ')}
                        >
                          {meal.name}
                        </p>
                      </div>
                    </button>
                  ))}
                  </div>
                  <CheckoutScrollEdgeGutter />
                </div>
                <div
                  className="pointer-events-none absolute bottom-[4px] left-0 top-0 z-20 hidden w-[length:var(--checkout-scroll-edge-fade-width)] md:block"
                  style={{ background: `linear-gradient(to left, transparent, ${COLOR_TOKENS.base.white})` }}
                />
                <div
                  className="pointer-events-none absolute bottom-[4px] right-0 top-0 z-20 hidden w-[length:var(--checkout-scroll-edge-fade-width)] md:block"
                  style={{ background: `linear-gradient(to right, transparent, ${COLOR_TOKENS.base.white})` }}
                />
                <CheckoutScrollEdgeFades
                  showStart={showStartFade}
                  showEnd={showEndFade}
                  edgeColor={COLOR_TOKENS.base.white}
                  className="bottom-[4px] md:hidden"
                  startPositionClassName="left-0"
                  endPositionClassName="right-0"
                />
              </div>
              ) : null}
            </div>

            <OrderSummaryDivider color="var(--order-summary-divider)" />

            <div
              className={[
                'flex min-w-0 flex-wrap items-end justify-between gap-x-[8px] gap-y-[4px]',
                orderSummarySectionPx,
              ].join(' ')}
            >
              <p className="min-w-0 font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)]">
                Total meals{' '}
                <sup className="font-sans text-[length:var(--order-summary-small-font-size)] font-medium leading-[130%] text-[var(--order-summary-muted)]">
                  (over <AnimatedNumber value={pricing.paidDays} /> days)
                </sup>
              </p>
              <p className="shrink-0 text-right font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[150%] text-[var(--order-summary-text)]">
                <AnimatedNumber value={mealsCount} animate={false} />
              </p>
            </div>

            <OrderSummaryDivider color="var(--order-summary-divider)" />

            <div className={orderSummarySectionPx}>
              <CheckoutPromoCode
                variant="summary"
                inputId="order-summary-promo-code"
                appliedCode={appliedPromoCode}
                onAppliedCodeChange={onAppliedPromoCodeChange ?? (() => {})}
              />
            </div>

            <OrderSummaryDivider color="var(--order-summary-divider)" />

            <div
              ref={todayTotalAnchorRef}
              className={['h-fit w-full scroll-mt-4 scroll-mb-[72px]', orderSummarySectionPx].join(' ')}
            >
              <CheckoutTodayTotal
                oldPeriodPrice={pricing.oldPeriodPrice}
                periodPrice={finalPeriodPrice}
                pricePerDay={pricing.pricePerDay}
                animate={false}
                style={{
                  '--today-total-title-fs': 'var(--order-summary-title-font-size)',
                  '--today-total-title-fs-md': 'var(--order-summary-title-font-size)',
                }}
              />
            </div>

            <div className={['mt-[length:var(--order-summary-section-gap)] flex flex-col gap-[12px]', orderSummarySectionPx].join(' ')}>
              {isPhoneVerified && phone ? (
                <div className="flex items-center justify-center gap-[4px]">
                  <p className="text-center font-sans text-[length:var(--order-summary-small-font-size)] font-medium leading-[140%] text-[var(--order-summary-muted)]">
                    +971 {phone}
                  </p>
                  {onResetPhone ? <TempPhoneResetButton onClick={onResetPhone} /> : null}
                </div>
              ) : null}

              <Button type="button" variant="primary" size="medium" fullWidth onClick={onOrder}>
                {isPhoneVerified ? 'Continue to Delivery' : 'Continue'}
              </Button>

              <p className="text-center font-sans text-[length:var(--order-summary-small-font-size)] font-medium leading-[140%] text-[var(--order-summary-muted)]">By continuing, you accept our <Link to={LEGAL_ROUTES.terms} className="underline">Terms</Link> and <Link to={LEGAL_ROUTES.privacy} className="underline">Privacy Policy</Link></p>
            </div>

            <div className={['mt-[length:var(--order-summary-section-gap)] scroll-mb-[72px]', orderSummarySectionPx].join(' ')}>
              <TabbyPromoWidget
                price={finalPeriodPrice}
                pricePerMonth={pricing.pricePerMonth}
                source="cart"
              />
            </div>
          </div>
        </div>
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
