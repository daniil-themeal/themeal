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
      className={[
        'w-full cursor-pointer rounded-[16px] border border-solid text-left transition-colors duration-150',
        !selected && 'hover:border-[var(--quiz-card-hover-border)]',
        selected
          ? 'border-[var(--quiz-card-selected-border)] bg-[var(--quiz-card-selected-bg)]'
          : 'border-transparent bg-[var(--quiz-card-bg)]',
      ].join(' ')}
    >
      <span
        className={[
          'block p-[var(--quiz-card-padding)] font-sans text-[length:var(--quiz-option-font-size)] font-bold leading-[130%]',
          selected ? 'text-[var(--quiz-active)]' : 'text-[var(--quiz-text)]',
        ].join(' ')}
      >
        {label}
      </span>
    </button>
  );
}
