import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import {
  PM_2MONTH,
  PM_MONTH,
  PERIOD_2MONTH,
  TIME,
  WPM,
} from './quizPricing';
import type {
  QuizAnswers,
  QuizAxis,
  QuizCalculationResult,
  QuizCheckoutSelection,
  QuizFreeDays,
  QuizResultSegment,
} from './quizTypes';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function roundInt(value: number) {
  return Math.round(value);
}

export function dishesFromMealsPerWeek(mealsWk: number) {
  const perDay = mealsWk / 7;
  return clamp(Math.round(perDay), 2, 4);
}

export function resolveQuizAxis(people: number, saved: number): QuizAxis {
  if (people >= 3) return 'time';
  if (saved > 150) return 'money';
  return 'time';
}

export function resolveQuizSegment(axis: QuizAxis, people: number): QuizResultSegment {
  if (axis === 'money') return 'money';
  if (people >= 3) return 'family';
  return 'neutral';
}

export function calculateQuizResult(answers: QuizAnswers): QuizCalculationResult {
  const p = answers.people;
  const fc = answers.freqCook;
  const fo = answers.freqOrder;
  const fr = answers.freqRest;
  const sch = answers.freeDays;

  const cookMo = fc * WPM * p;
  const orderMo = fo * WPM * p;
  const restMo = fr * WPM * p;
  const mealsWk = fc + fo + fr;

  const mCook = roundInt(cookMo * answers.costCook);
  const mOrder = roundInt(orderMo * answers.costOrder);
  const mRest = roundInt(restMo * answers.costRest);
  const money = mCook + mOrder + mRest;

  const timeNowMo =
    cookMo * (TIME.cookMin / 60) +
    cookMo * (TIME.cleanMin / 60) +
    (fc > 0 ? TIME.shopWk * WPM : 0) +
    restMo * TIME.outTrip;
  const timeWk = roundInt(timeNowMo / WPM);

  const dishes = dishesFromMealsPerWeek(mealsWk);
  const planMonth = PM_MONTH[dishes][sch] * p;
  const plan2moPM = PM_2MONTH[dishes][sch] * p;
  const plan2moPeriod = PERIOD_2MONTH[dishes][sch] * p;
  const saved = money - planMonth;
  const axis = resolveQuizAxis(p, saved);
  const segment = resolveQuizSegment(axis, p);

  return {
    cookMo,
    orderMo,
    restMo,
    mealsWk,
    mCook,
    mOrder,
    mRest,
    money,
    timeWk,
    dishes,
    planMonth,
    plan2moPM,
    plan2moPeriod,
    saved,
    axis,
    segment,
  };
}

export function dishesToPlan(dishes: number): Plan {
  if (dishes <= 2) return 'light';
  if (dishes === 3) return 'base';
  return 'plus';
}

export function freeDaysToDayOption(freeDays: QuizFreeDays): DayOption {
  if (freeDays === 'sat') return 'weekdays+sat';
  if (freeDays === 'full') return 'full';
  return 'weekdays';
}

export function toCheckoutSelection(
  answers: QuizAnswers,
  result: QuizCalculationResult,
): QuizCheckoutSelection {
  return {
    plan: dishesToPlan(result.dishes),
    days: freeDaysToDayOption(answers.freeDays),
    duration: 'monthly' as Duration,
    persons: answers.people,
  };
}
