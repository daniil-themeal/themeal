import type { CSSProperties } from 'react';

import boxIcon from './box-20x20.png';
import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type BoxIconProps = {
  size?: IconSize;
  className?: string;
};

const maskStyle: CSSProperties = {
  WebkitMaskImage: `url(${boxIcon})`,
  maskImage: `url(${boxIcon})`,
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

export function BoxIcon({ size = 20, className = '' }: BoxIconProps) {
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
      style={maskStyle}
    />
  );
}
