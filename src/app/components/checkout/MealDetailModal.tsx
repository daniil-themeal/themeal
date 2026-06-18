import type { CSSProperties } from 'react';

import type { Meal as MealDetail } from '../../types/meal';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import {
  CHECKOUT_MODAL_SHELL_INNER_CLASSNAME,
  CHECKOUT_MODAL_SHELL_PANEL_CLASSNAME,
  CHECKOUT_MODAL_SHELL_ROOT_CLASSNAME,
} from './checkoutModalShellTokens';
import {
  CHECKOUT_FONT_CLAMP_28_32,
  MEAL_DETAIL_CONTENT_PADDING_CLAMP,
  MEAL_DETAIL_IMAGE_PADDING_CLAMP,
  MEAL_DETAIL_MODAL_MAX_WIDTH_CLAMP,
} from './checkoutSpacing';
import { ModalShell } from '../common/ModalShell';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import { XIcon } from '../common/icons';

type MealDetailModalCssVariables = CSSProperties & {
  '--cream': string;
  '--meal-detail-page-bg': string;
  '--meal-detail-card-bg': string;
  '--meal-detail-border': string;
  '--meal-detail-text': string;
  '--meal-detail-divider': string;
  '--meal-detail-close-bg': string;
  '--meal-detail-close-bg-hover': string;
  '--meal-detail-close-icon': string;
  '--meal-detail-title-font-size': string;
  '--meal-detail-body-font-size': string;
  '--meal-detail-modal-max-width': string;
  '--meal-detail-content-p': string;
  '--meal-detail-image-p': string;
};

const mealDetailModalStyle: MealDetailModalCssVariables = {
  '--cream': COLOR_TOKENS.cream[50],
  '--meal-detail-page-bg': COLOR_TOKENS.cream[50],
  '--meal-detail-card-bg': COLOR_TOKENS.base.white,
  '--meal-detail-border': COLOR_TOKENS.neutral[100],
  '--meal-detail-text': COLOR_TOKENS.neutral[900],
  '--meal-detail-divider': COLOR_TOKENS.neutral[500],
  '--meal-detail-close-bg': COLOR_TOKENS.cream[75],
  '--meal-detail-close-bg-hover': COLOR_TOKENS.cream[100],
  '--meal-detail-close-icon': COLOR_TOKENS.cream[600],
  '--meal-detail-title-font-size': CHECKOUT_FONT_CLAMP_28_32,
  '--meal-detail-body-font-size': FONT_SIZE_TOKENS[16],
  '--meal-detail-modal-max-width': MEAL_DETAIL_MODAL_MAX_WIDTH_CLAMP,
  '--meal-detail-content-p': MEAL_DETAIL_CONTENT_PADDING_CLAMP,
  '--meal-detail-image-p': MEAL_DETAIL_IMAGE_PADDING_CLAMP,
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
      variant="fullscreen"
      zIndex={Z_INDEX_TOKENS.modal}
      rootClassName={CHECKOUT_MODAL_SHELL_ROOT_CLASSNAME}
      panelClassName={CHECKOUT_MODAL_SHELL_PANEL_CLASSNAME}
    >
      {(requestClose) => (
        <div style={mealDetailModalStyle} className={CHECKOUT_MODAL_SHELL_INNER_CLASSNAME}>
          <div className="relative flex shrink-0 items-center justify-center bg-[var(--cream)] p-[length:var(--meal-detail-image-p)] sm:rounded-t-[20px]">
            <button
              type="button"
              onClick={requestClose}
              className="group absolute top-0 right-0 z-10 flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
              aria-label="Close"
            >
              <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--meal-detail-close-bg)] text-[var(--meal-detail-close-icon)] transition-colors duration-150 group-hover:bg-[var(--meal-detail-close-bg-hover)]">
                <XIcon size={16} />
              </span>
            </button>

            <div className="h-[223px] w-[310px] overflow-hidden">
              <img
                src={meal.img}
                alt={meal.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col bg-[var(--meal-detail-card-bg)] sm:flex-none">
            <div className="flex flex-col gap-[32px] p-[length:var(--meal-detail-content-p)]">
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
