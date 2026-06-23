import type { QuizFreeDays } from './quizTypes';

export const WPM = 4.33;

export const COST = { cook: 12, order: 60, rest: 50 };

export const TIME = { cookMin: 30, cleanMin: 9, shopWk: 2.0, outTrip: 0.7 };

export const DAYS: Record<QuizFreeDays, number> = {
  weekdays: 20,
  sat: 24,
  full: 28,
};

export const PM_MONTH: Record<number, Record<QuizFreeDays, number>> = {
  2: { weekdays: 999, sat: 1199, full: 1399 },
  3: { weekdays: 1199, sat: 1439, full: 1679 },
  4: { weekdays: 1399, sat: 1679, full: 1959 },
};

export const PM_2MONTH: Record<number, Record<QuizFreeDays, number>> = {
  2: { weekdays: 799, sat: 959, full: 1119 },
  3: { weekdays: 999, sat: 1199, full: 1399 },
  4: { weekdays: 1199, sat: 1439, full: 1679 },
};

export const PERIOD_2MONTH: Record<number, Record<QuizFreeDays, number>> = {
  2: { weekdays: 1599, sat: 1919, full: 2239 },
  3: { weekdays: 1999, sat: 2399, full: 2799 },
  4: { weekdays: 2399, sat: 2879, full: 3359 },
};
