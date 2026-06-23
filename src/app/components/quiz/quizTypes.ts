import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';

export type QuizPeople = 1 | 2 | 3;
export type QuizFreeDays = 'weekdays' | 'sat' | 'full';
export type QuizPain = 'variety' | 'time' | 'money' | 'health';
export type QuizAxis = 'money' | 'time';
export type QuizResultSegment = 'money' | 'family' | 'neutral';

export type QuizAnswers = {
  people: QuizPeople;
  freqCook: number;
  freqOrder: number;
  freqRest: number;
  freeDays: QuizFreeDays;
  costCook: number;
  costOrder: number;
  costRest: number;
  pain: QuizPain;
};

export type QuizStepId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const QUIZ_TOTAL_STEPS = 7 as const;

export type QuizFlowPhase =
  | { kind: 'question'; step: QuizStepId }
  | { kind: 'result' }
  | { kind: 'lead' }
  | { kind: 'sms' }
  | { kind: 'success' };

export type QuizCalculationResult = {
  cookMo: number;
  orderMo: number;
  restMo: number;
  mealsWk: number;
  mCook: number;
  mOrder: number;
  mRest: number;
  money: number;
  timeWk: number;
  dishes: number;
  planMonth: number;
  plan2moPM: number;
  plan2moPeriod: number;
  saved: number;
  axis: QuizAxis;
  segment: QuizResultSegment;
};

export type QuizCheckoutSelection = {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  persons: number;
};

export const DEFAULT_QUIZ_ANSWERS: QuizAnswers = {
  people: 1,
  freqCook: 10,
  freqOrder: 4,
  freqRest: 3,
  freeDays: 'weekdays',
  costCook: 12,
  costOrder: 60,
  costRest: 50,
  pain: 'time',
};
