import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';

import { BORDER_RADIUS_TOKENS } from '../common/borderRadiusTokens';
import { LoaderIcon } from '../common/icons/feather/LoaderIcon';
import {
  formatTabbyPrice,
  isTabbyConfigured,
  TABBY_CARD_SCRIPT_URL,
  tabbyConfig,
} from '../../config/tabbyConfig';

type TabbyCheckoutCardProps = {
  price: number;
  visible: boolean;
  className?: string;
};

const TABBY_CARD_INIT_TIMEOUT_MS = 2000;
const INSTALLMENT_COUNT = 4;

declare global {
  interface Window {
    TabbyCard?: new (config: {
      selector: string;
      currency: string;
      price: string;
      lang?: string;
      shouldInheritBg?: boolean;
      publicKey: string;
      merchantCode: string;
    }) => void;
  }
}

function loadTabbyCardScript(onLoad: () => void, onError: () => void) {
  if (window.TabbyCard) {
    onLoad();
    return () => {};
  }

  const existingScript = document.querySelector(
    `script[src="${TABBY_CARD_SCRIPT_URL}"]`,
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
  script.src = TABBY_CARD_SCRIPT_URL;
  script.async = true;
  script.onload = () => {
    script.dataset.loaded = 'true';
    onLoad();
  };
  script.onerror = () => {
    console.error('[TabbyCard] Failed to load tabby-card.js');
    onError();
  };
  document.body.appendChild(script);

  return () => {
    script.removeEventListener('load', onLoad);
    script.removeEventListener('error', onError);
  };
}

function TabbyCheckoutCardFallback({ price }: { price: number }) {
  const installmentAmount = price / INSTALLMENT_COUNT;

  return (
    <p className="font-sans text-[length:var(--payment-small-fs)] font-normal leading-[150%] text-[var(--payment-muted)]">
      4 interest-free payments of{' '}
      <strong className="font-semibold text-[var(--payment-text)]">
        {formatTabbyPrice(installmentAmount)} {tabbyConfig.currency}
      </strong>
      . No interest, no fees.
    </p>
  );
}

function TabbyCheckoutCardLoading() {
  return (
    <div className="flex min-h-[24px] items-center justify-center py-[8px]">
      <LoaderIcon size={16} className="animate-spin text-[var(--payment-muted)]" />
    </div>
  );
}

function TabbyOfficialCard({
  price,
  cardId,
  onInitReady,
  onInitFailed,
}: {
  price: number;
  cardId: string;
  onInitReady: () => void;
  onInitFailed: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (price <= 0) return;

    const selector = `#${cardId}`;
    let initTimeoutId: number | null = null;
    let contentObserver: MutationObserver | null = null;
    const abortController = new AbortController();
    const { signal } = abortController;

    const isCardRendered = (container: HTMLDivElement) => Boolean(container.textContent?.trim());

    const settleReady = () => {
      if (signal.aborted) return;
      if (initTimeoutId !== null) {
        window.clearTimeout(initTimeoutId);
      }
      contentObserver?.disconnect();
      onInitReady();
    };

    const settleFailed = () => {
      if (signal.aborted) return;
      if (initTimeoutId !== null) {
        window.clearTimeout(initTimeoutId);
      }
      contentObserver?.disconnect();
      onInitFailed();
    };

    const checkReady = (container: HTMLDivElement) => {
      if (isCardRendered(container)) {
        settleReady();
      }
    };

    const initCard = () => {
      if (signal.aborted) return;

      const container = containerRef.current;
      if (!container || !window.TabbyCard) {
        settleFailed();
        return;
      }

      container.innerHTML = '';

      contentObserver = new MutationObserver(() => {
        checkReady(container);
      });
      contentObserver.observe(container, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      new window.TabbyCard({
        selector,
        currency: tabbyConfig.currency,
        price: formatTabbyPrice(price),
        lang: tabbyConfig.lang,
        shouldInheritBg: true,
        publicKey: tabbyConfig.publicKey,
        merchantCode: tabbyConfig.merchantCode,
      });

      checkReady(container);

      initTimeoutId = window.setTimeout(() => {
        const currentContainer = containerRef.current;
        if (!currentContainer || !isCardRendered(currentContainer)) {
          settleFailed();
        }
      }, TABBY_CARD_INIT_TIMEOUT_MS);
    };

    const removeScriptListener = loadTabbyCardScript(initCard, settleFailed);

    return () => {
      abortController.abort();
      removeScriptListener();
      contentObserver?.disconnect();
      if (initTimeoutId !== null) {
        window.clearTimeout(initTimeoutId);
      }
    };
  }, [cardId, onInitFailed, onInitReady, price]);

  return (
    <div
      id={cardId}
      ref={containerRef}
      className="font-sans font-normal"
      style={
        {
          '--snippetTextColor': 'var(--payment-muted)',
          '--snippetLinkTextColor': 'var(--payment-text)',
          fontSize: 'var(--payment-small-fs)',
          lineHeight: '1.5',
          fontFamily: 'inherit',
        } as CSSProperties
      }
    />
  );
}

export function TabbyCheckoutCard({ price, visible, className = '' }: TabbyCheckoutCardProps) {
  const reactId = useId();
  const cardId = `tabby-checkout-card-${reactId.replace(/:/g, '')}`;
  const tabbyConfigured = isTabbyConfigured();
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'failed'>(() =>
    tabbyConfigured ? 'loading' : 'failed',
  );

  useEffect(() => {
    if (tabbyConfigured) {
      setLoadState('loading');
    } else {
      setLoadState('failed');
    }
  }, [price, tabbyConfigured, visible]);

  if (!visible || price <= 0) return null;

  const useFallback = !tabbyConfigured || loadState === 'failed';
  const isLoading = tabbyConfigured && loadState === 'loading';

  return (
    <div
      className={[
        'overflow-hidden rounded-[length:var(--tabby-checkout-card-radius)] corner-shape-squircle',
        'border border-solid border-[var(--payment-dotted-border)] bg-[var(--checkout-step-surface)] px-[12px] py-[12px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--tabby-checkout-card-radius': BORDER_RADIUS_TOKENS[8] } as CSSProperties}
      aria-live="polite"
    >
      {useFallback ? (
        <TabbyCheckoutCardFallback price={price} />
      ) : (
        <div className={`relative ${isLoading ? 'min-h-[48px]' : ''}`}>
          {isLoading ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <TabbyCheckoutCardLoading />
            </div>
          ) : null}
          <TabbyOfficialCard
            price={price}
            cardId={cardId}
            onInitReady={() => setLoadState('ready')}
            onInitFailed={() => setLoadState('failed')}
          />
        </div>
      )}
    </div>
  );
}
