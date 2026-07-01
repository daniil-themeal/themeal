import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';

import {
  getFullMenuMealSlots,
  type LightMealOption,
} from '../../data/testMeals';
import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import type { MenuDay } from '../../types/meal';
import type { Meal as MealDetail } from '../../types/meal';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import {
  CHECKOUT_CARD_PADDING_CLAMP,
  CHECKOUT_FONT_CLAMP_14_16,
  CHECKOUT_FONT_CLAMP_20_25,
  FULL_MENU_MEAL_CAROUSEL_INSET_CLAMP,
  FULL_MENU_MEAL_CAROUSEL_PADDING_BOTTOM_FLOAT_CLAMP,
  FULL_MENU_MEAL_CARD_WIDTH_CLAMP,
  FULL_MENU_MEAL_CARD_WIDTH_MD_CLAMP,
  FULL_MENU_MEAL_CARD_WIDTH_CONTAINER_CLAMP,
  FULL_MENU_MEAL_CARD_WIDTH_MD_CONTAINER_CLAMP,
  FULL_MENU_MEAL_GAP_CLAMP,
  FULL_MENU_MEAL_GAP_CONTAINER_CLAMP,
  FULL_MENU_LIGHT_OPTION_GAP_CLAMP,
  FULL_MENU_LIGHT_OPTION_FONT_SIZE_CLAMP,
  FULL_MENU_LIGHT_OPTION_MAX_WIDTH_CLAMP,
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
import { FullMenuMealCard } from './FullMenuMealCard';
import { Button } from '../common/Button';
import { ModalHeader } from '../common/Modal';
import { SPACING_CONTENT_ATTR } from '../../main-landing/getSpacingMeasureRoot';
import { MealDetailModal } from './MealDetailModal';
import { getDefaultTrialDeliveryDate, getSubscriptionMenuDays, getTrialMenuDays } from './mealCalendarUtils';
import { useFullMenuDaySwipe } from './useFullMenuDaySwipe';
import { useHorizontalScrollEdgeFades } from './useHorizontalScrollEdgeFades';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const REFERENCE_DAY_COUNT = 14;
const MOBILE_REF_TRACK_PERCENT = 280;
const DESKTOP_REF_TRACK_PERCENT = 200;
/** Account embed — wider pills, ~3–4 days visible in the date scroller. */
const EMBEDDED_DAY_TRACK_PERCENT = 420;
const DAY_PILL_GAP_PX = 8;
const REFERENCE_GAP_TOTAL_PX = (REFERENCE_DAY_COUNT - 1) * DAY_PILL_GAP_PX;
const MOUSE_DRAG_CLICK_THRESHOLD = 6;
const FULL_MENU_DISCLAIMER =
  "Actual menu may vary; you'll see your final menu after ordering.";
const FULL_MENU_SURVEY_URL = 'https://survey.survicate.com/581878889e53a60e/?p=anonymous';
const fullMenuDisclaimerClassName =
  'font-sans text-[length:var(--full-menu-day-meta-font-size)] font-normal leading-[140%] whitespace-normal break-words text-[var(--full-menu-disclaimer-text)]';
type SlideDirection = 'left' | 'right';
type FullMenuPanelVariant = 'modal' | 'float' | 'embedded';

type FullMenuDayPillCssVariables = CSSProperties & {
  '--full-menu-day-bg': string;
  '--full-menu-day-bg-hover': string;
};

type FullMenuDayScrollCssVariables = CSSProperties & {
  containerType: 'inline-size';
  '--day-pill-w': string;
  '--day-pill-w-md': string;
};

type FullMenuDayTrackCssVariables = CSSProperties & {
  '--day-track-w': string;
  '--day-track-w-md': string;
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
  '--full-menu-disclaimer-text': string;
  '--full-menu-active': string;
  '--full-menu-active-soft': string;
  '--full-menu-active-muted': string;
  '--full-menu-heading-font-size': string;
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
  '--full-menu-light-option-max-width': string;
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
  '--full-menu-disclaimer-text': COLOR_TOKENS.neutral[700],
  '--full-menu-active': COLOR_TOKENS.primary[500],
  '--full-menu-active-soft': COLOR_TOKENS.primary[50],
  '--full-menu-active-muted': COLOR_TOKENS.primary[400],
  '--full-menu-heading-font-size': CHECKOUT_FONT_CLAMP_20_25,
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
  '--full-menu-light-option-max-width': FULL_MENU_LIGHT_OPTION_MAX_WIDTH_CLAMP,
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

function getMenuDayLabels(subscriptionMenuDays: MenuDay[]) {
  return subscriptionMenuDays.map((menuDay, index) => {
    const date = new Date(`${menuDay.date}T00:00:00`);
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;

    return {
      date: date.getDate(),
      month: MONTH_NAMES[date.getMonth()],
      day: DAY_NAMES[dayIndex],
      absoluteDayIndex: index,
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
  days?: DayOption;
  duration?: Duration;
  menuDays?: MenuDay[];
  onRequestClose?: () => void;
  onMealDetailOpenChange?: (open: boolean) => void;
  className?: string;
  isTrial?: boolean;
  trialDeliveryDate?: Date;
  showRateMealsButton?: boolean;
};

export const FullMenuPanel = forwardRef<FullMenuPanelHandle, FullMenuPanelProps>(function FullMenuPanel(
  {
    variant,
    isActive,
    plan,
    lightMealOption,
    days = 'weekdays',
    duration = 'monthly',
    menuDays,
    onRequestClose,
    onMealDetailOpenChange,
    className = '',
    isTrial = false,
    trialDeliveryDate,
    showRateMealsButton = false,
  },
  ref,
) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('left');
  const [isDraggingDays, setIsDraggingDays] = useState(false);
  const [isDraggingMeals, setIsDraggingMeals] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null);

  const subscriptionMenuDays = useMemo(
    () =>
      isTrial
        ? getTrialMenuDays(trialDeliveryDate ?? getDefaultTrialDeliveryDate())
        : menuDays ?? getSubscriptionMenuDays({ dayOption: days, duration }),
    [days, duration, isTrial, menuDays, trialDeliveryDate],
  );
  const menuDayLabels = useMemo(
    () => getMenuDayLabels(subscriptionMenuDays),
    [subscriptionMenuDays],
  );
  const menuDaysCount = menuDayLabels.length;
  const mobileDayTrackPercent =
    variant === 'embedded' ? EMBEDDED_DAY_TRACK_PERCENT : MOBILE_REF_TRACK_PERCENT;
  const desktopDayTrackPercent =
    variant === 'embedded' ? EMBEDDED_DAY_TRACK_PERCENT : DESKTOP_REF_TRACK_PERCENT;
  const dayScrollContainerStyle: FullMenuDayScrollCssVariables = {
    containerType: 'inline-size',
    '--day-pill-w': `calc((${mobileDayTrackPercent}cqw - ${REFERENCE_GAP_TOTAL_PX}px) / ${REFERENCE_DAY_COUNT})`,
    '--day-pill-w-md': `calc((${desktopDayTrackPercent}cqw - ${REFERENCE_GAP_TOTAL_PX}px) / ${REFERENCE_DAY_COUNT})`,
  };
  const dayTrackGapTotalPx = Math.max(0, menuDaysCount - 1) * DAY_PILL_GAP_PX;
  const dayTrackStyle: FullMenuDayTrackCssVariables = {
    '--day-track-w': `calc(${menuDaysCount} * var(--day-pill-w) + ${dayTrackGapTotalPx}px)`,
    '--day-track-w-md': `calc(${menuDaysCount} * var(--day-pill-w-md) + ${dayTrackGapTotalPx}px)`,
  };

  useEffect(() => {
    setSelectedDayIndex(0);
  }, [days, duration, plan, lightMealOption, isTrial, trialDeliveryDate]);

  const dayRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const daysScrollRef = useRef<HTMLDivElement | null>(null);
  const mealsScrollRef = useRef<HTMLDivElement | null>(null);
  const mealScrollRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeMealScrollRef = useRef<HTMLDivElement | null>(null);

  const mouseDragStartXRef = useRef(0);
  const mouseDragStartScrollLeftRef = useRef(0);
  const suppressNextClickRef = useRef(false);

  const mealDragStartXRef = useRef(0);
  const mealDragStartScrollLeftRef = useRef(0);
  const suppressMealClickRef = useRef(false);

  const canGoPrev = selectedDayIndex > 0;
  const canGoNext = menuDaysCount > 0 && selectedDayIndex < menuDaysCount - 1;
  const isModal = variant === 'modal';
  const isEmbedded = variant === 'embedded';

  const selectedMenuDay = subscriptionMenuDays[selectedDayIndex];
  const getMealSlotsForDayIndex = useCallback(
    (dayIndex: number) => {
      const menuDay = subscriptionMenuDays[dayIndex];
      if (!menuDay) return [];

      return isTrial
        ? getFullMenuMealSlots(menuDay, 'plus', lightMealOption)
        : getFullMenuMealSlots(menuDay, plan, lightMealOption);
    },
    [isTrial, lightMealOption, plan, subscriptionMenuDays],
  );
  const mealSlots = getMealSlotsForDayIndex(selectedDayIndex);
  const activeMealCount = mealSlots.filter((slot) => slot.active).length;

  const getMealScrollEl = useCallback(
    () => mealScrollRefs.current[selectedDayIndex] ?? null,
    [selectedDayIndex],
  );

  const isMealScrollLocked = useCallback(() => {
    if (!isEmbedded && window.matchMedia('(min-width: 768px)').matches) return true;

    const scrollEl = mealScrollRefs.current[selectedDayIndex];
    if (!scrollEl) return false;

    return scrollEl.scrollWidth <= scrollEl.clientWidth + 1;
  }, [isEmbedded, selectedDayIndex]);
  const daysScrollFadeKey = `${isActive}-${menuDaysCount}`;
  const { showStartFade: showDaysStartFade, showEndFade: showDaysEndFade } =
    useHorizontalScrollEdgeFades(daysScrollRef, daysScrollFadeKey, {
      alwaysVisibleWhenScrollable: true,
    });

  const mealsScrollFadeKey = `${isActive}-${selectedDayIndex}-${plan}-${lightMealOption}-${activeMealCount}`;
  const { showStartFade: showMealsStartFade, showEndFade: showMealsEndFade } =
    useHorizontalScrollEdgeFades(activeMealScrollRef, mealsScrollFadeKey, {
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
    const nextDayIndex = clamp(dayIndex, 0, Math.max(0, menuDaysCount - 1));

    if (nextDayIndex === selectedDayIndex) return;

    setSlideDirection(nextDayIndex > selectedDayIndex ? 'left' : 'right');
    setSelectedDayIndex(nextDayIndex);

    window.requestAnimationFrame(() => {
      scrollSelectedDayIntoView(nextDayIndex);
      mealScrollRefs.current[nextDayIndex]?.scrollTo({ left: 0, behavior: 'smooth' });
    });
  };

  const daySwipe = useFullMenuDaySwipe({
    dayCount: menuDaysCount,
    day: selectedDayIndex,
    onDayChange: (nextDay) => selectDay(nextDay),
    getMealScrollEl,
    isMealScrollLocked,
  });

  useEffect(() => {
    activeMealScrollRef.current = daySwipe.swipeEnabled
      ? mealScrollRefs.current[selectedDayIndex] ?? null
      : mealsScrollRef.current;
  }, [selectedDayIndex, menuDaysCount, plan, lightMealOption, activeMealCount, isActive, daySwipe.swipeEnabled]);

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
    if (suppressMealClickRef.current || daySwipe.suppressClickRef.current) {
      suppressMealClickRef.current = false;
      return;
    }

    setSelectedMeal(meal);
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

    mealScrollRefs.current[selectedDayIndex]?.scrollTo({ left: 0 });
  }, [isActive, plan, lightMealOption, selectedDayIndex]);

  useEffect(() => {
    if (!isActive) return;

    window.requestAnimationFrame(() => {
      scrollSelectedDayIntoView(selectedDayIndex);
    });
  }, [isActive, selectedDayIndex]);

  const mealsOuterClassName = isModal
    ? 'flex-1 overflow-x-hidden overflow-y-auto'
    : isEmbedded
      ? 'overflow-x-hidden overflow-y-visible'
      : 'max-h-[min(52svh,420px)] overflow-x-hidden overflow-y-auto';

  const mealsBleedClassName = isEmbedded
    ? 'w-full'
    : isModal
      ? FULL_MENU_MEAL_CAROUSEL_BLEED
      : CHECKOUT_CARD_SECTION_BLEED_FROM_PADDING;

  const rootClassName = [
    isModal
      ? 'relative flex min-h-0 flex-1 flex-col overflow-hidden'
      : isEmbedded
        ? '@container relative flex w-full min-w-0 flex-col overflow-visible bg-transparent'
        : 'relative flex flex-col bg-[var(--full-menu-bg)]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const panelStyle: FullMenuPanelCssVariables = {
    ...fullMenuPanelStyle,
    ...(isEmbedded
      ? {
          '--full-menu-meal-card-width': FULL_MENU_MEAL_CARD_WIDTH_CONTAINER_CLAMP,
          '--full-menu-meal-card-width-md': FULL_MENU_MEAL_CARD_WIDTH_MD_CONTAINER_CLAMP,
          '--full-menu-meal-gap': FULL_MENU_MEAL_GAP_CONTAINER_CLAMP,
        }
      : {}),
    '--full-menu-meal-carousel-padding-bottom':
      variant === 'float'
        ? FULL_MENU_MEAL_CAROUSEL_PADDING_BOTTOM_FLOAT_CLAMP
        : isEmbedded
          ? '0px'
          : '8px',
  };

  const mealCarouselClassName = [
    'flex touch-pan-x select-none justify-start gap-[length:var(--full-menu-meal-gap)] overflow-x-auto overflow-y-visible overscroll-x-contain',
    isEmbedded ? 'px-[length:var(--checkout-card-padding)]' : 'px-0',
    'pb-[length:var(--full-menu-meal-carousel-padding-bottom)]',
    isEmbedded ? 'pt-[16px]' : 'pt-[6px]',
    '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
    isEmbedded ? '' : 'md:overflow-x-hidden',
  ]
    .filter(Boolean)
    .join(' ');

  /** Swipe path: no native horizontal touch — gestures go through pointer handler. */
  const mealCarouselSwipeClassName = [
    mealCarouselClassName,
    'touch-none',
  ].join(' ');

  const renderMealCards = (dayIndex: number, withSwipeGuard: boolean) =>
    getMealSlotsForDayIndex(dayIndex)
      .filter((slot) => slot.active)
      .map(({ meal }) => (
        <FullMenuMealCard
          key={meal.id}
          meal={meal}
          onClick={
            withSwipeGuard
              ? daySwipe.guardMealClick(() => handleMealClick(meal))
              : () => handleMealClick(meal)
          }
          showRateMealButton={showRateMealsButton}
        />
      ));

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

        {isModal ? (
          <ModalHeader
            title="Full menu"
            onClose={onRequestClose}
            showClose={Boolean(onRequestClose)}
            className="border-[var(--full-menu-border)] bg-[var(--full-menu-bg)]"
            titleClassName="text-[var(--full-menu-title)]"
            style={{
              '--modal-border': fullMenuPanelStyle['--full-menu-border'],
              '--modal-bg': fullMenuPanelStyle['--full-menu-bg'],
              '--modal-title': fullMenuPanelStyle['--full-menu-title'],
            } as CSSProperties}
          />
        ) : null}

        <div className="shrink-0 px-[length:var(--checkout-card-padding)] pt-[12px] pb-0">
          <div className="flex w-full items-stretch gap-[12px]" style={FULL_MENU_DAY_PILL_DEFAULT_STYLE}>
            {!isEmbedded ? (
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
            ) : null}

            <div className="relative min-w-0 flex-1">
              <div
                ref={daysScrollRef}
                onMouseDown={handleDaysMouseDown}
                onMouseMove={handleDaysMouseMove}
                onMouseUp={stopMouseDrag}
                onMouseLeave={stopMouseDrag}
                className={`@container min-w-0 touch-pan-x select-none overflow-x-auto overflow-y-hidden scrollbar-hide ${
                  isDraggingDays ? 'cursor-grabbing' : 'cursor-default'
                }`}
                style={dayScrollContainerStyle}
              >
                <div
                  className="relative flex w-[var(--day-track-w)] gap-[8px] md:w-[var(--day-track-w-md)]"
                  style={dayTrackStyle}
                >
                  {menuDayLabels.map((d) => {
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
                          'relative flex flex-[0_0_var(--day-pill-w)] cursor-pointer flex-col items-center justify-center gap-[6px] md:flex-[0_0_var(--day-pill-w-md)]',
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
                            className={`font-sans text-[length:var(--full-menu-day-date-font-size)] font-bold leading-none tracking-[length:var(--letter-spacing-label16)] ${
                              active ? 'text-[var(--full-menu-active)]' : 'text-[var(--full-menu-title)]'
                            }`}
                          >
                            {d.date}
                          </p>

                          <p
                            className={`font-sans text-[length:var(--full-menu-day-meta-font-size)] font-bold leading-none tracking-[length:var(--letter-spacing-label12)] ${
                              active ? 'text-[var(--full-menu-active)]' : 'text-[var(--full-menu-title)]'
                            }`}
                          >
                            {d.month}
                          </p>
                        </div>

                        <p
                          className={`font-sans text-[length:var(--full-menu-day-meta-font-size)] font-medium leading-none tracking-[length:var(--letter-spacing-label12)] ${
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

            {!isEmbedded ? (
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
            ) : null}

            {isEmbedded && showRateMealsButton ? (
              <Button type="button" variant="primary" size="small" className="shrink-0 self-center">
                Rate meals
              </Button>
            ) : null}
          </div>
        </div>

        <div
          className={mealsOuterClassName}
          {...(isModal ? { [SPACING_CONTENT_ATTR]: '' } : {})}
        >
          <div className="relative w-full">
            <div className={mealsBleedClassName}>
              {daySwipe.swipeEnabled ? (
                <div
                  ref={daySwipe.viewportRef}
                  onPointerDownCapture={daySwipe.onPointerDown}
                  onPointerMoveCapture={daySwipe.onPointerMove}
                  onPointerUp={daySwipe.onPointerUp}
                  onPointerCancel={daySwipe.onPointerCancel}
                  className={[
                    'overflow-hidden touch-none select-none',
                    daySwipe.isDragging && daySwipe.dragMode === 'daySwipe'
                      ? 'cursor-grabbing'
                      : 'cursor-grab',
                  ].join(' ')}
                >
                  <div
                    style={daySwipe.trackStyle}
                    className={[
                      'flex will-change-transform',
                      daySwipe.isDragging && daySwipe.dragMode === 'daySwipe'
                        ? 'transition-none'
                        : 'transition-transform duration-[260ms] ease-out',
                    ].join(' ')}
                  >
                    {menuDayLabels.map((d, dayIndex) => (
                      <div
                        key={d.menuDayId}
                        className="shrink-0 min-w-0"
                        style={daySwipe.slideStyle}
                      >
                        <div
                          ref={(el) => {
                            mealScrollRefs.current[dayIndex] = el;
                          }}
                          className={mealCarouselSwipeClassName}
                        >
                          {!isEmbedded ? (
                            <CheckoutScrollEdgeGutter className={FULL_MENU_MEAL_CAROUSEL_GUTTER_CLASS_NAME} />
                          ) : null}
                          {renderMealCards(dayIndex, true)}
                          {!isEmbedded ? (
                            <CheckoutScrollEdgeGutter className={FULL_MENU_MEAL_CAROUSEL_GUTTER_CLASS_NAME} />
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  key={`${selectedMenuDay?.id ?? selectedDayIndex}-${plan}-${lightMealOption}`}
                  ref={mealsScrollRef}
                  onMouseDown={handleMealsMouseDown}
                  onMouseMove={handleMealsMouseMove}
                  onMouseUp={stopMealsMouseDrag}
                  onMouseLeave={stopMealsMouseDrag}
                  className={`${mealCarouselClassName} ${
                    isEmbedded ? '' : 'md:cursor-default'
                  } ${isDraggingMeals ? 'cursor-grabbing' : 'cursor-grab'}`}
                  style={{
                    animation:
                      slideDirection === 'left'
                        ? 'mealsSlideFromRight 260ms ease-out both'
                        : 'mealsSlideFromLeft 260ms ease-out both',
                  }}
                >
                  {!isEmbedded ? (
                    <CheckoutScrollEdgeGutter className={FULL_MENU_MEAL_CAROUSEL_GUTTER_CLASS_NAME} />
                  ) : null}
                  {renderMealCards(selectedDayIndex, false)}
                  {!isEmbedded ? (
                    <CheckoutScrollEdgeGutter className={FULL_MENU_MEAL_CAROUSEL_GUTTER_CLASS_NAME} />
                  ) : null}
                </div>
              )}

              {!isEmbedded ? (
                <div className="flex w-full min-w-0 gap-[length:var(--full-menu-meal-gap)]">
                  <CheckoutScrollEdgeGutter className={FULL_MENU_MEAL_CAROUSEL_GUTTER_CLASS_NAME} />
                  <p className={`min-w-0 flex-1 px-[4px] pt-[4px] pb-[16px] ${fullMenuDisclaimerClassName}`}>
                    {FULL_MENU_DISCLAIMER}{' '}
                    Not a fit?{' '}
                    <a
                      href={FULL_MENU_SURVEY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words underline underline-offset-2 text-[var(--full-menu-active)] transition-colors hover:text-[var(--full-menu-active-muted)]"
                    >
                      Take a quick survey
                    </a>
                    .
                  </p>
                  <CheckoutScrollEdgeGutter className={FULL_MENU_MEAL_CAROUSEL_GUTTER_CLASS_NAME} />
                </div>
              ) : null}
            </div>

            <CheckoutScrollEdgeFades
              showStart={showMealsStartFade}
              showEnd={showMealsEndFade}
              edgeColor={COLOR_TOKENS.base.white}
              fadeWidthClassName="w-[length:var(--full-menu-meal-carousel-inset)]"
              className={
                isEmbedded ? 'bottom-0 top-[16px]' : 'bottom-[4px] top-[6px] md:hidden'
              }
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
