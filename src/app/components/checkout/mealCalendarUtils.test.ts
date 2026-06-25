import { describe, expect, it } from 'vitest';

import { DEFAULT_CHECKOUT_PRICING } from '../../data/checkoutPricing';
import {
  addDays,
  collectDefaultMealDays,
  getSubscriptionMealDates,
  getSubscriptionMenuDays,
  getUpcomingDeliveryDates,
  isDefaultMealDay,
  isDeliveryDay,
  MONDAY,
  SATURDAY,
  THURSDAY,
} from './mealCalendarUtils';

function dateAt(year: number, month: number, day: number): Date {
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

describe('isDeliveryDay', () => {
  it('marks Monday and Thursday for 5-day plans', () => {
    expect(isDeliveryDay(dateAt(2024, 0, 8), 'weekdays')).toBe(true);
    expect(isDeliveryDay(dateAt(2024, 0, 11), 'weekdays')).toBe(true);
    expect(isDeliveryDay(dateAt(2024, 0, 9), 'weekdays')).toBe(false);
    expect(isDeliveryDay(dateAt(2024, 0, 13), 'weekdays')).toBe(false);
  });

  it('marks Saturday only for 7-day plans', () => {
    expect(isDeliveryDay(dateAt(2024, 0, 13), 'full')).toBe(true);
    expect(isDeliveryDay(dateAt(2024, 0, 13), 'weekdays')).toBe(false);
  });
});

describe('isDefaultMealDay', () => {
  it('covers Monday through Friday for 5-day plan starting Monday', () => {
    const startDate = dateAt(2024, 0, 8);
    const endDate = addDays(startDate, 7);
    const mealDays = collectDefaultMealDays({ startDate, endDate, dayOption: 'weekdays' });

    expect(mealDays.map((date) => date.getDay())).toEqual([
      MONDAY,
      2,
      3,
      THURSDAY,
      5,
    ]);
  });

  it('covers Thursday through Wednesday for 5-day plan starting Thursday', () => {
    const startDate = dateAt(2024, 0, 11);
    const endDate = addDays(startDate, 7);
    const mealDays = collectDefaultMealDays({ startDate, endDate, dayOption: 'weekdays' });

    expect(mealDays.map((date) => date.getDay())).toEqual([
      THURSDAY,
      5,
      MONDAY,
      2,
      3,
    ]);
  });

  it('covers all seven days for 7-day plan starting Monday', () => {
    const startDate = dateAt(2024, 0, 8);
    const endDate = addDays(startDate, 7);
    const mealDays = collectDefaultMealDays({ startDate, endDate, dayOption: 'full' });

    expect(mealDays.length).toBe(7);
    expect(mealDays.map((date) => date.getDay())).toEqual([
      MONDAY,
      2,
      3,
      THURSDAY,
      5,
      SATURDAY,
      0,
    ]);
  });

  it('does not create meal days from deliveries before startDate in the same week', () => {
    const startDate = dateAt(2024, 0, 11);
    const endDate = addDays(startDate, 7);

    expect(
      isDefaultMealDay({
        date: dateAt(2024, 0, 8),
        startDate,
        endDate,
        dayOption: 'weekdays',
      }),
    ).toBe(false);
  });

  it('covers all seven days for 7-day plan starting Thursday', () => {
    const startDate = dateAt(2024, 0, 11);
    const endDate = addDays(startDate, 7);
    const mealDays = collectDefaultMealDays({ startDate, endDate, dayOption: 'full' });

    expect(mealDays.length).toBe(7);
    expect(mealDays.map((date) => date.getDay())).toEqual([
      THURSDAY,
      5,
      SATURDAY,
      0,
      MONDAY,
      2,
      3,
    ]);
  });

  it('starts the Saturday meal block on Saturday (not Sunday) for 7-day plan', () => {
    const startDate = dateAt(2024, 0, 8);
    const endDate = addDays(startDate, 7);

    expect(
      isDefaultMealDay({
        date: dateAt(2024, 0, 13),
        startDate,
        endDate,
        dayOption: 'full',
      }),
    ).toBe(true);
    expect(
      isDefaultMealDay({
        date: dateAt(2024, 0, 14),
        startDate,
        endDate,
        dayOption: 'full',
      }),
    ).toBe(true);
  });
});

describe('getUpcomingDeliveryDates', () => {
  it.each(['weekdays', 'weekdays+sat', 'full'] as const)(
    'returns only Mondays and Thursdays for %s',
    (dayOption) => {
      const dates = getUpcomingDeliveryDates(60, dayOption);

      expect(dates.length).toBeGreaterThan(0);

      for (const date of dates) {
        const dayOfWeek = date.getDay();
        expect(dayOfWeek === MONDAY || dayOfWeek === THURSDAY).toBe(true);
      }
    },
  );

  it('does not include Saturdays even for the 7-day plan', () => {
    const dates = getUpcomingDeliveryDates(60, 'full');

    expect(dates.some((date) => date.getDay() === SATURDAY)).toBe(false);
  });
});

describe('getSubscriptionMealDates', () => {
  const mondayStart = dateAt(2024, 0, 8);

  it.each([
    ['weekdays', 'weekly', 5],
    ['weekdays+sat', 'weekly', 6],
    ['full', 'weekly', 7],
    ['weekdays', 'monthly', 20],
    ['weekdays+sat', 'monthly', 24],
    ['full', 'monthly', 28],
    ['weekdays', '2months', 40],
    ['weekdays+sat', '2months', 48],
    ['full', '2months', 56],
  ] as const)('returns %i meal days for %s / %s', (dayOption, duration, expectedCount) => {
    const mealDates = getSubscriptionMealDates({
      dayOption,
      duration,
      firstDeliveryDate: mondayStart,
    });

    expect(mealDates).toHaveLength(expectedCount);
    expect(mealDates[0].getDay()).toBe(MONDAY);
  });

  it('matches paidDays from pricing table for base plan', () => {
    for (const duration of ['weekly', 'monthly', '2months'] as const) {
      for (const dayOption of ['weekdays', 'weekdays+sat', 'full'] as const) {
        const mealDates = getSubscriptionMealDates({
          dayOption,
          duration,
          firstDeliveryDate: mondayStart,
        });
        const paidDays = DEFAULT_CHECKOUT_PRICING[duration][dayOption].base.paidDays;

        expect(mealDates).toHaveLength(paidDays);
      }
    }
  });
});

describe('getSubscriptionMenuDays', () => {
  it('uses real calendar dates as MenuDay.date', () => {
    const startDate = dateAt(2024, 0, 8);
    const menuDays = getSubscriptionMenuDays({
      dayOption: 'weekdays',
      duration: 'weekly',
      firstDeliveryDate: startDate,
    });

    expect(menuDays).toHaveLength(5);
    expect(menuDays[0].date).toBe('2024-01-08');
    expect(menuDays[0].id).toBe('2024-01-08');
    expect(menuDays[0].meals.length).toBeGreaterThan(0);
  });
});
