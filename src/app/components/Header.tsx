import type { CSSProperties } from 'react';

import svgPaths from '../../imports/svgPaths';

import { COLOR_TOKENS } from './common/designTokens';

type HeaderCssVariables = CSSProperties & {
  '--header-icon-hover': string;
};

function SupportButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative size-[56px] shrink-0 cursor-pointer"
      data-name="SupportButton"
      aria-label="Open delivery details"
    >
      <div className="absolute left-[calc(50%+0.03px)] top-1/2 size-[24.774px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-[-0.4%_-0.4%_-0.39%_-0.4%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 24.9697 24.9698"
          >
            <g id="Frame 2685">
              <path
                d={svgPaths.p8ea0700}
                className="transition-colors duration-200 group-hover:fill-[var(--header-icon-hover)]"
                fill={COLOR_TOKENS.base.white}
                id="Vector (Stroke)"
              />
            </g>
          </svg>
        </div>
      </div>
    </button>
  );
}

function MyAccountButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative size-[56px] shrink-0 cursor-pointer"
      data-name="MyAccountButton"
      aria-label="Open design system"
    >
      <svg
        className="absolute inset-0 block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 56 56"
      >
        <g id="MyAccountButton">
          <path
            d={svgPaths.p1503fac0}
            className="transition-colors duration-200 group-hover:fill-[var(--header-icon-hover)]"
            fill={COLOR_TOKENS.base.white}
            id="Icon (Stroke)"
          />
        </g>
      </svg>
    </button>
  );
}

function ScrollToFooterButton() {
  return (
    <a
      href="#footer"
      className="group relative flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
      aria-label="Scroll to footer"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
  onMessageClick,
  onUserClick,
}: {
  onMessageClick: () => void;
  onUserClick: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center">
      <ScrollToFooterButton />
      <SupportButton onClick={onMessageClick} />
      <MyAccountButton onClick={onUserClick} />
    </div>
  );
}

export default function Header({
  onMessageClick,
  onUserClick,
}: {
  onMessageClick: () => void;
  onUserClick: () => void;
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

      <ActionButtons onMessageClick={onMessageClick} onUserClick={onUserClick} />
    </div>
  );
}