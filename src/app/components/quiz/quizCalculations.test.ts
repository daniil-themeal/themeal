import { describe, expect, it } from 'vitest';

import { calculateQuizResult, dishesFromMealsPerWeek, resolveQuizSegment } from './quizCalculations';
import { DEFAULT_QUIZ_ANSWERS } from './quizTypes';

describe('dishesFromMealsPerWeek', () => {
  it('clamps to 2–4 meals per day', () => {
    expect(dishesFromMealsPerWeek(7)).toBe(2);
    expect(dishesFromMealsPerWeek(14)).toBe(2);
    expect(dishesFromMealsPerWeek(21)).toBe(3);
    expect(dishesFromMealsPerWeek(28)).toBe(4);
    expect(dishesFromMealsPerWeek(35)).toBe(4);
  });
});

describe('calculateQuizResult', () => {
  it('uses default answers and rounds display numbers', () => {
    const result = calculateQuizResult(DEFAULT_QUIZ_ANSWERS);

    expect(result.mealsWk).toBe(17);
    expect(result.dishes).toBe(2);
    expect(result.money).toBeGreaterThan(0);
    expect(result.timeWk).toBeGreaterThan(0);
    expect(Number.isInteger(result.money)).toBe(true);
    expect(Number.isInteger(result.timeWk)).toBe(true);
  });

  it('assigns money segment when saved > 150 for single person', () => {
    const result = calculateQuizResult({
      ...DEFAULT_QUIZ_ANSWERS,
      people: 1,
      freqCook: 20,
      freqOrder: 10,
      freqRest: 5,
      costCook: 25,
      costOrder: 100,
      costRest: 80,
    });

    expect(result.axis).toBe('money');
    expect(result.segment).toBe('money');
  });

  it('assigns family segment for 3+ people regardless of savings', () => {
    const result = calculateQuizResult({
      ...DEFAULT_QUIZ_ANSWERS,
      people: 3,
      freqCook: 2,
      freqOrder: 1,
      freqRest: 1,
      costCook: 6,
      costOrder: 25,
      costRest: 25,
    });

    expect(result.axis).toBe('time');
    expect(result.segment).toBe('family');
  });
});

describe('resolveQuizSegment', () => {
  it('prioritizes money axis over family headcount', () => {
    expect(resolveQuizSegment('money', 3)).toBe('money');
  });
});
