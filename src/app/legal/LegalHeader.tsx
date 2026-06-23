import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Logo } from '../landing-stas/components/icons';
import { SiteLangSwitcher } from '../landing-stas/components/SiteLangSwitcher';
import { SiteNavBurgerButton, SiteNavDrawer } from '../landing-stas/components/SiteNavDrawer';
import type { mealContentEn } from '../landing-stas/content/mealContentEn';
import { usePhoneAuth } from '../phoneAuth/PhoneAuthProvider';

type LegalHeaderProps = {
  t: typeof mealContentEn;
};

export function LegalHeader({ t }: LegalHeaderProps) {
  const [shown, setShown] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const last = useRef(0);
  const {
    isPhoneVerified,
    verifiedPhone,
    pendingPhone,
    resetPhoneSession,
    handleResumeVerification,
  } = usePhoneAuth();

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
          <div className="row hdr-actions">
            <SiteLangSwitcher />
            <SiteNavBurgerButton
              label={t.siteNav.openMenu}
              onClick={() => setNavOpen(true)}
            />
          </div>
        </div>
      </header>
      <SiteNavDrawer
        open={navOpen}
        onOpenChange={setNavOpen}
        t={t}
        isPhoneVerified={isPhoneVerified}
        verifiedPhone={verifiedPhone}
        pendingPhone={pendingPhone}
        onResetPhone={() => resetPhoneSession()}
        onResumeVerification={handleResumeVerification}
      />
    </div>
  );
}
