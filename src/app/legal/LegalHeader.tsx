import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Icon, Logo } from '../landing-stas/components/icons';
import type { mealContentEn } from '../landing-stas/content/mealContentEn';

type LegalHeaderProps = {
  t: typeof mealContentEn;
};

export function LegalHeader({ t }: LegalHeaderProps) {
  const [shown, setShown] = useState(true);
  const [hovered, setHovered] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y === 0) setShown(true);
      else setShown(y < last.current);
      last.current = y;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = shown || hovered;

  return (
    <div
      className="legal-header-shell"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="legal-header-shell__hit" aria-hidden />
      <header
        className="legal-header-bar"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-105%)',
        }}
      >
        <div className="wrap row hdr-row" style={{ height: 'var(--hdr-h)', justifyContent: 'space-between' }}>
          <Link to="/" className="row hdr-logo logo-top-link" aria-label="Back to home">
            <span className="hover-lift">
              <Logo tone="yellow" />
            </span>
          </Link>
          <div className="hdr-profile">
            <button
              type="button"
              title={t.nav.signin}
              aria-label={t.nav.signin}
              className="hdr-profile-btn"
            >
              <span className="hdr-profile-icon">
                <Icon.user size={20} />
              </span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
