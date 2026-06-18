import type { CSSProperties } from 'react';

import type { Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';

const PLANS: { id: Plan; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'base', label: 'Base' },
  { id: 'plus', label: 'Plus' },
];

const LIGHT_OPTIONS: { id: LightMealOption; label: string }[] = [
  { id: 'breakfast-main', label: 'Breakfast + Main meal' },
  { id: 'lunch-dinner', label: 'Lunch + Dinner' },
];

type FullMenuDayPillCssVariables = CSSProperties & {
  '--full-menu-day-bg': string;
  '--full-menu-day-bg-hover': string;
};

const PILL_BASE_CLASS_NAME = [
  'flex shrink-0 cursor-pointer flex-col items-center justify-center gap-[4px]',
  'rounded-[8px] border border-solid bg-[var(--full-menu-day-bg)] px-[12px] py-[8px]',
  'transition-colors duration-150 hover:enabled:bg-[var(--full-menu-day-bg-hover)]',
].join(' ');

function getPillBorderClassName(selected: boolean) {
  return selected
    ? 'border-[var(--full-menu-day-border-selected)]'
    : 'border-transparent';
}

function PlanPill({
  selected,
  onClick,
  pillDefaultStyle,
  pillSelectedStyle,
  label,
  ariaLabel,
  compact = false,
}: {
  selected: boolean;
  onClick: () => void;
  pillDefaultStyle: FullMenuDayPillCssVariables;
  pillSelectedStyle: FullMenuDayPillCssVariables;
  label: string;
  ariaLabel: string;
  compact?: boolean;
}) {
  const textClassName = compact
    ? 'whitespace-nowrap font-sans text-[length:var(--full-menu-day-meta-font-size)] font-medium leading-none tracking-[-0.12px]'
    : 'whitespace-nowrap font-sans text-[length:var(--full-menu-day-date-font-size)] font-bold leading-none tracking-[-0.16px]';

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      aria-label={ariaLabel}
      onClick={onClick}
      className={[PILL_BASE_CLASS_NAME, getPillBorderClassName(selected)].join(' ')}
      style={selected ? pillSelectedStyle : pillDefaultStyle}
    >
      <p
        className={`${textClassName} ${
          selected ? 'text-[var(--full-menu-active)]' : 'text-[var(--full-menu-muted)]'
        }`}
      >
        {label}
      </p>
    </button>
  );
}

export function FullMenuPlanToggle({
  plan,
  lightMealOption,
  onPlanChange,
  onLightMealOptionChange,
  pillDefaultStyle,
  pillSelectedStyle,
}: {
  plan: Plan;
  lightMealOption: LightMealOption;
  onPlanChange: (plan: Plan) => void;
  onLightMealOptionChange: (option: LightMealOption) => void;
  pillDefaultStyle: FullMenuDayPillCssVariables;
  pillSelectedStyle: FullMenuDayPillCssVariables;
}) {
  return (
    <div
      role="tablist"
      aria-label="Plan"
      className="flex min-w-0 flex-1 items-center gap-[8px] overflow-x-auto scrollbar-hide"
    >
      {PLANS.map((item) => (
        <PlanPill
          key={item.id}
          selected={plan === item.id}
          onClick={() => onPlanChange(item.id)}
          pillDefaultStyle={pillDefaultStyle}
          pillSelectedStyle={pillSelectedStyle}
          label={item.label}
          ariaLabel={item.label}
        />
      ))}

      {plan === 'light' ? (
        <>
          <div
            className="h-[24px] w-px shrink-0 bg-[var(--full-menu-border)]"
            aria-hidden
          />

          {LIGHT_OPTIONS.map((option) => (
            <PlanPill
              key={option.id}
              selected={lightMealOption === option.id}
              onClick={() => onLightMealOptionChange(option.id)}
              pillDefaultStyle={pillDefaultStyle}
              pillSelectedStyle={pillSelectedStyle}
              label={option.label}
              ariaLabel={option.label}
              compact
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
