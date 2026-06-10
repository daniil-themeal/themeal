import GiftIconSvg16 from '../svg/gift-16.svg?raw';
import GiftIconSvg20 from '../svg/gift-20.svg?raw';
import GiftIconSvg24 from '../svg/gift-24.svg?raw';
import GiftIconSvg32 from '../svg/gift-32.svg?raw';
import GiftIconSvg40 from '../svg/gift-40.svg?raw';
import GiftIconSvg48 from '../svg/gift-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const GIFT_ICON_SVG_BY_SIZE = {
  16: GiftIconSvg16,
  20: GiftIconSvg20,
  24: GiftIconSvg24,
  32: GiftIconSvg32,
  40: GiftIconSvg40,
  48: GiftIconSvg48,
} as const;

export function GiftIcon({ size = 20, className = '' }: IconProps) {
  const svg = GIFT_ICON_SVG_BY_SIZE[size] ?? GiftIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
