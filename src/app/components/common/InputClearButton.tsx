import type { CSSProperties } from 'react';

import { CircularCloseButton } from './CircularCloseButton';

type InputClearButtonProps = {
  onClick: () => void;
  className?: string;
  'aria-label'?: string;
  placement?: 'inline' | 'corner';
};

const inputClearButtonStyle = {
  '--circular-close-size': 'var(--field-clear-circle-size)',
} as CSSProperties;

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
      aria-label={ariaLabel}
      iconTone="inline"
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
