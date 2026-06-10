import RssIconSvg16 from '../svg/rss-16.svg?raw';
import RssIconSvg20 from '../svg/rss-20.svg?raw';
import RssIconSvg24 from '../svg/rss-24.svg?raw';
import RssIconSvg32 from '../svg/rss-32.svg?raw';
import RssIconSvg40 from '../svg/rss-40.svg?raw';
import RssIconSvg48 from '../svg/rss-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const RSS_ICON_SVG_BY_SIZE = {
  16: RssIconSvg16,
  20: RssIconSvg20,
  24: RssIconSvg24,
  32: RssIconSvg32,
  40: RssIconSvg40,
  48: RssIconSvg48,
} as const;

export function RssIcon({ size = 20, className = '' }: IconProps) {
  const svg = RSS_ICON_SVG_BY_SIZE[size] ?? RssIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
