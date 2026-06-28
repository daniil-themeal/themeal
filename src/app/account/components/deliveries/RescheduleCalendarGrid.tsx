import { useMemo } from 'react';

import {
  addDays,
  getMealDayKey,
  getMealDayRadiusByIndex,
  getSubscriptionDays,
  isInPeriod,
  isSubscriptionMealDay,
} from '../../../components/checkout/mealCalendarUtils';
import { MealCalendarLegend } from '../../../components/checkout/MealCalendarLegend';
import { DeliveryIcon } from '../../../components/common/icons';
import type { HomeMenuPlanConfig } from '../../types/account.types';
import { isAccountDeliveryDay } from '../../utils/accountDeliveryDates';
import { getFreeDeliverySlotsBetweenNeighbors, isRescheduleTargetSelectable } from '../../utils/applyDeliveryReschedule';
import {
  buildScheduledDeliveryMealDayKeys,
  getMealDayRadiusByIndexForDateKeys,
} from '../../utils/buildScheduledDeliveryMealDayKeys';
import {
  getRescheduleCalendarSections,
  isDateInRescheduleRange,
  WEEKDAY_SHORT,
} from '../../utils/buildRescheduleCalendarWeeks';

export type MealDayRadiusPosition = 'start' | 'end' | 'single';

export type RescheduleCalendarGridMode = 'pick' | 'preview' | 'overview';

export function getMealDayRadiusModifier(position: MealDayRadiusPosition | null): string {
  if (position === 'start') {
    return 'account-reschedule-calendar__cell-inner--radius-start';
  }

  if (position === 'end') {
    return 'account-reschedule-calendar__cell-inner--radius-end';
  }

  if (position === 'single') {
    return 'account-reschedule-calendar__cell-inner--radius-single';
  }

  return '';
}

export function getRescheduleSubscriptionWindow(
  scheduledDeliveryDates: string[],
  sourceDateIso: string,
  duration: HomeMenuPlanConfig['duration'],
) {
  const sortedDates = [...scheduledDeliveryDates].sort((left, right) => left.localeCompare(right));
  const firstScheduledIso = sortedDates[0] ?? sourceDateIso;
  const lastScheduledIso = sortedDates[sortedDates.length - 1] ?? sourceDateIso;
  const subscriptionStart = new Date(`${firstScheduledIso}T00:00:00`);
  const durationEnd = addDays(subscriptionStart, getSubscriptionDays(duration));
  const lastInclusiveEnd = addDays(new Date(`${lastScheduledIso}T00:00:00`), 1);
  const subscriptionEnd = durationEnd > lastInclusiveEnd ? durationEnd : lastInclusiveEnd;

  return { subscriptionStart, subscriptionEnd };
}

export function RescheduleCalendarLegend() {
  return (
    <div className="account-reschedule-calendar__legend">
      <MealCalendarLegend />
    </div>
  );
}

export function RescheduleCalendarWeekdays() {
  return (
    <div className="account-reschedule-calendar__weekdays" aria-hidden>
      {WEEKDAY_SHORT.map((weekday) => (
        <span key={weekday} className="account-reschedule-calendar__weekday">
          {weekday}
        </span>
      ))}
    </div>
  );
}

type RescheduleCalendarCellProps = {
  date: Date;
  mode: RescheduleCalendarGridMode;
  sourceDateIso: string;
  targetDateIso?: string;
  rangeAnchorDateIso: string;
  calendarEndDateIso?: string;
  scheduledDeliveryDates: string[];
  scheduledDeliverySet: ReadonlySet<string>;
  freeSlotSet: ReadonlySet<string>;
  menuPlan: HomeMenuPlanConfig;
  subscriptionStart: Date;
  subscriptionEnd: Date;
  previewMealDayKeys?: ReadonlySet<string>;
  mealRadiusPosition: MealDayRadiusPosition | null;
  onSelectDate?: (dateIso: string) => void;
};

function RescheduleCalendarCell({
  date,
  mode,
  sourceDateIso,
  targetDateIso,
  rangeAnchorDateIso,
  calendarEndDateIso,
  scheduledDeliveryDates,
  scheduledDeliverySet,
  freeSlotSet,
  menuPlan,
  subscriptionStart,
  subscriptionEnd,
  previewMealDayKeys,
  mealRadiusPosition,
  onSelectDate,
}: RescheduleCalendarCellProps) {
  const dateIso = getMealDayKey(date);
  const inRange = isDateInRescheduleRange(date, rangeAnchorDateIso, calendarEndDateIso);
  const inSubscription = isInPeriod(date, subscriptionStart, subscriptionEnd);
  const isScheduledDelivery = scheduledDeliverySet.has(dateIso);
  const isFreeSlot = freeSlotSet.has(dateIso);
  const isAccountDelivery = isAccountDeliveryDay(date, menuPlan.days);
  const isPickDelivery =
    mode === 'pick' && inSubscription && isAccountDelivery && (isScheduledDelivery || isFreeSlot);
  const isPreviewDelivery =
    (mode === 'preview' || mode === 'overview') && isScheduledDelivery && isAccountDelivery;
  const isMealDayFromKeys =
    (mode === 'preview' || mode === 'overview') && previewMealDayKeys
      ? previewMealDayKeys.has(dateIso)
      : inSubscription &&
        isSubscriptionMealDay({
          date,
          startDate: subscriptionStart,
          endDate: subscriptionEnd,
          dayOption: menuPlan.days,
        });
  const isMealDay = isMealDayFromKeys;
  const isSource = dateIso === sourceDateIso;
  const isSourceGap = mode === 'preview' && isSource && !isScheduledDelivery;
  const isPickSource = mode === 'pick' && isSource;
  const showSourceStrike = isSourceGap || isPickSource;
  const isSelected = mode === 'preview' && targetDateIso != null && dateIso === targetDateIso;
  const isSelectable =
    mode === 'pick' &&
    isPickDelivery &&
    !isSource &&
    isRescheduleTargetSelectable(
      scheduledDeliveryDates,
      sourceDateIso,
      dateIso,
      menuPlan.days,
    );

  const showMealDay = (mode === 'preview' || mode === 'overview') && isMealDay;
  const showDeliveryIcon = isPreviewDelivery;
  const radiusModifier =
    mode === 'preview' || mode === 'overview'
      ? getMealDayRadiusModifier(mealRadiusPosition)
      : isSelectable
        ? 'account-reschedule-calendar__cell-inner--radius-single'
        : '';

  const innerClassName = [
    'account-reschedule-calendar__cell-inner',
    showMealDay ? 'account-reschedule-calendar__cell-inner--meal-day' : '',
    isSelected ? 'account-reschedule-calendar__cell-inner--selected' : '',
    isSelectable ? 'account-reschedule-calendar__cell-inner--selectable' : '',
    showDeliveryIcon ? 'account-reschedule-calendar__cell-inner--with-delivery-icon' : '',
    isSourceGap ? 'account-reschedule-calendar__cell-inner--source-gap' : '',
    radiusModifier,
  ]
    .filter(Boolean)
    .join(' ');

  const dayClassName = [
    'account-reschedule-calendar__day',
    !inRange ? 'account-reschedule-calendar__day--out-of-range' : '',
    mode === 'pick' && isSelectable ? 'account-reschedule-calendar__day--delivery' : '',
    showSourceStrike ? 'account-reschedule-calendar__day--source-gap' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = <span className={dayClassName}>{date.getDate()}</span>;

  const cellBody = (
    <>
      {showDeliveryIcon ? (
        <DeliveryIcon size={16} className="account-reschedule-calendar__delivery-icon" aria-hidden />
      ) : null}
      {content}
    </>
  );

  if (isSelectable && onSelectDate) {
    return (
      <div className="account-reschedule-calendar__cell">
        <button
          type="button"
          className={innerClassName}
          onClick={() => onSelectDate(dateIso)}
          aria-label={`Move delivery to ${dateIso}`}
        >
          {cellBody}
        </button>
      </div>
    );
  }

  return (
    <div className="account-reschedule-calendar__cell">
      <div className={innerClassName}>{cellBody}</div>
    </div>
  );
}

type RescheduleCalendarGridProps = {
  mode: RescheduleCalendarGridMode;
  menuPlan: HomeMenuPlanConfig;
  sourceDateIso: string;
  scheduledDeliveryDates: string[];
  targetDateIso?: string;
  calendarEndDateIso?: string;
  onSelectDate?: (dateIso: string) => void;
  scrollClassName?: string;
};

export function RescheduleCalendarGrid({
  mode,
  menuPlan,
  sourceDateIso,
  scheduledDeliveryDates,
  targetDateIso,
  calendarEndDateIso,
  onSelectDate,
  scrollClassName = '',
}: RescheduleCalendarGridProps) {
  const rangeAnchorDateIso = sourceDateIso;
  const scheduledDeliverySet = useMemo(
    () => new Set(scheduledDeliveryDates),
    [scheduledDeliveryDates],
  );

  const freeSlotSet = useMemo(
    () =>
      new Set(
        getFreeDeliverySlotsBetweenNeighbors(
          scheduledDeliveryDates,
          sourceDateIso,
          menuPlan.days,
        ),
      ),
    [menuPlan.days, scheduledDeliveryDates, sourceDateIso],
  );

  const previewMealDayKeys = useMemo(
    () =>
      mode === 'preview' || mode === 'overview'
        ? buildScheduledDeliveryMealDayKeys(scheduledDeliveryDates, menuPlan.days)
        : undefined,
    [mode, menuPlan.days, scheduledDeliveryDates],
  );

  const sections = useMemo(
    () => getRescheduleCalendarSections(rangeAnchorDateIso, calendarEndDateIso),
    [calendarEndDateIso, rangeAnchorDateIso],
  );

  const { subscriptionStart, subscriptionEnd } = useMemo(
    () =>
      getRescheduleSubscriptionWindow(
        scheduledDeliveryDates,
        sourceDateIso,
        menuPlan.duration,
      ),
    [menuPlan.duration, scheduledDeliveryDates, sourceDateIso],
  );

  return (
    <div
      className={['account-reschedule-calendar__scroll', scrollClassName].filter(Boolean).join(' ')}
    >
      {sections.map(({ monthLabel, week }, sectionIndex) => (
        <div key={sectionIndex} className="account-reschedule-calendar__section">
          {monthLabel ? (
            <p className="account-reschedule-calendar__month">{monthLabel}</p>
          ) : null}
          <div className="account-reschedule-calendar__week">
            {week.map((date, dayIndex) => {
              const mealRadiusByIndex =
                (mode === 'preview' || mode === 'overview') && previewMealDayKeys
                  ? getMealDayRadiusByIndexForDateKeys(week, previewMealDayKeys)
                  : getMealDayRadiusByIndex({
                      week,
                      startDate: subscriptionStart,
                      endDate: subscriptionEnd,
                      dayOption: menuPlan.days,
                    });

              return (
                <RescheduleCalendarCell
                  key={`${sectionIndex}-${dayIndex}`}
                  date={date}
                  mode={mode}
                  sourceDateIso={sourceDateIso}
                  targetDateIso={targetDateIso}
                  rangeAnchorDateIso={rangeAnchorDateIso}
                  calendarEndDateIso={calendarEndDateIso}
                  scheduledDeliveryDates={scheduledDeliveryDates}
                  scheduledDeliverySet={scheduledDeliverySet}
                  freeSlotSet={freeSlotSet}
                  menuPlan={menuPlan}
                  subscriptionStart={subscriptionStart}
                  subscriptionEnd={subscriptionEnd}
                  previewMealDayKeys={previewMealDayKeys}
                  mealRadiusPosition={mealRadiusByIndex[dayIndex]}
                  onSelectDate={onSelectDate}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
