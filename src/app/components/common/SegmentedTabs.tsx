import { COLOR_TOKENS } from './colorTokens';
import './SegmentedTabs.css';

export type SegmentedTabOption<T extends string> = {
  value: T;
  label: string;
};

type SegmentedTabsProps<T extends string> = {
  options: SegmentedTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  'aria-label'?: string;
};

export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  className = '',
  'aria-label': ariaLabel,
}: SegmentedTabsProps<T>) {
  return (
    <div
      className={['inline-flex h-[40px] w-[239px] max-w-full rounded-[8px]', className]
        .filter(Boolean)
        .join(' ')}
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={[
              'segmented-tabs__tab flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden rounded-[8px] px-[4px] py-[16px]',
              'font-sans text-[14px] font-bold leading-[130%] transition-colors',
              active
                ? 'border border-solid'
                : 'border border-transparent',
            ].join(' ')}
            style={
              active
                ? {
                    backgroundColor: COLOR_TOKENS.primary[50],
                    borderColor: COLOR_TOKENS.primary[500],
                    color: COLOR_TOKENS.primary[500],
                  }
                : undefined
            }
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
