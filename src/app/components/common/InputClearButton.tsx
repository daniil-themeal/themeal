import type { CSSProperties } from 'react';

import { CircularCloseButton } from './CircularCloseButton';
import { COLOR_TOKENS } from './colorTokens';
import { FIELD_CLEAR_CIRCLE_SIZE_PX, FIELD_CLEAR_ICON_SIZE_PX } from './fieldSizeTokens';

type InputClearButtonProps = {
  onClick: () => void;
  className?: string;
  'aria-label'?: string;
  placement?: 'inline' | 'corner';
};

const inputClearButtonStyle = {
  '--circular-close-size': `var(--field-clear-circle-size, ${FIELD_CLEAR_CIRCLE_SIZE_PX}px)`,
  '--circular-close-bg': `var(--field-clear-bg, ${COLOR_TOKENS.neutral[75]})`,
  '--circular-close-bg-hover': `var(--field-clear-bg-hover, ${COLOR_TOKENS.neutral[100]})`,
  '--circular-close-icon': `var(--field-clear-icon, ${COLOR_TOKENS.neutral[500]})`,
} as CSSProperties;

const inputClearIconClassName = [
  'text-[var(--circular-close-icon,var(--icon-color-inline))]',
  `size-[length:var(--field-clear-icon-size,${FIELD_CLEAR_ICON_SIZE_PX}px)]`,
  '[&>svg]:size-full',
].join(' ');

const inputClearHitAreaClassName = [
  'w-[length:var(--field-icon-slot-width)]',
  'pr-[length:var(--field-clear-inset)]',
].join(' ');

const inlineClearButtonClassName = [
  'flex h-full shrink-0 items-center justify-end',
  inputClearHitAreaClassName,
].join(' ');

const cornerClearButtonClassName = [
  'absolute top-0 right-0 flex h-full shrink-0 items-start justify-end',
  inputClearHitAreaClassName,
  'pt-[length:var(--field-clear-inset)]',
].join(' ');

export function InputClearButton({
  onClick,
  className = '',
  'aria-label': ariaLabel = 'Clear',
  placement = 'inline',
}: InputClearButtonProps) {
  return (
    <CircularCloseButton
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      tabIndex={-1}
      aria-label={ariaLabel}
      iconTone="inline"
      iconSize={12}
      iconClassName={inputClearIconClassName}
      style={inputClearButtonStyle}
      className={[
        placement === 'corner' ? cornerClearButtonClassName : inlineClearButtonClassName,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
