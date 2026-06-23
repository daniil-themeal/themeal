import { RadioCheckIcon } from '../common/icons/RadioCheckIcon';

type QuizCardOptionProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export function QuizCardOption({ label, selected, onSelect }: QuizCardOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        'w-full cursor-pointer rounded-[16px] border border-solid text-left transition-colors duration-150',
        !selected && 'hover:border-[var(--quiz-card-hover-border)]',
        selected
          ? 'border-[var(--quiz-card-selected-border)] bg-[var(--quiz-card-selected-bg)]'
          : 'border-[var(--quiz-border)] bg-[var(--quiz-card-bg)]',
      ].join(' ')}
    >
      <span className="flex w-full items-center justify-between gap-[12px] p-[var(--quiz-card-padding)]">
        <span
          className={[
            'min-w-0 flex-1 font-sans text-[length:var(--quiz-option-font-size)] font-bold leading-[130%]',
            selected ? 'text-[var(--quiz-active)]' : 'text-[var(--quiz-text)]',
          ].join(' ')}
        >
          {label}
        </span>
        <span
          className={[
            'shrink-0 transition-opacity',
            selected ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        >
          <RadioCheckIcon size={20} className="text-[var(--quiz-active)]" />
        </span>
      </span>
    </button>
  );
}
