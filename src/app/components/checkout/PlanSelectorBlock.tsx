import type { CSSProperties } from 'react';

import type { Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';
import { Badge } from '../common/Badge';
import type { BadgeVariant } from '../common/Badge';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';

const lightChipsByOption: Record<LightMealOption, string[]> = {
  'breakfast-main': ['Breakfast', 'Lunch'],
  'lunch-dinner': ['Lunch', 'Dinner'],
};

const plans = [
  {
    id: 'light' as Plan,
    name: 'Light',
    meals: '2 meals',
    pricePerDay: 'AED 39.9',
    chips: ['Lunch', 'Dinner'],
    radioOptions: [
      {
        id: 'breakfast-main' as LightMealOption,
        label: 'Breakfast + Main meal',
      },
      {
        id: 'lunch-dinner' as LightMealOption,
        label: 'Lunch + Dinner',
      },
    ],
    kcal: 900,
    proteins: 50,
    fats: 40,
    carbs: 85,
    badge: null as BadgeVariant | null,
  },
  {
    id: 'base' as Plan,
    name: 'Base',
    meals: '3 meals',
    pricePerDay: 'AED 47.4',
    chips: ['Breakfast', 'Lunch', 'Dinner'],
    radioOptions: [],
    kcal: 1350,
    proteins: 70,
    fats: 65,
    carbs: 120,
    badge: 'most-popular' as BadgeVariant | null,
  },
  {
    id: 'plus' as Plan,
    name: 'Plus',
    meals: '4 meals',
    pricePerDay: 'AED 57.5',
    chips: ['Breakfast', 'Lunch', 'Dinner', 'Soup'],
    radioOptions: [],
    kcal: 1500,
    proteins: 80,
    fats: 70,
    carbs: 135,
    badge: null as BadgeVariant | null,
  },
];

type PlanSelectorBlockCssVariables = CSSProperties & {
  '--plan-selector-title-font-size': string;
  '--plan-selector-card-title-font-size': string;
  '--plan-selector-card-title-font-size-md': string;
  '--plan-selector-card-meta-font-size': string;
  '--plan-selector-card-meta-font-size-md': string;
  '--plan-selector-chip-font-size': string;
  '--plan-selector-radio-font-size': string;
  '--plan-selector-nutrition-font-size': string;
  '--plan-selector-text': string;
  '--plan-selector-muted': string;
  '--plan-selector-active': string;
  '--plan-selector-card-bg': string;
  '--plan-selector-card-selected-bg': string;
  '--plan-selector-card-selected-border': string;
  '--plan-selector-chip-border': string;
  '--plan-selector-chip-selected-border': string;
  '--plan-selector-chip-text': string;
  '--plan-selector-radio-bg': string;
  '--plan-selector-radio-selected-bg': string;
  '--plan-selector-radio-dot': string;
};

const planSelectorBlockStyle: PlanSelectorBlockCssVariables = {
  '--plan-selector-title-font-size': FONT_SIZE_TOKENS[32],
  '--plan-selector-card-title-font-size': FONT_SIZE_TOKENS[16],
  '--plan-selector-card-title-font-size-md': FONT_SIZE_TOKENS[20],
  '--plan-selector-card-meta-font-size': FONT_SIZE_TOKENS[12],
  '--plan-selector-card-meta-font-size-md': FONT_SIZE_TOKENS[14],
  '--plan-selector-chip-font-size': FONT_SIZE_TOKENS[12],
  '--plan-selector-radio-font-size': FONT_SIZE_TOKENS[12],
  '--plan-selector-nutrition-font-size': FONT_SIZE_TOKENS[12],
  '--plan-selector-text': COLOR_TOKENS.neutral[900],
  '--plan-selector-muted': COLOR_TOKENS.neutral[500],
  '--plan-selector-active': COLOR_TOKENS.primary[500],
  '--plan-selector-card-bg': COLOR_TOKENS.base.white,
  '--plan-selector-card-selected-bg': COLOR_TOKENS.primary[50],
  '--plan-selector-card-selected-border': COLOR_TOKENS.primary[200],
  '--plan-selector-chip-border': COLOR_TOKENS.neutral[100],
  '--plan-selector-chip-selected-border': COLOR_TOKENS.primary[200],
  '--plan-selector-chip-text': COLOR_TOKENS.neutral[700],
  '--plan-selector-radio-bg': COLOR_TOKENS.neutral[50],
  '--plan-selector-radio-selected-bg': COLOR_TOKENS.primary[100],
  '--plan-selector-radio-dot': COLOR_TOKENS.primary[500],
};

function PlanCard({
  plan,
  selected,
  lightMealOption,
  onSelect,
  onLightMealOptionChange,
}: {
  plan: (typeof plans)[number];
  selected: boolean;
  lightMealOption: LightMealOption;
  onSelect: () => void;
  onLightMealOptionChange: (option: LightMealOption) => void;
}) {
  const visibleChips =
    plan.id === 'light' ? lightChipsByOption[lightMealOption] : plan.chips;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'relative w-full shrink-0 cursor-pointer rounded-[16px] border border-solid text-left transition-colors duration-150',
        selected
          ? 'border-[var(--plan-selector-card-selected-border)] bg-[var(--plan-selector-card-selected-bg)]'
          : 'border-transparent bg-[var(--plan-selector-card-bg)]',
      ].join(' ')}
    >
      {plan.badge ? (
        <Badge variant={plan.badge} className="absolute right-[20px] top-[-4px] z-[1]" />
      ) : null}

      <div className="flex flex-col items-start gap-[12px] p-[20px] md:px-[24px]">
        <div className="flex w-full items-start gap-[16px]">
          <div className="flex flex-[1_0_0] items-center gap-[4px]">
            <p
              className={[
                "font-['Quicksand'] text-[length:var(--plan-selector-card-title-font-size)] font-bold leading-[130%] md:text-[length:var(--plan-selector-card-title-font-size-md)]",
                selected ? 'text-[var(--plan-selector-active)]' : 'text-[var(--plan-selector-text)]',
              ].join(' ')}
            >
              {plan.name}
            </p>

            <p
              className={[
                "whitespace-nowrap font-['Quicksand'] text-[length:var(--plan-selector-card-title-font-size)] font-medium leading-[130%] md:text-[length:var(--plan-selector-card-title-font-size-md)]",
                selected ? 'text-[var(--plan-selector-active)]' : 'text-[var(--plan-selector-text)]',
              ].join(' ')}
            >
              {plan.meals}
            </p>
          </div>

          <div className="flex items-baseline gap-[4px] text-right text-[var(--plan-selector-active)]">
            <p className="font-['Quicksand'] text-[length:var(--plan-selector-card-meta-font-size)] font-medium leading-[130%] md:text-[length:var(--plan-selector-card-meta-font-size-md)]">
              from
            </p>

            <p className="whitespace-nowrap text-right font-['Quicksand'] text-[length:var(--plan-selector-card-title-font-size)] font-bold leading-[130%] md:text-[length:var(--plan-selector-card-title-font-size-md)]">
              {plan.pricePerDay}/day
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-[4px] text-center">
          {visibleChips.map((chip) => (
            <div
              key={chip}
              className={[
                'flex items-center justify-center rounded-[80px] border border-solid px-[5px] py-[4px]',
                selected
                  ? 'border-[var(--plan-selector-chip-selected-border)]'
                  : 'border-[var(--plan-selector-chip-border)]',
              ].join(' ')}
            >
              <p
                className={[
                  "whitespace-nowrap font-['Quicksand'] text-[length:var(--plan-selector-chip-font-size)] font-normal leading-[130%]",
                  selected
                    ? 'text-[var(--plan-selector-active)]'
                    : 'text-[var(--plan-selector-chip-text)]',
                ].join(' ')}
              >
                {chip}
              </p>
            </div>
          ))}
        </div>

        {plan.id === 'light' ? (
          <div className="flex w-full flex-wrap items-start gap-[12px]">
            {plan.radioOptions.map((option) => {
              const optionSelected = lightMealOption === option.id;
              const radioActiveBackground = selected || optionSelected;

              return (
                <span
                  key={option.id}
                  className="flex cursor-pointer items-center gap-[6px] py-[4px]"
                  onClick={(event) => {
                    event.stopPropagation();
                    onLightMealOptionChange(option.id);

                    if (!selected) {
                      onSelect();
                    }
                  }}
                >
                  <span
                    className={[
                      'flex size-[16px] items-center justify-center rounded-full transition-colors duration-150',
                      radioActiveBackground
                        ? 'bg-[var(--plan-selector-radio-selected-bg)]'
                        : 'bg-[var(--plan-selector-radio-bg)]',
                    ].join(' ')}
                  >
                    {optionSelected ? (
                      <span className="size-[8px] rounded-full bg-[var(--plan-selector-radio-dot)]" />
                    ) : null}
                  </span>

                  <span className="font-['Quicksand'] text-[length:var(--plan-selector-radio-font-size)] font-medium leading-[130%] text-[var(--plan-selector-text)]">
                    {option.label}
                  </span>
                </span>
              );
            })}
          </div>
        ) : null}

        <div
          className={[
            'flex w-full flex-wrap items-start gap-[8px_6px]',
            selected ? 'text-[var(--plan-selector-active)]' : 'text-[var(--plan-selector-muted)]',
          ].join(' ')}
        >
          <p className="font-['Quicksand'] text-[length:var(--plan-selector-nutrition-font-size)] font-medium leading-[140%]">
            {plan.kcal} Kcal
          </p>

          <div className="gap-[6px]" />

          <p className="font-['Quicksand'] text-[length:var(--plan-selector-nutrition-font-size)] font-medium leading-[140%]">
            Proteins: {plan.proteins}g
          </p>

          <p className="font-['Quicksand'] text-[length:var(--plan-selector-nutrition-font-size)] font-medium leading-[140%]">
            Fats: {plan.fats}g
          </p>

          <p className="font-['Quicksand'] text-[length:var(--plan-selector-nutrition-font-size)] font-medium leading-[140%]">
            Carbs: {plan.carbs}g
          </p>
        </div>
      </div>
    </button>
  );
}

export function PlanSelectorBlock({
  selected,
  onSelect,
  lightMealOption = 'lunch-dinner',
  onLightMealOptionChange = () => {},
}: {
  selected: Plan;
  onSelect: (plan: Plan) => void;
  lightMealOption?: LightMealOption;
  onLightMealOptionChange?: (option: LightMealOption) => void;
}) {
  return (
    <div
      className="flex w-full flex-col items-start gap-[16px]"
      style={planSelectorBlockStyle}
    >
      <p className="w-full px-[4px] font-['Quicksand'] text-[length:var(--plan-selector-title-font-size)] font-bold leading-[130%] text-[var(--plan-selector-text)]">
        Choose your plan
      </p>

      <div className="flex w-full flex-col gap-[8px] md:gap-[12px]">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={selected === plan.id}
            lightMealOption={lightMealOption}
            onSelect={() => onSelect(plan.id)}
            onLightMealOptionChange={onLightMealOptionChange}
          />
        ))}
      </div>
    </div>
  );
}
