import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

import { BUTTON_VISUAL_CLASS_NAME, getButtonStyles } from '../common/Button';
import { BORDER_RADIUS_TOKENS } from '../common/borderRadiusTokens';
import {
  formatTabbyPrice,
  isTabbyConfigured,
  TABBY_PROMO_SCRIPT_URL,
  tabbyConfig,
} from '../../config/tabbyConfig';
import { TabbyPromoFallback } from './TabbyPromoFallback';
import { TabbyPromoModal } from './TabbyPromoModal';

type TabbyPromoSource = 'product' | 'cart';

type TabbyPromoWidgetProps = {
  price: number;
  pricePerMonth?: number | null;
  source?: TabbyPromoSource;
  className?: string;
  style?: CSSProperties;
};

const TABBY_PROMO_INIT_TIMEOUT_MS = 2000;
const TABBY_DIALOG_HIDE_STYLE_ID = 'tabby-dialog-hide-style';

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

function useTabbyDialogGuard() {
  useEffect(() => {
    if (document.getElementById(TABBY_DIALOG_HIDE_STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = TABBY_DIALOG_HIDE_STYLE_ID;
    style.textContent = '#TabbyDialogContainer { display: none !important; }';
    document.head.appendChild(style);
  }, []);
}

function TabbyPromoShell({
  children,
  onOpen,
  ariaLabel = 'View Tabby payment options',
}: {
  children: ReactNode;
  onOpen: () => void;
  ariaLabel?: string;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      className={[
        BUTTON_VISUAL_CLASS_NAME,
        'block w-full px-[12px] py-[12px] text-left',
      ].join(' ')}
      style={{
        ...getButtonStyles('neutral', true),
        '--button-border-radius': BORDER_RADIUS_TOKENS[8],
      }}
    >
      <div className="pointer-events-none">{children}</div>
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [officialPromoFailed, setOfficialPromoFailed] = useState(false);

  useTabbyDialogGuard();

  const handleInitFailed = useCallback(() => {
    setOfficialPromoFailed(true);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    setOfficialPromoFailed(false);
  }, [price]);

  if (price <= 0) return null;

  const useFallback = !isTabbyConfigured() || officialPromoFailed;

  return (
    <>
      <TabbyPromoShell onOpen={handleOpenModal}>
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

      <TabbyPromoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        price={price}
      />
    </>
  );
}
