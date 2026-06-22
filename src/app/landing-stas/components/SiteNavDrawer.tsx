import { useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import { LogOutIcon } from '../../components/common/icons/feather/LogOutIcon';
import { MenuIcon } from '../../components/common/icons/feather/MenuIcon';
import { UserIcon } from '../../components/common/icons/feather/UserIcon';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '../../components/ui/sheet';
import { personalCabinetUrl, supportEmail } from '../../config/siteLinks';
import {
  landingFollowSocials,
  socialLinks,
} from '../../config/socialLinks';
import { LEGAL_ROUTES } from '../../legal/routes';
import { displayPhoneFromNormalized } from '../../phoneAuth/PhoneAuthProvider';
import type { MealContentEn } from '../content/mealContentEn';
import { Social } from './icons';

type SiteNavDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: MealContentEn;
  isPhoneVerified?: boolean;
  verifiedPhone?: string;
  pendingPhone?: string;
  onSignInClick?: () => void;
  onResetPhone?: () => void;
  onResumeVerification?: () => void;
  onOrderClick?: () => void;
  onDesignSystemClick?: () => void;
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
  isPhoneVerified = false,
  verifiedPhone,
  pendingPhone,
  onSignInClick,
  onResetPhone,
  onResumeVerification,
  onOrderClick,
  onDesignSystemClick,
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

  const supportItems = [
    { key: 'whatsapp', label: t.siteNav.whatsapp, href: socialLinks.whatsapp, icon: Social.whatsapp },
    { key: 'telegram', label: t.siteNav.telegram, href: socialLinks.telegram, icon: Social.telegram },
    { key: 'email', label: t.siteNav.email, href: `mailto:${supportEmail}`, icon: null },
  ] as const;

  const displayPhone = verifiedPhone
    ? displayPhoneFromNormalized(verifiedPhone)
    : pendingPhone
      ? displayPhoneFromNormalized(pendingPhone)
      : null;

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
        <SheetTitle className="site-nav-drawer__title">{t.siteNav.menuTitle}</SheetTitle>

        <div className="site-nav-drawer__body">
          <section className="site-nav-drawer__section site-nav-drawer__account">
            <h3 className="site-nav-drawer__heading">{t.siteNav.account}</h3>
            <div className="site-nav-drawer__user">
              <span className="site-nav-drawer__avatar" aria-hidden>
                <UserIcon size={20} />
              </span>
              <div className="site-nav-drawer__user-info">
                {isPhoneVerified && displayPhone ? (
                  <span className="site-nav-drawer__phone">+971 {displayPhone}</span>
                ) : pendingPhone && displayPhone ? (
                  <span className="site-nav-drawer__phone site-nav-drawer__phone--pending">
                    +971 {displayPhone}
                  </span>
                ) : (
                  <span className="site-nav-drawer__guest">{t.nav.signin}</span>
                )}
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
            </div>
            <div className="site-nav-drawer__account-actions">
              {isPhoneVerified ? (
                <button
                  type="button"
                  className="site-nav-drawer__action-btn"
                  onClick={() => {
                    onResetPhone?.();
                    close();
                  }}
                >
                  <LogOutIcon size={16} />
                  {t.siteNav.signOut}
                </button>
              ) : pendingPhone ? (
                <button
                  type="button"
                  className="site-nav-drawer__action-btn site-nav-drawer__action-btn--primary"
                  onClick={() => {
                    onResumeVerification?.();
                    close();
                  }}
                >
                  {t.siteNav.continueVerification}
                </button>
              ) : (
                <button
                  type="button"
                  className="site-nav-drawer__action-btn site-nav-drawer__action-btn--primary"
                  onClick={() => {
                    onSignInClick?.();
                    close();
                  }}
                >
                  {t.nav.signin}
                </button>
              )}
            </div>
          </section>

          <section className="site-nav-drawer__section">
            <h3 className="site-nav-drawer__heading">{t.siteNav.navigation}</h3>
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
              {onDesignSystemClick ? (
                <button
                  type="button"
                  className="site-nav-drawer__link"
                  onClick={() => {
                    onDesignSystemClick();
                    close();
                  }}
                >
                  {t.nav.designSystem}
                </button>
              ) : null}
            </nav>
          </section>

          <section className="site-nav-drawer__section">
            <h3 className="site-nav-drawer__heading">{t.siteNav.legal}</h3>
            <nav className="site-nav-drawer__links">
              {legalItems.map(renderNavLink)}
            </nav>
          </section>

          <section className="site-nav-drawer__section">
            <h3 className="site-nav-drawer__heading">{t.siteNav.support}</h3>
            <nav className="site-nav-drawer__links">
              {supportItems.map(({ key, label, href, icon: IconComp }) => (
                <a
                  key={key}
                  href={href}
                  target={key === 'email' ? undefined : '_blank'}
                  rel={key === 'email' ? undefined : 'noopener noreferrer'}
                  className="site-nav-drawer__link site-nav-drawer__link--with-icon"
                  onClick={close}
                >
                  {IconComp ? <IconComp size={18} /> : null}
                  {label}
                </a>
              ))}
            </nav>
          </section>

          <section className="site-nav-drawer__section">
            <h3 className="site-nav-drawer__heading">{t.siteNav.followUs}</h3>
            <div className="site-nav-drawer__socials">
              {landingFollowSocials.map(([key, href]) => {
                const IconComp = Social[key as keyof typeof Social];
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-nav-drawer__social-link"
                    aria-label={key}
                    title={key}
                    onClick={close}
                  >
                    <IconComp size={19} />
                  </a>
                );
              })}
            </div>
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
          <MenuIcon size={20} />
        </span>
      </button>
    </div>
  );
}
