import InstagramIconSvg16 from '../svg/instagram-16.svg?raw';
import InstagramIconSvg20 from '../svg/instagram-20.svg?raw';
import InstagramIconSvg24 from '../svg/instagram-24.svg?raw';
import InstagramIconSvg32 from '../svg/instagram-32.svg?raw';
import InstagramIconSvg40 from '../svg/instagram-40.svg?raw';
import InstagramIconSvg48 from '../svg/instagram-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const INSTAGRAM_ICON_SVG_BY_SIZE = {
  16: InstagramIconSvg16,
  20: InstagramIconSvg20,
  24: InstagramIconSvg24,
  32: InstagramIconSvg32,
  40: InstagramIconSvg40,
  48: InstagramIconSvg48,
} as const;

export function InstagramIcon({ size = 20, className = '' }: IconProps) {
  const svg = INSTAGRAM_ICON_SVG_BY_SIZE[size] ?? InstagramIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
