import { useEffect } from 'react';

const ACCOUNT_SCROLL_LOCK_SELECTORS = [
  '.account-shell__content',
  '.account-deliveries__list',
] as const;

export function useAccountOverlayScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const targets = ACCOUNT_SCROLL_LOCK_SELECTORS.flatMap((selector) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)),
    );

    if (targets.length === 0) return;

    const previousOverflow = targets.map((target) => target.style.overflow);

    targets.forEach((target) => {
      target.style.overflow = 'hidden';
    });

    return () => {
      targets.forEach((target, index) => {
        target.style.overflow = previousOverflow[index];
      });
    };
  }, [isOpen]);
}
