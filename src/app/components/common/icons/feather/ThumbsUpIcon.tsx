import ThumbsUpIconSvg16 from '../svg/thumbs-up-16.svg?raw';
import ThumbsUpIconSvg20 from '../svg/thumbs-up-20.svg?raw';
import ThumbsUpIconSvg24 from '../svg/thumbs-up-24.svg?raw';
import ThumbsUpIconSvg32 from '../svg/thumbs-up-32.svg?raw';
import ThumbsUpIconSvg40 from '../svg/thumbs-up-40.svg?raw';
import ThumbsUpIconSvg48 from '../svg/thumbs-up-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const THUMBS_UP_ICON_SVG_BY_SIZE = {
  16: ThumbsUpIconSvg16,
  20: ThumbsUpIconSvg20,
  24: ThumbsUpIconSvg24,
  32: ThumbsUpIconSvg32,
  40: ThumbsUpIconSvg40,
  48: ThumbsUpIconSvg48,
} as const;

export function ThumbsUpIcon({ size = 20, className = '' }: IconProps) {
  const svg = THUMBS_UP_ICON_SVG_BY_SIZE[size] ?? ThumbsUpIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
