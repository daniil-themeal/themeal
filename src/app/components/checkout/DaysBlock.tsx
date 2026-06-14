import type { CSSProperties } from 'react';

import type { DayOption } from '../../data/checkoutPricing';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { CheckoutSectionHeader } from './CheckoutSectionHeader';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const deliveryDays: Record<DayOption, number> = {
  weekdays: 5,
  'weekdays+sat': 6,
  full: 7,
};

const options: { id: DayOption; label: string }[] = [
  { id: 'weekdays', label: 'Weekdays' },
  { id: 'weekdays+sat', label: 'Weekdays + Sat' },
  { id: 'full', label: 'Full week' },
];

type DaysBlockCssVariables = CSSProperties & {
  '--days-card-title-font-size': string;
  '--days-card-title-font-size-md': string;
  '--days-chip-font-size': string;
  '--days-text': string;
  '--days-card-bg': string;
  '--days-card-selected-bg': string;
  '--days-card-selected-border': string;
  '--days-card-selected-text': string;
  '--days-delivery-chip-bg': string;
  '--days-delivery-chip-text': string;
  '--days-delivery-chip-selected-bg': string;
  '--days-delivery-chip-selected-text': string;
  '--days-idle-chip-bg': string;
  '--days-idle-chip-text': string;
  '--days-idle-chip-selected-bg': string;
  '--days-idle-chip-selected-text': string;
};

const daysBlockStyle: DaysBlockCssVariables = {
  '--days-card-title-font-size': FONT_SIZE_TOKENS[16],
  '--days-card-title-font-size-md': FONT_SIZE_TOKENS[20],
  '--days-chip-font-size': FONT_SIZE_TOKENS[12],
  '--days-text': COLOR_TOKENS.neutral[900],
  '--days-card-bg': COLOR_TOKENS.base.white,
  '--days-card-selected-bg': COLOR_TOKENS.primary[50],
  '--days-card-selected-border': COLOR_TOKENS.primary[200],
  '--days-card-selected-text': COLOR_TOKENS.primary[500],
  '--days-delivery-chip-bg': COLOR_TOKENS.primary[50],
  '--days-delivery-chip-text': COLOR_TOKENS.primary[500],
  '--days-delivery-chip-selected-bg': COLOR_TOKENS.primary[100],
  '--days-delivery-chip-selected-text': COLOR_TOKENS.primary[700],
  '--days-idle-chip-bg': COLOR_TOKENS.neutral[50],
  '--days-idle-chip-text': COLOR_TOKENS.neutral[500],
  '--days-idle-chip-selected-bg': COLOR_TOKENS.primary[75],
  '--days-idle-chip-selected-text': COLOR_TOKENS.primary[400],
};

function DayChip({
  label,
  isDelivery,
  cardSelected,
}: {
  label: string;
  isDelivery: boolean;
  cardSelected: boolean;
}) {
  const chipClassName = cardSelected
    ? isDelivery
      ? 'bg-[var(--days-delivery-chip-selected-bg)] text-[var(--days-delivery-chip-selected-text)]'
      : 'bg-[var(--days-idle-chip-selected-bg)] text-[var(--days-idle-chip-selected-text)]'
    : isDelivery
      ? 'bg-[var(--days-delivery-chip-bg)] text-[var(--days-delivery-chip-text)]'
      : 'bg-[var(--days-idle-chip-bg)] text-[var(--days-idle-chip-text)]';

  return (
    <div
      className={[
        'flex w-[32px] items-center justify-center rounded-full px-[2px] py-[4px]',
        chipClassName,
      ].join(' ')}
    >
      <p className="text-center font-sans text-[length:var(--days-chip-font-size)] font-medium leading-[130%]">
        {label}
      </p>
    </div>
  );
}

function DayCard({
  option,
  selected,
  onSelect,
}: {
  option: (typeof options)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  const { id, label } = option;
  const numDelivery = deliveryDays[id];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'w-full cursor-pointer rounded-[16px] border border-solid text-left transition-colors duration-150',
        selected
          ? 'border-[var(--days-card-selected-border)] bg-[var(--days-card-selected-bg)]'
          : 'border-transparent bg-[var(--days-card-bg)]',
      ].join(' ')}
    >
      <div className="flex flex-col items-start gap-[12px] p-[20px] md:px-[24px]">
        <p
          className={[
            'w-full font-sans text-[length:var(--days-card-title-font-size)] font-bold leading-[130%] md:text-[length:var(--days-card-title-font-size-md)]',
            selected ? 'text-[var(--days-card-selected-text)]' : 'text-[var(--days-text)]',
          ].join(' ')}
        >
          {label}
        </p>

        <div className="flex w-full flex-wrap items-start gap-[4px]">
          {DAY_LABELS.map((day, i) => (
            <DayChip
              key={day}
              label={day}
              isDelivery={i < numDelivery}
              cardSelected={selected}
            />
          ))}
        </div>
      </div>
    </button>
  );
}

export function DaysBlock({
  selected,
  onSelect,
}: {
  selected: DayOption;
  onSelect: (d: DayOption) => void;
}) {
  return (
    <div
      className="flex w-full flex-col items-start gap-[16px]"
      style={daysBlockStyle}
    >
      <CheckoutSectionHeader
        title="Which days do you eat with us?"
        subtitle="Pick the days you want meals ready. Custom days cost the same per day."
        gap={2}
      />

      <div className="flex w-full flex-col gap-[8px] md:gap-[12px]">
        {options.map((opt) => (
          <DayCard
            key={opt.id}
            option={opt}
            selected={selected === opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}