import { Slider } from '../ui/slider';
import { QUIZ_SLIDER_CLASSNAME } from './quizTokens';

type QuizValueSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (value: number) => void;
};

export function QuizValueSlider({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: QuizValueSliderProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-baseline justify-between gap-[8px]">
        <p className="font-sans text-[length:var(--quiz-body-font-size)] font-semibold leading-[140%] text-[var(--quiz-text)]">
          {label}
        </p>
        <p className="shrink-0 font-sans text-[length:var(--quiz-body-font-size)] font-bold leading-[140%] text-[var(--quiz-active)]">
          {value}
          {unit ? ` ${unit}` : ''}
        </p>
      </div>
      <Slider
        min={min}
        max={max}
        step={1}
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? min)}
        className={QUIZ_SLIDER_CLASSNAME}
      />
    </div>
  );
}
