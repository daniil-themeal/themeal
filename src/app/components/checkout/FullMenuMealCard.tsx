import type { Meal } from '../../types/meal';
import { Button } from '../common/Button';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';

type FullMenuMealCardProps = {
  meal: Meal;
  onClick: () => void;
  showRateMealButton?: boolean;
};

export function FullMenuMealCard({ meal, onClick, showRateMealButton = false }: FullMenuMealCardProps) {
  const cardWidthClassName =
    'w-[length:var(--full-menu-meal-card-width)] shrink-0 md:w-[length:var(--full-menu-meal-card-width-md)]';

  const mealButton = (
    <button
      type="button"
      onClick={onClick}
      className={[
        'group relative z-0 flex cursor-pointer flex-col gap-[12px] text-left hover:z-10 focus-visible:z-10',
        showRateMealButton ? 'w-full' : cardWidthClassName,
      ].join(' ')}
    >
      <div className="flex aspect-[25/19] w-full items-center justify-center overflow-visible">
        <img
          src={meal.img}
          alt={meal.name}
          draggable={false}
          className="pointer-events-none h-[94.74%] w-full rounded-[8px] object-cover origin-center transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      <div className="flex w-full flex-col gap-[8px] px-[4px]">
        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'flex w-full flex-wrap items-center gap-x-[0.35em] font-sans text-[length:var(--full-menu-meal-meta-font-size)] font-medium leading-[140%] text-[var(--full-menu-muted)]',
          ].join(' ')}
        >
          <span>
            {meal.kcal} kcal • {meal.weight} g
          </span>
          <span>{meal.type}</span>
        </p>

        <p
          className={[
            'line-clamp-3 w-full [text-box-edge:auto] [text-box-trim:none] font-sans text-[length:var(--full-menu-meal-title-font-size)] font-semibold leading-[140%] text-[var(--full-menu-title)] transition-colors group-hover:text-[var(--full-menu-active)]',
          ].join(' ')}
        >
          {meal.name}
        </p>
      </div>
    </button>
  );

  if (!showRateMealButton) {
    return mealButton;
  }

  return (
    <div className={['flex flex-col gap-[12px]', cardWidthClassName].join(' ')}>
      {mealButton}
      <Button type="button" variant="neutral" outline size="small" className="w-full">
        Rate this meal
      </Button>
    </div>
  );
}
