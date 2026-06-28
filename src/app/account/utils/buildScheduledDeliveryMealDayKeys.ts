import {
  getMealDayKey,
  getMealDaysForDelivery,
  type MealDayRadiusPosition,
} from '../../components/checkout/mealCalendarUtils';
import type { DayOption } from '../../data/checkoutPricing';

function getContiguousIndexGroups(indices: number[]): number[][] {
  if (indices.length === 0) {
    return [];
  }

  const groups: number[][] = [];
  let currentGroup = [indices[0]];

  for (let index = 1; index < indices.length; index += 1) {
    const previousIndex = indices[index - 1];
    const currentIndex = indices[index];

    if (currentIndex === previousIndex + 1) {
      currentGroup.push(currentIndex);
    } else {
      groups.push(currentGroup);
      currentGroup = [currentIndex];
    }
  }

  groups.push(currentGroup);

  return groups;
}

export function buildScheduledDeliveryMealDayKeys(
  scheduledDeliveryDates: string[],
  dayOption: DayOption,
): ReadonlySet<string> {
  const mealDayKeys = new Set<string>();
  const sortedDates = [...scheduledDeliveryDates].sort((left, right) => left.localeCompare(right));

  for (const dateIso of sortedDates) {
    const deliveryDate = new Date(`${dateIso}T00:00:00`);

    for (const mealDate of getMealDaysForDelivery(deliveryDate, dayOption)) {
      mealDayKeys.add(getMealDayKey(mealDate));
    }
  }

  return mealDayKeys;
}

export function getMealDayRadiusByIndexForDateKeys(
  week: Date[],
  mealDayKeys: ReadonlySet<string>,
): Array<MealDayRadiusPosition | null> {
  const mealDayIndices = week
    .map((date, index) => (mealDayKeys.has(getMealDayKey(date)) ? index : -1))
    .filter((index) => index >= 0);

  const radiusByIndex: Array<MealDayRadiusPosition | null> = week.map(() => null);

  for (const group of getContiguousIndexGroups(mealDayIndices)) {
    if (group.length === 1) {
      radiusByIndex[group[0]] = 'single';
      continue;
    }

    radiusByIndex[group[0]] = 'start';
    radiusByIndex[group[group.length - 1]] = 'end';
  }

  return radiusByIndex;
}
