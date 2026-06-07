import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { getMealsForPlan, testMenuDays, type LightMealOption } from '../../data/testMeals';
import type { Plan } from '../../data/checkoutPricing';
import type { Meal as MealDetail } from '../../types/meal';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { MealDetailModal } from './MealDetailModal';
import { CloseIcon } from '../ui/icons/CloseIcon';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MENU_DAYS_COUNT = testMenuDays.length;
const MOUSE_DRAG_CLICK_THRESHOLD = 6;
const EXIT_ANIMATION_FALLBACK_MS = 260;

type SlideDirection = 'left' | 'right';

type FullMenuModalCssVariables = CSSProperties & {
  '--full-menu-bg': string;
  '--full-menu-border': string;
  '--full-menu-title': string;
  '--full-menu-muted': string;
  '--full-menu-active': string;
  '--full-menu-active-soft': string;
  '--full-menu-active-muted': string;
  '--full-menu-close-bg': string;
  '--full-menu-close-bg-hover': string;
  '--full-menu-heading-font-size': string;
  '--full-menu-heading-font-size-md': string;
  '--full-menu-day-date-font-size': string;
  '--full-menu-day-meta-font-size': string;
  '--full-menu-meal-meta-font-size': string;
  '--full-menu-meal-title-font-size': string;
};

const fullMenuModalStyle: FullMenuModalCssVariables = {
  '--full-menu-bg': COLOR_TOKENS.base.white,
  '--full-menu-border': COLOR_TOKENS.neutral[100],
  '--full-menu-title': COLOR_TOKENS.neutral[900],
  '--full-menu-muted': COLOR_TOKENS.neutral[500],
  '--full-menu-active': COLOR_TOKENS.primary[500],
  '--full-menu-active-soft': COLOR_TOKENS.primary[50],
  '--full-menu-active-muted': COLOR_TOKENS.primary[400],
  '--full-menu-close-bg': COLOR_TOKENS.neutral[50],
  '--full-menu-close-bg-hover': COLOR_TOKENS.neutral[75],
  '--full-menu-heading-font-size': FONT_SIZE_TOKENS[20],
  '--full-menu-heading-font-size-md': FONT_SIZE_TOKENS[25],
  '--full-menu-day-date-font-size': FONT_SIZE_TOKENS[16],
  '--full-menu-day-meta-font-size': FONT_SIZE_TOKENS[12],
  '--full-menu-meal-meta-font-size': FONT_SIZE_TOKENS[12],
  '--full-menu-meal-title-font-size': FONT_SIZE_TOKENS[16],
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

export function FullMenuModal({
  isOpen,
  onClose,
  plan,
  lightMealOption,
}: {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
  lightMealOption: LightMealOption;
}) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('left');
  const [isDraggingDays, setIsDraggingDays] = useState(false);
  const [isDraggingMeals, setIsDraggingMeals] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const dayRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const daysScrollRef = useRef<HTMLDivElement | null>(null);
  const mealsScrollRef = useRef<HTMLDivElement | null>(null);

  const mouseDragStartXRef = useRef(0);
  const mouseDragStartScrollLeftRef = useRef(0);
  const suppressNextClickRef = useRef(false);

  const mealDragStartXRef = useRef(0);
  const mealDragStartScrollLeftRef = useRef(0);
  const suppressMealClickRef = useRef(false);

  const isClosingRef = useRef(false);
  const fallbackTimerRef = useRef<number | null>(null);

  const canGoPrev = selectedDayIndex > 0;
  const canGoNext = selectedDayIndex < MENU_DAYS_COUNT - 1;

  const menuDays = getMenuDays();
  const mealsForSelectedDay = getMealsForPlan(
    testMenuDays[selectedDayIndex],
    plan,
    lightMealOption,
  );

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  const finishClose = useCallback(() => {
    clearFallbackTimer();
    onClose();
  }, [clearFallbackTimer, onClose]);

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    setIsClosing(true);

    fallbackTimerRef.current = window.setTimeout(() => {
      finishClose();
    }, EXIT_ANIMATION_FALLBACK_MS);
  }, [finishClose]);

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

  useEffect(() => {
    if (!isOpen) return;

    isClosingRef.current = false;
    setIsClosing(false);
    setSelectedMeal(null);

    return () => {
      clearFallbackTimer();
    };
  }, [clearFallbackTimer, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selectedMeal) {
          setSelectedMeal(null);
          return;
        }

        requestClose();
      }
    };

    document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, requestClose, selectedMeal]);

  useEffect(() => {
    if (!isOpen) return;

    mealsScrollRef.current?.scrollTo({ left: 0 });
  }, [isOpen, plan, lightMealOption, selectedDayIndex]);

  useEffect(() => {
    if (!isOpen) return;

    window.requestAnimationFrame(() => {
      scrollSelectedDayIntoView(selectedDayIndex);
    });
  }, [isOpen, selectedDayIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end justify-center md:items-center"
      style={fullMenuModalStyle}
    >
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

      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-150 ${
          selectedMeal ? 'pointer-events-none opacity-0' : ''
        }`}
        onClick={requestClose}
      />

      <div
        className={`${
          isClosing ? 'modal-exit-responsive' : 'modal-enter-responsive'
        } relative flex max-h-[88svh] w-full flex-col overflow-hidden rounded-t-[20px] bg-[var(--full-menu-bg)] shadow-2xl transition-opacity duration-150 md:mx-[24px] md:max-h-[85vh] md:max-w-[780px] md:rounded-[20px] ${
          selectedMeal ? 'invisible opacity-0' : ''
        }`}
        onClick={(event) => event.stopPropagation()}
        onAnimationEnd={(event) => {
          if (event.currentTarget !== event.target) return;

          if (isClosingRef.current) {
            finishClose();
          }
        }}
      >
        <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-[var(--full-menu-border)] bg-[var(--full-menu-bg)]">
          <p className="pl-[16px] font-['Quicksand'] text-[length:var(--full-menu-heading-font-size)] font-bold leading-[130%] text-[var(--full-menu-title)] md:pl-[20px] md:text-[length:var(--full-menu-heading-font-size-md)]">
            Full menu
          </p>

          <button
            type="button"
            onClick={requestClose}
            className="group flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
            aria-label="Close"
          >
            <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--full-menu-close-bg)] transition-colors duration-150 group-hover:bg-[var(--full-menu-close-bg-hover)]">
              <CloseIcon
                size={12}
                color={COLOR_TOKENS.neutral[900]}
                strokeWidth={1.8}
              />
            </span>
          </button>
        </div>

        <div className="shrink-0 border-b border-[var(--full-menu-border)] px-[8px] py-[12px]">
          <div className="flex w-full items-stretch">
            <button
              type="button"
              onClick={handlePrevDay}
              className={`flex w-[40px] shrink-0 items-center justify-center rounded-[8px] text-[var(--full-menu-muted)] transition-colors hover:bg-[var(--full-menu-active-soft)] ${
                !canGoPrev ? 'pointer-events-none opacity-0' : 'cursor-pointer'
              }`}
              aria-label="Previous day"
            >
              <svg fill="none" viewBox="0 0 7 12" width="7" height="12">
                <path
                  d="M6 11L1 6L6 1"
                  stroke="currentColor"
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
              onMouseUp={stopMouseDrag}
              onMouseLeave={stopMouseDrag}
              className={`min-w-0 flex-1 touch-pan-x select-none overflow-x-auto overflow-y-hidden scrollbar-hide ${
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
                      className={`relative flex flex-[0_0_calc(100%/14)] cursor-pointer flex-col items-center justify-center gap-[6px] rounded-[8px] py-[8px] hover:bg-[var(--full-menu-active-soft)] ${
                        active ? 'bg-[var(--full-menu-active-soft)]' : ''
                      }`}
                    >
                      <div className="flex w-full flex-col items-center gap-[4px]">
                        <p
                          className={`font-['Quicksand'] text-[length:var(--full-menu-day-date-font-size)] font-bold leading-none tracking-[-0.16px] ${
                            active
                              ? 'text-[var(--full-menu-active)]'
                              : 'text-[var(--full-menu-title)]'
                          }`}
                        >
                          {d.date}
                        </p>

                        <p
                          className={`font-['Quicksand'] text-[length:var(--full-menu-day-meta-font-size)] font-bold leading-none tracking-[-0.12px] ${
                            active
                              ? 'text-[var(--full-menu-active)]'
                              : 'text-[var(--full-menu-title)]'
                          }`}
                        >
                          {d.month}
                        </p>
                      </div>

                      <p
                        className={`font-['Quicksand'] text-[length:var(--full-menu-day-meta-font-size)] font-medium leading-none tracking-[-0.12px] ${
                          active
                            ? 'text-[var(--full-menu-active-muted)]'
                            : 'text-[var(--full-menu-muted)]'
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
              className={`flex w-[40px] shrink-0 items-center justify-center rounded-[8px] text-[var(--full-menu-muted)] transition-colors hover:bg-[var(--full-menu-active-soft)] ${
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

        <div className="flex-1 overflow-y-auto">
          <div className="relative overflow-hidden">
            <div
              key={`${testMenuDays[selectedDayIndex]?.id ?? selectedDayIndex}-${plan}-${lightMealOption}`}
              ref={mealsScrollRef}
              onMouseDown={handleMealsMouseDown}
              onMouseMove={handleMealsMouseMove}
              onMouseUp={stopMealsMouseDrag}
              onMouseLeave={stopMealsMouseDrag}
              className={`flex touch-pan-x select-none justify-start gap-[20px] overflow-x-auto px-[20px] py-[20px] scrollbar-hide md:justify-center md:px-[24px] ${
                isDraggingMeals ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                animation:
                  slideDirection === 'left'
                    ? 'mealsSlideFromRight 260ms ease-out both'
                    : 'mealsSlideFromLeft 260ms ease-out both',
              }}
            >
              {mealsForSelectedDay.map((meal) => (
                <button
                  key={meal.id}
                  type="button"
                  onClick={() => handleMealClick(meal)}
                  className="group flex shrink-0 cursor-pointer flex-col gap-[8px] text-left"
                >
                  <div className="relative h-[108px] w-[150px] overflow-hidden rounded-[8px] md:h-[116px] md:w-[160px]">
                    <img
                      src={meal.img}
                      alt={meal.name}
                      draggable={false}
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex w-[150px] flex-col gap-[4px] md:w-[160px]">
                    <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap font-['Quicksand'] text-[length:var(--full-menu-meal-meta-font-size)] font-medium leading-[140%] text-[var(--full-menu-muted)] md:w-[160px]">
                      {meal.kcal} kcal • {meal.weight}g • {meal.type}
                    </p>

                    <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap font-['Quicksand'] text-[length:var(--full-menu-meal-title-font-size)] font-semibold leading-[140%] text-[var(--full-menu-title)] transition-colors group-hover:text-[var(--full-menu-active)] md:w-[160px]">
                      {meal.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div
              className="pointer-events-none absolute bottom-0 left-0 top-0 w-[20px] md:w-[32px]"
              style={{
                background: `linear-gradient(to left, transparent, ${COLOR_TOKENS.base.white})`,
              }}
            />
            <div
              className="pointer-events-none absolute bottom-0 right-0 top-0 w-[20px] md:w-[32px]"
              style={{
                background: `linear-gradient(to right, transparent, ${COLOR_TOKENS.base.white})`,
              }}
            />
          </div>
        </div>
      </div>

      <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
    </div>
  );
}