import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import type { Meal as MealDetail } from '../../types/meal';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { CloseIcon } from '../ui/icons/CloseIcon';

const EXIT_ANIMATION_FALLBACK_MS = 260;

type MealDetailModalCssVariables = CSSProperties & {
  '--meal-detail-page-bg': string;
  '--meal-detail-card-bg': string;
  '--meal-detail-border': string;
  '--meal-detail-text': string;
  '--meal-detail-divider': string;
  '--meal-detail-close-bg': string;
  '--meal-detail-close-bg-hover': string;
  '--meal-detail-title-font-size': string;
  '--meal-detail-body-font-size': string;
};

const mealDetailModalStyle: MealDetailModalCssVariables = {
  '--meal-detail-page-bg': COLOR_TOKENS.neutral[50],
  '--meal-detail-card-bg': COLOR_TOKENS.base.white,
  '--meal-detail-border': COLOR_TOKENS.neutral[100],
  '--meal-detail-text': COLOR_TOKENS.neutral[900],
  '--meal-detail-divider': COLOR_TOKENS.neutral[500],
  '--meal-detail-close-bg': COLOR_TOKENS.neutral[50],
  '--meal-detail-close-bg-hover': COLOR_TOKENS.neutral[75],
  '--meal-detail-title-font-size': FONT_SIZE_TOKENS[32],
  '--meal-detail-body-font-size': FONT_SIZE_TOKENS[16],
};

function DottedRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-end gap-[6px]">
      <p className="shrink-0 whitespace-nowrap font-sans text-[length:var(--meal-detail-body-font-size)] font-medium leading-[150%] text-[var(--meal-detail-text)]">
        {label}
      </p>

      <div
        className="mb-[4px] h-[4px] min-w-0 flex-1"
        style={{ borderBottom: `1px dashed ${COLOR_TOKENS.neutral[500]}` }}
      />

      <p className="shrink-0 whitespace-nowrap font-sans text-[length:var(--meal-detail-body-font-size)] font-medium leading-[150%] text-[var(--meal-detail-text)]">
        {value}
      </p>
    </div>
  );
}

export function MealDetailModal({
  meal,
  onClose,
}: {
  meal: MealDetail | null;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const isClosingRef = useRef(false);
  const fallbackTimerRef = useRef<number | null>(null);

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  const finishClose = useCallback(() => {
    clearFallbackTimer();
    onClose();
  }, [clearFallbackTimer, onClose]);

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    setIsClosing(true);

    fallbackTimerRef.current = window.setTimeout(() => {
      finishClose();
    }, EXIT_ANIMATION_FALLBACK_MS);
  }, [finishClose]);

  useEffect(() => {
    if (!meal) return;

    isClosingRef.current = false;
    setIsClosing(false);

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        requestClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearFallbackTimer();
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [clearFallbackTimer, meal, requestClose]);

  if (!meal) return null;

  return (
    <div
      className="fixed inset-0 z-[400] overflow-y-auto bg-[var(--meal-detail-page-bg)] scrollbar-hide md:bg-black/40 md:px-[24px] md:py-[24px]"
      style={mealDetailModalStyle}
      onClick={requestClose}
    >
      <div className="min-h-full md:flex md:items-center md:justify-center">
        <div
          className={`${
            isClosing ? 'modal-exit-responsive' : 'modal-enter-responsive'
          } min-h-screen w-full bg-[var(--meal-detail-card-bg)] md:min-h-0 md:max-w-[480px] md:overflow-hidden md:rounded-[20px] md:shadow-2xl`}
          onClick={(event) => event.stopPropagation()}
          onAnimationEnd={(event) => {
            if (event.currentTarget !== event.target) return;

            if (isClosingRef.current) {
              finishClose();
            }
          }}
        >
          <div className="sticky top-0 z-10 flex h-[56px] shrink-0 items-center justify-end border-b border-[var(--meal-detail-border)] bg-[var(--meal-detail-card-bg)] md:static md:z-auto">
            <button
              type="button"
              onClick={requestClose}
              className="group flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
              aria-label="Close"
            >
              <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--meal-detail-close-bg)] transition-colors duration-150 group-hover:bg-[var(--meal-detail-close-bg-hover)]">
                <CloseIcon
                  size={12}
                  color={COLOR_TOKENS.neutral[900]}
                  strokeWidth={1.8}
                />
              </span>
            </button>
          </div>

          <div className="flex shrink-0 items-center justify-center bg-[var(--meal-detail-page-bg)] py-[40px]">
            <div className="h-[223px] w-[310px] overflow-hidden">
              <img
                src={meal.img}
                alt={meal.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="rounded-tl-[12px] rounded-tr-[12px] bg-[var(--meal-detail-card-bg)]">
            <div className="flex flex-col gap-[32px] px-[24px] py-[28px] pb-[32px]">
              <p className="w-full font-sans text-[length:var(--meal-detail-title-font-size)] font-bold leading-[130%] text-[var(--meal-detail-text)]">
                {meal.name}
              </p>

              <div className="flex w-full flex-col gap-[8px]">
                <DottedRow label="Weight" value={`${meal.weight} g`} />
                <DottedRow label="Calories" value={`${meal.kcal} kCal`} />
                <DottedRow label="Proteins" value={`${meal.proteins} g`} />
                <DottedRow label="Fats" value={`${meal.fats} g`} />
                <DottedRow label="Carbohydrates" value={`${meal.carbs} g`} />
              </div>

              <div className="flex w-full flex-col gap-[8px]">
                <p className="font-sans text-[length:var(--meal-detail-body-font-size)] font-bold leading-[150%] text-[var(--meal-detail-text)]">
                  Ingredients
                </p>

                <p className="font-sans text-[length:var(--meal-detail-body-font-size)] font-medium leading-[140%] text-[var(--meal-detail-text)]">
                  {meal.ingredients}
                </p>
              </div>

              <div className="flex w-full flex-col gap-[8px]">
                <p className="font-sans text-[length:var(--meal-detail-body-font-size)] font-bold leading-[150%] text-[var(--meal-detail-text)]">
                  Allergens
                </p>

                <p className="font-sans text-[length:var(--meal-detail-body-font-size)] font-medium leading-[140%] text-[var(--meal-detail-text)]">
                  {meal.allergens}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}