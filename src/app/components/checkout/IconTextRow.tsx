import type { ReactNode } from 'react';

import { ICON_TEXT_ROW_LAYOUT } from './iconTextRowLayoutTokens';

type IconTextRowProps = {
  icon: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
};

export function IconTextRow({ icon, title, subtitle }: IconTextRowProps) {
  return (
    <div className={ICON_TEXT_ROW_LAYOUT.row}>
      {icon}

      <div className={ICON_TEXT_ROW_LAYOUT.content}>
        <p className={ICON_TEXT_ROW_LAYOUT.title}>{title}</p>

        {subtitle ? <p className={ICON_TEXT_ROW_LAYOUT.subtitle}>{subtitle}</p> : null}
      </div>
    </div>
  );
}
