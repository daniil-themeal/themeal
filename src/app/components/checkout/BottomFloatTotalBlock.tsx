import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type TouchEvent,
} from 'react';
import { createPortal } from 'react-dom';

import {
  DEFAULT_CHECKOUT_PRICING,
  formatAed,
  formatPricePerDay,
  getCheckoutPrice,
  type CheckoutPricingTable,
  type DayOption,
  type Duration,
  type Plan,
} from '../../data/checkoutPricing';
import { getMealsForPlan, testMenuDays, type LightMealOption } from '../../data/testMeals';
import type { Meal as MealDetail } from '../../types/meal';
import { COLOR_TOKENS } from '../common/colorTokens';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';

import { MealDetailModal } from './MealDetailModal';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MENU_DAYS_COUNT = testMenuDays.length;
const MOUSE_DRAG_CLICK_THRESHOLD = 6;
const MENU_EXIT_ANIMATION_FALLBACK_MS = 260;

type BottomFloatTotalBlockCssVariables = CSSProperties & {
  '--checkout-float-surface': string;
  '--checkout-float-menu-toggle-bg': string;
  '--checkout-float-muted': string;
  '--checkout-float-text': string;
  '--checkout-float-active': string;
  '--checkout-float-active-soft': string;
  '--checkout-float-active-hover': string;
  '--checkout-float-active-muted': string;
  '--checkout-float-divider': string;
  '--checkout-float-button-bg': string;
  '--checkout-float-button-text': string;
  '--checkout-float-font-size-sm': string;
  '--checkout-float-font-size-md': string;
  '--checkout-float-font-size-lg': string;
};

const bottomFloatTotalBlockStyle: BottomFloatTotalBlockCssVariables = {
  '--checkout-float-surface': COLOR_TOKENS.base.white,
  '--checkout-float-menu-toggle-bg': COLOR_TOKENS.neutral[75],
  '--checkout-float-muted': COLOR_TOKENS.neutral[500],
  '--checkout-float-text': COLOR_TOKENS.neutral[900],
  '--checkout-float-active': COLOR_TOKENS.primary[500],
  '--checkout-float-active-soft': COLOR_TOKENS.primary[50],
  '--checkout-float-active-hover': COLOR_TOKENS.primary[50],
  '--checkout-float-active-muted': COLOR_TOKENS.primary[300],
  '--checkout-float-divider': COLOR_TOKENS.neutral[100],
  '--checkout-float-button-bg': COLOR_TOKENS.primary[500],
  '--checkout-float-button-text': COLOR_TOKENS.base.white,
  '--checkout-float-font-size-sm': FONT_SIZE_TOKENS[12],
  '--checkout-float-font-size-md': FONT_SIZE_TOKENS[16],
  '--checkout-float-font-size-lg': FONT_SIZE_TOKENS[20],
};

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

export function BottomFloatTotalBlock({
  plan,
  days,
  duration,
  lightMealOption,
  onScrollToSummary,
  hidden = false,
  pricingTable = DEFAULT_CHECKOUT_PRICING,
}: {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  lightMealOption: LightMealOption;
  onScrollToSummary: () => void;
  hidden?: boolean;
  pricingTable?: CheckoutPricingTable;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isDraggingDays, setIsDraggingDays] = useState(false);
  const [isDraggingMeals, setIsDraggingMeals] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null);

  const dayRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const daysScrollRef = useRef<HTMLDivElement | null>(null);
  const mealsScrollRef = useRef<HTMLDivElement | null>(null);

  const daysDragStartXRef = useRef(0);
  const daysDragStartScrollLeftRef = useRef(0);
  const suppressDayClickRef = useRef(false);

  const mealsDragStartXRef = useRef(0);
  const mealsDragStartScrollLeftRef = useRef(0);
  const suppressMealClickRef = useRef(false);

  const menuClosingRef = useRef(false);
  const menuCloseTimerRef = useRef<number | null>(null);

  const pricing = getCheckoutPrice({
    pricingTable,
    plan,
    days,
    duration,
  });

  const menuDays = getMenuDays();
  const canGoPrev = selectedDayIndex > 0;
  const canGoNext = selectedDayIndex < MENU_DAYS_COUNT - 1;
  const menuVisible = menuOpen || menuClosing;

  const selectedDayMeals = getMealsForPlan(
    testMenuDays[selectedDayIndex],
    plan,
    lightMealOption,
  );

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
    if (suppressDayClickRef.current) {
      suppressDayClickRef.current = false;
      return;
    }

    selectDay(dayIndex);
  };

  const handleDaysMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const scrollContainer = daysScrollRef.current;
    if (!scrollContainer) return;

    setIsDraggingDays(true);
    suppressDayClickRef.current = false;
    daysDragStartXRef.current = event.clientX;
    daysDragStartScrollLeftRef.current = scrollContainer.scrollLeft;
  };

  const handleDaysMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingDays) return;

    const scrollContainer = daysScrollRef.current;
    if (!scrollContainer) return;

    const deltaX = event.clientX - daysDragStartXRef.current;

    if (Math.abs(deltaX) > MOUSE_DRAG_CLICK_THRESHOLD) {
      suppressDayClickRef.current = true;
    }

    scrollContainer.scrollLeft = daysDragStartScrollLeftRef.current - deltaX;
  };

  const stopDaysMouseDrag = () => {
    if (!isDraggingDays) return;

    setIsDraggingDays(false);

    window.setTimeout(() => {
      suppressDayClickRef.current = false;
    }, 80);
  };

  const handleMealsMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const scrollContainer = mealsScrollRef.current;
    if (!scrollContainer) return;

    setIsDraggingMeals(true);
    suppressMealClickRef.current = false;
    mealsDragStartXRef.current = event.clientX;
    mealsDragStartScrollLeftRef.current = scrollContainer.scrollLeft;
  };

  const handleMealsMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingMeals) return;

    const scrollContainer = mealsScrollRef.current;
    if (!scrollContainer) return;

    const deltaX = event.clientX - mealsDragStartXRef.current;

    if (Math.abs(deltaX) > MOUSE_DRAG_CLICK_THRESHOLD) {
      suppressMealClickRef.current = true;
    }

    scrollContainer.scrollLeft = mealsDragStartScrollLeftRef.current - deltaX;
  };

  const stopMealsMouseDrag = () => {
    if (!isDraggingMeals) return;

    setIsDraggingMeals(false);

    window.setTimeout(() => {
      suppressMealClickRef.current = false;
    }, 80);
  };

  const handleMealsTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const scrollContainer = mealsScrollRef.current;
    if (!scrollContainer) return;

    suppressMealClickRef.current = false;
    mealsDragStartXRef.current = event.touches[0].clientX;
    mealsDragStartScrollLeftRef.current = scrollContainer.scrollLeft;
  };

  const handleMealsTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const scrollContainer = mealsScrollRef.current;
    if (!scrollContainer) return;

    const deltaX = event.touches[0].clientX - mealsDragStartXRef.current;

    if (Math.abs(deltaX) > MOUSE_DRAG_CLICK_THRESHOLD) {
      suppressMealClickRef.current = true;
    }

    scrollContainer.scrollLeft = mealsDragStartScrollLeftRef.current - deltaX;
  };

  const handleMealsTouchEnd = () => {
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

  useEffect(() => {
    return () => {
      clearMenuCloseTimer();
    };
  }, [clearMenuCloseTimer]);

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-[150] flex flex-col items-end transition-transform duration-300 ease-in-out md:hidden ${
          hidden ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={bottomFloatTotalBlockStyle}
      >
        <div className="relative z-20 px-[20px]">
          <button
            type="button"
            onClick={toggleMenu}
            className="flex h-[32px] cursor-pointer items-center justify-center gap-[4px] rounded-tl-[4px] rounded-tr-[4px] bg-[var(--checkout-float-menu-toggle-bg)] px-[16px]"
          >
            <p className="text-center font-sans text-[length:var(--checkout-float-font-size-sm)] font-bold leading-[18px] text-[var(--checkout-float-muted)]">
              {menuOpen ? 'Hide menu' : 'Show menu'}
            </p>

            <svg
              className={`transition-transform duration-200 ${menuOpen ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 5.6 9.6"
              width="6"
              height="10"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M0.8 8.8L4.8 4.8L0.8 0.8"
                stroke="var(--checkout-float-text)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
              />
            </svg>
          </button>
        </div>

        <div className="w-full overflow-hidden bg-[var(--checkout-float-surface)] drop-shadow-[0px_-4px_12px_rgba(0,0,0,0.08)]">
          <div className="relative">
            {menuVisible && (
              <div
                className={`${menuClosing ? 'modal-exit-mobile-full' : 'modal-enter-mobile-full'} relative z-0 bg-[var(--checkout-float-surface)]`}
                onAnimationEnd={(event) => {
                  if (event.currentTarget !== event.target) return;

                  if (menuClosingRef.current) {
                    finishMenuClose();
                  }
                }}
              >
                <div className="px-[20px] pt-[20px]">
                  <div className="flex w-full items-stretch">
                    <button
                      type="button"
                      onClick={handlePrevDay}
                      className={`flex w-[40px] shrink-0 items-center justify-center rounded-[8px] transition-colors hover:bg-[var(--checkout-float-active-hover)] ${
                        !canGoPrev ? 'pointer-events-none opacity-0' : 'cursor-pointer'
                      }`}
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 7 12"
                        width="7"
                        height="12"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M6 11L1 6L6 1"
                          stroke="var(--checkout-float-muted)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>

                    <div
                      ref={daysScrollRef}
                      onMouseDown={handleDaysMouseDown}
                      onMouseMove={handleDaysMouseMove}
                      onMouseUp={stopDaysMouseDrag}
                      onMouseLeave={stopDaysMouseDrag}
                      className={`scrollbar-hide min-w-0 flex-1 touch-pan-x select-none overflow-x-auto overflow-y-hidden ${
                        isDraggingDays ? 'cursor-grabbing' : 'cursor-default'
                      }`}
                    >
                      <div className="relative flex w-[200%]">
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
                              className={`relative flex flex-[0_0_calc(100%/14)] cursor-pointer flex-col items-center justify-center gap-[6px] rounded-[8px] py-[8px] hover:bg-[var(--checkout-float-active-hover)] ${
                                active ? 'bg-[var(--checkout-float-active-soft)]' : ''
                              }`}
                            >
                              <div className="flex w-full flex-col items-center gap-[4px]">
                                <p
                                  className={`font-sans text-[length:var(--checkout-float-font-size-md)] font-bold leading-none tracking-[-0.16px] ${
                                    active
                                      ? 'text-[var(--checkout-float-active)]'
                                      : 'text-[var(--checkout-float-text)]'
                                  }`}
                                >
                                  {d.date}
                                </p>

                                <p
                                  className={`font-sans text-[length:var(--checkout-float-font-size-sm)] font-bold leading-none tracking-[-0.12px] ${
                                    active
                                      ? 'text-[var(--checkout-float-active)]'
                                      : 'text-[var(--checkout-float-text)]'
                                  }`}
                                >
                                  {d.month}
                                </p>
                              </div>

                              <p
                                className={`font-sans text-[length:var(--checkout-float-font-size-sm)] font-medium leading-none tracking-[-0.12px] ${
                                  active
                                    ? 'text-[var(--checkout-float-active-muted)]'
                                    : 'text-[var(--checkout-float-muted)]'
                                }`}
                              >
                                {d.day}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextDay}
                      className={`flex w-[40px] shrink-0 items-center justify-center rounded-[8px] transition-colors hover:bg-[var(--checkout-float-active-hover)] ${
                        !canGoNext ? 'pointer-events-none opacity-0' : 'cursor-pointer'
                      }`}
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 7 12"
                        width="7"
                        height="12"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M1 11L6 6L1 1"
                          stroke="var(--checkout-float-muted)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div
                    ref={mealsScrollRef}
                    onMouseDown={handleMealsMouseDown}
                    onMouseMove={handleMealsMouseMove}
                    onMouseUp={stopMealsMouseDrag}
                    onMouseLeave={stopMealsMouseDrag}
                    onTouchStart={handleMealsTouchStart}
                    onTouchMove={handleMealsTouchMove}
                    onTouchEnd={handleMealsTouchEnd}
                    className="scrollbar-hide flex cursor-grab touch-pan-x select-none gap-[12px] overflow-x-auto px-[20px] py-[16px] active:cursor-grabbing"
                  >
                    {selectedDayMeals.map((meal) => (
                      <button
                        key={meal.id}
                        type="button"
                        onClick={() => handleMealClick(meal)}
                        className="group flex shrink-0 cursor-pointer flex-col gap-[8px] text-left"
                      >
                        <div className="relative h-[108px] w-[150px] overflow-hidden rounded-[8px]">
                          <img
                            src={meal.img}
                            alt={meal.name}
                            draggable={false}
                            className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                        </div>

                        <p
                          className={[
                            TEXT_TRIM_CLASS_NAME,
                            'w-[150px] font-sans text-[length:var(--checkout-float-font-size-md)] font-semibold leading-[1.4] text-[var(--checkout-float-text)] transition-colors group-hover:text-[var(--checkout-float-active)]',
                          ].join(' ')}
                        >
                          {meal.name}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[20px] bg-gradient-to-l from-transparent to-[var(--checkout-float-surface)]" />
                  <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[20px] bg-gradient-to-r from-transparent to-[var(--checkout-float-surface)]" />
                </div>
              </div>
            )}

            <div className="relative z-10 w-full bg-[var(--checkout-float-surface)]">
              <div className="w-full">
                <div className="flex items-center gap-[16px] px-[20px] py-[8px]">
                  <div className="flex flex-1 flex-col items-center gap-[2px]">
                    <div className="flex items-end gap-[4px]">
                      {pricing.oldPeriodPrice ? (
                        <p className="font-sans text-[length:var(--checkout-float-font-size-sm)] font-bold text-[var(--checkout-float-muted)] line-through">
                          {formatAed(pricing.oldPeriodPrice)}
                        </p>
                      ) : null}

                      <p className="font-sans text-[length:var(--checkout-float-font-size-lg)] font-bold leading-none text-[var(--checkout-float-active)]">
                        AED
                      </p>

                      <p className="font-sans text-[length:var(--checkout-float-font-size-lg)] font-bold leading-none text-[var(--checkout-float-active)]">
                        {formatAed(pricing.periodPrice)}
                      </p>
                    </div>

                    <p className="font-sans text-[length:var(--checkout-float-font-size-sm)] font-bold text-[var(--checkout-float-text)]">
                      AED {formatPricePerDay(pricing.pricePerDay)}/day
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleScrollToSummary}
                    className="flex h-[40px] flex-1 cursor-pointer items-center justify-center rounded-[4px] bg-[var(--checkout-float-button-bg)]"
                  >
                    <p className="font-sans text-[length:var(--checkout-float-font-size-sm)] font-bold leading-[18px] text-[var(--checkout-float-button-text)]">
                      Order
                    </p>
                  </button>
                </div>
              </div>

              <div className="h-px w-full bg-[var(--checkout-float-divider)]" />
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