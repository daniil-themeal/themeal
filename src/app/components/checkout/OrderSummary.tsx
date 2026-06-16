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

const SVG_TABBY_BG =
  'M52.2688 24H7.7312C3.4402 24 0 20.6278 0 16.5022V7.49776C0 3.33632 3.47719 0 7.7312 0H52.2688C56.5598 0 60 3.3722 60 7.49776V16.5022C60 20.6278 56.5598 24 52.2688 24Z';
const SVG_TABBY_TEXT1 =
  'M42.9737 2.83553L39.9015 14.2135V14.2494H42.3075L45.3796 2.87142H42.9737V2.83553ZM4.99694 9.29622C4.6268 9.47568 4.25666 9.54747 3.8495 9.54747C2.99817 9.54747 2.51698 9.4039 2.44295 8.72194V8.68605C2.44295 8.65015 2.44295 8.65015 2.44295 8.61426V6.64016V6.4248V5.02498V4.4507V4.23534V2.90731L0.296115 3.15856C1.73968 2.87142 2.55399 1.79464 2.55399 0.681963V0H0.148058V3.19445L0 3.23035V9.11676C0.0740288 10.7678 1.22148 11.7728 3.03518 11.7728C3.70144 11.7728 4.40471 11.6293 4.95993 11.378L4.99694 9.29622Z';
const SVG_TABBY_TEXT2 =
  'M6.73662 2.08178L0 3.08678V4.73784L6.73662 3.73285V2.08178ZM6.73662 4.52249L0 5.52748V7.10676L6.73662 6.10177V4.52249ZM14.2876 5.27624C14.1765 3.44571 12.9921 2.33303 11.0673 2.33303C9.95687 2.33303 9.03151 2.76374 8.40227 3.55338C7.77302 4.34302 7.43989 5.49159 7.43989 6.89141C7.43989 8.29123 7.77302 9.43979 8.40227 10.2294C9.03151 11.0191 9.95687 11.4139 11.0673 11.4139C12.9921 11.4139 14.1765 10.3371 14.2876 8.47069V11.2344H16.6935V2.54838L14.2876 2.90731V5.27624ZM14.4356 6.89141C14.4356 8.50658 13.5473 9.58336 12.1777 9.58336C10.7712 9.58336 9.91986 8.57837 9.91986 6.89141C9.91986 5.20445 10.7712 4.19945 12.1777 4.19945C12.844 4.19945 13.4362 4.4507 13.8434 4.9532C14.2135 5.41981 14.4356 6.10177 14.4356 6.89141ZM23.6892 2.33303C21.7645 2.33303 20.58 3.40981 20.469 5.27624V0L18.063 0.358927V11.2344H20.469V8.47069C20.58 10.3371 21.7645 11.4139 23.6892 11.4139C25.9471 11.4139 27.3166 9.72694 27.3166 6.89141C27.3166 4.05588 25.9471 2.33303 23.6892 2.33303ZM22.6158 9.58336C21.2463 9.58336 20.3579 8.54248 20.3579 6.89141C20.3579 6.10177 20.58 5.41981 20.9501 4.9532C21.3573 4.4507 21.9125 4.19945 22.6158 4.19945C24.0223 4.19945 24.8737 5.20445 24.8737 6.89141C24.8737 8.57837 24.0223 9.58336 22.6158 9.58336ZM33.8312 2.33303C31.9064 2.33303 30.722 3.40981 30.6109 5.27624V0L28.205 0.358927V11.2344H30.6109V8.47069C30.722 10.3371 31.9064 11.4139 33.8312 11.4139C36.089 11.4139 37.4586 9.72694 37.4586 6.89141C37.4586 4.05588 36.089 2.33303 33.8312 2.33303ZM32.7577 9.58336C31.3882 9.58336 30.4999 8.54248 30.4999 6.89141C30.4999 6.10177 30.722 5.41981 31.0921 4.9532C31.4993 4.4507 32.0545 4.19945 32.7577 4.19945C34.1643 4.19945 35.0156 5.20445 35.0156 6.89141C35.0156 8.57837 34.1643 9.58336 32.7577 9.58336ZM37.4586 2.51249H40.0126L42.0854 11.2344H39.7905L37.4586 2.51249ZM48.7109 3.40981V2.72785H48.4148V2.58428H49.1921V2.72785H48.896V3.40981H48.7109ZM49.2291 3.40981V2.54838H49.5253L49.6733 2.94321C49.7103 3.05089 49.7473 3.08678 49.7473 3.12267C49.7473 3.08678 49.7844 3.05089 49.8214 2.94321L49.9694 2.54838H50.2655V3.40981H50.0805V2.72785L49.8214 3.40981H49.6363L49.4142 2.72785V3.40981H49.2291Z';
const SVG_PLUS = 'M6.83333 1V12.6667M1 6.83333H12.6667';

type OrderSummaryCssVariables = CSSProperties & {
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
};

const orderSummaryStyle: OrderSummaryCssVariables = {
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
};

function TabbyLogo() {
  return (
    <div className="relative h-[24px] w-[60px] shrink-0">
      <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 24" aria-hidden="true" focusable="false">
        <path d={SVG_TABBY_BG} fill="#5AFEAE" />
      </svg>
      <div className="absolute inset-[20.39%_14%_20.24%_10.36%]">
        <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.3796 14.2494" aria-hidden="true" focusable="false">
          <path d={SVG_TABBY_TEXT1} fill="#292929" />
        </svg>
      </div>
      <div className="absolute inset-[21.74%_8.14%_30.71%_8.08%]">
        <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.2655 11.4139" aria-hidden="true" focusable="false">
          <path d={SVG_TABBY_TEXT2} fill="#292929" />
        </svg>
      </div>
    </div>
  );
}

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
          <div className="flex flex-col gap-[20px]">
            <div className="px-[20px] md:px-[24px]">
              <PlanTariffSummary title={getPlanTariffTitle(plan)} chips={planTariffChips} />
            </div>

            <Divider />

            <div className="flex items-center gap-[8px] px-[20px] md:px-[24px]">
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
              <div className="flex items-center justify-between gap-[16px] px-[20px] md:px-[24px]">
                <p className="font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)] md:text-[length:var(--order-summary-title-font-size-md)]">What you'll eat</p>
                <TextLink size="12" onClick={onOpenMenu}>
                  View full menu
                </TextLink>
              </div>

              <div className="relative">
                <div
                  ref={mealsScrollRef}
                  className="flex cursor-grab select-none gap-[16px] overflow-x-auto overflow-y-visible py-[8px] px-[20px] scrollbar-hide active:cursor-grabbing md:px-[24px]"
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
              className="flex scroll-mt-4 scroll-mb-[72px] items-center gap-[6px] px-[20px] md:px-[24px]"
            >
              <p className="flex-[1_0_0] whitespace-nowrap font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)] md:text-[length:var(--order-summary-title-font-size-md)]">Total meals <span className="font-medium">(over <AnimatedNumber value={pricing.paidDays} /> days)</span></p>
              <div className="h-[4px] flex-[1_0_0]" />
              <p className="text-center font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[150%] text-[var(--order-summary-text)] md:text-[length:var(--order-summary-title-font-size-md)]">
                <AnimatedNumber value={mealsCount} />
              </p>
            </div>

            <Divider />

            <div className="h-fit w-full px-[20px] md:px-[24px]">
              <CheckoutTodayTotal
                oldPeriodPrice={pricing.oldPeriodPrice}
                periodPrice={pricing.periodPrice}
                pricePerDay={pricing.pricePerDay}
              />
            </div>

            <div className="flex flex-col gap-[12px] px-[20px] md:px-[24px]">
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

        <div className="relative w-full rounded-[8px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[8px] border border-[var(--order-summary-divider)]" />
          <div className="flex items-center gap-[12px] px-[12px] py-[12px]">
            <p className="flex-[1_0_0] font-sans text-[length:var(--order-summary-small-font-size)] font-normal leading-[150%] text-[var(--order-summary-muted)]">As low as <strong>185.15/month</strong> or 4 interest-free payments. <strong>More options</strong></p>
            <TabbyLogo />
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
