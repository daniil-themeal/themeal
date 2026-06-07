import type { CSSProperties } from 'react';

import HeroMealsSection from './HeroMealsSection';

function MainOffer() {
  return (
    <span className="bg-[#fcde02] content-stretch flex font-['Quicksand:Bold',sans-serif] gap-[2px] items-start not-italic px-[8px] sm:px-[16px] md:px-[24px] py-[10px] sm:py-[12px] md:py-[20px] relative rounded-[999px] text-[#411864] whitespace-nowrap">
      <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[0.9] line-through relative shrink-0 text-[16px] sm:text-[20px] md:text-[25px] tracking-[-0.6px]">
        1596
      </span>
      <span className="leading-[0.7] relative shrink-0 tracking-[-2.24px] sm:tracking-[-4px] hero-title">
        999
      </span>
      <span className="leading-[0.7] relative shrink-0 text-[16px] sm:text-[20px] md:text-[25px] tracking-[-0.6px]">
        AED
      </span>
    </span>
  );
}

function Currency() {
  return (
    <div className="h-[9.469px] relative shrink-0 w-[24.709px]">
      <p className="font-['Quicksand:Bold',sans-serif] leading-[0.9] not-italic text-[11px] sm:text-[13px] text-white tracking-[-0.22px] whitespace-nowrap">
        AED
      </p>
    </div>
  );
}

function Price() {
  return (
    <div className="content-stretch flex gap-[2.149px] items-start relative shrink-0">
      <p className="font-['Quicksand:Bold',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[18px] sm:text-[25px] lg:text-[32px] text-white tracking-[-0.72px] whitespace-nowrap">
        799
      </p>
      <Currency />
    </div>
  );
}

function OfferInfo() {
  return (
    <span className="content-stretch flex flex-col gap-[4.297px] items-start relative shrink-0">
      <Price />
      <p className="font-['Quicksand:Bold',sans-serif] leading-[0.8] not-italic relative shrink-0 text-[11px] sm:text-[13px] text-white whitespace-nowrap">
        2 meals/day
      </p>
    </span>
  );
}

function SecondaryOffer() {
  return (
    <span className="bg-[#8c33d9] content-stretch flex gap-[4px] items-center px-[6px] sm:px-[16px] py-[5px] sm:py-[7px] relative rounded-[99999px]">
      <span className="relative shrink-0 size-[5.397px]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 5.39702 5.39702"
        >
          <circle
            cx="2.69851"
            cy="2.69851"
            fill="var(--fill-0, #FCDE02)"
            r="2.69851"
          />
        </svg>
      </span>
      <OfferInfo />
    </span>
  );
}

function PriceBlock() {
  return (
    <span className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <span
        className="flex items-center gap-[16px] justify-center relative shrink-0"
        style={
          {
            '--transform-inner-width': '0',
            '--transform-inner-height': '0',
          } as CSSProperties
        }
      >
        <span className="-rotate-5 flex-none">
          <MainOffer />
        </span>
      </span>

      <span
        className="absolute bottom-[-9.63px] flex items-center justify-center right-[-48.25px] w-[86.258px]"
        style={
          {
            '--transform-inner-width': '0',
            '--transform-inner-height': '0',
          } as CSSProperties
        }
      >
        <span className="flex-none rotate-[4.61deg]">
          <SecondaryOffer />
        </span>
      </span>
    </span>
  );
}

function OfferElement() {
  return (
    <span className="content-stretch flex gap-[8px] md:gap-[16px] items-center justify-center relative shrink-0">
      <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Quicksand:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#fcde02] tracking-[-0.56px] whitespace-nowrap hero-title">
        Only
      </span>

      <PriceBlock />
    </span>
  );
}

function H1Container() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <h1 className="hero-title-block content-stretch flex flex-col items-center relative size-full max-w-[900px] sm:max-w-[600px] md:max-w-[800px] xl:max-w-[1000px]">
          <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Quicksand:Bold',sans-serif] min-w-full not-italic relative shrink-0 text-center text-white w-[min-content] hero-title">
            Tasty ready-to-eat meals for&nbsp;a&nbsp;month
          </span>

          <OfferElement />
        </h1>
      </div>
    </div>
  );
}

function HeroBenefits() {
  return (
    <div className="content-stretch flex font-['Quicksand:Bold',sans-serif] gap-[16px] items-center leading-[1.3] not-italic relative shrink-0 text-[16px] sm:text-[20px] md:text-[25px] text-center text-shadow-[0px_4px_4px_rgba(0,0,0,0)] text-white max-w-[600px] w-full">
      <p className="flex-[1_0_0] min-w-px relative [text-shadow:0_4px_4px_rgba(0,0,0,0.20)]">
        Up to
        <br aria-hidden="true" /> 112&nbsp;meals/mo
      </p>
      <p className="flex-[1_0_0] min-w-px relative">
        Free
        <br aria-hidden="true" />
        delivery
      </p>
      <p className="flex-[1_0_0] min-w-px relative">
        From
        <br aria-hidden="true" />
        37.5&nbsp;AED/day
      </p>
    </div>
  );
}

function HeroActionBlock({ onOrderClick }: { onOrderClick?: () => void }) {
  return (
    <div className="relative shrink-0 w-full flex items-center justify-center">
      <div className="content-stretch flex flex-col gap-[24px] md:gap-[32px] lg:gap-[44px] items-center justify-center max-w-[900px] relative size-full">
        <button
          onClick={onOrderClick}
          className="btn flex items-center justify-center gap-[6px] px-[28px] lg:px-[40px] bg-[#f029a8] hover:bg-[#DA2599] transition-all duration-200 shadow-[0_4px_20px_rgba(240,41,168,0.35)] hover:shadow-[0_8px_32px_rgba(218,37,153,0.55)] hover:-translate-y-[2px] relative rounded-[8px] shrink-0 w-full sm:w-auto cursor-pointer [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Quicksand:Bold',sans-serif] leading-none not-italic text-[20px] lg:text-[25px] text-center text-white whitespace-nowrap"
        >
          View menu &amp; order
        </button>
        <HeroBenefits />
      </div>
    </div>
  );
}

export default function HeroSection({
  onOrderClick,
}: {
  onOrderClick?: () => void;
}) {
  return (
    <div className="bg-[#411864] content-stretch flex flex-col items-center pt-[64px] pb-[40px] md:pb-[64px] min-h-dvh h-dvh section-spacing-x relative overflow-hidden shrink-0 w-full">
      <style>{`
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-animate-1 { animation: heroSlideUp 0.6s ease-out 0.1s both; }
        .hero-animate-2 { animation: heroSlideUp 0.6s ease-out 0.3s both; }
      `}</style>

      <div className="absolute bottom-[-40px] md:bottom-[-64px] lg:bottom-[-80px] left-0 right-0 z-[0]">
        <HeroMealsSection />
      </div>

      <div className="relative z-[1] flex flex-col justify-between items-center size-full gap-[clamp(16px,3vh,48px)]">
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="hero-animate-1 w-full justify-center">
            <H1Container />
          </div>
        </div>

        <div className="hero-animate-2 w-full justify-center">
          <HeroActionBlock onOrderClick={onOrderClick} />
        </div>
      </div>
    </div>
  );
}