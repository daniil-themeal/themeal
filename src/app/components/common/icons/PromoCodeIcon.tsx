import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from '../colorTokens';
import promocodeIcon from './promocode-24x24.png';
import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type PromoCodeIconProps = {
  size?: IconSize;
  className?: string;
};

const maskStyle: CSSProperties = {
  WebkitMaskImage: `url(${promocodeIcon})`,
  maskImage: `url(${promocodeIcon})`,
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

export function PromoCodeIcon({ size = 24, className = '' }: PromoCodeIconProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        iconSizeClassName[size],
        'inline-block shrink-0 bg-current',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...maskStyle, color: COLOR_TOKENS.neutral[200] }}
    />
  );
}
