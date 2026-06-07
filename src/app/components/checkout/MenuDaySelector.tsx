import { useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';

import { testMenuDays } from '../../data/testMeals';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MENU_DAYS_COUNT = testMenuDays.length;
const MOUSE_DRAG_CLICK_THRESHOLD = 6;

type MenuDaySelectorCssVariables = CSSProperties & {
  '--menu-day-selector-border': string;
  '--menu-day-selector-hover-bg': string;
  '--menu-day-selector-active-bg': string;
  '--menu-day-selector-text': string;
  '--menu-day-selector-muted': string;
  '--menu-day-selector-active': string;
  '--menu-day-selector-active-muted': string;
  '--menu-day-selector-arrow': string;
  '--menu-day-selector-date-font-size': string;
  '--menu-day-selector-meta-font-size': string;
};

const menuDaySelectorStyle: MenuDaySelectorCssVariables = {
  '--menu-day-selector-border': COLOR_TOKENS.neutral[100],
  '--menu-day-selector-hover-bg': COLOR_TOKENS.primary[50],
  '--menu-day-selector-active-bg': COLOR_TOKENS.primary[50],
  '--menu-day-selector-text': COLOR_TOKENS.neutral[900],
  '--menu-day-selector-muted': COLOR_TOKENS.neutral[500],
  '--menu-day-selector-active': COLOR_TOKENS.primary[500],
  '--menu-day-selector-active-muted': COLOR_TOKENS.primary[400],
  '--menu-day-selector-arrow': COLOR_TOKENS.neutral[500],
  '--menu-day-selector-date-font-size': FONT_SIZE_TOKENS[16],
  '--menu-day-selector-meta-font-size': FONT_SIZE_TOKENS[12],
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

export function MenuDaySelector({
  selectedDayIndex,
  onSelectDay,
  isOpen = true,
  horizontalPaddingClassName = 'px-[8px]',
}: {
  selectedDayIndex: number;
  onSelectDay: (dayIndex: number) => void;
  isOpen?: boolean;
  horizontalPaddingClassName?: string;
}) {
  const [isDraggingDays, setIsDraggingDays] = useState(false);

  const dayRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const daysScrollRef = useRef<HTMLDivElement | null>(null);
  const daysContentRef = useRef<HTMLDivElement | null>(null);

  const mouseDragStartXRef = useRef(0);
  const mouseDragStartScrollLeftRef = useRef(0);
  const suppressNextClickRef = useRef(false);

  const [activePillStyle, setActivePillStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const menuDays = getMenuDays();

  const canGoPrev = selectedDayIndex > 0;
  const canGoNext = selectedDayIndex < MENU_DAYS_COUNT - 1;

  const updateActivePill = () => {
    const content = daysContentRef.current;
    const activeDay = dayRefs.current[selectedDayIndex];

    if (!content || !activeDay) return;

    const contentRect = content.getBoundingClientRect();
    const activeRect = activeDay.getBoundingClientRect();

    setActivePillStyle({
      left: activeRect.left - contentRect.left,
      top: activeRect.top - contentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
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

    onSelectDay(nextDayIndex);

    window.requestAnimationFrame(() => {
      scrollSelectedDayIntoView(nextDayIndex);
      updateActivePill();
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

  const handleDaysMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const scrollContainer = daysScrollRef.current;
    if (!scrollContainer) return;

    setIsDraggingDays(true);
    suppressNextClickRef.current = false;
    mouseDragStartXRef.current = event.clientX;
    mouseDragStartScrollLeftRef.current = scrollContainer.scrollLeft;
  };

  const handleDaysMouseMove = (event: MouseEvent<HTMLDivElement>) => {
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

  useLayoutEffect(() => {
    if (!isOpen) return;

    updateActivePill();

    const scrollContainer = daysScrollRef.current;
    const content = daysContentRef.current;

    window.addEventListener('resize', updateActivePill);
    scrollContainer?.addEventListener('scroll', updateActivePill, { passive: true });

    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== 'undefined' && content) {
      resizeObserver = new ResizeObserver(updateActivePill);
      resizeObserver.observe(content);
    }

    return () => {
      window.removeEventListener('resize', updateActivePill);
      scrollContainer?.removeEventListener('scroll', updateActivePill);
      resizeObserver?.disconnect();
    };
  }, [isOpen, selectedDayIndex]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    window.requestAnimationFrame(() => {
      scrollSelectedDayIntoView(selectedDayIndex);
      updateActivePill();
    });
  }, [isOpen, selectedDayIndex]);

  return (
    <div
      className={`${horizontalPaddingClassName} shrink-0 border-b border-[var(--menu-day-selector-border)] pb-[12px]`}
      style={menuDaySelectorStyle}
    >
      <div className="flex w-full items-stretch">
        <button
          type="button"
          onClick={handlePrevDay}
          className={`flex w-[40px] shrink-0 items-center justify-center rounded-[8px] transition-colors hover:bg-[var(--menu-day-selector-hover-bg)] ${
            !canGoPrev ? 'pointer-events-none opacity-0' : 'cursor-pointer'
          }`}
          aria-label="Previous day"
        >
          <svg fill="none" viewBox="0 0 7 12" width="7" height="12">
            <path
              d="M6 11L1 6L6 1"
              stroke="var(--menu-day-selector-arrow)"
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
          <div ref={daysContentRef} className="relative flex w-[200%]">
            <div
              className="absolute rounded-[8px] bg-[var(--menu-day-selector-active-bg)] transition-all duration-300 ease-out"
              style={{
                left: activePillStyle.left,
                top: activePillStyle.top,
                width: activePillStyle.width,
                height: activePillStyle.height,
              }}
            />

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
                  className="relative z-10 flex flex-[0_0_calc(100%/14)] cursor-pointer flex-col items-center justify-center gap-[6px] rounded-[8px] py-[8px] transition-colors hover:bg-[var(--menu-day-selector-hover-bg)]"
                >
                  <div className="flex w-full flex-col items-center gap-[4px]">
                    <p
                      className={`font-['Quicksand'] text-[length:var(--menu-day-selector-date-font-size)] font-bold leading-none tracking-[-0.16px] transition-colors duration-200 ${
                        active
                          ? 'text-[var(--menu-day-selector-active)]'
                          : 'text-[var(--menu-day-selector-text)]'
                      }`}
                    >
                      {d.date}
                    </p>

                    <p
                      className={`font-['Quicksand'] text-[length:var(--menu-day-selector-meta-font-size)] font-bold leading-none tracking-[-0.12px] transition-colors duration-200 ${
                        active
                          ? 'text-[var(--menu-day-selector-active)]'
                          : 'text-[var(--menu-day-selector-text)]'
                      }`}
                    >
                      {d.month}
                    </p>
                  </div>

                  <p
                    className={`font-['Quicksand'] text-[length:var(--menu-day-selector-meta-font-size)] font-medium leading-none tracking-[-0.12px] transition-colors duration-200 ${
                      active
                        ? 'text-[var(--menu-day-selector-active-muted)]'
                        : 'text-[var(--menu-day-selector-muted)]'
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
          className={`flex w-[40px] shrink-0 items-center justify-center rounded-[8px] transition-colors hover:bg-[var(--menu-day-selector-hover-bg)] ${
            !canGoNext ? 'pointer-events-none opacity-0' : 'cursor-pointer'
          }`}
          aria-label="Next day"
        >
          <svg fill="none" viewBox="0 0 7 12" width="7" height="12">
            <path
              d="M1 11L6 6L1 1"
              stroke="var(--menu-day-selector-arrow)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}