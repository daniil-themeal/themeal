import { BLOG_ROUTES } from '../blog/routes';
import type { HeaderNavLink } from './components/HeaderNav';
import type { MealContentEn } from './content/mealContentEn';

export function buildHeaderNavLinks(t: MealContentEn): HeaderNavLink[] {
  return [
    { href: '/', routeHash: '#menu', label: t.nav.menu, isRoute: true },
    { href: '/', routeHash: '#delivery', label: t.nav.delivery, isRoute: true },
    { href: '/', routeHash: '#qa', label: t.nav.qa, isRoute: true },
    { href: BLOG_ROUTES.index, label: t.siteNav.blog, isRoute: true },
  ];
}
