import { useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import { MenuIcon } from '../../components/common/icons/feather/MenuIcon';
import { UserIcon } from '../../components/common/icons/feather/UserIcon';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '../../components/ui/sheet';
import { personalCabinetUrl, supportEmail } from '../../config/siteLinks';
import { landingFooterSocials } from '../../config/socialLinks';
import { isDevToolsEnabled, toggleDevToolsEnabled } from '../../devToolsEnabled';
import { LEGAL_ROUTES } from '../../legal/routes';
import type { MealContentEn } from '../content/mealContentEn';
import { Social } from './icons';

type SiteNavDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: MealContentEn;
  onOrderClick?: () => void;
};

type NavItem = {
  label: string;
  href: string;
  isRoute?: boolean;
};

function sectionHref(pathname: string, anchor: string): string {
  return pathname === '/' ? anchor : `/${anchor}`;
}

export function SiteNavDrawer({
  open,
  onOpenChange,
  t,
  onOrderClick,
}: SiteNavDrawerProps) {
  const { pathname } = useLocation();
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const navItems: NavItem[] = [
    { label: t.nav.menu, href: sectionHref(pathname, '#menu') },
    { label: t.nav.how, href: sectionHref(pathname, '#how') },
    { label: t.nav.delivery, href: sectionHref(pathname, '#delivery') },
    { label: t.siteNav.reviews, href: sectionHref(pathname, '#reviews') },
    { label: t.nav.qa, href: sectionHref(pathname, '#qa') },
  ];

  const legalItems: NavItem[] = [
    { label: t.footer.privacy, href: LEGAL_ROUTES.privacy, isRoute: true },
    { label: t.footer.terms, href: LEGAL_ROUTES.terms, isRoute: true },
  ];

  const renderNavLink = (item: NavItem) => {
    const className = 'site-nav-drawer__link';
    if (item.isRoute) {
      return (
        <Link key={item.href} to={item.href} className={className} onClick={close}>
          {item.label}
        </Link>
      );
    }

    if (item.href.startsWith('/#')) {
      const to = { pathname: '/', hash: item.href.slice(1) };
      return (
        <Link key={item.href} to={to} className={className} onClick={close}>
          {item.label}
        </Link>
      );
    }

    return (
      <a key={item.href} href={item.href} className={className} onClick={close}>
        {item.label}
      </a>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="site-nav-drawer"
        aria-describedby={undefined}
      >
        <SheetTitle className="sr-only">{t.siteNav.menuTitle}</SheetTitle>

        <div className="site-nav-drawer__body">
          <section className="site-nav-drawer__section site-nav-drawer__account">
            <div className="site-nav-drawer__user">
              <span className="site-nav-drawer__avatar" aria-hidden>
                <UserIcon size={20} />
              </span>
              <a
                href={personalCabinetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav-drawer__cabinet"
                onClick={close}
              >
                {t.siteNav.personalCabinet}
              </a>
            </div>
          </section>

          <section className="site-nav-drawer__section">
            <nav className="site-nav-drawer__links">
              {navItems.map(renderNavLink)}
              {onOrderClick ? (
                <button
                  type="button"
                  className="site-nav-drawer__link site-nav-drawer__link--cta"
                  onClick={() => {
                    onOrderClick();
                    close();
                  }}
                >
                  {t.hero.cta}
                </button>
              ) : (
                <Link
                  to={{ pathname: '/', hash: '#menu' }}
                  className="site-nav-drawer__link site-nav-drawer__link--cta"
                  onClick={close}
                >
                  {t.hero.cta}
                </Link>
              )}
            </nav>
          </section>

          <section className="site-nav-drawer__section">
            <nav className="site-nav-drawer__links">
              {legalItems.map(renderNavLink)}
            </nav>
          </section>

          <section className="site-nav-drawer__section">
            <button
              type="button"
              className="site-nav-drawer__link site-nav-drawer__link--dev"
              onClick={() => {
                toggleDevToolsEnabled();
              }}
            >
              <span className="site-nav-drawer__dev-dot" aria-hidden data-on={isDevToolsEnabled ? 'true' : 'false'} />
              {isDevToolsEnabled ? 'Disable dev tools' : 'Enable dev tools'}
            </button>
          </section>

          <section className="site-nav-drawer__section">
            <div className="row site-nav-drawer__socials">
              {landingFooterSocials.map(([key, href]) => {
                const IconComp = Social[key as keyof typeof Social];
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={key}
                    onClick={close}
                  >
                    <IconComp size={19} />
                  </a>
                );
              })}
            </div>
            <a
              href={`mailto:${supportEmail}`}
              className="site-nav-drawer__email"
              onClick={close}
            >
              {supportEmail}
            </a>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SiteNavBurgerButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <div className="hdr-burger">
      <button
        type="button"
        title={label}
        aria-label={label}
        className="hdr-burger-btn"
        onClick={onClick}
      >
        <span className="hdr-burger-icon">
          <MenuIcon size={24} />
        </span>
      </button>
    </div>
  );
}
