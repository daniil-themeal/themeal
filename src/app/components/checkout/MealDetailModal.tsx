import type { CSSProperties } from 'react';

import type { Meal as MealDetail } from '../../types/meal';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { ModalShell } from '../common/ModalShell';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import { XIcon } from '../common/icons';
import { iconColorClassName, iconColorStyle } from '../common/iconColorTokens';

type MealDetailModalCssVariables = CSSProperties & {
  '--cream': string;
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
  '--cream': '#FBF8F3',
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
  if (!meal) return null;

  return (
    <ModalShell
      isOpen={Boolean(meal)}
      onClose={onClose}
      variant="centered-scroll"
      zIndex={Z_INDEX_TOKENS.modal}
      rootClassName="bg-[var(--meal-detail-page-bg)] md:bg-black/40 md:px-[24px] md:py-[24px]"
      panelClassName="min-h-screen w-full bg-[var(--meal-detail-card-bg)] md:min-h-0 md:max-w-[480px] md:overflow-hidden md:rounded-[20px] md:shadow-2xl"
    >
      {(requestClose) => (
        <div style={mealDetailModalStyle}>
          <div className="sticky top-0 z-10 flex h-[56px] shrink-0 items-center justify-end bg-[var(--meal-detail-card-bg)] md:static md:z-auto">
            <button
              type="button"
              onClick={requestClose}
              className="group flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
              aria-label="Close"
            >
              <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--meal-detail-close-bg)] transition-colors duration-150 group-hover:bg-[var(--meal-detail-close-bg-hover)]">
                <span
                  className={iconColorClassName.emphasis}
                  style={iconColorStyle.emphasis}
                >
                  <XIcon size={16} />
                </span>
              </span>
            </button>
          </div>

          <div className="flex shrink-0 items-center justify-center bg-[var(--cream)] py-[40px]">
            <div className="h-[223px] w-[310px] overflow-hidden">
              <img
                src={meal.img}
                alt={meal.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="bg-[var(--meal-detail-card-bg)]">
            <div className="flex flex-col gap-[32px] px-[24px] py-[28px] pb-[32px]">
              <p className="w-full font-sans text-[length:var(--meal-detail-title-font-size)] font-bold leading-[130%] text-[var(--meal-detail-text)]">
                {meal.name}
              </p>

              <div className="flex w-full flex-col gap-[16px]">
                <DottedRow label="Weight" value={`${meal.weight} g`} />
                <DottedRow label="Calories" value={`${meal.kcal} kCal`} />
                <DottedRow label="Proteins" value={`${meal.proteins} g`} />
                <DottedRow label="Fats" value={`${meal.fats} g`} />
                <DottedRow label="Carbohydrates" value={`${meal.carbs} g`} />
              </div>

              <div className="flex w-full flex-col gap-[12px]">
                <p className="font-sans text-[length:var(--meal-detail-body-font-size)] font-bold leading-[150%] text-[var(--meal-detail-text)]">
                  Ingredients
                </p>

                <p className="font-sans text-[length:var(--meal-detail-body-font-size)] font-medium leading-[140%] text-[var(--meal-detail-text)]">
                  {meal.ingredients}
                </p>
              </div>

              <div className="flex w-full flex-col gap-[12px]">
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
      )}
    </ModalShell>
  );
}
