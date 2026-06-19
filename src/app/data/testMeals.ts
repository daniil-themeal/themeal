import imgMeal0 from '../../imports/FullMenuModal-1/ed649ccc9acf7f05f660f120dc9d0a0941e4253e.png';
import imgMeal1 from '../../imports/FullMenuModal-1/feee0bb3ed9670e48c8b77838b96c3beb2661c90.png';
import imgMeal2 from '../../imports/FullMenuModal-1/24a6f54019e39194ab56cc3ad1d4eae283d5ea0d.png';
import imgMeal3 from '../../imports/FullMenuModal-1/f05fac8b4448176f810485905acdbcc1b36080f7.png';

import type { Meal, MealType, MenuDay } from '../types/meal';
import type { Plan } from './checkoutPricing';

export const MENU_DAYS_COUNT = 14;

export type LightMealOption = 'breakfast-main' | 'lunch-dinner';

export const LIGHT_MEAL_OPTIONS: LightMealOption[] = [
  'breakfast-main',
  'lunch-dinner',
];

export const MEAL_TYPES_BY_PLAN: Record<Exclude<Plan, 'light'>, MealType[]> = {
  base: ['Breakfast', 'Lunch', 'Dinner'],
  plus: ['Breakfast', 'Lunch', 'Dinner', 'Soup'],
};

export const MEAL_TYPES_BY_LIGHT_OPTION: Record<LightMealOption, MealType[]> = {
  'breakfast-main': ['Breakfast', 'Lunch'],
  'lunch-dinner': ['Lunch', 'Dinner'],
};

/** Fixed slot order for Full Menu desktop carousel (Plus plan order). */
export const FULL_MENU_SLOT_MEAL_TYPES: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Soup'];

export type FullMenuMealSlot = {
  meal: Meal;
  active: boolean;
};

const breakfasts = [
  'French omelette with grilled beans and grilled tomatoes',
  'Greek yogurt bowl with berries and granola',
  'Scrambled eggs with spinach and roasted mushrooms',
  'Oatmeal with banana, dates and almond butter',
  'Turkey egg muffins with roasted vegetables',
  'Cottage cheese pancakes with berry compote',
  'Avocado toast with poached eggs',
];

const lunches = [
  'Orange chicken with fried rice',
  'Grilled chicken with sweet potato and broccoli',
  'Beef kofta with rice and cucumber yogurt',
  'Teriyaki salmon with soba noodles',
  'Chicken shawarma bowl with herb rice',
  'Turkey meatballs with tomato pasta',
  'Lemon herb chicken with quinoa salad',
];

const dinners = [
  'Meat and rice stuffed capsicum with roasted potato and vegetables',
  'Beef stroganoff with mashed potato',
  'Chicken tikka with basmati rice and vegetables',
  'Baked fish with cauliflower mash and greens',
  'Turkey chili with roasted pumpkin',
  'Grilled beef strips with noodles and vegetables',
  'Chicken casserole with potatoes and carrots',
];

const soups = [
  'Mushroom soup',
  'Chicken vegetable soup',
  'Tomato basil soup',
  'Lentil soup with herbs',
  'Pumpkin cream soup',
  'Minestrone soup',
  'Broccoli cheddar soup',
];

const imagesByType: Record<MealType, string> = {
  Breakfast: imgMeal0,
  Lunch: imgMeal1,
  Dinner: imgMeal2,
  Soup: imgMeal3,
};

const kcalByType: Record<MealType, number> = {
  Breakfast: 572,
  Lunch: 684,
  Dinner: 641,
  Soup: 312,
};

const weightByType: Record<MealType, number> = {
  Breakfast: 330,
  Lunch: 390,
  Dinner: 420,
  Soup: 300,
};

const proteinsByType: Record<MealType, number> = {
  Breakfast: 32,
  Lunch: 38,
  Dinner: 35,
  Soup: 12,
};

const fatsByType: Record<MealType, number> = {
  Breakfast: 28,
  Lunch: 24,
  Dinner: 22,
  Soup: 18,
};

const carbsByType: Record<MealType, number> = {
  Breakfast: 42,
  Lunch: 76,
  Dinner: 68,
  Soup: 28,
};

const ingredientsByType: Record<MealType, string> = {
  Breakfast: 'Eggs, vegetables, herbs, dairy, olive oil, salt, black pepper.',
  Lunch: 'Chicken or beef, rice or grains, vegetables, sauce, herbs, spices.',
  Dinner: 'Meat or fish, potatoes or grains, roasted vegetables, herbs, sauce.',
  Soup: 'Vegetables, stock, cream or legumes, herbs, garlic, onion.',
};

const allergensByType: Record<MealType, string> = {
  Breakfast: 'Eggs, milk',
  Lunch: 'Soy, sesame',
  Dinner: 'None',
  Soup: 'Milk',
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function createMeal(type: MealType, name: string, dayIndex: number): Meal {
  return {
    id: `${slugify(type)}-${dayIndex}-${slugify(name)}`,
    type,
    name,
    kcal: kcalByType[type] + ((dayIndex % 3) - 1) * 18,
    weight: weightByType[type],
    proteins: proteinsByType[type],
    fats: fatsByType[type],
    carbs: carbsByType[type],
    ingredients: ingredientsByType[type],
    allergens: allergensByType[type],
    img: imagesByType[type],
  };
}

export function buildMealDetail(
  type: MealType,
  name: string,
  img: string,
  options?: { id?: string; kcal?: number; weight?: number },
): Meal {
  return {
    id: options?.id ?? slugify(`${type}-${name}`),
    type,
    name,
    img,
    kcal: options?.kcal ?? kcalByType[type],
    weight: options?.weight ?? weightByType[type],
    proteins: proteinsByType[type],
    fats: fatsByType[type],
    carbs: carbsByType[type],
    ingredients: ingredientsByType[type],
    allergens: allergensByType[type],
  };
}

function getDateString(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);

  return date.toISOString().split('T')[0];
}

function getMealName(type: MealType, dayIndex: number) {
  const sourceByType: Record<MealType, string[]> = {
    Breakfast: breakfasts,
    Lunch: lunches,
    Dinner: dinners,
    Soup: soups,
  };

  const source = sourceByType[type];

  return source[dayIndex % source.length];
}

export function getMealTypesForPlan(
  plan: Plan,
  lightMealOption: LightMealOption,
): MealType[] {
  if (plan === 'light') {
    return MEAL_TYPES_BY_LIGHT_OPTION[lightMealOption];
  }

  return MEAL_TYPES_BY_PLAN[plan];
}

export function getMealsForPlan(
  menuDay: MenuDay | undefined,
  plan: Plan,
  lightMealOption: LightMealOption,
): Meal[] {
  if (!menuDay) return [];

  const mealTypes = getMealTypesForPlan(plan, lightMealOption);

  return mealTypes
    .map(type => menuDay.meals.find(meal => meal.type === type))
    .filter((meal): meal is Meal => Boolean(meal));
}

export function getFullMenuMealSlots(
  menuDay: MenuDay | undefined,
  plan: Plan,
  lightMealOption: LightMealOption,
): FullMenuMealSlot[] {
  if (!menuDay) return [];

  const activeTypes = new Set(getMealTypesForPlan(plan, lightMealOption));

  return FULL_MENU_SLOT_MEAL_TYPES.flatMap((type) => {
    const meal = menuDay.meals.find((item) => item.type === type);
    return meal ? [{ meal, active: activeTypes.has(type) }] : [];
  });
}

export const testMenuDays: MenuDay[] = Array.from({ length: MENU_DAYS_COUNT }, (_, dayIndex) => ({
  id: `day-${dayIndex}`,
  date: getDateString(dayIndex),
  meals: [
    createMeal('Breakfast', getMealName('Breakfast', dayIndex), dayIndex),
    createMeal('Lunch', getMealName('Lunch', dayIndex), dayIndex),
    createMeal('Dinner', getMealName('Dinner', dayIndex), dayIndex),
    createMeal('Soup', getMealName('Soup', dayIndex), dayIndex),
  ],
}));