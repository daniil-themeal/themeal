import { cn } from '../ui/utils';

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
      className={cn(
        'border-input bg-card text-card-foreground min-h-[52px] w-full rounded-xl border px-4 py-3 text-left text-base font-semibold transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        selected && 'border-primary bg-primary/5 ring-primary ring-2 ring-offset-2',
      )}
    >
      {label}
    </button>
  );
}
