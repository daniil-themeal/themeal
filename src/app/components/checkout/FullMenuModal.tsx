import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { getMealsForPlan, testMenuDays, type LightMealOption } from '../../data/testMeals';
import type { Plan } from '../../data/checkoutPricing';
import type { Meal as MealDetail } from '../../types/meal';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { ModalShell } from '../common/ModalShell';
import { SPACING_CONTENT_ATTR } from '../../landing-stas/getSpacingMeasureRoot';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import { FullMenuPlanToggle } from './FullMenuPlanToggle';
import { MealDetailModal } from './MealDetailModal';
import { XIcon } from '../common/icons';
import { iconColorClassName, iconColorStyle } from '../common/iconColorTokens';

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

type FullMenuDayPillCssVariables = CSSProperties & {
  '--full-menu-day-bg': string;
  '--full-menu-day-bg-hover': string;
};

const FULL_MENU_DAY_PILL_SELECTED_STYLE: FullMenuDayPillCssVariables = {
  '--full-menu-day-bg': COLOR_TOKENS.primary[50],
  '--full-menu-day-bg-hover': COLOR_TOKENS.primary[75],
};

const FULL_MENU_DAY_PILL_DEFAULT_STYLE: FullMenuDayPillCssVariables = {
  '--full-menu-day-bg': COLOR_TOKENS.base.white,
  '--full-menu-day-bg-hover': COLOR_TOKENS.neutral[50],
};

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
  '--full-menu-meal-title-font-size-md': string;
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
  '--full-menu-meal-title-font-size': FONT_SIZE_TOKENS[14],
  '--full-menu-meal-title-font-size-md': FONT_SIZE_TOKENS[16],
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
  onPlanChange,
  onLightMealOptionChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
  lightMealOption: LightMealOption;
  onPlanChange: (plan: Plan) => void;
  onLightMealOptionChange: (option: LightMealOption) => void;
}) {
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

  const menuDays = getMenuDays();
  const mealsForSelectedDay = getMealsForPlan(
    testMenuDays[selectedDayIndex],
    plan,
    lightMealOption,
  );

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

  useEffect(() => {
    if (!isOpen) return;

    setSelectedMeal(null);
  }, [isOpen]);

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

  return (
    <>
      <ModalShell
        isOpen={isOpen}
        onClose={onClose}
        variant="bottom-sheet"
        zIndex={Z_INDEX_TOKENS.overlay}
        overlayClassName={
          selectedMeal ? 'pointer-events-none opacity-0 transition-opacity duration-150' : 'transition-opacity duration-150'
        }
        panelClassName={[
          'relative flex max-h-[88svh] w-full flex-col overflow-hidden rounded-t-[20px] bg-white shadow-2xl transition-opacity duration-150',
          'md:mx-[24px] md:max-h-[85vh] md:max-w-[780px] md:rounded-[20px]',
          selectedMeal ? 'invisible opacity-0' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onEscape={() => {
          if (selectedMeal) {
            setSelectedMeal(null);
            return true;
          }

          return false;
        }}
      >
        {(requestClose) => (
          <div style={fullMenuModalStyle} className="flex min-h-0 flex-1 flex-col overflow-hidden">
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

            <div className="flex h-[56px] shrink-0 items-center gap-[8px] border-b border-[var(--full-menu-border)] bg-[var(--full-menu-bg)]">
              <p className="shrink-0 pl-[16px] font-sans text-[length:var(--full-menu-heading-font-size)] font-bold leading-[130%] text-[var(--full-menu-title)] md:pl-[20px] md:text-[length:var(--full-menu-heading-font-size-md)]">
                Full menu
              </p>

              <FullMenuPlanToggle
                plan={plan}
                lightMealOption={lightMealOption}
                onPlanChange={handlePlanChange}
                onLightMealOptionChange={handleLightMealOptionChange}
                pillDefaultStyle={FULL_MENU_DAY_PILL_DEFAULT_STYLE}
                pillSelectedStyle={FULL_MENU_DAY_PILL_SELECTED_STYLE}
              />

              <button
                type="button"
                onClick={requestClose}
                className="group flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
                aria-label="Close"
              >
                <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--full-menu-close-bg)] transition-colors duration-150 group-hover:bg-[var(--full-menu-close-bg-hover)]">
                  <span
                    className={iconColorClassName.emphasis}
                    style={iconColorStyle.emphasis}
                  >
                    <XIcon size={16} />
                  </span>
                </span>
              </button>
            </div>

        <div className="shrink-0 px-[8px] py-[12px]">
          <div className="flex w-full items-stretch" style={FULL_MENU_DAY_PILL_DEFAULT_STYLE}>
            <button
              type="button"
              onClick={handlePrevDay}
              className={`flex w-[40px] shrink-0 items-center justify-center rounded-[8px] text-[var(--full-menu-muted)] transition-colors hover:bg-[var(--full-menu-day-bg-hover)] ${
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
              <div className="relative flex w-[200%] gap-[8px]">
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
                        'rounded-[8px] bg-[var(--full-menu-day-bg)] py-[8px]',
                        'transition-colors',
                        'hover:enabled:bg-[var(--full-menu-day-bg-hover)]',
                      ].join(' ')}
                      style={active ? FULL_MENU_DAY_PILL_SELECTED_STYLE : FULL_MENU_DAY_PILL_DEFAULT_STYLE}
                    >
                      <div className="flex w-full flex-col items-center gap-[4px]">
                        <p className="font-sans text-[length:var(--full-menu-day-date-font-size)] font-bold leading-none tracking-[-0.16px] text-[var(--full-menu-title)]">
                          {d.date}
                        </p>

                        <p className="font-sans text-[length:var(--full-menu-day-meta-font-size)] font-bold leading-none tracking-[-0.12px] text-[var(--full-menu-title)]">
                          {d.month}
                        </p>
                      </div>

                      <p
                        className={`font-sans text-[length:var(--full-menu-day-meta-font-size)] font-medium leading-none tracking-[-0.12px] ${
                          active ? 'text-[var(--full-menu-title)]' : 'text-[var(--full-menu-muted)]'
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

        <div className="flex-1 overflow-y-auto" {...{ [SPACING_CONTENT_ATTR]: '' }}>
          <div className="relative overflow-visible">
            <div
              key={`${testMenuDays[selectedDayIndex]?.id ?? selectedDayIndex}-${plan}-${lightMealOption}`}
              ref={mealsScrollRef}
              onMouseDown={handleMealsMouseDown}
              onMouseMove={handleMealsMouseMove}
              onMouseUp={stopMealsMouseDrag}
              onMouseLeave={stopMealsMouseDrag}
              className={`flex touch-pan-x select-none justify-start gap-[20px] overflow-x-auto overflow-y-visible px-[20px] pt-0 pb-[20px] scrollbar-hide md:justify-center md:px-[24px] ${
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
                        'flex w-[150px] flex-wrap items-center gap-x-[0.35em] font-sans text-[length:var(--full-menu-meal-meta-font-size)] font-medium leading-[140%] text-[var(--full-menu-muted)] md:w-[160px]',
                      ].join(' ')}
                    >
                      <span>{meal.kcal} kcal • {meal.weight} g</span>
                      <span>{meal.type}</span>
                    </p>

                    <p
                      className={[
                        TEXT_TRIM_CLASS_NAME,
                        'w-[150px] font-sans text-[length:var(--full-menu-meal-title-font-size)] font-semibold leading-[140%] text-[var(--full-menu-title)] transition-colors group-hover:text-[var(--full-menu-active)] md:w-[160px] md:text-[length:var(--full-menu-meal-title-font-size-md)]',
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
          </div>
        )}
      </ModalShell>

      <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
    </>
  );
}
