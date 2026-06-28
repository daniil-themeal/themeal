import type { ReactNode } from 'react';

import type { InlineSuccessPhase } from '../../hooks/useInlineSuccessNotice';

type InlineSuccessNoticeProps = {
  phase: InlineSuccessPhase;
  children: ReactNode;
};

export function InlineSuccessNotice({ phase, children }: InlineSuccessNoticeProps) {
  if (phase === 'hidden') {
    return null;
  }

  return (
    <p
      className={[
        'account-delivery-sheet__inline-success',
        phase === 'leaving' ? 'account-delivery-sheet__inline-success--leaving' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-live="polite"
    >
      <span>{children}</span>
    </p>
  );
}
