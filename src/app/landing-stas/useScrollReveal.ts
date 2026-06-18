import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    let ticking = false;

    const reveal = () => {
      ticking = false;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) {
          el.classList.add('in');
        }
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(reveal);
      }
    };

    reveal();
    const timers = [50, 250, 600, 1200].map((ms) => window.setTimeout(reveal, ms));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);
}
