import ThumbsDownIconSvg16 from '../svg/thumbs-down-16.svg?raw';
import ThumbsDownIconSvg20 from '../svg/thumbs-down-20.svg?raw';
import ThumbsDownIconSvg24 from '../svg/thumbs-down-24.svg?raw';
import ThumbsDownIconSvg32 from '../svg/thumbs-down-32.svg?raw';
import ThumbsDownIconSvg40 from '../svg/thumbs-down-40.svg?raw';
import ThumbsDownIconSvg48 from '../svg/thumbs-down-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const THUMBS_DOWN_ICON_SVG_BY_SIZE = {
  16: ThumbsDownIconSvg16,
  20: ThumbsDownIconSvg20,
  24: ThumbsDownIconSvg24,
  32: ThumbsDownIconSvg32,
  40: ThumbsDownIconSvg40,
  48: ThumbsDownIconSvg48,
} as const;

export function ThumbsDownIcon({ size = 20, className = '' }: IconProps) {
  const svg = THUMBS_DOWN_ICON_SVG_BY_SIZE[size] ?? ThumbsDownIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
