import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { socialLinks } from '../../config/socialLinks';
import { isDevToolsEnabled } from '../../devToolsEnabled';
import { Icon } from './icons';

import type { MealContentEn } from './content/mealContentEn';

function OrderFabWhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 29 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0.613321 14.9917C0.612649 17.4502 1.24654 19.8507 2.45188 21.9665L0.498047 29.1957L7.79858 27.2559C9.81782 28.3698 12.0802 28.9535 14.3793 28.9536H14.3853C21.9749 28.9536 28.153 22.6952 28.1563 15.0027C28.1577 11.2752 26.7266 7.77006 24.1263 5.13298C21.5265 2.49614 18.0688 1.04321 14.3847 1.0415C6.79424 1.0415 0.616566 7.29962 0.613433 14.9917"
        className="order-fab-wa-bg"
      />
      <path
        d="M10.8199 8.94697C10.5529 8.34554 10.2718 8.3334 10.0179 8.32286C9.80995 8.31378 9.57224 8.31446 9.33476 8.31446C9.09705 8.31446 8.71082 8.40508 8.38436 8.7663C8.05757 9.12786 7.13672 10.0016 7.13672 11.7787C7.13672 13.5557 8.41402 15.2732 8.59208 15.5145C8.77036 15.7553 11.0579 19.5187 14.6809 20.9666C17.6919 22.1698 18.3046 21.9305 18.9581 21.8701C19.6117 21.81 21.0671 20.9966 21.364 20.1532C21.6611 19.3098 21.6611 18.5869 21.572 18.4359C21.4829 18.2854 21.2452 18.195 20.8888 18.0144C20.5323 17.8339 18.7798 16.9599 18.4531 16.8394C18.1264 16.7189 17.8888 16.6588 17.651 17.0205C17.4133 17.3816 16.7308 18.195 16.5227 18.4359C16.3149 18.6773 16.1068 18.7074 15.7505 18.5267C15.3938 18.3455 14.2459 17.9645 12.884 16.7341C11.8243 15.7767 11.109 14.5944 10.901 14.2327C10.6931 13.8716 10.8788 13.6758 11.0575 13.4958C11.2176 13.334 11.4141 13.0741 11.5924 12.8632C11.7702 12.6523 11.8295 12.5018 11.9483 12.2609C12.0673 12.0198 12.0078 11.8088 11.9188 11.6282C11.8295 11.4475 11.1368 9.66113 10.8199 8.94697Z"
        fill="#fff"
      />
    </svg>
  );
}

type OrderFabProps = {
  t: MealContentEn;
  onOrderClick: () => void;
  onQuizClick: () => void;
  onTrialClick?: () => void;
  hidden?: boolean;
};

export function OrderFab({ t, onOrderClick, onQuizClick, onTrialClick, hidden }: OrderFabProps) {
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowOrder(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (hidden) return null;

  const showDevFabs = isDevToolsEnabled;

  return createPortal(
    <div className={`order-fab-group${showOrder ? ' order-fab-group--order-visible' : ''}`}>
      {showDevFabs ? (
        <button
          type="button"
          onClick={onQuizClick}
          aria-label={t.benefits.cta}
          className="order-fab-quiz"
        >
          <Icon.clock size={24} />
        </button>
      ) : null}

      <a
        href={socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="order-fab-wa"
      >
        <OrderFabWhatsAppIcon />
      </a>

      {onTrialClick && showDevFabs ? (
        <button
          type="button"
          onClick={onTrialClick}
          aria-label="Open trial offer"
          className="order-fab-trial"
        >
          <Icon.star size={20} />
          Trial
        </button>
      ) : null}

      <div className="order-fab-order-wrap">
        <div className="order-fab-order-clip">
          <button
            type="button"
            onClick={onOrderClick}
            aria-label={t.hero.cta}
            className="btn btn-primary btn-md order-fab"
            style={{ borderRadius: 'var(--r-pill)' }}
            tabIndex={showOrder ? 0 : -1}
            aria-hidden={!showOrder}
          >
            <Icon.utensils size={24} />
            Order
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
