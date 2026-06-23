import type { ReactNode } from 'react';

import { QUIZ_TOTAL_STEPS } from './quizTypes';

type QuizStepHeaderProps = {
  title: ReactNode;
  subtitle?: string;
  step?: number | null;
  icon?: ReactNode;
  children?: ReactNode;
};

function QuizProgressSegments({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div
      className="mb-[24px] flex w-full gap-[4px]"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuenow={step}
      aria-label={`Question ${step} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const segmentStep = index + 1;
        const isFilled = segmentStep <= step;

        return (
          <div
            key={segmentStep}
            className={[
              'h-[6px] min-w-0 flex-1 rounded-full transition-colors duration-200',
              isFilled
                ? 'bg-[var(--quiz-progress-fill)]'
                : 'bg-[var(--quiz-progress-track)]',
            ].join(' ')}
          />
        );
      })}
    </div>
  );
}

export function QuizStepHeader({ title, subtitle, step, icon, children }: QuizStepHeaderProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      {step !== null && step !== undefined ? (
        <QuizProgressSegments step={step} totalSteps={QUIZ_TOTAL_STEPS} />
      ) : null}

      <div
        className={[
          'flex min-w-0 flex-col gap-[16px]',
          children ? 'mb-[16px]' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex items-start gap-[12px]">
          <h2 className="min-w-0 flex-1 flex flex-wrap items-center gap-x-[4px] gap-y-[8px] pt-[4px] font-sans text-[length:var(--quiz-title-font-size)] font-bold leading-[130%] text-[var(--quiz-text)]">
            {title}
          </h2>
          {icon ? (
            <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[12px] bg-[var(--quiz-surface)] text-[var(--quiz-active)]">
              {icon}
            </span>
          ) : null}
        </div>
        {subtitle ? (
          <p className="font-sans text-[length:var(--quiz-body-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
