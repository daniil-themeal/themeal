import type { CSSProperties } from 'react';

import imgMeat from '../../../imports/CheckoutContainer-3/8e481e06f103e33b1c53332e73b7654c749ab79c.png';
import imgShrimp from '../../../imports/CheckoutContainer-3/6264db5ca4b4084cd123428e1c871e85b6e699eb.png';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { CheckoutSectionHeader } from './CheckoutSectionHeader';

const SVG_BAN =
  'M22.1174 0.251038C22.4521 -0.0836881 22.9947 -0.0836707 23.3294 0.251038C23.6642 0.585773 23.6642 1.12836 23.3294 1.46309L1.46309 23.3294C1.12836 23.6642 0.585773 23.6642 0.251038 23.3294C-0.0836707 22.9947 -0.0836881 22.4521 0.251038 22.1174L22.1174 0.251038Z';

const SVG_CHECK = 'M11.4667 0.8L4.13333 8.13333L0.8 4.8';

const ingredients = [
  {
    key: 'no-red-meat',
    label: 'No red meat',
    sub: 'Exclude beef, lamb',
    img: imgMeat,
  },
  {
    key: 'no-fish',
    label: 'No fish and seafood',
    sub: 'Exclude fish, shrimp, shellfish',
    img: imgShrimp,
  },
];

type IngredientsBlockProps = {
  selected: string[];
  onToggle: (key: string) => void;
};

type IngredientsBlockCssVariables = CSSProperties & {
  '--ingredients-item-title-font-size': string;
  '--ingredients-item-title-font-size-md': string;
  '--ingredients-item-description-font-size': string;
  '--ingredients-text': string;
  '--ingredients-muted': string;
  '--ingredients-active': string;
  '--ingredients-active-bg': string;
  '--ingredients-active-border': string;
  '--ingredients-card-bg': string;
  '--ingredients-idle-check-bg': string;
  '--ingredients-danger': string;
  '--ingredients-check-icon': string;
};

const ingredientsBlockStyle: IngredientsBlockCssVariables = {
  '--ingredients-item-title-font-size': FONT_SIZE_TOKENS[16],
  '--ingredients-item-title-font-size-md': FONT_SIZE_TOKENS[20],
  '--ingredients-item-description-font-size': FONT_SIZE_TOKENS[14],
  '--ingredients-text': COLOR_TOKENS.neutral[900],
  '--ingredients-muted': COLOR_TOKENS.neutral[500],
  '--ingredients-active': COLOR_TOKENS.primary[500],
  '--ingredients-active-bg': COLOR_TOKENS.primary[50],
  '--ingredients-active-border': COLOR_TOKENS.primary[200],
  '--ingredients-card-bg': COLOR_TOKENS.base.white,
  '--ingredients-idle-check-bg': COLOR_TOKENS.neutral[75],
  '--ingredients-danger': COLOR_TOKENS.danger[500],
  '--ingredients-check-icon': COLOR_TOKENS.base.white,
};

function BanIcon() {
  return (
    <svg
      className="absolute inset-0 block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 23.5805 23.5805"
      aria-hidden="true"
      focusable="false"
    >
      <path d={SVG_BAN} fill={COLOR_TOKENS.danger[500]} />
    </svg>
  );
}

function Checkmark() {
  return (
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 12.2667 8.93333"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={SVG_CHECK}
        stroke={COLOR_TOKENS.base.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function IngredientsBlock({ selected, onToggle }: IngredientsBlockProps) {
  return (
    <div
      className="flex w-full flex-col items-start gap-[16px]"
      style={ingredientsBlockStyle}
    >
      <CheckoutSectionHeader
        title="Exclude ingredients"
        subtitle="Optional. Select all that apply"
        gap={2}
      />

      <div className="flex w-full flex-col gap-[8px] md:gap-[12px]">
        {ingredients.map((item) => {
          const checked = selected.includes(item.key);

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onToggle(item.key)}
              className={[
                'relative w-full cursor-pointer rounded-[12px] text-left transition-colors duration-150',
                checked
                  ? 'bg-[var(--ingredients-active-bg)]'
                  : 'bg-[var(--ingredients-card-bg)]',
              ].join(' ')}
            >
              {checked ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[12px] border border-[var(--ingredients-active-border)]"
                />
              ) : null}

              <div className="flex cursor-pointer items-center gap-[12px] px-[20px] md:px-[24px]">
                <div
                  className={[
                    'flex flex-[1_0_0] flex-col gap-[12px] py-[24px]',
                    checked
                      ? 'text-[var(--ingredients-active)]'
                      : 'text-[var(--ingredients-text)]',
                  ].join(' ')}
                >
                  <p className="font-sans text-[length:var(--ingredients-item-title-font-size)] font-bold leading-[130%] md:text-[length:var(--ingredients-item-title-font-size-md)]">
                    {item.label}
                  </p>

                  <p
                    className={[
                      'font-sans text-[length:var(--ingredients-item-description-font-size)] font-medium leading-[130%]',
                      checked
                        ? 'text-[var(--ingredients-active)]'
                        : 'text-[var(--ingredients-muted)]',
                    ].join(' ')}
                  >
                    {item.sub}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-[16px]">
                  <div className="relative size-[24px]">
                    <img
                      alt=""
                      className="pointer-events-none absolute inset-0 size-full object-cover"
                      src={item.img}
                    />
                    <div className="absolute inset-[0.87%]">
                      <BanIcon />
                    </div>
                  </div>

                  <div className="flex items-center py-[16px]">
                    <div
                      className={[
                        'relative size-[20px] rounded-full transition-colors duration-150',
                        checked
                          ? 'bg-[var(--ingredients-active)]'
                          : 'bg-[var(--ingredients-idle-check-bg)]',
                      ].join(' ')}
                    >
                      {checked ? (
                        <div className="absolute left-1/2 top-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
                          <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4">
                            <Checkmark />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}