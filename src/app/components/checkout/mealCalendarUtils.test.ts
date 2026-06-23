import { describe, expect, it } from 'vitest';

import {
  addDays,
  getDeliveryDaysLabel,
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

function collectMealDays({
  startDate,
  endDate,
  dayOption,
}: {
  startDate: Date;
  endDate: Date;
  dayOption: 'weekdays' | 'weekdays+sat' | 'full';
}): Date[] {
  const mealDays: Date[] = [];
  const cursor = new Date(startDate);

  while (cursor < endDate) {
    if (isDefaultMealDay({ date: cursor, startDate, endDate, dayOption })) {
      mealDays.push(new Date(cursor));
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return mealDays;
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

describe('getDeliveryDaysLabel', () => {
  it('returns Mondays and Thursdays for 5/6-day plans', () => {
    expect(getDeliveryDaysLabel('weekdays')).toBe('Mondays and Thursdays');
    expect(getDeliveryDaysLabel('weekdays+sat')).toBe('Mondays and Thursdays');
  });

  it('includes Saturdays for 7-day plans', () => {
    expect(getDeliveryDaysLabel('full')).toBe('Mondays, Thursdays, and Saturdays');
  });
});

describe('isDefaultMealDay', () => {
  it('covers Monday through Friday for 5-day plan starting Monday', () => {
    const startDate = dateAt(2024, 0, 8);
    const endDate = addDays(startDate, 7);
    const mealDays = collectMealDays({ startDate, endDate, dayOption: 'weekdays' });

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
    const mealDays = collectMealDays({ startDate, endDate, dayOption: 'weekdays' });

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
    const mealDays = collectMealDays({ startDate, endDate, dayOption: 'full' });

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
});
