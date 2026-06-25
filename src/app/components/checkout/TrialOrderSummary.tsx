import { useRef, useState, type CSSProperties, type RefObject } from 'react';
import { createPortal } from 'react-dom';

import { AnimatedNumber } from '../common/AnimatedNumber';
import { Button } from '../common/Button';
import { CheckoutTodayTotal } from '../common/CheckoutTodayTotal';
import { Chip } from '../common/Chip';
import { COLOR_TOKENS } from '../common/colorTokens';
import { Divider } from '../common/Divider';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { IconButton } from '../common/IconButton';
import { TextLink } from '../common/TextLink';
import { ChevronDownIcon, MinusIcon, PlusIcon } from '../common/icons';
import { VerifiedPhoneLogoutButton } from '../common/VerifiedPhoneLogoutButton';
import { TRIAL_MEALS } from '../../data/testMeals';
import { getTrialPricing } from '../../data/trialPricing';
import type { Meal as MealDetail } from '../../types/meal';
import {
  CHECKOUT_CARD_PADDING_CLAMP,
  CHECKOUT_FONT_CLAMP_16_20,
  CHECKOUT_PLAN_COLUMN_PADDING_BOTTOM_CLAMP,
  CHECKOUT_PLAN_COLUMN_PADDING_BOTTOM_MOBILE_CLAMP,
  CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP,
  CHECKOUT_SECTION_GAP_CLAMP,
} from './checkoutSpacing';
import { MealDetailModal } from './MealDetailModal';
import { TabbyPromoWidget } from './TabbyPromoWidget';

type TrialOrderSummaryCssVariables = CSSProperties & {
  '--checkout-card-padding': string;
  '--checkout-plan-column-pb': string;
  '--checkout-plan-column-pb-mobile': string;
  '--checkout-scroll-edge-fade-width': string;
  '--order-summary-bg': string;
  '--order-summary-text': string;
  '--order-summary-muted': string;
  '--order-summary-subtle': string;
  '--order-summary-primary': string;
  '--order-summary-divider': string;
  '--order-summary-title-font-size': string;
  '--order-summary-body-font-size': string;
  '--order-summary-small-font-size': string;
  '--order-summary-section-gap': string;
};

const trialOrderSummaryStyle: TrialOrderSummaryCssVariables = {
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--checkout-plan-column-pb': CHECKOUT_PLAN_COLUMN_PADDING_BOTTOM_CLAMP,
  '--checkout-plan-column-pb-mobile': CHECKOUT_PLAN_COLUMN_PADDING_BOTTOM_MOBILE_CLAMP,
  '--checkout-scroll-edge-fade-width': CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP,
  '--order-summary-bg': COLOR_TOKENS.base.white,
  '--order-summary-text': COLOR_TOKENS.neutral[900],
  '--order-summary-muted': COLOR_TOKENS.neutral[500],
  '--order-summary-subtle': COLOR_TOKENS.neutral[300],
  '--order-summary-primary': COLOR_TOKENS.primary[500],
  '--order-summary-divider': COLOR_TOKENS.neutral[100],
  '--order-summary-title-font-size': CHECKOUT_FONT_CLAMP_16_20,
  '--order-summary-body-font-size': FONT_SIZE_TOKENS[14],
  '--order-summary-small-font-size': FONT_SIZE_TOKENS[12],
  '--order-summary-section-gap': CHECKOUT_SECTION_GAP_CLAMP,
};

const trialOrderSummarySectionPx = 'px-[length:var(--checkout-card-padding)]';

const trialOrderSummaryDividerClassName =
  'my-[length:var(--order-summary-section-gap)] w-full shrink-0';

function TrialOrderSummaryDivider() {
  return (
    <Divider
      color="var(--order-summary-divider)"
      className={trialOrderSummaryDividerClassName}
    />
  );
}

type TrialOrderSummaryProps = {
  persons: number;
  onPersonsChange: (persons: number) => void;
  onOpenMenu?: () => void;
  onOrder?: () => void;
  phone: string;
  isPhoneVerified?: boolean;
  onResetPhone?: () => void;
  planTariffAnchorRef?: RefObject<HTMLDivElement | null>;
  todayTotalAnchorRef?: RefObject<HTMLDivElement | null>;
  onMealDetailOpenChange?: (open: boolean) => void;
};

export function TrialOrderSummary({
  persons,
  onPersonsChange,
  onOpenMenu,
  onOrder,
  phone,
  isPhoneVerified = false,
  onResetPhone,
  planTariffAnchorRef,
  todayTotalAnchorRef,
  onMealDetailOpenChange,
}: TrialOrderSummaryProps) {
  const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null);
  const [isMealsExpanded, setIsMealsExpanded] = useState(true);

  const dragStartXRef = useRef(0);
  const dragMovedRef = useRef(false);
  const mealsScrollRef = useRef<HTMLDivElement | null>(null);

  const pricing = getTrialPricing(persons);

  const handleSelectMeal = (meal: MealDetail) => {
    if (dragMovedRef.current) return;
    setSelectedMeal(meal);
    onMealDetailOpenChange?.(true);
  };

  const handleCloseMeal = () => {
    setSelectedMeal(null);
    onMealDetailOpenChange?.(false);
  };

  return (
    <>
      <div
        className="flex w-full min-w-0 flex-col gap-[16px] max-md:max-w-none max-md:pb-[length:var(--checkout-plan-column-pb-mobile)]"
        style={trialOrderSummaryStyle}
      >
        <div
          ref={planTariffAnchorRef}
          className="rounded-[16px] bg-[var(--order-summary-bg)] pt-[28px] pb-[28px] max-md:pb-[16px]"
        >
          <div className="flex flex-col">
            <div className={trialOrderSummarySectionPx}>
              <div className="flex flex-col gap-[16px]">
                <p className="font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)]">
                  3-day trial
                </p>
                <div className="flex w-full flex-wrap gap-[6px]">
                  <Chip>Breakfast + Lunch + Dinner + Soup</Chip>
                  <Chip>One-time</Chip>
                </div>
              </div>
            </div>

            <TrialOrderSummaryDivider />

            <div
              className={[
                'flex items-center gap-[8px]',
                trialOrderSummarySectionPx,
              ].join(' ')}
            >
              <p className="flex-[1_0_0] font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)]">
                How many people?
              </p>

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
                  <AnimatedNumber value={persons} animate />
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

            <TrialOrderSummaryDivider />

            <div className={`flex flex-col ${isMealsExpanded ? 'gap-[16px]' : ''}`}>
              <div
                className={[
                  'flex items-center justify-between gap-[16px]',
                  trialOrderSummarySectionPx,
                ].join(' ')}
              >
                <button
                  type="button"
                  onClick={() => setIsMealsExpanded((expanded) => !expanded)}
                  aria-expanded={isMealsExpanded}
                  aria-controls="trial-order-summary-meals-carousel"
                  className="group flex min-w-0 flex-1 cursor-pointer items-center gap-[4px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--order-summary-primary)] focus-visible:ring-offset-2"
                >
                  <span className="font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)]">
                    What you'll eat
                  </span>
                  <ChevronDownIcon
                    size={20}
                    className={`shrink-0 text-[var(--order-summary-subtle)] transition-transform duration-200 group-hover:text-[var(--order-summary-muted)] ${
                      isMealsExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <TextLink size="14" onClick={onOpenMenu}>
                  View full menu
                </TextLink>
              </div>

              {isMealsExpanded ? (
                <div
                  className="relative"
                  id="trial-order-summary-meals-carousel"
                >
                  <div
                    ref={mealsScrollRef}
                    className="flex cursor-grab select-none gap-[16px] overflow-x-auto overflow-y-visible px-[length:var(--checkout-card-padding)] py-0 scrollbar-hide active:cursor-grabbing"
                    onMouseDown={(event) => {
                      const el = event.currentTarget;
                      const startX = event.pageX - el.offsetLeft;
                      const scrollLeft = el.scrollLeft;
                      dragStartXRef.current = event.pageX;
                      dragMovedRef.current = false;
                      const onMouseMove = (moveEvent: MouseEvent) => {
                        if (Math.abs(moveEvent.pageX - dragStartXRef.current) > 6) {
                          dragMovedRef.current = true;
                        }
                        el.scrollLeft =
                          scrollLeft - (moveEvent.pageX - el.offsetLeft - startX);
                      };
                      const onMouseUp = () => {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                        window.setTimeout(() => {
                          dragMovedRef.current = false;
                        }, 80);
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
                        if (
                          Math.abs(moveEvent.touches[0].pageX - dragStartXRef.current) >
                          6
                        ) {
                          dragMovedRef.current = true;
                        }
                        el.scrollLeft =
                          scrollLeft -
                          (moveEvent.touches[0].pageX - el.offsetLeft - startX);
                      };
                      const onTouchEnd = () => {
                        document.removeEventListener('touchmove', onTouchMove);
                        document.removeEventListener('touchend', onTouchEnd);
                        window.setTimeout(() => {
                          dragMovedRef.current = false;
                        }, 80);
                      };
                      document.addEventListener('touchmove', onTouchMove, {
                        passive: true,
                      });
                      document.addEventListener('touchend', onTouchEnd);
                    }}
                  >
                    {TRIAL_MEALS.map((meal) => (
                      <button
                        key={meal.id}
                        type="button"
                        onClick={() => handleSelectMeal(meal)}
                        className="group relative z-0 flex w-[150px] shrink-0 cursor-pointer flex-col gap-[8px] text-left hover:z-10 focus-visible:z-10"
                      >
                        <div className="flex h-[114px] w-full items-center justify-center overflow-visible">
                          <img
                            src={meal.img}
                            alt={meal.name}
                            className="pointer-events-none h-[108px] w-full origin-center rounded-[8px] object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                        </div>
                        <div className="w-full overflow-hidden px-[4px]">
                          <p className="line-clamp-2 w-full font-sans text-[length:var(--order-summary-body-font-size)] font-semibold leading-[140%] text-[var(--order-summary-text)] transition-colors group-hover:text-[var(--order-summary-primary)]">
                            {meal.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <TrialOrderSummaryDivider />

            <div
              className={[
                'flex items-center justify-between gap-[16px]',
                trialOrderSummarySectionPx,
              ].join(' ')}
            >
              <p className="min-w-0 font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[130%] text-[var(--order-summary-text)]">
                Total meals{' '}
                <span className="font-medium">
                  (over <AnimatedNumber value={pricing.totalPaidDays} animate /> days)
                </span>
              </p>
              <p className="shrink-0 text-right font-sans text-[length:var(--order-summary-title-font-size)] font-bold leading-[150%] text-[var(--order-summary-text)]">
                <AnimatedNumber value={pricing.totalMeals} animate />
              </p>
            </div>

            <TrialOrderSummaryDivider />

            <div
              ref={todayTotalAnchorRef}
              className={[
                'h-fit w-full scroll-mt-4 scroll-mb-[72px]',
                trialOrderSummarySectionPx,
              ].join(' ')}
            >
              <CheckoutTodayTotal
                oldPeriodPrice={pricing.oldPeriodPrice}
                periodPrice={pricing.periodPrice}
                pricePerDay={pricing.pricePerDay}
                animate
                style={{
                  '--today-total-title-fs': 'var(--order-summary-title-font-size)',
                  '--today-total-title-fs-md': 'var(--order-summary-title-font-size)',
                }}
              />
            </div>

            <div
              className={[
                'mt-[length:var(--order-summary-section-gap)] flex flex-col gap-[8px]',
                trialOrderSummarySectionPx,
              ].join(' ')}
            >
              {isPhoneVerified && phone && onResetPhone ? (
                <VerifiedPhoneLogoutButton phone={phone} onClick={onResetPhone} size="large" />
              ) : null}

              <Button
                type="button"
                variant="primary"
                size="medium"
                fullWidth
                onClick={onOrder}
              >
                Continue to Delivery
              </Button>

              <p className="text-center font-sans text-[length:var(--order-summary-small-font-size)] font-medium leading-[140%] text-[var(--order-summary-muted)]">
                One-time order. No subscription.
              </p>
            </div>

            <div
              className={[
                'mt-[length:var(--order-summary-section-gap)] scroll-mb-[72px]',
                trialOrderSummarySectionPx,
              ].join(' ')}
            >
              <TabbyPromoWidget price={pricing.periodPrice} source="cart" />
            </div>
          </div>
        </div>
      </div>

      {selectedMeal
        ? createPortal(
            <MealDetailModal meal={selectedMeal} onClose={handleCloseMeal} />,
            document.body,
          )
        : null}
    </>
  );
}
