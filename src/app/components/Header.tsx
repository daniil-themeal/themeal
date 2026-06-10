import type { CSSProperties } from 'react';

import svgPaths from '../../imports/svgPaths';

import { COLOR_TOKENS } from './common/designTokens';
import {
  DeliveryIcon,
  DesignSystemIcon,
  MessageCircleIcon,
  UserIcon,
} from './common/icons';
import type { IconSize } from './common/icons/iconSize';

const HEADER_ICON_SIZE = 24 as const satisfies IconSize;

const headerIconClassName =
  'text-white transition-colors duration-200 group-hover:text-[var(--header-icon-hover)]';

type HeaderCssVariables = CSSProperties & {
  '--header-icon-hover': string;
};

function SupportButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
      data-name="SupportButton"
      aria-label="Open payment success"
    >
      <MessageCircleIcon size={HEADER_ICON_SIZE} className={headerIconClassName} />
    </button>
  );
}

function DeliveryDetailsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
      data-name="DeliveryDetailsButton"
      aria-label="Open delivery details"
    >
      <DeliveryIcon size={HEADER_ICON_SIZE} className={headerIconClassName} />
    </button>
  );
}

function PaymentButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
      data-name="PaymentButton"
      aria-label="Open payment"
    >
      <svg className="block size-[24px]" fill="none" viewBox="0 0 24 24" aria-hidden>
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="2"
          stroke={COLOR_TOKENS.base.white}
          strokeWidth="1.75"
          className="transition-colors duration-200 group-hover:stroke-[var(--header-icon-hover)]"
        />
        <path
          d="M3 10H21"
          stroke={COLOR_TOKENS.base.white}
          strokeWidth="1.75"
          className="transition-colors duration-200 group-hover:stroke-[var(--header-icon-hover)]"
        />
        <path
          d="M6.5 14.5H10.5"
          stroke={COLOR_TOKENS.base.white}
          strokeWidth="1.75"
          strokeLinecap="round"
          className="transition-colors duration-200 group-hover:stroke-[var(--header-icon-hover)]"
        />
      </svg>
    </button>
  );
}

function DesignSystemButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
      data-name="DesignSystemButton"
      aria-label="Open design system"
    >
      <DesignSystemIcon size={HEADER_ICON_SIZE} className={headerIconClassName} />
    </button>
  );
}

function UserButton() {
  return (
    <div
      className="relative flex size-[56px] shrink-0 items-center justify-center"
      data-name="UserButton"
      aria-hidden="true"
    >
      <UserIcon size={HEADER_ICON_SIZE} className="text-white" />
    </div>
  );
}

function ScrollToFooterButton() {
  return (
    <a
      href="#footer"
      className="group relative flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
      aria-label="Scroll to footer"
    >
      <svg className="block size-[24px]" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 5v14M5 12l7 7 7-7"
          stroke={COLOR_TOKENS.base.white}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-200 group-hover:stroke-[var(--header-icon-hover)]"
        />
      </svg>
    </a>
  );
}

function ActionButtons({
  onDeliveryDetailsClick,
  onPaymentClick,
  onSuccessClick,
  onDesignSystemClick,
}: {
  onDeliveryDetailsClick: () => void;
  onPaymentClick: () => void;
  onSuccessClick: () => void;
  onDesignSystemClick: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center">
      <DesignSystemButton onClick={onDesignSystemClick} />
      <DeliveryDetailsButton onClick={onDeliveryDetailsClick} />
      <PaymentButton onClick={onPaymentClick} />
      <ScrollToFooterButton />
      <SupportButton onClick={onSuccessClick} />
      <UserButton />
    </div>
  );
}

export default function Header({
  onDeliveryDetailsClick,
  onPaymentClick,
  onSuccessClick,
  onDesignSystemClick,
}: {
  onDeliveryDetailsClick: () => void;
  onPaymentClick: () => void;
  onSuccessClick: () => void;
  onDesignSystemClick: () => void;
}) {
  const headerStyle: HeaderCssVariables = {
    backgroundColor: COLOR_TOKENS.primary[900],
    '--header-icon-hover': COLOR_TOKENS.primary[300],
  };

  return (
    <div
      className="pointer-events-auto flex h-[56px] items-center justify-between overflow-hidden pl-[20px]"
      style={headerStyle}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex h-[28px] w-[72px] shrink-0 cursor-pointer items-center justify-center"
        aria-label="Scroll to top"
      >
        <svg
          className="block h-[22px] w-[72px]"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 84 25.6941"
        >
          <g id="theMeal_Logo">
            <path d={svgPaths.p34c96900} fill={COLOR_TOKENS.brand.logoYellow} />
            <path d={svgPaths.p257cc080} fill={COLOR_TOKENS.brand.logoYellow} />
            <path d={svgPaths.pa725b80} fill={COLOR_TOKENS.brand.logoYellow} />
            <path d={svgPaths.pe704bb0} fill={COLOR_TOKENS.brand.logoYellow} />
            <path d={svgPaths.p3066c180} fill={COLOR_TOKENS.brand.logoYellow} />
            <path d={svgPaths.p793eb80} fill={COLOR_TOKENS.brand.logoYellow} />
            <path d={svgPaths.p1766500} fill={COLOR_TOKENS.brand.logoYellow} />
          </g>
        </svg>
      </button>

      <ActionButtons
        onDeliveryDetailsClick={onDeliveryDetailsClick}
        onPaymentClick={onPaymentClick}
        onSuccessClick={onSuccessClick}
        onDesignSystemClick={onDesignSystemClick}
      />
    </div>
  );
}
