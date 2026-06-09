import type { CSSProperties } from 'react';

import packageIcon from './package-20x20.png';
import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type PackageIconProps = {
  size?: IconSize;
  className?: string;
};

const maskStyle: CSSProperties = {
  WebkitMaskImage: `url(${packageIcon})`,
  maskImage: `url(${packageIcon})`,
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

export function PackageIcon({ size = 20, className = '' }: PackageIconProps) {
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
