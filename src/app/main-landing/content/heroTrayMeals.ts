export const HERO_TRAY_MEALS = [
  '/main-landing/assets/meals/meal-01.avif',
  '/main-landing/assets/meals/meal-03.avif',
  '/main-landing/assets/meals/meal-05.avif',
  '/main-landing/assets/meals/meal-07.avif',
  '/main-landing/assets/meals/meal-09.avif',
  '/main-landing/assets/meals/meal-11.avif',
  '/main-landing/assets/meals/meal-16.avif',
  '/main-landing/assets/meals/meal-17.avif',
  '/main-landing/assets/meals/meal-18.avif',
  '/main-landing/assets/meals/meal-20.avif',
  '/main-landing/assets/meals/meal-22.avif',
  '/main-landing/assets/meals/meal-23.avif',
] as const;

/** Breakfast & lunch stay fixed; dinner & soup rotate through hero-belt photos. */
const MENU_DINNER_HERO_INDICES = [3, 4, 5, 6, 7, 8, 9] as const;
const MENU_SOUP_HERO_INDICES = [8, 9, 10, 11, 2, 5] as const;

export function getMenuMealImages(dayIndex: number): readonly string[] {
  const dinnerIdx = MENU_DINNER_HERO_INDICES[dayIndex % MENU_DINNER_HERO_INDICES.length];
  const soupIdx = MENU_SOUP_HERO_INDICES[dayIndex % MENU_SOUP_HERO_INDICES.length];

  return [
    HERO_TRAY_MEALS[0],
    HERO_TRAY_MEALS[1],
    HERO_TRAY_MEALS[dinnerIdx],
    HERO_TRAY_MEALS[soupIdx],
  ];
}
