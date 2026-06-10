import YoutubeIconSvg16 from '../svg/youtube-16.svg?raw';
import YoutubeIconSvg20 from '../svg/youtube-20.svg?raw';
import YoutubeIconSvg24 from '../svg/youtube-24.svg?raw';
import YoutubeIconSvg32 from '../svg/youtube-32.svg?raw';
import YoutubeIconSvg40 from '../svg/youtube-40.svg?raw';
import YoutubeIconSvg48 from '../svg/youtube-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const YOUTUBE_ICON_SVG_BY_SIZE = {
  16: YoutubeIconSvg16,
  20: YoutubeIconSvg20,
  24: YoutubeIconSvg24,
  32: YoutubeIconSvg32,
  40: YoutubeIconSvg40,
  48: YoutubeIconSvg48,
} as const;

export function YoutubeIcon({ size = 20, className = '' }: IconProps) {
  const svg = YOUTUBE_ICON_SVG_BY_SIZE[size] ?? YoutubeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
