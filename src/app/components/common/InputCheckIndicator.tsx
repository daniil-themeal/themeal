import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FIELD_CLEAR_CIRCLE_SIZE_PX, FIELD_CLEAR_ICON_SIZE_PX } from './fieldSizeTokens';
import { CheckIcon } from './icons/feather/CheckIcon';

type InputCheckIndicatorProps = {
  className?: string;
  placement?: 'inline' | 'corner';
};

const inputCheckIndicatorStyle = {
  '--circular-check-size': `var(--field-clear-circle-size, ${FIELD_CLEAR_CIRCLE_SIZE_PX}px)`,
  '--circular-check-bg': `var(--field-clear-bg, ${COLOR_TOKENS.success[75]})`,
  '--circular-check-icon': `var(--field-clear-icon, ${COLOR_TOKENS.success[600]})`,
} as CSSProperties;

const inputCheckHitAreaClassName = [
  'w-[length:var(--field-icon-slot-width)]',
  'pr-[length:var(--field-clear-inset)]',
].join(' ');

const inlineCheckClassName = [
  'flex h-full shrink-0 items-center justify-end',
  inputCheckHitAreaClassName,
].join(' ');

const cornerCheckClassName = [
  'pointer-events-none absolute top-0 right-0 flex h-full shrink-0 items-start justify-end',
  inputCheckHitAreaClassName,
  'pt-[length:var(--field-clear-inset)]',
].join(' ');

export function InputCheckIndicator({
  className = '',
  placement = 'inline',
}: InputCheckIndicatorProps) {
  return (
    <span
      aria-hidden
      style={inputCheckIndicatorStyle}
      className={[
        placement === 'corner' ? cornerCheckClassName : inlineCheckClassName,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        className={[
          'flex size-[length:var(--circular-check-size)] items-center justify-center rounded-full',
          'bg-[var(--circular-check-bg)] text-[var(--circular-check-icon)]',
          `[&_svg]:size-[length:var(--field-clear-icon-size,${FIELD_CLEAR_ICON_SIZE_PX}px)]`,
        ].join(' ')}
      >
        <CheckIcon size={12} />
      </span>
    </span>
  );
}
