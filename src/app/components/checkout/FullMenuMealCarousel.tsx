import type { Meal } from '../../types/meal';
import {
  FULL_MENU_MEAL_CAROUSEL_BLEED,
  FULL_MENU_MEAL_CAROUSEL_GUTTER_CLASS_NAME,
} from './checkoutStepPageLayoutTokens';
import { CheckoutScrollEdgeGutter } from './CheckoutScrollEdgeGutter';
import { FullMenuMealCard } from './FullMenuMealCard';

type FullMenuMealCarouselProps = {
  meals: Meal[];
  onMealClick: (meal: Meal) => void;
  bleedClassName?: string;
  gutterClassName?: string;
  className?: string;
};

export function FullMenuMealCarousel({
  meals,
  onMealClick,
  bleedClassName = FULL_MENU_MEAL_CAROUSEL_BLEED,
  gutterClassName = FULL_MENU_MEAL_CAROUSEL_GUTTER_CLASS_NAME,
  className,
}: FullMenuMealCarouselProps) {
  return (
    <div className={className}>
      <div className={bleedClassName}>
        <div className="flex touch-pan-x select-none justify-start gap-[length:var(--full-menu-meal-gap)] overflow-x-auto overflow-y-visible overscroll-x-contain px-0 pb-[length:var(--full-menu-meal-carousel-padding-bottom)] pt-[6px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <CheckoutScrollEdgeGutter className={gutterClassName} />
          {meals.map((meal) => (
            <FullMenuMealCard key={meal.id} meal={meal} onClick={() => onMealClick(meal)} />
          ))}
          <CheckoutScrollEdgeGutter className={gutterClassName} />
        </div>
      </div>
    </div>
  );
}
