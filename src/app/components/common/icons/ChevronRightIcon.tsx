import type { CSSProperties } from 'react';

import chevronRightIcon from './chevron-right-16x16.png';
import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type ChevronRightIconProps = {
  size?: IconSize;
  className?: string;
};

const maskStyle: CSSProperties = {
  WebkitMaskImage: `url(${chevronRightIcon})`,
  maskImage: `url(${chevronRightIcon})`,
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

export function ChevronRightIcon({ size = 16, className = '' }: ChevronRightIconProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        iconSizeClassName[size],
        'inline-block shrink-0 bg-current transition-colors',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={maskStyle}
    />
  );
}
