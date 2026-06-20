import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import { DatePill } from '../common/DatePill';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_CLAMP_12_16 } from '../common/fontSizeClampTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { FormSectionHeading } from '../common/FormSectionHeading';
import { DeliveryIcon, PlusIcon } from '../common/icons';
import { CalendarCellActionIcon } from './CalendarCellActionIcon';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';

import { ManageMealDayPopover } from './ManageMealDayPopover';
import {
  addDays,
  getActiveExtraMealWeekdays,
  getAddableWeekdays,
  getCalendarWeeks,
  getMealDayRadiusByIndex,
  getMealDayRadiusClassName,
  getSubscriptionDays,
  getUpcomingDeliveryDates,
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
  '--calendar-delivery-icon-size': string;
};

const mealCalendarStyle: MealCalendarCssVariables = {
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--checkout-step-section-padding': CHECKOUT_STEP_SECTION_PADDING_CLAMP,
  '--checkout-scroll-edge-fade-width': CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP,
  '--calendar-date-fs': FONT_SIZE_TOKENS[16],
  '--calendar-month-fs': FONT_SIZE_TOKENS[12],
  '--calendar-weekday-fs': FONT_SIZE_TOKENS[14],
  '--calendar-delivery-icon-size': FONT_SIZE_CLAMP_12_16,
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
  onMealDayKeysChange?: (params: { keysToAdd: string[]; keysToRemove: string[] }) => void;
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
  onMealDayKeysChange,
}: CalendarCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isManagePopoverOpen, setIsManagePopoverOpen] = useState(false);

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
    onMealDayKeysChange &&
    isAddableMealDayCell({ date, startDate, endDate, dayOption, extraMealDayKeys });
  const removable =
    enableAddMealDays &&
    plan &&
    duration &&
    onMealDayKeysChange &&
    extraMealDayKeys &&
    isRemovableExtraMealDayCell({ date, startDate, endDate, dayOption, extraMealDayKeys });
  const manageable = addable || removable;
  const interactive = manageable;
  const textColor = inPeriod ? COLOR_TOKENS.neutral[900] : COLOR_TOKENS.neutral[300];
  const showPlus = addable && (isHovered || isManagePopoverOpen);
  const showMinus = removable && (isHovered || isManagePopoverOpen);
  const plusTone = isManagePopoverOpen ? 'neutral' : 'primary';
  const minusTone = isManagePopoverOpen ? 'neutral' : 'primary';

  const addableWeekdays = useMemo(() => getAddableWeekdays(dayOption), [dayOption]);
  const canAddSat = addableWeekdays.includes(SATURDAY);
  const canAddSun = addableWeekdays.includes(SUNDAY);
  const addedWeekdays = useMemo(() => {
    const activeWeekdays = getActiveExtraMealWeekdays({
      startDate,
      endDate,
      dayOption,
      extraMealDayKeys,
    });

    return new Set(
      activeWeekdays.filter(
        (weekday): weekday is typeof SATURDAY | typeof SUNDAY =>
          weekday === SATURDAY || weekday === SUNDAY,
      ),
    );
  }, [dayOption, endDate, extraMealDayKeys, startDate]);

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
        ['--calendar-addable-hover-bg' as string]: COLOR_TOKENS.primary[75],
      }}
      onMouseEnter={interactive ? () => setIsHovered(true) : undefined}
      onMouseLeave={interactive ? () => setIsHovered(false) : undefined}
    >
      {deliveryDay ? (
        <span
          className="absolute right-[clamp(2px,8%,8px)] top-[4px] h-fit max-md:right-0 max-md:top-[2px]"
          style={{ color: COLOR_TOKENS.neutral[900] }}
        >
          <DeliveryIcon size={16} className="!size-[length:var(--calendar-delivery-icon-size)]" />
        </span>
      ) : null}

      {showPlus ? (
        <CalendarCellActionIcon icon="plus" tone={plusTone} />
      ) : showMinus ? (
        <CalendarCellActionIcon icon="minus" tone={minusTone} />
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

  if (manageable && plan && duration && onMealDayKeysChange) {
    return (
      <ManageMealDayPopover
        plan={plan}
        duration={duration}
        dayOption={dayOption}
        startDate={startDate}
        endDate={endDate}
        persons={persons}
        extraMealDayKeys={extraMealDayKeys ?? new Set()}
        canAddSat={canAddSat}
        canAddSun={canAddSun}
        addedWeekdays={addedWeekdays}
        onOpenChange={setIsManagePopoverOpen}
        onConfirm={({ keysToAdd, keysToRemove }) =>
          onMealDayKeysChange({ keysToAdd, keysToRemove })
        }
      >
        {cellContent}
      </ManageMealDayPopover>
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
  onMealDayKeysChange?: (params: { keysToAdd: string[]; keysToRemove: string[] }) => void;
};

function MealCalendarGrid({
  startDate,
  duration,
  dayOption,
  extraMealDayKeys,
  enableAddMealDays = false,
  plan,
  persons = 1,
  onMealDayKeysChange,
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
                onMealDayKeysChange={onMealDayKeysChange}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function MealCalendarLegend({ showAddMealDays = false }: { showAddMealDays?: boolean }) {
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

type MealCalendarBaseProps = {
  duration: Duration;
  dayOption: DayOption;
  selectedDate: Date;
  extraMealDayKeys?: ReadonlySet<string>;
  className?: string;
};

type MealCalendarInteractiveProps = MealCalendarBaseProps & {
  mode?: 'interactive';
  onSelectedDateChange: (date: Date) => void;
  availableDates?: Date[];
  withinDays?: number;
  title?: ReactNode;
  subtitle?: ReactNode;
  enableAddMealDays?: boolean;
  plan?: Plan;
  persons?: number;
  onMealDayKeysChange?: (params: { keysToAdd: string[]; keysToRemove: string[] }) => void;
};

type MealCalendarPreviewModeProps = MealCalendarBaseProps & {
  mode: 'preview';
};

export type MealCalendarProps = MealCalendarInteractiveProps | MealCalendarPreviewModeProps;

function MealCalendarPreviewView({
  selectedDate,
  duration,
  dayOption,
  extraMealDayKeys,
  className = '',
}: MealCalendarPreviewModeProps) {
  return (
    <div
      className={['flex w-full flex-col gap-[20px]', className].filter(Boolean).join(' ')}
      style={mealCalendarStyle}
    >
      <MealCalendarLegend />
      <MealCalendarGrid
        startDate={selectedDate}
        duration={duration}
        dayOption={dayOption}
        extraMealDayKeys={extraMealDayKeys}
      />
    </div>
  );
}

function MealCalendarInteractiveView({
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
  onMealDayKeysChange,
}: MealCalendarInteractiveProps) {
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
          onMealDayKeysChange={onMealDayKeysChange}
        />
      </div>
    </div>
  );
}

export function MealCalendar(props: MealCalendarProps) {
  if (props.mode === 'preview') {
    return <MealCalendarPreviewView {...props} />;
  }

  return <MealCalendarInteractiveView {...props} />;
}
