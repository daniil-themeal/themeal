import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';

import { getFullMenuMealSlots, testMenuDays, type LightMealOption } from '../../data/testMeals';
import type { Plan } from '../../data/checkoutPricing';
import type { Meal as MealDetail } from '../../types/meal';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import {
  CHECKOUT_CARD_PADDING_CLAMP,
  CHECKOUT_FONT_CLAMP_14_16,
  FULL_MENU_MEAL_CAROUSEL_INSET_CLAMP,
  FULL_MENU_MEAL_CAROUSEL_PADDING_BOTTOM_FLOAT_CLAMP,
  FULL_MENU_MEAL_CARD_WIDTH_CLAMP,
  FULL_MENU_MEAL_CARD_WIDTH_MD_CLAMP,
  FULL_MENU_MEAL_GAP_CLAMP,
  FULL_MENU_LIGHT_OPTION_GAP_CLAMP,
  FULL_MENU_LIGHT_OPTION_FONT_SIZE_CLAMP,
  FULL_MENU_LIGHT_OPTION_TEXT_GAP_CLAMP,
  FULL_MENU_PLAN_LIGHT_DIVIDER_GAP_CLAMP,
  FULL_MENU_LIGHT_OPTION_PADDING_X_CLAMP,
  FULL_MENU_MAX_MEAL_COUNT,
  getFullMenuModalWidthForMealCount,
} from './checkoutSpacing';
import {
  CHECKOUT_CARD_SECTION_BLEED_FROM_PADDING,
  FULL_MENU_MEAL_CAROUSEL_BLEED,
  FULL_MENU_MEAL_CAROUSEL_GUTTER_CLASS_NAME,
} from './checkoutStepPageLayoutTokens';
import { CheckoutScrollEdgeFades } from './CheckoutScrollEdgeFades';
import { CheckoutScrollEdgeGutter } from './CheckoutScrollEdgeGutter';
import { SPACING_CONTENT_ATTR } from '../../landing-stas/getSpacingMeasureRoot';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';
import { FullMenuPlanToggle } from './FullMenuPlanToggle';
import { MealDetailModal } from './MealDetailModal';
import { useHorizontalScrollEdgeFades } from './useHorizontalScrollEdgeFades';

const PLAN_ORDER: Record<Plan, number> = {
  light: 0,
  base: 1,
  plus: 2,
};

const LIGHT_OPTION_ORDER: Record<LightMealOption, number> = {
  'breakfast-main': 0,
  'lunch-dinner': 1,
};

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MENU_DAYS_COUNT = testMenuDays.length;
const MOUSE_DRAG_CLICK_THRESHOLD = 6;
type SlideDirection = 'left' | 'right';
type FullMenuPanelVariant = 'modal' | 'float';

type FullMenuDayPillCssVariables = CSSProperties & {
  '--full-menu-day-bg': string;
  '--full-menu-day-bg-hover': string;
};

export const FULL_MENU_DAY_PILL_SELECTED_STYLE: FullMenuDayPillCssVariables = {
  '--full-menu-day-bg': COLOR_TOKENS.primary[50],
  '--full-menu-day-bg-hover': COLOR_TOKENS.primary[75],
};

export const FULL_MENU_DAY_PILL_DEFAULT_STYLE: FullMenuDayPillCssVariables = {
  '--full-menu-day-bg': COLOR_TOKENS.base.white,
  '--full-menu-day-bg-hover': COLOR_TOKENS.neutral[50],
};

export type FullMenuPanelCssVariables = CSSProperties & {
  '--checkout-card-padding': string;
  '--checkout-scroll-edge-fade-width': string;
  '--full-menu-bg': string;
  '--full-menu-border': string;
  '--full-menu-title': string;
  '--full-menu-muted': string;
  '--full-menu-active': string;
  '--full-menu-active-soft': string;
  '--full-menu-active-muted': string;
  '--full-menu-close-bg': string;
  '--full-menu-close-bg-hover': string;
  '--full-menu-day-date-font-size': string;
  '--full-menu-day-meta-font-size': string;
  '--full-menu-light-option-font-size': string;
  '--full-menu-light-option-text-gap': string;
  '--full-menu-meal-meta-font-size': string;
  '--full-menu-meal-title-font-size': string;
  '--full-menu-day-border-selected': string;
  '--full-menu-meal-card-width': string;
  '--full-menu-meal-card-width-md': string;
  '--full-menu-meal-gap': string;
  '--full-menu-meal-carousel-inset': string;
  '--full-menu-meal-carousel-padding-bottom': string;
  '--full-menu-light-option-gap': string;
  '--full-menu-plan-light-divider-gap': string;
  '--full-menu-light-option-padding-x': string;
  '--full-menu-modal-width'?: string;
};

export const fullMenuPanelStyle: FullMenuPanelCssVariables = {
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--checkout-scroll-edge-fade-width': FULL_MENU_MEAL_CAROUSEL_INSET_CLAMP,
  '--full-menu-meal-carousel-inset': FULL_MENU_MEAL_CAROUSEL_INSET_CLAMP,
  '--full-menu-meal-carousel-padding-bottom': '20px',
  '--full-menu-bg': COLOR_TOKENS.base.white,
  '--full-menu-border': COLOR_TOKENS.neutral[100],
  '--full-menu-title': COLOR_TOKENS.neutral[900],
  '--full-menu-muted': COLOR_TOKENS.neutral[500],
  '--full-menu-active': COLOR_TOKENS.primary[500],
  '--full-menu-active-soft': COLOR_TOKENS.primary[50],
  '--full-menu-active-muted': COLOR_TOKENS.primary[400],
  '--full-menu-close-bg': COLOR_TOKENS.neutral[50],
  '--full-menu-close-bg-hover': COLOR_TOKENS.neutral[75],
  '--full-menu-day-date-font-size': CHECKOUT_FONT_CLAMP_14_16,
  '--full-menu-day-meta-font-size': FONT_SIZE_TOKENS[12],
  '--full-menu-light-option-font-size': FULL_MENU_LIGHT_OPTION_FONT_SIZE_CLAMP,
  '--full-menu-light-option-text-gap': FULL_MENU_LIGHT_OPTION_TEXT_GAP_CLAMP,
  '--full-menu-meal-meta-font-size': FONT_SIZE_TOKENS[12],
  '--full-menu-meal-title-font-size': CHECKOUT_FONT_CLAMP_14_16,
  '--full-menu-day-border-selected': COLOR_TOKENS.primary[200],
  '--full-menu-meal-card-width': FULL_MENU_MEAL_CARD_WIDTH_CLAMP,
  '--full-menu-meal-card-width-md': FULL_MENU_MEAL_CARD_WIDTH_MD_CLAMP,
  '--full-menu-meal-gap': FULL_MENU_MEAL_GAP_CLAMP,
  '--full-menu-light-option-gap': FULL_MENU_LIGHT_OPTION_GAP_CLAMP,
  '--full-menu-plan-light-divider-gap': FULL_MENU_PLAN_LIGHT_DIVIDER_GAP_CLAMP,
  '--full-menu-light-option-padding-x': FULL_MENU_LIGHT_OPTION_PADDING_X_CLAMP,
};

export function getFullMenuModalPanelStyle(): FullMenuPanelCssVariables {
  return {
    ...fullMenuPanelStyle,
    '--full-menu-modal-width': getFullMenuModalWidthForMealCount(FULL_MENU_MAX_MEAL_COUNT),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getMenuDays() {
  return testMenuDays.map((menuDay, i) => {
    const d = new Date(`${menuDay.date}T00:00:00`);
    const dayIndex = d.getDay() === 0 ? 6 : d.getDay() - 1;

    return {
      date: d.getDate(),
      month: MONTH_NAMES[d.getMonth()],
      day: DAY_NAMES[dayIndex],
      absoluteDayIndex: i,
      menuDayId: menuDay.id,
    };
  });
}

export type FullMenuPanelHandle = {
  closeMealDetail: () => boolean;
};

export type FullMenuPanelProps = {
  variant: FullMenuPanelVariant;
  isActive: boolean;
  plan: Plan;
  lightMealOption: LightMealOption;
  onPlanChange: (plan: Plan) => void;
  onLightMealOptionChange: (option: LightMealOption) => void;
  onMealDetailOpenChange?: (open: boolean) => void;
  className?: string;
};

export const FullMenuPanel = forwardRef<FullMenuPanelHandle, FullMenuPanelProps>(function FullMenuPanel(
  {
    variant,
    isActive,
    plan,
    lightMealOption,
    onPlanChange,
    onLightMealOptionChange,
    onMealDetailOpenChange,
    className = '',
  },
  ref,
) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('left');
  const [isDraggingDays, setIsDraggingDays] = useState(false);
  const [isDraggingMeals, setIsDraggingMeals] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null);

  const dayRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const daysScrollRef = useRef<HTMLDivElement | null>(null);
  const mealsScrollRef = useRef<HTMLDivElement | null>(null);

  const mouseDragStartXRef = useRef(0);
  const mouseDragStartScrollLeftRef = useRef(0);
  const suppressNextClickRef = useRef(false);

  const mealDragStartXRef = useRef(0);
  const mealDragStartScrollLeftRef = useRef(0);
  const suppressMealClickRef = useRef(false);

  const canGoPrev = selectedDayIndex > 0;
  const canGoNext = selectedDayIndex < MENU_DAYS_COUNT - 1;
  const isModal = variant === 'modal';

  const menuDays = getMenuDays();
  const mealSlots = getFullMenuMealSlots(
    testMenuDays[selectedDayIndex],
    plan,
    lightMealOption,
  );
  const activeMealCount = mealSlots.filter((slot) => slot.active).length;
  const daysScrollFadeKey = `${isActive}-${MENU_DAYS_COUNT}`;
  const { showStartFade: showDaysStartFade, showEndFade: showDaysEndFade } =
    useHorizontalScrollEdgeFades(daysScrollRef, daysScrollFadeKey, {
      alwaysVisibleWhenScrollable: true,
    });

  const mealsScrollFadeKey = `${isActive}-${selectedDayIndex}-${plan}-${lightMealOption}-${activeMealCount}`;
  const { showStartFade: showMealsStartFade, showEndFade: showMealsEndFade } =
    useHorizontalScrollEdgeFades(mealsScrollRef, mealsScrollFadeKey, {
      alwaysVisibleWhenScrollable: true,
    });

  const scrollSelectedDayIntoView = (dayIndex: number) => {
    const selectedButton = dayRefs.current[dayIndex];

    selectedButton?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  };

  const selectDay = (dayIndex: number) => {
    const nextDayIndex = clamp(dayIndex, 0, MENU_DAYS_COUNT - 1);

    if (nextDayIndex === selectedDayIndex) return;

    setSlideDirection(nextDayIndex > selectedDayIndex ? 'left' : 'right');
    setSelectedDayIndex(nextDayIndex);

    window.requestAnimationFrame(() => {
      scrollSelectedDayIntoView(nextDayIndex);
      mealsScrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    });
  };

  const handlePrevDay = () => {
    if (!canGoPrev) return;
    selectDay(selectedDayIndex - 1);
  };

  const handleNextDay = () => {
    if (!canGoNext) return;
    selectDay(selectedDayIndex + 1);
  };

  const handleDayClick = (dayIndex: number) => {
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false;
      return;
    }

    selectDay(dayIndex);
  };

  const handleDaysMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const scrollContainer = daysScrollRef.current;
    if (!scrollContainer) return;

    setIsDraggingDays(true);
    suppressNextClickRef.current = false;
    mouseDragStartXRef.current = event.clientX;
    mouseDragStartScrollLeftRef.current = scrollContainer.scrollLeft;
  };

  const handleDaysMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingDays) return;

    const scrollContainer = daysScrollRef.current;
    if (!scrollContainer) return;

    const deltaX = event.clientX - mouseDragStartXRef.current;

    if (Math.abs(deltaX) > MOUSE_DRAG_CLICK_THRESHOLD) {
      suppressNextClickRef.current = true;
    }

    scrollContainer.scrollLeft = mouseDragStartScrollLeftRef.current - deltaX;
  };

  const stopMouseDrag = () => {
    if (!isDraggingDays) return;

    setIsDraggingDays(false);

    window.setTimeout(() => {
      suppressNextClickRef.current = false;
    }, 80);
  };

  const handleMealsMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const scrollContainer = mealsScrollRef.current;
    if (!scrollContainer) return;

    setIsDraggingMeals(true);
    suppressMealClickRef.current = false;
    mealDragStartXRef.current = event.clientX;
    mealDragStartScrollLeftRef.current = scrollContainer.scrollLeft;
  };

  const handleMealsMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingMeals) return;

    const scrollContainer = mealsScrollRef.current;
    if (!scrollContainer) return;

    const deltaX = event.clientX - mealDragStartXRef.current;

    if (Math.abs(deltaX) > MOUSE_DRAG_CLICK_THRESHOLD) {
      suppressMealClickRef.current = true;
    }

    scrollContainer.scrollLeft = mealDragStartScrollLeftRef.current - deltaX;
  };

  const stopMealsMouseDrag = () => {
    if (!isDraggingMeals) return;

    setIsDraggingMeals(false);

    window.setTimeout(() => {
      suppressMealClickRef.current = false;
    }, 80);
  };

  const handleMealClick = (meal: MealDetail) => {
    if (suppressMealClickRef.current) {
      suppressMealClickRef.current = false;
      return;
    }

    setSelectedMeal(meal);
  };

  const handlePlanChange = (nextPlan: Plan) => {
    if (nextPlan === plan) return;

    setSlideDirection(PLAN_ORDER[nextPlan] > PLAN_ORDER[plan] ? 'left' : 'right');
    onPlanChange(nextPlan);
  };

  const handleLightMealOptionChange = (option: LightMealOption) => {
    if (option === lightMealOption) return;

    setSlideDirection(
      LIGHT_OPTION_ORDER[option] > LIGHT_OPTION_ORDER[lightMealOption] ? 'left' : 'right',
    );
    onLightMealOptionChange(option);
  };

  const closeMealDetail = () => {
    if (!selectedMeal) return false;

    setSelectedMeal(null);
    return true;
  };

  useImperativeHandle(ref, () => ({
    closeMealDetail,
  }));

  useEffect(() => {
    onMealDetailOpenChange?.(selectedMeal !== null);
  }, [onMealDetailOpenChange, selectedMeal]);

  useEffect(() => {
    if (!isActive) return;

    setSelectedMeal(null);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    mealsScrollRef.current?.scrollTo({ left: 0 });
  }, [isActive, plan, lightMealOption, selectedDayIndex]);

  useEffect(() => {
    if (!isActive) return;

    window.requestAnimationFrame(() => {
      scrollSelectedDayIntoView(selectedDayIndex);
    });
  }, [isActive, selectedDayIndex]);

  const planToggleClassName = isModal
    ? 'flex w-full shrink-0 items-center border-b border-[var(--full-menu-border)] bg-[var(--full-menu-bg)] py-[12px] pl-[16px] pr-[56px] md:pl-[20px]'
    : 'flex w-full shrink-0 items-center border-b border-[var(--full-menu-border)] bg-[var(--full-menu-bg)] px-[length:var(--checkout-card-padding)] py-[12px]';

  const mealsOuterClassName = isModal
    ? 'flex-1 overflow-x-hidden overflow-y-auto'
    : 'max-h-[min(52svh,420px)] overflow-x-hidden overflow-y-auto';

  const mealsBleedClassName = isModal ? FULL_MENU_MEAL_CAROUSEL_BLEED : CHECKOUT_CARD_SECTION_BLEED_FROM_PADDING;

  const rootClassName = [
    isModal ? 'relative flex min-h-0 flex-1 flex-col overflow-hidden' : 'relative flex flex-col bg-[var(--full-menu-bg)]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const panelStyle: FullMenuPanelCssVariables = {
    ...fullMenuPanelStyle,
    '--full-menu-meal-carousel-padding-bottom':
      variant === 'float'
        ? FULL_MENU_MEAL_CAROUSEL_PADDING_BOTTOM_FLOAT_CLAMP
        : '20px',
  };

  return (
    <>
      <div style={panelStyle} className={rootClassName}>
        <style>
          {`
            @keyframes mealsSlideFromRight {
              from {
                opacity: 0;
                transform: translateX(36px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes mealsSlideFromLeft {
              from {
                opacity: 0;
                transform: translateX(-36px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}
        </style>

        <div className={planToggleClassName}>
          <FullMenuPlanToggle
            plan={plan}
            lightMealOption={lightMealOption}
            onPlanChange={handlePlanChange}
            onLightMealOptionChange={handleLightMealOptionChange}
            pillDefaultStyle={FULL_MENU_DAY_PILL_DEFAULT_STYLE}
            pillSelectedStyle={FULL_MENU_DAY_PILL_SELECTED_STYLE}
          />
        </div>

        <div className="shrink-0 px-[8px] pt-[12px] pb-0">
          <div className="flex w-full items-stretch" style={FULL_MENU_DAY_PILL_DEFAULT_STYLE}>
            <button
              type="button"
              onClick={handlePrevDay}
              disabled={!canGoPrev}
              className={[
                'flex w-[40px] shrink-0 items-center justify-center rounded-[8px] text-[var(--full-menu-muted)] transition-colors',
                canGoPrev ? 'cursor-pointer hover:bg-[var(--full-menu-day-bg-hover)]' : 'cursor-default',
              ].join(' ')}
              aria-label="Previous day"
            >
              <svg
                fill="none"
                viewBox="0 0 7 12"
                width="7"
                height="12"
                className={canGoPrev ? undefined : 'opacity-30'}
                aria-hidden
              >
                <path
                  d="M6 11L1 6L6 1"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <div className="relative min-w-0 flex-1">
              <div
                ref={daysScrollRef}
                onMouseDown={handleDaysMouseDown}
                onMouseMove={handleDaysMouseMove}
                onMouseUp={stopMouseDrag}
                onMouseLeave={stopMouseDrag}
                className={`min-w-0 touch-pan-x select-none overflow-x-auto overflow-y-hidden scrollbar-hide ${
                  isDraggingDays ? 'cursor-grabbing' : 'cursor-default'
                }`}
              >
                <div className="relative flex w-[280%] gap-[8px] md:w-[200%]">
                  {menuDays.map((d) => {
                    const active = d.absoluteDayIndex === selectedDayIndex;

                    return (
                      <button
                        key={d.menuDayId}
                        ref={(el) => {
                          dayRefs.current[d.absoluteDayIndex] = el;
                        }}
                        type="button"
                        onClick={() => handleDayClick(d.absoluteDayIndex)}
                        className={[
                          'relative flex flex-[0_0_calc((100%-104px)/14)] cursor-pointer flex-col items-center justify-center gap-[6px]',
                          'rounded-[8px] border border-solid bg-[var(--full-menu-day-bg)] py-[8px]',
                          'transition-colors duration-150',
                          'hover:enabled:bg-[var(--full-menu-day-bg-hover)]',
                          active
                            ? 'border-[var(--full-menu-day-border-selected)]'
                            : 'border-transparent',
                        ].join(' ')}
                        style={active ? FULL_MENU_DAY_PILL_SELECTED_STYLE : FULL_MENU_DAY_PILL_DEFAULT_STYLE}
                      >
                        <div className="flex w-full flex-col items-center gap-[4px]">
                          <p
                            className={`font-sans text-[length:var(--full-menu-day-date-font-size)] font-bold leading-none tracking-[-0.16px] ${
                              active ? 'text-[var(--full-menu-active)]' : 'text-[var(--full-menu-title)]'
                            }`}
                          >
                            {d.date}
                          </p>

                          <p
                            className={`font-sans text-[length:var(--full-menu-day-meta-font-size)] font-bold leading-none tracking-[-0.12px] ${
                              active ? 'text-[var(--full-menu-active)]' : 'text-[var(--full-menu-title)]'
                            }`}
                          >
                            {d.month}
                          </p>
                        </div>

                        <p
                          className={`font-sans text-[length:var(--full-menu-day-meta-font-size)] font-medium leading-none tracking-[-0.12px] ${
                            active ? 'text-[var(--full-menu-active)]' : 'text-[var(--full-menu-muted)]'
                          }`}
                        >
                          {d.day}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <CheckoutScrollEdgeFades
                showStart={showDaysStartFade}
                showEnd={showDaysEndFade}
                edgeColor={COLOR_TOKENS.base.white}
                fadeWidthClassName="w-[length:var(--checkout-scroll-edge-fade-width)]"
                startPositionClassName="left-0"
                endPositionClassName="right-0"
              />
            </div>

            <button
              type="button"
              onClick={handleNextDay}
              className={`flex w-[40px] shrink-0 items-center justify-center rounded-[8px] text-[var(--full-menu-muted)] transition-colors hover:bg-[var(--full-menu-day-bg-hover)] ${
                !canGoNext ? 'pointer-events-none opacity-0' : 'cursor-pointer'
              }`}
              aria-label="Next day"
            >
              <svg fill="none" viewBox="0 0 7 12" width="7" height="12">
                <path
                  d="M1 11L6 6L1 1"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={mealsOuterClassName}
          {...(isModal ? { [SPACING_CONTENT_ATTR]: '' } : {})}
        >
          <div className="relative w-full">
            <div className={mealsBleedClassName}>
              <div
                key={`${testMenuDays[selectedDayIndex]?.id ?? selectedDayIndex}-${plan}-${lightMealOption}`}
                ref={mealsScrollRef}
                onMouseDown={handleMealsMouseDown}
                onMouseMove={handleMealsMouseMove}
                onMouseUp={stopMealsMouseDrag}
                onMouseLeave={stopMealsMouseDrag}
                className={`flex touch-pan-x select-none justify-start gap-[length:var(--full-menu-meal-gap)] overflow-x-auto overflow-y-visible overscroll-x-contain px-0 pb-[length:var(--full-menu-meal-carousel-padding-bottom)] pt-[6px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:cursor-default md:overflow-x-hidden ${
                  isDraggingMeals ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{
                  animation:
                    slideDirection === 'left'
                      ? 'mealsSlideFromRight 260ms ease-out both'
                      : 'mealsSlideFromLeft 260ms ease-out both',
                }}
              >
                <CheckoutScrollEdgeGutter className={FULL_MENU_MEAL_CAROUSEL_GUTTER_CLASS_NAME} />
                {mealSlots.map(({ meal, active }) => (
                  <button
                    key={meal.id}
                    type="button"
                    onClick={() => handleMealClick(meal)}
                    className={[
                      'group relative z-0 flex w-[length:var(--full-menu-meal-card-width)] shrink-0 cursor-pointer flex-col gap-[12px] text-left hover:z-10 focus-visible:z-10 md:w-[length:var(--full-menu-meal-card-width-md)]',
                      active ? '' : 'hidden md:flex md:opacity-50',
                    ].join(' ')}
                  >
                    <div className="flex aspect-[25/19] w-full items-center justify-center overflow-visible">
                      <img
                        src={meal.img}
                        alt={meal.name}
                        draggable={false}
                        className={[
                          'pointer-events-none h-[94.74%] w-full rounded-[8px] object-cover origin-center transition-transform duration-200',
                          active ? 'group-hover:scale-105' : 'md:group-hover:scale-100',
                        ].join(' ')}
                      />
                    </div>

                    <div className="flex w-full flex-col gap-[12px] px-[4px]">
                      <p
                        className={[
                          TEXT_TRIM_CLASS_NAME,
                          'flex w-full flex-wrap items-center gap-x-[0.35em] font-sans text-[length:var(--full-menu-meal-meta-font-size)] font-medium leading-[140%] text-[var(--full-menu-muted)]',
                        ].join(' ')}
                      >
                        <span>{meal.kcal} kcal • {meal.weight} g</span>
                        <span>{meal.type}</span>
                      </p>

                      <p
                        className={[
                          'line-clamp-3 w-full [text-box-edge:auto] [text-box-trim:none] font-sans text-[length:var(--full-menu-meal-title-font-size)] font-semibold leading-[140%] text-[var(--full-menu-title)] transition-colors',
                          active ? 'group-hover:text-[var(--full-menu-active)]' : '',
                        ].join(' ')}
                      >
                        {meal.name}
                      </p>
                    </div>
                  </button>
                ))}
                <CheckoutScrollEdgeGutter className={FULL_MENU_MEAL_CAROUSEL_GUTTER_CLASS_NAME} />
              </div>
            </div>

            <CheckoutScrollEdgeFades
              showStart={showMealsStartFade}
              showEnd={showMealsEndFade}
              edgeColor={COLOR_TOKENS.base.white}
              fadeWidthClassName="w-[length:var(--full-menu-meal-carousel-inset)]"
              className="bottom-[4px] top-[6px] md:hidden"
              startPositionClassName="left-0"
              endPositionClassName="right-0"
            />
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
});
