import ShareIconSvg16 from '../svg/share-16.svg?raw';
import ShareIconSvg20 from '../svg/share-20.svg?raw';
import ShareIconSvg24 from '../svg/share-24.svg?raw';
import ShareIconSvg32 from '../svg/share-32.svg?raw';
import ShareIconSvg40 from '../svg/share-40.svg?raw';
import ShareIconSvg48 from '../svg/share-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SHARE_ICON_SVG_BY_SIZE = {
  16: ShareIconSvg16,
  20: ShareIconSvg20,
  24: ShareIconSvg24,
  32: ShareIconSvg32,
  40: ShareIconSvg40,
  48: ShareIconSvg48,
} as const;

export function ShareIcon({ size = 20, className = '' }: IconProps) {
  const svg = SHARE_ICON_SVG_BY_SIZE[size] ?? ShareIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
