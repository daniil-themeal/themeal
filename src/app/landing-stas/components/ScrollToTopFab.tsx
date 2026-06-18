import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ChevronUpIcon } from '../../components/common/icons/feather/ChevronUpIcon';

type ScrollToTopFabProps = {
  hidden?: boolean;
};

export function ScrollToTopFab({ hidden }: ScrollToTopFabProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (hidden) return null;

  return createPortal(
    <button
      type="button"
      className={`landing-scroll-top${visible ? ' landing-scroll-top--visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <ChevronUpIcon size={24} />
    </button>,
    document.body,
  );
}
