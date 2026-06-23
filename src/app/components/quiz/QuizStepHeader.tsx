import type { ReactNode } from 'react';

type QuizStepHeaderProps = {
  title: string;
  subtitle?: string;
  step?: number | null;
  icon?: ReactNode;
};

export function QuizStepHeader({ title, subtitle, step, icon }: QuizStepHeaderProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      {step !== null && step !== undefined ? (
        <div className="flex flex-col gap-[8px]">
          <p className="font-sans text-[length:var(--quiz-caption-font-size)] font-semibold leading-[140%] text-[var(--quiz-muted)]">
            Step {step} of 7
          </p>
          <div className="h-[6px] w-full overflow-hidden rounded-full bg-[var(--quiz-progress-track)]">
            <div
              className="h-full rounded-full bg-[var(--quiz-progress-fill)] transition-[width] duration-200"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className="flex items-start gap-[12px]">
        {icon ? (
          <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[12px] bg-[var(--quiz-surface)] text-[var(--quiz-active)]">
            {icon}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <h2 className="font-sans text-[length:var(--quiz-title-font-size)] font-bold leading-[130%] text-[var(--quiz-text)]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-[4px] font-sans text-[length:var(--quiz-body-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
