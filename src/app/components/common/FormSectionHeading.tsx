import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { TEXT_TRIM_FIT_CLASS_NAME } from './textTrimTokens';

type FormSectionHeadingCssVariables = CSSProperties & {
  '--form-section-title-fs': string;
  '--form-section-subtitle-fs': string;
};

const formSectionHeadingStyle: FormSectionHeadingCssVariables = {
  '--form-section-title-fs': FONT_SIZE_TOKENS[25],
  '--form-section-subtitle-fs': '13px',
};

type FormSectionHeadingProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

export function FormSectionHeading({
  title,
  subtitle,
  className = '',
}: FormSectionHeadingProps) {
  return (
    <div
      className={['flex h-fit flex-col gap-[16px]', className].filter(Boolean).join(' ')}
      style={formSectionHeadingStyle}
    >
      <p
        className={[
          TEXT_TRIM_FIT_CLASS_NAME,
          'font-sans text-[length:var(--form-section-title-fs)] font-bold leading-[130%]',
        ].join(' ')}
        style={{ color: COLOR_TOKENS.neutral[900] }}
      >
        {title}
      </p>

      {subtitle ? (
        <p
          className={[
            TEXT_TRIM_FIT_CLASS_NAME,
            'font-sans text-[length:var(--form-section-subtitle-fs)] font-medium leading-[140%]',
          ].join(' ')}
          style={{ color: COLOR_TOKENS.neutral[500] }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
