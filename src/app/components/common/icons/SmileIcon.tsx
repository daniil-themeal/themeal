import type { CSSProperties } from 'react';

import smileIcon from './smile-20x20.png';
import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type SmileIconProps = {
  size?: IconSize;
  className?: string;
};

const maskStyle: CSSProperties = {
  WebkitMaskImage: `url(${smileIcon})`,
  maskImage: `url(${smileIcon})`,
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

export function SmileIcon({ size = 20, className = '' }: SmileIconProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        iconSizeClassName[size],
        'block shrink-0 bg-current',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={maskStyle}
    />
  );
}
