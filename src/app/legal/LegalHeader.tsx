import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { HeaderNav } from '../main-landing/components/HeaderNav';
import { buildHeaderNavLinks } from '../main-landing/headerNavLinks';
import { Logo } from '../main-landing/components/icons';
import { SiteLangSwitcher } from '../main-landing/components/SiteLangSwitcher';
import { SiteNavBurgerButton, SiteNavDrawer } from '../main-landing/components/SiteNavDrawer';
import type { mealContentEn } from '../main-landing/content/mealContentEn';

type LegalHeaderProps = {
  t: typeof mealContentEn;
};

export function LegalHeader({ t }: LegalHeaderProps) {
  const [shown, setShown] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const last = useRef(0);
  const suppressHoverRef = useRef(false);

  const armHoverSuppress = () => {
    suppressHoverRef.current = true;
    const release = () => {
      suppressHoverRef.current = false;
    };
    window.addEventListener('mousemove', release, { once: true });
    window.addEventListener('scroll', release, { once: true, passive: true });
  };

  const setHeaderHovered = (value: boolean) => {
    if (value && (suppressHoverRef.current || navOpen)) return;
    setHovered(value);
  };

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

  const handleNavOpenChange = (open: boolean) => {
    setNavOpen(open);
    setHovered(false);
    if (open) {
      suppressHoverRef.current = true;
    } else {
      last.current = window.scrollY;
      armHoverSuppress();
    }
  };

  const visible = shown || (hovered && !navOpen);
  const navLinks = buildHeaderNavLinks(t);
  const txt = 'rgba(255,255,255,.85)';

  return (
    <div
      className="legal-header-shell"
      onMouseEnter={() => setHeaderHovered(true)}
      onMouseLeave={() => setHeaderHovered(false)}
    >
      <div className="legal-header-shell__hit" aria-hidden />
      <header
        className="legal-header-bar"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-105%)',
        }}
      >
        <div className="hdr-wrap row hdr-row" style={{ height: 'var(--hdr-h)', justifyContent: 'space-between' }}>
          <Link to="/" className="row hdr-logo logo-top-link" aria-label="Back to home">
            <span className="hover-lift">
              <Logo tone="yellow" />
            </span>
          </Link>
          <HeaderNav
            links={navLinks}
            textColor={txt}
            onDark
            navigationLabel={t.siteNav.navigation}
          />
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
        onOpenChange={handleNavOpenChange}
        t={t}
      />
    </div>
  );
}
