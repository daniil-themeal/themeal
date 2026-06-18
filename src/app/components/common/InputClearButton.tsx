import { ClearIcon } from './icons/ClearIcon';
import { COLOR_TOKENS } from './colorTokens';

type InputClearButtonProps = {
  onClick: () => void;
  className?: string;
  'aria-label'?: string;
};

export function InputClearButton({
  onClick,
  className = '',
  'aria-label': ariaLabel = 'Clear',
}: InputClearButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      aria-label={ariaLabel}
      className={[
        'flex h-full w-[length:var(--field-icon-slot-width)] shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ color: COLOR_TOKENS.neutral[500] }}
    >
      <ClearIcon size={16} />
    </button>
  );
}
