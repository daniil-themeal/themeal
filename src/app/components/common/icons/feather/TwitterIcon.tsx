import TwitterIconSvg16 from '../svg/twitter-16.svg?raw';
import TwitterIconSvg20 from '../svg/twitter-20.svg?raw';
import TwitterIconSvg24 from '../svg/twitter-24.svg?raw';
import TwitterIconSvg32 from '../svg/twitter-32.svg?raw';
import TwitterIconSvg40 from '../svg/twitter-40.svg?raw';
import TwitterIconSvg48 from '../svg/twitter-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TWITTER_ICON_SVG_BY_SIZE = {
  16: TwitterIconSvg16,
  20: TwitterIconSvg20,
  24: TwitterIconSvg24,
  32: TwitterIconSvg32,
  40: TwitterIconSvg40,
  48: TwitterIconSvg48,
} as const;

export function TwitterIcon({ size = 20, className = '' }: IconProps) {
  const svg = TWITTER_ICON_SVG_BY_SIZE[size] ?? TwitterIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
