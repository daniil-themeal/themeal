import BookmarkIconSvg16 from '../svg/bookmark-16.svg?raw';
import BookmarkIconSvg20 from '../svg/bookmark-20.svg?raw';
import BookmarkIconSvg24 from '../svg/bookmark-24.svg?raw';
import BookmarkIconSvg32 from '../svg/bookmark-32.svg?raw';
import BookmarkIconSvg40 from '../svg/bookmark-40.svg?raw';
import BookmarkIconSvg48 from '../svg/bookmark-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BOOKMARK_ICON_SVG_BY_SIZE = {
  16: BookmarkIconSvg16,
  20: BookmarkIconSvg20,
  24: BookmarkIconSvg24,
  32: BookmarkIconSvg32,
  40: BookmarkIconSvg40,
  48: BookmarkIconSvg48,
} as const;

export function BookmarkIcon({ size = 20, className = '' }: IconProps) {
  const svg = BOOKMARK_ICON_SVG_BY_SIZE[size] ?? BookmarkIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
