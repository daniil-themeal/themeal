import { Slider } from '../ui/slider';
import { QUIZ_SLIDER_CLASSNAME } from './quizTokens';

type QuizValueSliderProps = {
  label: string;
  caption?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export function QuizValueSlider({
  label,
  caption,
  value,
  min,
  max,
  onChange,
}: QuizValueSliderProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      {caption ? (
        <p className="text-center font-sans text-[length:var(--quiz-caption-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
          {caption}
        </p>
      ) : null}
      <p className="text-center font-sans text-[20px] font-bold leading-[130%] text-[var(--quiz-text)]">
        {label}
      </p>
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
