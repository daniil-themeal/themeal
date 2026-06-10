import ImageIconSvg16 from '../svg/image-16.svg?raw';
import ImageIconSvg20 from '../svg/image-20.svg?raw';
import ImageIconSvg24 from '../svg/image-24.svg?raw';
import ImageIconSvg32 from '../svg/image-32.svg?raw';
import ImageIconSvg40 from '../svg/image-40.svg?raw';
import ImageIconSvg48 from '../svg/image-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const IMAGE_ICON_SVG_BY_SIZE = {
  16: ImageIconSvg16,
  20: ImageIconSvg20,
  24: ImageIconSvg24,
  32: ImageIconSvg32,
  40: ImageIconSvg40,
  48: ImageIconSvg48,
} as const;

export function ImageIcon({ size = 20, className = '' }: IconProps) {
  const svg = IMAGE_ICON_SVG_BY_SIZE[size] ?? ImageIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
