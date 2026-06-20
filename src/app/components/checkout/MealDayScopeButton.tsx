import type { MouseEvent } from 'react';

import { Button, getButtonStyles } from '../common/Button';
import { CheckIcon, PlusIcon, XIcon } from '../common/icons';
import { COLOR_TOKENS } from '../common/colorTokens';

type MealDayScopeButtonProps = {
  dayShort?: string;
  /** Static label for legacy +1/+2 remove popover buttons. */
  label?: string;
  selected: boolean;
  disabled?: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

function SelectedDayIcon() {
  return (
    <span className="relative inline-flex size-[16px] shrink-0 items-center justify-center">
      <CheckIcon size={16} className="text-[var(--button-text)] group-hover:invisible" />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <XIcon size={16} className="text-[var(--button-text)]" />
      </span>
    </span>
  );
}

export function MealDayScopeButton({
  dayShort,
  label,
  selected,
  disabled = false,
  onClick,
}: MealDayScopeButtonProps) {
  const isDayToggle = dayShort != null && label == null;

  const leftIcon = isDayToggle
    ? selected
      ? <SelectedDayIcon />
      : <PlusIcon size={16} className="text-[var(--button-text)]" />
    : undefined;

  const content = label ?? dayShort;

  return (
    <Button
      type="button"
      variant={selected ? 'primary' : 'neutral'}
      outline
      size="small"
      fullWidth
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
      className="group"
      leftIcon={leftIcon}
      style={
        selected
          ? {
              ...getButtonStyles('primary', true),
              '--button-bg': COLOR_TOKENS.primary[50],
              '--button-bg-hover': COLOR_TOKENS.primary[75],
              '--button-border-hover': COLOR_TOKENS.primary[600],
            }
          : undefined
      }
    >
      {content}
    </Button>
  );
}
