export const TABBY_PROMO_SCRIPT_URL = 'https://checkout.tabby.ai/tabby-promo.js';

export type TabbyCurrency = 'AED' | 'SAR' | 'KWD';

export const tabbyConfig = {
  publicKey: import.meta.env.VITE_TABBY_PUBLIC_KEY ?? '',
  merchantCode: import.meta.env.VITE_TABBY_MERCHANT_CODE ?? 'ygfzco',
  currency: 'AED' as TabbyCurrency,
  lang: 'en' as const,
};

export function isTabbyConfigured() {
  return Boolean(tabbyConfig.publicKey);
}

export function formatTabbyPrice(price: number, currency: TabbyCurrency = tabbyConfig.currency) {
  const decimals = currency === 'KWD' ? 3 : 2;
  return price.toFixed(decimals);
}

export function getTabbyInstallmentsPopupUrl(price: number) {
  const params = new URLSearchParams({
    price: formatTabbyPrice(price),
    currency: tabbyConfig.currency,
    merchant_code: tabbyConfig.merchantCode,
  });

  if (tabbyConfig.publicKey) {
    params.set('public_key', tabbyConfig.publicKey);
  }

  return `https://checkout.tabby.ai/promos/product-page/installments/${tabbyConfig.lang}/?${params}`;
}
