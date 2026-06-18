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
import { LoaderIcon } from '../common/icons/feather/LoaderIcon';
import {
  formatTabbyPrice,
  isTabbyConfigured,
  TABBY_PROMO_SCRIPT_URL,
  tabbyConfig,
} from '../../config/tabbyConfig';
import { TabbyPromoFallback } from './TabbyPromoFallback';
import { TabbyPromoModal } from './TabbyPromoModal';

type TabbyPromoSource = 'product' | 'cart';
type TabbyPromoLoadState = 'loading' | 'ready' | 'failed';

type TabbyPromoWidgetProps = {
  price: number;
  pricePerMonth?: number | null;
  source?: TabbyPromoSource;
  className?: string;
  style?: CSSProperties;
};

const TABBY_PROMO_INIT_TIMEOUT_MS = 2000;
/** Temporarily skip tabby-promo.js and show fallback UI immediately. */
const SKIP_TABBY_SCRIPT_LOAD = true;
const TABBY_DIALOG_HIDE_STYLE_ID = 'tabby-dialog-hide-style';
const TABBY_DIALOG_SELECTOR = '#TabbyDialogContainer';

function hideTabbyNativeDialog() {
  document.querySelectorAll(TABBY_DIALOG_SELECTOR).forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    node.style.setProperty('display', 'none', 'important');
    node.style.setProperty('visibility', 'hidden', 'important');
    node.style.setProperty('opacity', '0', 'important');
    node.style.setProperty('pointer-events', 'none', 'important');
  });
}

function ensureTabbyDialogHideStyle() {
  if (document.getElementById(TABBY_DIALOG_HIDE_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = TABBY_DIALOG_HIDE_STYLE_ID;
  style.textContent = `${TABBY_DIALOG_SELECTOR} { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; position: fixed !important; inset: auto !important; width: 0 !important; height: 0 !important; overflow: hidden !important; border: 0 !important; }`;
  document.head.appendChild(style);
}

if (typeof document !== 'undefined') {
  ensureTabbyDialogHideStyle();
  hideTabbyNativeDialog();
}

function useTabbyDialogGuard() {
  useEffect(() => {
    ensureTabbyDialogHideStyle();
    hideTabbyNativeDialog();

    const observer = new MutationObserver(() => {
      hideTabbyNativeDialog();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);
}

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

type TabbyPromoShellVariant = 'outline' | 'plain';

const TABBY_SHELL_BORDER_RADIUS = BORDER_RADIUS_TOKENS[8];

const tabbyShellRadiusStyle = {
  '--tabby-shell-border-radius': TABBY_SHELL_BORDER_RADIUS,
} as CSSProperties;

const TABBY_SHELL_RADIUS_CLASS =
  'overflow-hidden rounded-[length:var(--tabby-shell-border-radius)] corner-shape-squircle';

function TabbyPromoLoading() {
  return (
    <div className="flex min-h-[24px] items-center justify-center py-[12px]">
      <LoaderIcon size={16} className="animate-spin text-[var(--order-summary-muted)]" />
    </div>
  );
}

function TabbyPromoShell({
  children,
  onOpen,
  shellVariant = 'outline',
  ariaLabel = 'View Tabby payment options',
  ariaBusy = false,
  clickable = true,
}: {
  children: ReactNode;
  onOpen: () => void;
  shellVariant?: TabbyPromoShellVariant;
  ariaLabel?: string;
  ariaBusy?: boolean;
  clickable?: boolean;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!clickable) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  };

  const isOutline = shellVariant === 'outline';

  return (
    <div
      role="button"
      tabIndex={clickable ? 0 : -1}
      onClick={clickable ? onOpen : undefined}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-busy={ariaBusy || undefined}
      aria-disabled={!clickable || undefined}
      className={[
        isOutline ? BUTTON_VISUAL_CLASS_NAME : '',
        'block w-full text-left',
        isOutline ? 'px-[12px] py-[12px]' : 'px-0 py-0',
        clickable ? '' : 'pointer-events-none',
        clickable && isOutline
          ? [
              'hover:bg-[var(--button-bg-hover)] hover:border-[var(--button-border-hover)] hover:[box-shadow:var(--button-shadow-hover)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--order-summary-primary)] focus-visible:ring-offset-2',
            ].join(' ')
          : '',
        clickable && !isOutline
          ? [
              'cursor-pointer',
              TABBY_SHELL_RADIUS_CLASS,
              'transition-colors hover:bg-[var(--order-summary-divider)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--order-summary-primary)] focus-visible:ring-offset-2',
            ].join(' ')
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        isOutline
          ? {
              ...getButtonStyles('neutral', true),
              ...tabbyShellRadiusStyle,
              '--button-border-radius': TABBY_SHELL_BORDER_RADIUS,
            }
          : tabbyShellRadiusStyle
      }
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
  onInitReady,
  onInitFailed,
}: {
  price: number;
  source: TabbyPromoSource;
  className?: string;
  style?: CSSProperties;
  onInitReady: () => void;
  onInitFailed: () => void;
}) {
  const reactId = useId();
  const promoId = `tabby-promo-${reactId.replace(/:/g, '')}`;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (price <= 0) return;

    const selector = `#${promoId}`;
    let initTimeoutId: number | null = null;
    let contentObserver: MutationObserver | null = null;
    const abortController = new AbortController();
    const { signal } = abortController;

    const isPromoRendered = (container: HTMLDivElement) =>
      Boolean(container.textContent?.trim());

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
      if (isPromoRendered(container)) {
        settleReady();
      }
    };

    const initPromo = () => {
      if (signal.aborted) return;

      const container = containerRef.current;
      if (!container || !window.TabbyPromo) {
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

      checkReady(container);

      initTimeoutId = window.setTimeout(() => {
        const currentContainer = containerRef.current;
        if (!currentContainer || !isPromoRendered(currentContainer)) {
          settleFailed();
        }
      }, TABBY_PROMO_INIT_TIMEOUT_MS);
    };

    const removeScriptListener = loadTabbyPromoScript(initPromo, settleFailed);

    return () => {
      abortController.abort();
      removeScriptListener();
      contentObserver?.disconnect();
      if (initTimeoutId !== null) {
        window.clearTimeout(initTimeoutId);
      }
    };
  }, [onInitFailed, onInitReady, price, promoId, source]);

  return (
    <div
      id={promoId}
      ref={containerRef}
      className={['font-sans font-normal', className].filter(Boolean).join(' ')}
      style={
        {
          '--snippetTextColor': 'var(--order-summary-muted)',
          '--snippetLinkTextColor': 'var(--order-summary-text)',
          fontSize: 'var(--order-summary-small-font-size)',
          lineHeight: '1.5',
          fontFamily: 'inherit',
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
  const tabbyConfigured = isTabbyConfigured();
  const [promoLoadState, setPromoLoadState] = useState<TabbyPromoLoadState>(() =>
    tabbyConfigured ? 'loading' : 'failed',
  );

  useTabbyDialogGuard();

  const handleInitReady = useCallback(() => {
    setPromoLoadState('ready');
  }, []);

  const handleInitFailed = useCallback(() => {
    setPromoLoadState('failed');
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    if (SKIP_TABBY_SCRIPT_LOAD) return;

    if (tabbyConfigured) {
      setPromoLoadState('loading');
    } else {
      setPromoLoadState('failed');
    }
  }, [price, tabbyConfigured]);

  if (price <= 0) return null;

  if (SKIP_TABBY_SCRIPT_LOAD) {
    return (
      <>
        <TabbyPromoShell shellVariant="outline" onOpen={handleOpenModal}>
          <TabbyPromoFallback price={price} pricePerMonth={pricePerMonth} />
        </TabbyPromoShell>

        <TabbyPromoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          price={price}
        />
      </>
    );
  }

  const useFallback = !tabbyConfigured || promoLoadState === 'failed';
  const isLoading = tabbyConfigured && promoLoadState === 'loading';
  const isReady = tabbyConfigured && promoLoadState === 'ready';
  const canOpenModal = !isLoading;
  const shellVariant = isReady ? 'plain' : 'outline';

  return (
    <>
      <TabbyPromoShell
        shellVariant={shellVariant}
        onOpen={handleOpenModal}
        clickable={canOpenModal}
        ariaBusy={isLoading}
      >
        {useFallback ? (
          <TabbyPromoFallback price={price} pricePerMonth={pricePerMonth} />
        ) : (
          <div className={`relative ${isLoading ? 'min-h-[48px]' : ''}`}>
            {isLoading ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--checkout-page-bg)]">
                <TabbyPromoLoading />
              </div>
            ) : null}
            <TabbyOfficialPromo
              price={price}
              source={source}
              className={className}
              style={style}
              onInitReady={handleInitReady}
              onInitFailed={handleInitFailed}
            />
          </div>
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
