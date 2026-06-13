import { useEffect, useState } from 'react';

import { Icon } from './icons';

import type { MealContentEn } from './content/mealContentEn';

type OrderFabProps = {
  t: MealContentEn;
  onOrderClick: () => void;
  hidden?: boolean;
};

export function OrderFab({ t, onOrderClick, hidden }: OrderFabProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = show && !hidden;

  return (
    <button
      type="button"
      onClick={onOrderClick}
      aria-label={t.hero.cta}
      className="btn btn-primary btn-md"
      style={{
        position: 'fixed',
        insetInlineEnd: 'clamp(16px,3vw,32px)',
        bottom: 'clamp(16px,3vw,32px)',
        zIndex: 60,
        borderRadius: 'var(--r-pill)',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(.9)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'transform .3s var(--ease), background .15s var(--ease), opacity .3s var(--ease), box-shadow .15s var(--ease)',
      }}
    >
      <Icon.utensils size={24} />
      Order
    </button>
  );
}
