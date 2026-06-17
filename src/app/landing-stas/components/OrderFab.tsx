import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from './icons';

import type { MealContentEn } from './content/mealContentEn';

const WHATSAPP_URL = 'https://wa.me/971544595462?text=';

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
        d="M0.119751 14.9882C0.118967 17.5351 0.775581 20.0215 2.0239 22.2131L0 29.7014L7.5623 27.692C9.64596 28.8433 11.992 29.4503 14.3791 29.4512H14.3853C22.2472 29.4512 28.6472 22.9676 28.6506 14.9998C28.6519 11.1383 27.1693 7.50716 24.4761 4.77561C21.7826 2.0444 18.2013 0.539185 14.3853 0.537598C6.52204 0.537598 0.122884 7.02028 0.119751 14.9882ZM4.62338 21.8356L4.34101 21.3814C3.15403 19.4688 2.52752 17.2586 2.52842 14.9891C2.53088 8.36637 7.84959 2.97824 14.3898 2.97824C17.557 2.9796 20.5335 4.23077 22.7723 6.50085C25.011 8.77114 26.2428 11.7891 26.242 14.9989C26.2391 21.6216 20.9203 27.0104 14.3853 27.0104H14.3806C12.2527 27.0093 10.1658 26.4302 8.34583 25.3359L7.91271 25.0756L3.42509 26.2679L4.62338 21.8356Z"
        fill="#fff"
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
  hidden?: boolean;
};

export function OrderFab({ t, onOrderClick, hidden }: OrderFabProps) {
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowOrder(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (hidden) return null;

  return createPortal(
    <div className={`order-fab-group${showOrder ? ' order-fab-group--order-visible' : ''}`}>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="order-fab-wa"
      >
        <OrderFabWhatsAppIcon />
      </a>

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
