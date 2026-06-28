/** Route paths for the personal account (LK). Framework-agnostic — reuse in Next.js App Router. */
export const ACCOUNT_ROUTES = {
  home: '/account',
  deliveries: '/account/deliveries',
  profile: '/account/profile',
  menu: '/account/menu',
  payment: '/account/payment',
  settings: '/account/profile/settings',
  notifications: '/account/notifications',
  mealPlan: (id: string) => `/account/meal-plan/${id}`,
} as const;

export type AccountTabId = 'home' | 'deliveries' | 'profile';

export const ACCOUNT_TAB_ROUTES: Record<AccountTabId, string> = {
  home: ACCOUNT_ROUTES.home,
  deliveries: ACCOUNT_ROUTES.deliveries,
  profile: ACCOUNT_ROUTES.profile,
};
