export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Soup';

export type Meal = {
  id: string;
  type: MealType;
  name: string;
  img: string;
  weight: number;
  kcal: number;
  proteins: number;
  fats: number;
  carbs: number;
  ingredients: string;
  allergens: string;
};

export type MenuDay = {
  id: string;
  date: string;
  meals: Meal[];
};