import type { CSSProperties, ReactNode } from 'react';

import { Button } from './Button';
import { Chip } from './Chip';
import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_CLAMP_16_20 } from './fontSizeClampTokens';
import { TEXT_TRIM_FIT_CLASS_NAME } from './textTrimTokens';

type PlanTariffSummaryCssVariables = CSSProperties & {
  '--plan-tariff-title-fs': string;
  '--plan-tariff-title-color': string;
};

const planTariffSummaryStyle: PlanTariffSummaryCssVariables = {
  '--plan-tariff-title-fs': FONT_SIZE_CLAMP_16_20,
  '--plan-tariff-title-color': COLOR_TOKENS.neutral[900],
};

type PlanTariffSummaryProps = {
  title: ReactNode;
  chips: string[];
  actionLabel?: ReactNode;
  onAction?: () => void;
  className?: string;
};

export function PlanTariffSummary({
  title,
  chips,
  actionLabel,
  onAction,
  className = '',
}: PlanTariffSummaryProps) {
  const hasAction = Boolean(actionLabel && onAction);

  const content = (
    <div className="flex min-w-0 flex-1 flex-col gap-[16px]">
      <p
        className={[
          TEXT_TRIM_FIT_CLASS_NAME,
          'w-full font-sans text-[length:var(--plan-tariff-title-fs)] font-bold leading-[130%] text-[var(--plan-tariff-title-color)]',
        ].join(' ')}
      >
        {title}
      </p>

      <div className="flex w-full flex-wrap gap-[6px]">
        {chips.map((chip) => (
          <Chip key={chip}>{chip}</Chip>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={[
        'flex h-fit w-full',
        hasAction ? 'items-start justify-between gap-[12px]' : 'flex-col gap-[12px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={planTariffSummaryStyle}
    >
      {content}

      {hasAction ? (
        <Button
          type="button"
          variant="neutral"
          outline
          size="x-small"
          onClick={onAction}
          className="shrink-0"
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
