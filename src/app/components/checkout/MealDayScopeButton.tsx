import type { MouseEvent } from 'react';

import { Button, getButtonStyles } from '../common/Button';
import { COLOR_TOKENS } from '../common/colorTokens';

type MealDayScopeButtonProps = {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function MealDayScopeButton({
  label,
  selected,
  disabled = false,
  onClick,
}: MealDayScopeButtonProps) {
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
      style={
        selected
          ? {
              ...getButtonStyles('primary', true),
              '--button-bg': COLOR_TOKENS.primary[50],
              '--button-bg-hover': COLOR_TOKENS.primary[50],
            }
          : undefined
      }
    >
      {label}
    </Button>
  );
}
