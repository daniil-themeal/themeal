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
import { AnimatedNumber } from '../common/AnimatedNumber';
import { COLOR_TOKENS } from '../common/colorTokens';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';

import { MealDetailModal } from './MealDetailModal';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MENU_DAYS_COUNT = testMenuDays.length;
const MOUSE_DRAG_CLICK_THRESHOLD = 6;
const MENU_EXIT_ANIMATION_FALLBACK_MS = 260;
const WHATSAPP_URL = 'https://wa.me/971501234567';

function CheckoutWhatsAppIcon() {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 29 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0.613321 14.9917C0.612649 17.4502 1.24654 19.8507 2.45188 21.9665L0.498047 29.1957L7.79858 27.2559C9.81782 28.3698 12.0802 28.9535 14.3793 28.9536H14.3853C21.9749 28.9536 28.153 22.6952 28.1563 15.0027C28.1577 11.2752 26.7266 7.77006 24.1263 5.13298C21.5265 2.49614 18.0688 1.04321 14.3847 1.0415C6.79424 1.0415 0.616566 7.29962 0.613433 14.9917"
        fill="#25D366"
      />
      <path
        d="M0.119751 14.9882C0.118967 17.5351 0.775581 20.0215 2.0239 22.2131L0 29.7014L7.5623 27.692C9.64596 28.8433 11.992 29.4503 14.3791 29.4512H14.3853C22.2472 29.4512 28.6472 22.9676 28.6506 14.9998C28.6519 11.1383 27.1693 7.50716 24.4761 4.77561C21.7826 2.0444 18.2013 0.539185 14.3853 0.537598C6.52204 0.537598 0.122884 7.02028 0.119751 14.9882ZM4.62338 21.8356L4.34101 21.3814C3.15403 19.4688 2.52752 17.2586 2.52842 14.9891C2.53088 8.36637 7.84959 2.97824 14.3898 2.97824C17.557 2.9796 20.5335 4.23077 22.7723 6.50085C25.011 8.77114 26.2428 11.7891 26.242 14.9989C26.2391 21.6216 20.9203 27.0104 14.3853 27.0104H14.3806C12.2527 27.0093 10.1658 26.4302 8.34583 25.3359L7.91271 25.0756L3.42509 26.2679L4.62338 21.8356Z"
        fill="#fff"
      />
      <path
        d="M10.8199 8.94697C10.5529 8.34554 10.2718 8.3334 10.0179 8.32286C9.80995 8.31378 9.57224 8.31446 9.33476 8.31446C9.09705 8.31446 8.71082 8.40508 8.38436 8.7663C8.05757 9.12786 7.13672 10.0016 7.13672 11.7787C7.13672 13.5557 8.41402 15.2732 8.59208 15.5145C8.77036 15.7553 11.0579 19.5187 14.6809 20.9666C17.6919 22.1698 18.3046 21.9305 18.9581 21.8701C19.6117 21.81 21.0671 20.9966 21.364 20.1532C21.6611 19.3098 21.6611 18.5869 21.572 18.4359C21.4829 18.2854 21.2452 18.195 20.8888 18.0144C20.5323 17.8339 18.7798 16.9599 18.4531 16.8394C18.1264 16.7189 17.8888 16.6588 17.651 17.0205C17.4133 17.3816 16.7308 18.195 16.5227 18.4359C16.3149 18.6773 16.1068 18.7074 15.7505 18.5267C15.3938 18.3455 14.2459 17.9645 12.884 16.7341C11.8243 15.7767 11.109 14.5944 10.901 14.2327C10.6931 13.8716 10.8788 13.6758 11.0575 13.4958C11.2176 13.334 11.4141 13.0741 11.5924 12.8632C11.7702 12.6523 11.8295 12.5018 11.9483 12.2609C12.0673 12.0198 12.0078 11.8088 11.9188 11.6282C11.8295 11.4475 11.1368 9.66113 10.8199 8.94697Z"
        fill="#fff"
      />
    </svg>
  );
}

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
  '--checkout-float-meal-title-font-size': string;
  '--checkout-float-meal-title-font-size-md': string;
  '--checkout-float-meal-meta-font-size': string;
  '--checkout-float-font-size-lg': string;
  '--checkout-float-discount': string;
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
  '--checkout-float-meal-title-font-size': FONT_SIZE_TOKENS[14],
  '--checkout-float-meal-title-font-size-md': FONT_SIZE_TOKENS[16],
  '--checkout-float-meal-meta-font-size': FONT_SIZE_TOKENS[12],
  '--checkout-float-font-size-lg': FONT_SIZE_TOKENS[20],
  '--checkout-float-discount': COLOR_TOKENS.neutral[300],
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
                    className={`scrollbar-hide flex touch-pan-x select-none justify-start gap-[20px] overflow-x-auto overflow-y-visible px-[20px] pt-[8px] pb-[16px] md:justify-center md:px-[24px] ${
                      isDraggingMeals ? 'cursor-grabbing' : 'cursor-grab'
                    }`}
                  >
                    {selectedDayMeals.map((meal) => (
                      <button
                        key={meal.id}
                        type="button"
                        onClick={() => handleMealClick(meal)}
                        className="group relative z-0 flex shrink-0 cursor-pointer flex-col gap-[12px] text-left hover:z-10 focus-visible:z-10"
                      >
                        <div className="flex h-[114px] w-[150px] items-center justify-center overflow-visible md:h-[122px] md:w-[160px]">
                          <img
                            src={meal.img}
                            alt={meal.name}
                            draggable={false}
                            className="pointer-events-none h-[108px] w-full rounded-[8px] object-cover origin-center transition-transform duration-200 group-hover:scale-105 md:h-[116px] md:w-[160px]"
                          />
                        </div>

                        <div className="flex w-[150px] flex-col gap-[12px] md:w-[160px]">
                          <p
                            className={[
                              TEXT_TRIM_CLASS_NAME,
                              'flex w-[150px] flex-wrap items-center gap-x-[0.35em] font-sans text-[length:var(--checkout-float-meal-meta-font-size)] font-medium leading-[140%] text-[var(--checkout-float-muted)] md:w-[160px]',
                            ].join(' ')}
                          >
                            <span>{meal.kcal} kcal • {meal.weight} g</span>
                            <span>{meal.type}</span>
                          </p>

                          <p
                            className={[
                              TEXT_TRIM_CLASS_NAME,
                              'w-[150px] font-sans text-[length:var(--checkout-float-meal-title-font-size)] font-semibold leading-[140%] text-[var(--checkout-float-text)] transition-colors group-hover:text-[var(--checkout-float-active)] md:w-[160px] md:text-[length:var(--checkout-float-meal-title-font-size-md)]',
                            ].join(' ')}
                          >
                            {meal.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div
                    className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-[20px] md:w-[32px]"
                    style={{
                      background: `linear-gradient(to left, transparent, ${COLOR_TOKENS.base.white})`,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-[20px] md:w-[32px]"
                    style={{
                      background: `linear-gradient(to right, transparent, ${COLOR_TOKENS.base.white})`,
                    }}
                  />
                </div>
              </div>
            )}

            <div className="relative z-10 w-full bg-[var(--checkout-float-surface)]">
              <div className="w-full">
                <div className="flex items-center gap-[8px] px-[20px] py-[8px]">
                  <div className="flex min-w-0 flex-1 flex-col items-center justify-start gap-[8px]">
                    <div className="flex items-end gap-[5px] tabular-nums">
                      {pricing.oldPeriodPrice ? (
                        <p className="font-sans text-[length:var(--checkout-float-font-size-sm)] font-bold leading-none text-[var(--checkout-float-muted)] line-through">
                          <AnimatedNumber value={pricing.oldPeriodPrice} format={formatAed} />
                        </p>
                      ) : null}

                      <div className="flex items-end gap-[4px]">
                        <p className="font-sans text-[length:var(--checkout-float-font-size-lg)] font-bold leading-none text-[var(--checkout-float-active)]">
                          AED
                        </p>

                        <p className="font-sans text-[length:var(--checkout-float-font-size-lg)] font-bold leading-none text-[var(--checkout-float-active)]">
                          <AnimatedNumber value={pricing.periodPrice} format={formatAed} />
                        </p>
                      </div>

                      {pricing.oldPeriodPrice ? (
                        <p className="font-sans text-[length:var(--checkout-float-font-size-sm)] font-bold leading-none text-transparent opacity-0">
                          <AnimatedNumber value={pricing.oldPeriodPrice} format={formatAed} />
                        </p>
                      ) : null}
                    </div>

                    <p className="text-right font-sans text-[length:var(--checkout-float-font-size-sm)] font-bold text-[var(--checkout-float-text)]">
                      AED <AnimatedNumber value={pricing.pricePerDay} format={formatPricePerDay} />/day
                    </p>
                  </div>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[4px] bg-[#25D366]"
                  >
                    <CheckoutWhatsAppIcon />
                  </a>

                  <button
                    type="button"
                    onClick={handleScrollToSummary}
                    className="flex h-[40px] min-w-[88px] flex-1 cursor-pointer items-center justify-center rounded-[4px] bg-[var(--checkout-float-button-bg)]"
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