import type { CSSProperties, ReactNode } from 'react';

import { Button } from './Button';
import { Chip } from './Chip';
import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { TEXT_TRIM_FIT_CLASS_NAME } from './textTrimTokens';

type PlanTariffSummaryCssVariables = CSSProperties & {
  '--plan-tariff-title-fs': string;
  '--plan-tariff-title-fs-md': string;
  '--plan-tariff-title-color': string;
};

const planTariffSummaryStyle: PlanTariffSummaryCssVariables = {
  '--plan-tariff-title-fs': FONT_SIZE_TOKENS[16],
  '--plan-tariff-title-fs-md': FONT_SIZE_TOKENS[20],
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
  return (
    <div
      className={['flex h-fit flex-col gap-[12px]', className].filter(Boolean).join(' ')}
      style={planTariffSummaryStyle}
    >
      <div className="flex h-fit items-center justify-between gap-[12px]">
        <p
          className={[
            TEXT_TRIM_FIT_CLASS_NAME,
            'min-w-0 w-full font-sans text-[length:var(--plan-tariff-title-fs)] font-bold leading-[130%] text-[var(--plan-tariff-title-color)] md:text-[length:var(--plan-tariff-title-fs-md)]',
          ].join(' ')}
        >
          {title}
        </p>

        {actionLabel && onAction ? (
          <Button
            type="button"
            variant="neutral"
            outline
            size="32"
            onClick={onAction}
            className="shrink-0"
          >
            {actionLabel}
          </Button>
        ) : null}
      </div>

      <div className="flex w-full flex-wrap gap-[6px]">
        {chips.map((chip) => (
          <Chip key={chip}>{chip}</Chip>
        ))}
      </div>
    </div>
  );
}
