import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { ICON_TEXT_ROW_LAYOUT } from './iconTextRowLayoutTokens';

type IconTextRowCssVariables = CSSProperties & {
  '--icon-text-row-text': string;
  '--icon-text-row-muted': string;
  '--icon-text-row-icon': string;
};

const iconTextRowStyle: IconTextRowCssVariables = {
  '--icon-text-row-text': COLOR_TOKENS.neutral[900],
  '--icon-text-row-muted': COLOR_TOKENS.neutral[500],
  '--icon-text-row-icon': COLOR_TOKENS.neutral[200],
};

type IconTextRowProps = {
  icon: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

export function IconTextRow({ icon, title, subtitle, className = '' }: IconTextRowProps) {
  return (
    <div className={[ICON_TEXT_ROW_LAYOUT.row, className].filter(Boolean).join(' ')} style={iconTextRowStyle}>
      {icon}

      <div className={ICON_TEXT_ROW_LAYOUT.content}>
        <p className={ICON_TEXT_ROW_LAYOUT.title}>{title}</p>

        {subtitle ? <p className={ICON_TEXT_ROW_LAYOUT.subtitle}>{subtitle}</p> : null}
      </div>
    </div>
  );
}
