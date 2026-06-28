import type { ReactNode } from 'react';

type AccountPageMessageProps = {
  isVisible: boolean;
  children: ReactNode;
};

export function AccountPageMessage({ isVisible, children }: AccountPageMessageProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="account-page-message" role="status" aria-live="polite">
      {children}
    </div>
  );
}
