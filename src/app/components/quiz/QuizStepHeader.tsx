import type { ReactNode } from 'react';

import { Progress } from '../ui/progress';

type QuizStepHeaderProps = {
  title: string;
  subtitle?: string;
  step?: number | null;
  icon?: ReactNode;
};

export function QuizStepHeader({ title, subtitle, step, icon }: QuizStepHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      {step !== null && step !== undefined ? (
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs font-medium">Step {step} of 7</p>
          <Progress value={(step / 7) * 100} className="h-1.5" />
        </div>
      ) : null}

      <div className="flex items-start gap-3">
        {icon ? (
          <span className="bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
            {icon}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <h2 className="text-foreground text-lg font-bold leading-snug sm:text-xl">{title}</h2>
          {subtitle ? (
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
