import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import { DatePill } from '../common/DatePill';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { FormSectionHeading } from '../common/FormSectionHeading';
import { DeliveryIcon, MinusIcon, PlusIcon } from '../common/icons';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';

import { AddMealDayPopover } from './AddMealDayPopover';
import { RemoveMealDayPopover } from './RemoveMealDayPopover';
import {
  getExtraMealDaysQuote,
  getProjectedExtraMealDayCount,
  getProjectedExtraMealDayCountAfterRemove,
} from './mealCalendarAddDaysPricing';
import {
  addDays,
  getAddableWeekdays,
  getCalendarWeeks,
  getMealDayRadiusByIndex,
  getMealDayRadiusClassName,
  getSubscriptionDays,
  getUpcomingDeliveryDates,
  getWeeklyExtraMealDayKeys,
  getWeeklyRemovableExtraMealDayKeys,
  isAddableMealDayCell,
  isDatePillVisibleInContainer,
  isDeliveryDay,
  isInPeriod,
  isRemovableExtraMealDayCell,
  isSameDay,
  isSubscriptionMealDay,
  MONTH_ABBR,
  SATURDAY,
  scrollDatePillsOnEdgeClick,
  SUNDAY,
  WEEKDAY_SHORT,
  type MealDayRadiusPosition,
} from './mealCalendarUtils';
import {
  CHECKOUT_CARD_PADDING_CLAMP,
  CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP,
  CHECKOUT_STEP_SECTION_PADDING_CLAMP,
} from './checkoutSpacing';
import {
  CHECKOUT_STEP_SECTION_NAMES,
  CHECKOUT_STEP_SECTION_PX,
  checkoutStepSectionProps,
} from './checkoutStepPageLayoutTokens';
import { CheckoutScrollEdgeFades } from './CheckoutScrollEdgeFades';
import { useHorizontalScrollEdgeFades } from './useHorizontalScrollEdgeFades';

type MealCalendarCssVariables = CSSProperties & {
  '--checkout-card-padding': string;
  '--checkout-step-section-padding': string;
  '--checkout-scroll-edge-fade-width': string;
  '--calendar-date-fs': string;
  '--calendar-month-fs': string;
  '--calendar-weekday-fs': string;
};

const mealCalendarStyle: MealCalendarCssVariables = {
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--checkout-step-section-padding': CHECKOUT_STEP_SECTION_PADDING_CLAMP,
  '--checkout-scroll-edge-fade-width': CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP,
  '--calendar-date-fs': FONT_SIZE_TOKENS[16],
  '--calendar-month-fs': FONT_SIZE_TOKENS[12],
  '--calendar-weekday-fs': FONT_SIZE_TOKENS[14],
};

type CalendarCellProps = {
  date: Date;
  startDate: Date;
  endDate: Date;
  dayOption: DayOption;
  mealRadiusPosition?: MealDayRadiusPosition | null;
  extraMealDayKeys?: ReadonlySet<string>;
  enableAddMealDays?: boolean;
  plan?: Plan;
  persons?: number;
  duration?: Duration;
  onAddMealDay?: (params: { targetWeekdays: Array<typeof SATURDAY | typeof SUNDAY> }) => void;
  onRemoveMealDay?: (params: { anchorDate: Date; daysPerWeek: 1 | 2 }) => void;
};

function CalendarCell({
  date,
  startDate,
  endDate,
  dayOption,
  mealRadiusPosition = null,
  extraMealDayKeys,
  enableAddMealDays = false,
  plan,
  persons = 1,
  duration,
  onAddMealDay,
  onRemoveMealDay,
}: CalendarCellProps) {
  const [isHovered, setIsHovered] = useState(false);

  const inPeriod = isInPeriod(date, startDate, endDate);
  const deliveryDay = inPeriod && isDeliveryDay(date);
  const mealDay = isSubscriptionMealDay({
    date,
    startDate,
    endDate,
    dayOption,
    extraMealDayKeys,
  });
  const addable =
    enableAddMealDays &&
    plan &&
    duration &&
    onAddMealDay &&
    isAddableMealDayCell({ date, startDate, endDate, dayOption, extraMealDayKeys });
  const removable =
    enableAddMealDays &&
    plan &&
    duration &&
    onRemoveMealDay &&
    extraMealDayKeys &&
    isRemovableExtraMealDayCell({ date, startDate, endDate, dayOption, extraMealDayKeys });
  const interactive = addable || removable;
  const textColor = inPeriod ? COLOR_TOKENS.neutral[900] : COLOR_TOKENS.neutral[300];
  const showPlus = addable && isHovered;
  const showMinus = removable && isHovered;

  const canToggleTwo = useMemo(() => getAddableWeekdays(dayOption).length >= 2, [dayOption]);
  const addableWeekdays = useMemo(() => getAddableWeekdays(dayOption), [dayOption]);
  const canAddSat = addableWeekdays.includes(SATURDAY);
  const canAddSun = addableWeekdays.includes(SUNDAY);

  const { quoteSat, quoteSun, quoteBoth } = useMemo(() => {
    if (!addable || !plan || !duration) {
      return { quoteSat: null, quoteSun: null, quoteBoth: null };
    }

    const existingKeys = extraMealDayKeys ?? new Set<string>();
    const previousExtraMealDayCount = existingKeys.size;

    const getQuoteForWeekday = (targetWeekday: typeof SATURDAY | typeof SUNDAY) => {
      const newKeys = getWeeklyExtraMealDayKeys({
        startDate,
        endDate,
        dayOption,
        targetWeekday,
      });

      return getExtraMealDaysQuote({
        plan,
        days: dayOption,
        duration,
        persons,
        previousExtraMealDayCount,
        extraMealDayCount: getProjectedExtraMealDayCount(existingKeys, newKeys),
      });
    };

    const newKeysSat = canAddSat
      ? getWeeklyExtraMealDayKeys({ startDate, endDate, dayOption, targetWeekday: SATURDAY })
      : [];
    const newKeysSun = canAddSun
      ? getWeeklyExtraMealDayKeys({ startDate, endDate, dayOption, targetWeekday: SUNDAY })
      : [];

    return {
      quoteSat: canAddSat ? getQuoteForWeekday(SATURDAY) : null,
      quoteSun: canAddSun ? getQuoteForWeekday(SUNDAY) : null,
      quoteBoth:
        canAddSat && canAddSun
          ? getExtraMealDaysQuote({
              plan,
              days: dayOption,
              duration,
              persons,
              previousExtraMealDayCount,
              extraMealDayCount: getProjectedExtraMealDayCount(existingKeys, [
                ...newKeysSat,
                ...newKeysSun,
              ]),
            })
          : null,
    };
  }, [
    addable,
    canAddSat,
    canAddSun,
    dayOption,
    duration,
    endDate,
    extraMealDayKeys,
    persons,
    plan,
    startDate,
  ]);

  const { quoteMinus1, quoteMinus2 } = useMemo(() => {
    if (!removable || !plan || !duration || !extraMealDayKeys) {
      return { quoteMinus1: null, quoteMinus2: null };
    }

    const keysToRemovePlus1 = getWeeklyRemovableExtraMealDayKeys({
      anchorDate: date,
      startDate,
      endDate,
      dayOption,
      extraMealDayKeys,
      daysPerWeek: 1,
    });
    const keysToRemovePlus2 = getWeeklyRemovableExtraMealDayKeys({
      anchorDate: date,
      startDate,
      endDate,
      dayOption,
      extraMealDayKeys,
      daysPerWeek: 2,
    });

    const previousExtraMealDayCount = extraMealDayKeys.size;

    return {
      quoteMinus1: getExtraMealDaysQuote({
        plan,
        days: dayOption,
        duration,
        persons,
        previousExtraMealDayCount,
        extraMealDayCount: getProjectedExtraMealDayCountAfterRemove(
          extraMealDayKeys,
          keysToRemovePlus1,
        ),
      }),
      quoteMinus2: getExtraMealDaysQuote({
        plan,
        days: dayOption,
        duration,
        persons,
        previousExtraMealDayCount,
        extraMealDayCount: getProjectedExtraMealDayCountAfterRemove(
          extraMealDayKeys,
          keysToRemovePlus2,
        ),
      }),
    };
  }, [
    date,
    dayOption,
    duration,
    endDate,
    extraMealDayKeys,
    persons,
    plan,
    removable,
    startDate,
  ]);

  const cellContent = (
    <div
      className={[
        'relative flex h-[48px] flex-col items-center justify-center gap-[6px]',
        mealRadiusPosition ? getMealDayRadiusClassName(mealRadiusPosition) : '',
        interactive
          ? 'cursor-pointer transition-colors hover:bg-[var(--calendar-addable-hover-bg)]'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        backgroundColor: mealDay ? COLOR_TOKENS.primary[50] : 'transparent',
        ['--calendar-addable-hover-bg' as string]: COLOR_TOKENS.neutral[50],
      }}
      onMouseEnter={interactive ? () => setIsHovered(true) : undefined}
      onMouseLeave={interactive ? () => setIsHovered(false) : undefined}
    >
      {deliveryDay ? (
        <span
          className="absolute right-[clamp(2px,8%,8px)] top-[4px] h-fit max-md:right-0 max-md:top-[2px]"
          style={{ color: COLOR_TOKENS.neutral[900] }}
        >
          <DeliveryIcon size={16} className="!size-[12px] xs:!size-[16px]" />
        </span>
      ) : null}

      {showPlus ? (
        <span style={{ color: COLOR_TOKENS.primary[500] }}>
          <PlusIcon size={20} />
        </span>
      ) : showMinus ? (
        <span style={{ color: COLOR_TOKENS.primary[500] }}>
          <MinusIcon size={20} />
        </span>
      ) : (
        <>
          <span
            className={[
              TEXT_TRIM_CLASS_NAME,
              'font-sans text-[length:var(--calendar-date-fs)] font-bold leading-none',
            ].join(' ')}
            style={{ color: textColor }}
          >
            {date.getDate()}
          </span>

          <span
            className={[
              TEXT_TRIM_CLASS_NAME,
              'font-sans text-[length:var(--calendar-month-fs)] font-bold leading-none',
            ].join(' ')}
            style={{ color: textColor }}
          >
            {MONTH_ABBR[date.getMonth()]}
          </span>
        </>
      )}
    </div>
  );

  if (addable && (quoteSat || quoteSun)) {
    return (
      <AddMealDayPopover
        quoteSat={quoteSat}
        quoteSun={quoteSun}
        quoteBoth={quoteBoth}
        canAddSat={canAddSat}
        canAddSun={canAddSun}
        onAdd={(targetWeekdays) => onAddMealDay({ targetWeekdays })}
      >
        {cellContent}
      </AddMealDayPopover>
    );
  }

  if (removable && quoteMinus1 && quoteMinus2) {
    return (
      <RemoveMealDayPopover
        quoteMinus1={quoteMinus1}
        quoteMinus2={quoteMinus2}
        canRemoveTwo={canToggleTwo}
        onRemove={(daysPerWeek) => onRemoveMealDay({ anchorDate: date, daysPerWeek })}
      >
        {cellContent}
      </RemoveMealDayPopover>
    );
  }

  return cellContent;
}

type MealCalendarGridProps = {
  startDate: Date;
  duration: Duration;
  dayOption: DayOption;
  extraMealDayKeys?: ReadonlySet<string>;
  enableAddMealDays?: boolean;
  plan?: Plan;
  persons?: number;
  onAddMealDay?: (params: { targetWeekdays: Array<typeof SATURDAY | typeof SUNDAY> }) => void;
  onRemoveMealDay?: (params: { anchorDate: Date; daysPerWeek: 1 | 2 }) => void;
};

function MealCalendarGrid({
  startDate,
  duration,
  dayOption,
  extraMealDayKeys,
  enableAddMealDays = false,
  plan,
  persons = 1,
  onAddMealDay,
  onRemoveMealDay,
}: MealCalendarGridProps) {
  const weeks = useMemo(() => getCalendarWeeks(startDate, duration), [startDate, duration]);
  const endDate = useMemo(
    () => addDays(startDate, getSubscriptionDays(duration)),
    [startDate, duration],
  );

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="grid grid-cols-7">
        {WEEKDAY_SHORT.map((day) => (
          <div key={day} className="flex items-center justify-center py-[4px]">
            <span
              className={[
                TEXT_TRIM_CLASS_NAME,
                'font-sans text-[length:var(--calendar-weekday-fs)] font-medium leading-none',
              ].join(' ')}
              style={{ color: COLOR_TOKENS.neutral[900] }}
            >
              {day}
            </span>
          </div>
        ))}
      </div>

      {weeks.map((week, weekIndex) => {
        const mealRadiusByIndex = getMealDayRadiusByIndex({
          week,
          startDate,
          endDate,
          dayOption,
          extraMealDayKeys,
        });

        return (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((date, dayIndex) => (
              <CalendarCell
                key={dayIndex}
                date={date}
                startDate={startDate}
                endDate={endDate}
                dayOption={dayOption}
                mealRadiusPosition={mealRadiusByIndex[dayIndex]}
                extraMealDayKeys={extraMealDayKeys}
                enableAddMealDays={enableAddMealDays}
                plan={plan}
                persons={persons}
                duration={duration}
                onAddMealDay={onAddMealDay}
                onRemoveMealDay={onRemoveMealDay}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

type MealCalendarLegendVariant = 'default' | 'success';

function MealCalendarLegend({
  variant = 'default',
  showAddMealDays = false,
}: {
  variant?: MealCalendarLegendVariant;
  showAddMealDays?: boolean;
}) {
  const addMealDayLegendItem = showAddMealDays ? (
    <div className="flex items-center gap-[6px]">
      <span style={{ color: COLOR_TOKENS.primary[500] }}>
        <PlusIcon size={16} />
      </span>
      <span
        className={[TEXT_TRIM_CLASS_NAME, 'font-sans text-[12px] font-semibold'].join(' ')}
        style={{ color: COLOR_TOKENS.neutral[600] }}
      >
        Tap to add
      </span>
    </div>
  ) : null;

  if (variant === 'success') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-[16px] pb-[8px] w-full">
        <div className="flex items-center gap-[4px]">
          <div
            className="size-[16px] shrink-0 rounded-[4px]"
            style={{ backgroundColor: COLOR_TOKENS.primary[50] }}
          />
          <span
            className={[TEXT_TRIM_CLASS_NAME, 'font-sans text-[14px] font-normal leading-[150%]'].join(' ')}
            style={{ color: COLOR_TOKENS.neutral[900] }}
          >
            Meal days
          </span>
        </div>

        <div className="flex items-center gap-[4px]">
          <span style={{ color: COLOR_TOKENS.neutral[900] }}>
            <DeliveryIcon size={16} />
          </span>
          <span
            className={[TEXT_TRIM_CLASS_NAME, 'font-sans text-[14px] font-normal leading-[150%]'].join(' ')}
            style={{ color: COLOR_TOKENS.neutral[900] }}
          >
            Delivery days
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[8px]">
      <div className="flex items-center gap-[6px]">
        <div
          className="h-[14px] w-[14px] rounded-[3px]"
          style={{ backgroundColor: COLOR_TOKENS.primary[50] }}
        />
        <span
          className={[TEXT_TRIM_CLASS_NAME, 'font-sans text-[12px] font-semibold'].join(' ')}
          style={{ color: COLOR_TOKENS.neutral[600] }}
        >
          Meal days
        </span>
      </div>

      <div className="flex items-center gap-[6px]">
        <span style={{ color: COLOR_TOKENS.neutral[900] }}>
          <DeliveryIcon size={16} />
        </span>
        <span
          className={[TEXT_TRIM_CLASS_NAME, 'font-sans text-[12px] font-semibold'].join(' ')}
          style={{ color: COLOR_TOKENS.neutral[600] }}
        >
          Delivery days
        </span>
      </div>

      {addMealDayLegendItem}
    </div>
  );
}

export type MealCalendarPreviewProps = {
  startDate: Date;
  duration: Duration;
  dayOption: DayOption;
  extraMealDayKeys?: ReadonlySet<string>;
  className?: string;
};

export function MealCalendarPreview({
  startDate,
  duration,
  dayOption,
  extraMealDayKeys,
  className = '',
}: MealCalendarPreviewProps) {
  return (
    <div
      className={['flex w-full flex-col gap-[12px]', className].filter(Boolean).join(' ')}
      style={mealCalendarStyle}
    >
      <MealCalendarLegend variant="success" />
      <MealCalendarGrid
        startDate={startDate}
        duration={duration}
        dayOption={dayOption}
        extraMealDayKeys={extraMealDayKeys}
      />
    </div>
  );
}

export type MealCalendarProps = {
  duration: Duration;
  dayOption: DayOption;
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
  availableDates?: Date[];
  withinDays?: number;
  title?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  enableAddMealDays?: boolean;
  plan?: Plan;
  persons?: number;
  extraMealDayKeys?: ReadonlySet<string>;
  onAddMealDay?: (params: { targetWeekdays: Array<typeof SATURDAY | typeof SUNDAY> }) => void;
  onRemoveMealDay?: (params: { anchorDate: Date; daysPerWeek: 1 | 2 }) => void;
};

export function MealCalendar({
  duration,
  dayOption,
  selectedDate,
  onSelectedDateChange,
  availableDates,
  withinDays = 60,
  title = 'Choose the preferred first delivery date',
  subtitle = 'We deliver Wednesdays and Sundays — pick your start date',
  className = '',
  enableAddMealDays = false,
  plan,
  persons = 1,
  extraMealDayKeys,
  onAddMealDay,
  onRemoveMealDay,
}: MealCalendarProps) {
  const deliveryDates = useMemo(
    () => availableDates ?? getUpcomingDeliveryDates(withinDays),
    [availableDates, withinDays],
  );

  const datePillsScrollRef = useRef<HTMLDivElement>(null);
  const { showStartFade: showDatePillsStartFade, showEndFade: showDatePillsEndFade } =
    useHorizontalScrollEdgeFades(datePillsScrollRef, deliveryDates.length);
  const datePillRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const datePillsDragStartXRef = useRef(0);
  const datePillsDragMovedRef = useRef(false);

  const handleDatePillClick = (index: number, date: Date) => {
    if (datePillsDragMovedRef.current) return;

    onSelectedDateChange(date);

    const container = datePillsScrollRef.current;
    if (!container) return;

    window.requestAnimationFrame(() => {
      scrollDatePillsOnEdgeClick(container, datePillRefs.current, index);
    });
  };

  useLayoutEffect(() => {
    const container = datePillsScrollRef.current;
    if (!container) return;

    const selectedIndex = deliveryDates.findIndex((date) => isSameDay(date, selectedDate));
    if (selectedIndex < 0) return;

    const selectedPill = datePillRefs.current[selectedIndex];
    if (!selectedPill || isDatePillVisibleInContainer(container, selectedPill)) return;

    selectedPill.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'nearest',
    });
  }, [deliveryDates, selectedDate]);

  useEffect(() => {
    const scrollElement = datePillsScrollRef.current;
    if (!scrollElement) return;

    const handleWheel = (event: WheelEvent) => {
      if (scrollElement.scrollWidth <= scrollElement.clientWidth) return;

      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

      scrollElement.scrollLeft += delta;
      event.preventDefault();
    };

    scrollElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollElement.removeEventListener('wheel', handleWheel);
    };
  }, [deliveryDates.length]);

  return (
    <div
      className={['flex min-w-0 flex-col gap-[16px]', className].filter(Boolean).join(' ')}
      style={mealCalendarStyle}
    >
      {title ? (
        <div
          {...checkoutStepSectionProps(
            CHECKOUT_STEP_SECTION_NAMES.mealCalendarHeading,
            `flex w-full min-w-0 flex-col ${CHECKOUT_STEP_SECTION_PX}`,
          )}
        >
          <FormSectionHeading title={title} subtitle={subtitle} />
        </div>
      ) : null}

      <div
        {...checkoutStepSectionProps(
          CHECKOUT_STEP_SECTION_NAMES.mealCalendarDatePills,
          'relative w-full min-w-0',
        )}
      >
        <div className="relative w-full">
          <div
            ref={datePillsScrollRef}
            className={[
              'flex w-full min-w-0 cursor-grab touch-pan-x select-none gap-[8px] overflow-x-auto pb-[4px] scrollbar-hide active:cursor-grabbing',
              CHECKOUT_STEP_SECTION_PX,
            ].join(' ')}
            onMouseDown={(event) => {
              const scrollElement = event.currentTarget;
              const startX = event.pageX - scrollElement.offsetLeft;
              const scrollLeft = scrollElement.scrollLeft;
              datePillsDragStartXRef.current = event.pageX;
              datePillsDragMovedRef.current = false;

              const onMouseMove = (moveEvent: MouseEvent) => {
                if (Math.abs(moveEvent.pageX - datePillsDragStartXRef.current) > 6) {
                  datePillsDragMovedRef.current = true;
                }

                scrollElement.scrollLeft =
                  scrollLeft - (moveEvent.pageX - scrollElement.offsetLeft - startX);
              };

              const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                window.setTimeout(() => {
                  datePillsDragMovedRef.current = false;
                }, 80);
              };

              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp);
            }}
            onTouchStart={(event) => {
              const scrollElement = event.currentTarget;
              const startX = event.touches[0].pageX - scrollElement.offsetLeft;
              const scrollLeft = scrollElement.scrollLeft;
              datePillsDragStartXRef.current = event.touches[0].pageX;
              datePillsDragMovedRef.current = false;

              const onTouchMove = (moveEvent: TouchEvent) => {
                if (Math.abs(moveEvent.touches[0].pageX - datePillsDragStartXRef.current) > 6) {
                  datePillsDragMovedRef.current = true;
                }

                scrollElement.scrollLeft =
                  scrollLeft - (moveEvent.touches[0].pageX - scrollElement.offsetLeft - startX);
              };

              const onTouchEnd = () => {
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
                window.setTimeout(() => {
                  datePillsDragMovedRef.current = false;
                }, 80);
              };

              document.addEventListener('touchmove', onTouchMove, { passive: true });
              document.addEventListener('touchend', onTouchEnd);
            }}
          >
            {deliveryDates.map((date, index) => (
              <DatePill
                key={index}
                ref={(element) => {
                  datePillRefs.current[index] = element;
                }}
                date={date}
                selected={isSameDay(date, selectedDate)}
                onClick={() => handleDatePillClick(index, date)}
              />
            ))}
        </div>

        <CheckoutScrollEdgeFades
          showStart={showDatePillsStartFade}
          showEnd={showDatePillsEndFade}
          className="bottom-[4px]"
          edgeColor={COLOR_TOKENS.base.white}
          fadeWidthClassName="w-[length:var(--checkout-step-section-padding)]"
          startPositionClassName="left-0"
          endPositionClassName="right-0"
        />
      </div>
      </div>

      <div
        {...checkoutStepSectionProps(
          CHECKOUT_STEP_SECTION_NAMES.mealCalendarGrid,
          `flex w-full min-w-0 flex-col gap-[16px] ${CHECKOUT_STEP_SECTION_PX}`,
        )}
      >
        <MealCalendarLegend showAddMealDays={enableAddMealDays} />
        <MealCalendarGrid
          startDate={selectedDate}
          duration={duration}
          dayOption={dayOption}
          extraMealDayKeys={extraMealDayKeys}
          enableAddMealDays={enableAddMealDays}
          plan={plan}
          persons={persons}
          onAddMealDay={onAddMealDay}
          onRemoveMealDay={onRemoveMealDay}
        />
      </div>
    </div>
  );
}
