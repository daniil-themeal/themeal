import type { CSSProperties } from 'react';

import type { Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';

const PLANS: { id: Plan; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'base', label: 'Base' },
  { id: 'plus', label: 'Plus' },
];

const LIGHT_OPTIONS: {
  id: LightMealOption;
  title: string;
  subtitle: string;
}[] = [
  { id: 'breakfast-main', title: 'Breakfast', subtitle: '+ Main meal' },
  { id: 'lunch-dinner', title: 'Lunch', subtitle: '+ Dinner' },
];

type FullMenuDayPillCssVariables = CSSProperties & {
  '--full-menu-day-bg': string;
  '--full-menu-day-bg-hover': string;
};

const PILL_CLASS_NAME = [
  'flex shrink-0 cursor-pointer flex-col items-center justify-center gap-[4px]',
  'rounded-[8px] bg-[var(--full-menu-day-bg)] px-[12px] py-[8px]',
  'transition-colors hover:enabled:bg-[var(--full-menu-day-bg-hover)]',
].join(' ');

function PlanPill({
  selected,
  onClick,
  pillDefaultStyle,
  pillSelectedStyle,
  label,
  ariaLabel,
}: {
  selected: boolean;
  onClick: () => void;
  pillDefaultStyle: FullMenuDayPillCssVariables;
  pillSelectedStyle: FullMenuDayPillCssVariables;
  label: string;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      aria-label={ariaLabel}
      onClick={onClick}
      className={PILL_CLASS_NAME}
      style={selected ? pillSelectedStyle : pillDefaultStyle}
    >
      <p
        className={`whitespace-nowrap font-sans text-[length:var(--full-menu-day-date-font-size)] font-bold leading-none tracking-[-0.16px] ${
          selected ? 'text-[var(--full-menu-title)]' : 'text-[var(--full-menu-muted)]'
        }`}
      >
        {label}
      </p>
    </button>
  );
}

function LightOptionPill({
  selected,
  onClick,
  pillDefaultStyle,
  pillSelectedStyle,
  title,
  subtitle,
}: {
  selected: boolean;
  onClick: () => void;
  pillDefaultStyle: FullMenuDayPillCssVariables;
  pillSelectedStyle: FullMenuDayPillCssVariables;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      aria-label={`${title} ${subtitle}`}
      onClick={onClick}
      className={PILL_CLASS_NAME}
      style={selected ? pillSelectedStyle : pillDefaultStyle}
    >
      <p
        className={`whitespace-nowrap font-sans text-[length:var(--full-menu-day-date-font-size)] font-bold leading-none tracking-[-0.16px] ${
          selected ? 'text-[var(--full-menu-title)]' : 'text-[var(--full-menu-muted)]'
        }`}
      >
        {title}
      </p>

      <p
        className={`whitespace-nowrap font-sans text-[length:var(--full-menu-day-meta-font-size)] font-medium leading-none tracking-[-0.12px] ${
          selected ? 'text-[var(--full-menu-title)]' : 'text-[var(--full-menu-muted)]'
        }`}
      >
        {subtitle}
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
            <LightOptionPill
              key={option.id}
              selected={lightMealOption === option.id}
              onClick={() => onLightMealOptionChange(option.id)}
              pillDefaultStyle={pillDefaultStyle}
              pillSelectedStyle={pillSelectedStyle}
              title={option.title}
              subtitle={option.subtitle}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
