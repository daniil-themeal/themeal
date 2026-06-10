import WatchIconSvg16 from '../svg/watch-16.svg?raw';
import WatchIconSvg20 from '../svg/watch-20.svg?raw';
import WatchIconSvg24 from '../svg/watch-24.svg?raw';
import WatchIconSvg32 from '../svg/watch-32.svg?raw';
import WatchIconSvg40 from '../svg/watch-40.svg?raw';
import WatchIconSvg48 from '../svg/watch-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const WATCH_ICON_SVG_BY_SIZE = {
  16: WatchIconSvg16,
  20: WatchIconSvg20,
  24: WatchIconSvg24,
  32: WatchIconSvg32,
  40: WatchIconSvg40,
  48: WatchIconSvg48,
} as const;

export function WatchIcon({ size = 20, className = '' }: IconProps) {
  const svg = WATCH_ICON_SVG_BY_SIZE[size] ?? WatchIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
