import { memo } from 'react';
import type { CSSProperties } from 'react';

import type { Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';
import { Badge } from '../common/Badge';
import type { BadgeVariant } from '../common/Badge';
import { Chip } from '../common/Chip';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { TextLink } from '../common/TextLink';
import { CHECKOUT_FONT_CLAMP_16_20 } from './checkoutSpacing';
import { CheckoutSectionHeader } from './CheckoutSectionHeader';

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
  '--plan-selector-card-title-font-size': string;
  '--plan-selector-card-meta-font-size': string;
  '--plan-selector-card-meta-font-size-md': string;
  '--plan-selector-radio-font-size': string;
  '--plan-selector-nutrition-font-size': string;
  '--plan-selector-text': string;
  '--plan-selector-muted': string;
  '--plan-selector-active': string;
  '--plan-selector-card-bg': string;
  '--plan-selector-card-selected-bg': string;
  '--plan-selector-card-selected-border': string;
  '--plan-selector-card-hover-border': string;
  '--plan-selector-radio-bg': string;
  '--plan-selector-radio-selected-bg': string;
  '--plan-selector-radio-hover-bg': string;
  '--plan-selector-radio-dot': string;
  '--plan-selector-option-hover-text': string;
};

const planSelectorBlockStyle: PlanSelectorBlockCssVariables = {
  '--plan-selector-card-title-font-size': CHECKOUT_FONT_CLAMP_16_20,
  '--plan-selector-card-meta-font-size': FONT_SIZE_TOKENS[12],
  '--plan-selector-card-meta-font-size-md': FONT_SIZE_TOKENS[14],
  '--plan-selector-radio-font-size': FONT_SIZE_TOKENS[12],
  '--plan-selector-nutrition-font-size': FONT_SIZE_TOKENS[12],
  '--plan-selector-text': COLOR_TOKENS.neutral[900],
  '--plan-selector-muted': COLOR_TOKENS.neutral[500],
  '--plan-selector-active': COLOR_TOKENS.primary[500],
  '--plan-selector-card-bg': COLOR_TOKENS.base.white,
  '--plan-selector-card-selected-bg': COLOR_TOKENS.primary[50],
  '--plan-selector-card-selected-border': COLOR_TOKENS.primary[200],
  '--plan-selector-card-hover-border': COLOR_TOKENS.primary[200],
  '--plan-selector-radio-bg': COLOR_TOKENS.neutral[50],
  '--plan-selector-radio-selected-bg': COLOR_TOKENS.primary[100],
  '--plan-selector-radio-hover-bg': COLOR_TOKENS.primary[75],
  '--plan-selector-radio-dot': COLOR_TOKENS.primary[500],
  '--plan-selector-option-hover-text': COLOR_TOKENS.primary[500],
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
        !selected && 'hover:border-[var(--plan-selector-card-hover-border)]',
        selected
          ? 'border-[var(--plan-selector-card-selected-border)] bg-[var(--plan-selector-card-selected-bg)]'
          : 'border-transparent bg-[var(--plan-selector-card-bg)]',
      ].join(' ')}
    >
      {plan.badge ? (
        <Badge variant={plan.badge} className="absolute right-[var(--checkout-selector-card-padding)] top-[-4px] z-[1]" />
      ) : null}

      <div className="flex flex-col items-start gap-[12px] p-[var(--checkout-selector-card-padding)]">
        <div className="flex w-full min-w-0 flex-wrap items-baseline justify-between gap-x-[16px] gap-y-[8px]">
          <div className="flex min-w-0 items-center gap-[4px]">
            <p
              className={[
                "font-sans text-[length:var(--plan-selector-card-title-font-size)] font-bold leading-[130%]",
                selected ? 'text-[var(--plan-selector-active)]' : 'text-[var(--plan-selector-text)]',
              ].join(' ')}
            >
              {plan.name}
            </p>

            <p
              className={[
                "whitespace-nowrap font-sans text-[length:var(--plan-selector-card-title-font-size)] font-medium leading-[130%]",
                selected ? 'text-[var(--plan-selector-active)]' : 'text-[var(--plan-selector-text)]',
              ].join(' ')}
            >
              {plan.meals}
            </p>
          </div>

          <div className="flex shrink-0 items-baseline gap-[4px] text-left text-[var(--plan-selector-active)]">
            <p className="font-sans text-[length:var(--plan-selector-card-meta-font-size)] font-medium leading-[130%] md:text-[length:var(--plan-selector-card-meta-font-size-md)]">
              from
            </p>

            <p className="whitespace-nowrap text-left font-sans text-[length:var(--plan-selector-card-title-font-size)] font-bold leading-[130%]">
              {plan.pricePerDay}/day
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-[4px] text-center">
          {visibleChips.map((chip) => (
            <Chip key={chip} variant={selected ? 'selected' : 'default'}>
              {chip}
            </Chip>
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
                  role="radio"
                  aria-checked={optionSelected}
                  tabIndex={0}
                  className={[
                    'group flex cursor-pointer items-center gap-[6px] rounded-[8px] px-[8px] -mx-[8px] py-[4px]',
                    'transition-[color,transform] duration-150 will-change-transform',
                    !optionSelected && 'hover:-translate-y-[2px]',
                    'focus-visible:-translate-y-[2px]',
                    'active:translate-y-0',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--plan-selector-active)] focus-visible:ring-offset-2',
                  ].join(' ')}
                  onClick={(event) => {
                    event.stopPropagation();
                    onLightMealOptionChange(option.id);

                    if (!selected) {
                      onSelect();
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      event.stopPropagation();
                      onLightMealOptionChange(option.id);

                      if (!selected) {
                        onSelect();
                      }
                    }
                  }}
                >
                  <span
                    className={[
                      'flex size-[16px] items-center justify-center rounded-full transition-colors duration-150',
                      radioActiveBackground
                        ? 'bg-[var(--plan-selector-radio-selected-bg)]'
                        : 'bg-[var(--plan-selector-radio-bg)] group-hover:bg-[var(--plan-selector-radio-hover-bg)] group-focus-visible:bg-[var(--plan-selector-radio-hover-bg)]',
                    ].join(' ')}
                  >
                    {optionSelected ? (
                      <span className="size-[8px] rounded-full bg-[var(--plan-selector-radio-dot)]" />
                    ) : null}
                  </span>

                  <span
                    className={[
                      'font-sans text-[length:var(--plan-selector-radio-font-size)] font-medium leading-[130%] transition-colors duration-150',
                      optionSelected
                        ? 'text-[var(--plan-selector-text)]'
                        : 'text-[var(--plan-selector-text)] group-hover:text-[var(--plan-selector-option-hover-text)] group-focus-visible:text-[var(--plan-selector-option-hover-text)]',
                    ].join(' ')}
                  >
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
          <p className="font-sans text-[length:var(--plan-selector-nutrition-font-size)] font-medium leading-[140%]">
            ≈ {plan.kcal} Kcal
          </p>

          <div className="gap-[6px]" />

          <p className="font-sans text-[length:var(--plan-selector-nutrition-font-size)] font-medium leading-[140%]">
            Proteins: {plan.proteins}g
          </p>

          <p className="font-sans text-[length:var(--plan-selector-nutrition-font-size)] font-medium leading-[140%]">
            Fats: {plan.fats}g
          </p>

          <p className="font-sans text-[length:var(--plan-selector-nutrition-font-size)] font-medium leading-[140%]">
            Carbs: {plan.carbs}g
          </p>
        </div>
      </div>
    </button>
  );
}

export const PlanSelectorBlock = memo(function PlanSelectorBlock({
  selected,
  onSelect,
  lightMealOption = 'lunch-dinner',
  onLightMealOptionChange = () => {},
  onBackToTrial,
}: {
  selected: Plan;
  onSelect: (plan: Plan) => void;
  lightMealOption?: LightMealOption;
  onLightMealOptionChange?: (option: LightMealOption) => void;
  onBackToTrial?: () => void;
}) {
  return (
    <div
      className="flex w-full min-w-0 flex-col items-start gap-[20px]"
      style={planSelectorBlockStyle}
    >
      <CheckoutSectionHeader
        title="Choose your plan"
        trailing={
          onBackToTrial ? (
            <TextLink size="14" onClick={onBackToTrial}>
              Back to trial
            </TextLink>
          ) : undefined
        }
      />

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
});
