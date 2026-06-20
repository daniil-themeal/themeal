import type { CSSProperties, ReactNode } from 'react';

import type { Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';

const PLANS: { id: Plan; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'base', label: 'Base' },
  { id: 'plus', label: 'Plus' },
];

type LightOptionWord = {
  text: string;
  prefix?: '+' | ' ';
};

const LIGHT_OPTIONS: { id: LightMealOption; label: string; words: LightOptionWord[] }[] = [
  {
    id: 'breakfast-main',
    label: 'Breakfast + Main meal',
    words: [{ text: 'Breakfast' }, { text: 'Main meal', prefix: '+' }],
  },
  {
    id: 'lunch-dinner',
    label: 'Lunch + Dinner',
    words: [{ text: 'Lunch' }, { text: 'Dinner', prefix: '+' }],
  },
];

type FullMenuDayPillCssVariables = CSSProperties & {
  '--full-menu-day-bg': string;
  '--full-menu-day-bg-hover': string;
};

const PLAN_PILL_HIT_AREA_CLASS_NAME = [
  'group flex h-full min-w-0 flex-1 basis-0 items-center justify-center',
  'border-0 bg-transparent p-0',
].join(' ');

const PLAN_PILL_CLASS_NAME = [
  'flex min-w-0 flex-col items-center justify-center gap-[4px]',
  'rounded-[8px] border border-solid bg-[var(--full-menu-day-bg)] px-[12px] py-[6px]',
  'transition-colors duration-150',
].join(' ');

const LIGHT_PILL_HIT_AREA_CLASS_NAME = [
  'group flex h-full shrink-0 items-center justify-center',
  'border-0 bg-transparent p-0',
].join(' ');

const LIGHT_PILL_CLASS_NAME = [
  'grid min-w-0 place-items-center max-w-[length:var(--full-menu-light-option-max-width)]',
  'rounded-[8px] border border-solid bg-[var(--full-menu-day-bg)] px-[length:var(--full-menu-light-option-padding-x)] py-[4px]',
  'transition-colors duration-150',
].join(' ');

const PLAN_PILL_TEXT_CLASS_NAME =
  'whitespace-nowrap text-center font-sans text-[length:var(--full-menu-day-date-font-size)] font-bold leading-[130%] tracking-[-0.16px]';

const LIGHT_OPTION_ROW_CLASS_NAME = [
  '[text-box-trim:none] [text-box-edge:auto]',
  'flex min-w-0 w-full max-w-full items-center justify-center gap-[length:var(--full-menu-light-option-text-gap)]',
  'text-center font-sans text-[length:var(--full-menu-light-option-font-size)] font-medium leading-[120%] tracking-[-0.1px]',
].join(' ');

const LIGHT_OPTION_SEGMENT_CLASS_NAME = 'min-w-0 shrink truncate';

const LIGHT_OPTION_SEPARATOR_CLASS_NAME = 'shrink-0';

function getPillBorderClassName(selected: boolean) {
  return selected
    ? 'border-[var(--full-menu-day-border-selected)]'
    : 'border-transparent';
}

function getPillHoverClassName(selected: boolean) {
  return selected
    ? ''
    : 'group-hover:bg-[var(--full-menu-day-bg-hover)] group-focus-visible:bg-[var(--full-menu-day-bg-hover)]';
}

function getPillCursorClassName(selected: boolean) {
  return selected ? 'cursor-default' : 'cursor-pointer';
}

function LightOptionLabel({
  words,
  textColorClassName,
}: {
  words: readonly LightOptionWord[];
  textColorClassName: string;
}) {
  return (
    <span className={[LIGHT_OPTION_ROW_CLASS_NAME, textColorClassName].join(' ')}>
      {words.map((word, index) => (
        <span key={`${word.text}-${index}`} className="contents">
          {word.prefix ? (
            <span className={LIGHT_OPTION_SEPARATOR_CLASS_NAME} aria-hidden>
              {word.prefix}
            </span>
          ) : null}
          <span className={LIGHT_OPTION_SEGMENT_CLASS_NAME}>{word.text}</span>
        </span>
      ))}
    </span>
  );
}

function PlanPill({
  selected,
  onClick,
  pillDefaultStyle,
  pillSelectedStyle,
  label,
  lightOptionWords,
  ariaLabel,
  variant = 'plan',
  className = '',
  pillClassName = PLAN_PILL_CLASS_NAME,
  isLayoutHidden = false,
}: {
  selected: boolean;
  onClick: () => void;
  pillDefaultStyle: FullMenuDayPillCssVariables;
  pillSelectedStyle: FullMenuDayPillCssVariables;
  label: string;
  lightOptionWords?: readonly LightOptionWord[];
  ariaLabel: string;
  variant?: 'plan' | 'lightOption';
  className?: string;
  pillClassName?: string;
  isLayoutHidden?: boolean;
}) {
  const isLightOption = variant === 'lightOption';
  const hitAreaClassName = isLightOption
    ? LIGHT_PILL_HIT_AREA_CLASS_NAME
    : PLAN_PILL_HIT_AREA_CLASS_NAME;
  const visualClassName = isLightOption ? LIGHT_PILL_CLASS_NAME : pillClassName;

  const textColorClassName = selected
    ? 'text-[var(--full-menu-active)]'
    : 'text-[var(--full-menu-muted)]';

  const labelContent: ReactNode =
    isLightOption && lightOptionWords ? (
      <LightOptionLabel words={lightOptionWords} textColorClassName={textColorClassName} />
    ) : (
      <p className={[PLAN_PILL_TEXT_CLASS_NAME, textColorClassName].join(' ')}>{label}</p>
    );

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      aria-label={ariaLabel}
      aria-hidden={isLayoutHidden || undefined}
      tabIndex={isLayoutHidden ? -1 : undefined}
      onClick={onClick}
      className={[hitAreaClassName, getPillCursorClassName(selected), className].filter(Boolean).join(' ')}
    >
      <span
        className={[
          visualClassName,
          getPillBorderClassName(selected),
          getPillHoverClassName(selected),
        ]
          .filter(Boolean)
          .join(' ')}
        style={selected ? pillSelectedStyle : pillDefaultStyle}
      >
        {labelContent}
      </span>
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
  const isLightPlan = plan === 'light';
  const hiddenLightControlsClassName = isLightPlan ? '' : 'invisible pointer-events-none';

  return (
    <div className="relative flex h-full w-full min-w-0 items-center">
      <div
        role="tablist"
        aria-label="Plan"
        className="flex h-full shrink-0 items-stretch gap-[8px] overflow-visible"
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
            variant="plan"
          />
        ))}
      </div>

      <div
        className={[
          'flex h-full items-stretch ml-[length:var(--full-menu-plan-light-divider-gap)] gap-[length:var(--full-menu-plan-light-divider-gap)]',
          hiddenLightControlsClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          className="h-[24px] w-px shrink-0 self-center bg-[var(--full-menu-border)]"
          aria-hidden
        />

        <div className="flex h-full items-stretch gap-[length:var(--full-menu-light-option-gap)]">
          {LIGHT_OPTIONS.map((option) => (
            <PlanPill
              key={option.id}
              selected={lightMealOption === option.id}
              onClick={() => onLightMealOptionChange(option.id)}
              pillDefaultStyle={pillDefaultStyle}
              pillSelectedStyle={pillSelectedStyle}
              label={option.label}
              lightOptionWords={option.words}
              ariaLabel={option.label}
              variant="lightOption"
              isLayoutHidden={!isLightPlan}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
