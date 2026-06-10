import Share2IconSvg16 from '../svg/share-2-16.svg?raw';
import Share2IconSvg20 from '../svg/share-2-20.svg?raw';
import Share2IconSvg24 from '../svg/share-2-24.svg?raw';
import Share2IconSvg32 from '../svg/share-2-32.svg?raw';
import Share2IconSvg40 from '../svg/share-2-40.svg?raw';
import Share2IconSvg48 from '../svg/share-2-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SHARE2ICON_SVG_BY_SIZE = {
  16: Share2IconSvg16,
  20: Share2IconSvg20,
  24: Share2IconSvg24,
  32: Share2IconSvg32,
  40: Share2IconSvg40,
  48: Share2IconSvg48,
} as const;

export function Share2Icon({ size = 20, className = '' }: IconProps) {
  const svg = SHARE2ICON_SVG_BY_SIZE[size] ?? Share2IconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
