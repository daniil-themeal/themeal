import { Slider } from '../ui/slider';

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
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-foreground text-sm font-semibold">{label}</p>
        <p className="text-foreground shrink-0 text-sm font-bold">
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
        className="py-2"
      />
    </div>
  );
}
