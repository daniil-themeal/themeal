import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';

import {
  formatTabbyPrice,
  isTabbyConfigured,
  TABBY_PROMO_SCRIPT_URL,
  tabbyConfig,
} from '../../config/tabbyConfig';
import { TabbyPromoFallback } from './TabbyPromoFallback';

type TabbyPromoSource = 'product' | 'cart';

type TabbyPromoWidgetProps = {
  price: number;
  pricePerMonth?: number | null;
  source?: TabbyPromoSource;
  className?: string;
  style?: CSSProperties;
};

const TABBY_PROMO_INIT_TIMEOUT_MS = 2000;

declare global {
  interface Window {
    TabbyPromo?: new (config: {
      selector: string;
      currency: string;
      price: string;
      lang?: string;
      source?: TabbyPromoSource;
      shouldInheritBg?: boolean;
      publicKey: string;
      merchantCode: string;
    }) => void;
  }
}

function TabbyPromoShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full rounded-[8px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[8px] border border-[var(--order-summary-divider)]"
      />
      <div className="px-[12px] py-[12px]">{children}</div>
    </div>
  );
}

function loadTabbyPromoScript(onLoad: () => void, onError: () => void) {
  if (window.TabbyPromo) {
    onLoad();
    return () => {};
  }

  const existingScript = document.querySelector(
    `script[src="${TABBY_PROMO_SCRIPT_URL}"]`,
  ) as HTMLScriptElement | null;

  if (existingScript) {
    if (existingScript.dataset.loaded === 'true') {
      onLoad();
      return () => {};
    }

    const handleLoad = () => {
      existingScript.dataset.loaded = 'true';
      onLoad();
    };

    existingScript.addEventListener('load', handleLoad);
    existingScript.addEventListener('error', onError);
    return () => {
      existingScript.removeEventListener('load', handleLoad);
      existingScript.removeEventListener('error', onError);
    };
  }

  const script = document.createElement('script');
  script.src = TABBY_PROMO_SCRIPT_URL;
  script.async = true;
  script.onload = () => {
    script.dataset.loaded = 'true';
    onLoad();
  };
  script.onerror = () => {
    console.error('[TabbyPromo] Failed to load tabby-promo.js');
    onError();
  };
  document.body.appendChild(script);

  return () => {
    script.removeEventListener('load', onLoad);
    script.removeEventListener('error', onError);
  };
}

function TabbyOfficialPromo({
  price,
  source,
  className = '',
  style,
  onInitFailed,
}: {
  price: number;
  source: TabbyPromoSource;
  className?: string;
  style?: CSSProperties;
  onInitFailed: () => void;
}) {
  const reactId = useId();
  const promoId = `tabby-promo-${reactId.replace(/:/g, '')}`;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (price <= 0) return;

    const selector = `#${promoId}`;
    let initTimeoutId: number | null = null;

    const initPromo = () => {
      const container = containerRef.current;
      if (!container || !window.TabbyPromo) {
        onInitFailed();
        return;
      }

      container.innerHTML = '';

      new window.TabbyPromo({
        selector,
        currency: tabbyConfig.currency,
        price: formatTabbyPrice(price),
        lang: tabbyConfig.lang,
        source,
        shouldInheritBg: true,
        publicKey: tabbyConfig.publicKey,
        merchantCode: tabbyConfig.merchantCode,
      });

      initTimeoutId = window.setTimeout(() => {
        if (!containerRef.current?.textContent?.trim()) {
          onInitFailed();
        }
      }, TABBY_PROMO_INIT_TIMEOUT_MS);
    };

    const removeScriptListener = loadTabbyPromoScript(initPromo, onInitFailed);

    return () => {
      removeScriptListener();
      if (initTimeoutId !== null) {
        window.clearTimeout(initTimeoutId);
      }
    };
  }, [onInitFailed, price, promoId, source]);

  return (
    <div
      id={promoId}
      ref={containerRef}
      className={className}
      style={
        {
          '--snippetTextColor': 'var(--order-summary-muted)',
          '--snippetLinkTextColor': 'var(--order-summary-text)',
          ...style,
        } as CSSProperties
      }
    />
  );
}

export function TabbyPromoWidget({
  price,
  pricePerMonth = null,
  source = 'cart',
  className = '',
  style,
}: TabbyPromoWidgetProps) {
  const [officialPromoFailed, setOfficialPromoFailed] = useState(false);

  const handleInitFailed = useCallback(() => {
    setOfficialPromoFailed(true);
  }, []);

  useEffect(() => {
    setOfficialPromoFailed(false);
  }, [price]);

  if (price <= 0) return null;

  const useFallback = !isTabbyConfigured() || officialPromoFailed;

  return (
    <TabbyPromoShell>
      {useFallback ? (
        <TabbyPromoFallback price={price} pricePerMonth={pricePerMonth} />
      ) : (
        <TabbyOfficialPromo
          price={price}
          source={source}
          className={className}
          style={style}
          onInitFailed={handleInitFailed}
        />
      )}
    </TabbyPromoShell>
  );
}
