export const CHECKOUT_ROOT_CLASSNAME = 'checkout';

export const CHECKOUT_MODAL_SHELL_ROOT_CLASSNAME =
  'bg-[var(--meal-detail-card-bg)] pb-[env(safe-area-inset-bottom)] sm:p-[24px]';

export const CHECKOUT_MODAL_SHELL_PANEL_CLASSNAME =
  'w-full bg-[var(--meal-detail-card-bg)] sm:max-w-[clamp(480px,calc(480px+(100vw-48rem)*80/448),560px)] sm:overflow-hidden sm:rounded-[20px] sm:shadow-2xl';

export const CHECKOUT_MODAL_SHELL_INNER_CLASSNAME =
  'flex min-h-full flex-col bg-[var(--meal-detail-card-bg)] sm:min-h-0 sm:overflow-hidden sm:rounded-[20px]';

export const CHECKOUT_AUTH_MODAL_PANEL_CLASSNAME = [
  'relative flex w-full max-w-none flex-col overflow-hidden rounded-t-[20px] bg-[var(--meal-detail-card-bg)] pb-[env(safe-area-inset-bottom)] shadow-2xl',
  'sm:mx-[24px] sm:max-w-[clamp(496px,calc(496px+(100vw-48rem)*80/448),576px)] sm:rounded-[20px]',
].join(' ');

export const CHECKOUT_AUTH_MODAL_INNER_CLASSNAME =
  'flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--meal-detail-card-bg)] sm:rounded-[20px]';
