import type { ReactNode } from 'react';

import { isDevToolsEnabled } from '../../devToolsEnabled';
import { QUIZ_TOTAL_STEPS, type QuizStepId } from './quizTypes';

type QuizStepHeaderProps = {
  title: ReactNode;
  subtitle?: string;
  step?: number | null;
  onStepSelect?: (step: QuizStepId) => void;
  titleAlign?: 'start' | 'center';
  icon?: ReactNode;
  children?: ReactNode;
};

function QuizProgressSegments({
  step,
  totalSteps,
  onStepSelect,
}: {
  step: number;
  totalSteps: number;
  onStepSelect?: (step: QuizStepId) => void;
}) {
  const isDevStepSelect = isDevToolsEnabled && Boolean(onStepSelect);

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
        const segmentStep = (index + 1) as QuizStepId;
        const isFilled = segmentStep <= step;
        const segmentClassName = [
          'h-[6px] min-w-0 flex-1 rounded-full transition-colors duration-200',
          isFilled
            ? 'bg-[var(--quiz-progress-fill)]'
            : 'bg-[var(--quiz-progress-track)]',
          isDevStepSelect ? 'cursor-pointer hover:opacity-80' : '',
        ]
          .filter(Boolean)
          .join(' ');

        if (isDevStepSelect) {
          return (
            <button
              key={segmentStep}
              type="button"
              onClick={() => onStepSelect?.(segmentStep)}
              className={segmentClassName}
              aria-label={`Go to question ${segmentStep}`}
            />
          );
        }

        return <div key={segmentStep} className={segmentClassName} />;
      })}
    </div>
  );
}

export function QuizStepHeader({
  title,
  subtitle,
  step,
  onStepSelect,
  titleAlign = 'start',
  icon,
  children,
}: QuizStepHeaderProps) {
  const isTitleCentered = titleAlign === 'center';

  return (
    <div className="flex flex-col gap-[12px]">
      {step !== null && step !== undefined ? (
        <QuizProgressSegments
          step={step}
          totalSteps={QUIZ_TOTAL_STEPS}
          onStepSelect={onStepSelect}
        />
      ) : null}

      <div
        className={[
          'flex min-w-0 flex-col gap-[7px]',
          children ? 'mb-[16px]' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          className={[
            'flex items-center gap-[12px]',
            isTitleCentered ? 'justify-center' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <h2
            className={[
              'font-sans text-[length:var(--quiz-title-font-size)] font-bold leading-[130%] text-[var(--quiz-text)]',
              isTitleCentered
                ? 'w-full text-center'
                : 'min-w-0 flex-1 flex flex-wrap items-center gap-x-[4px] gap-y-[8px]',
            ].join(' ')}
          >
            {title}
          </h2>
          {!isTitleCentered && icon ? (
            <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[12px] bg-[var(--quiz-surface)] text-[var(--quiz-active)]">
              {icon}
            </span>
          ) : null}
        </div>
        {subtitle ? (
          <p
            className={[
              'font-sans text-[length:var(--quiz-body-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]',
              isTitleCentered ? 'text-center' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
