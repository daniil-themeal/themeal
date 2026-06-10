import MusicIconSvg16 from '../svg/music-16.svg?raw';
import MusicIconSvg20 from '../svg/music-20.svg?raw';
import MusicIconSvg24 from '../svg/music-24.svg?raw';
import MusicIconSvg32 from '../svg/music-32.svg?raw';
import MusicIconSvg40 from '../svg/music-40.svg?raw';
import MusicIconSvg48 from '../svg/music-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MUSIC_ICON_SVG_BY_SIZE = {
  16: MusicIconSvg16,
  20: MusicIconSvg20,
  24: MusicIconSvg24,
  32: MusicIconSvg32,
  40: MusicIconSvg40,
  48: MusicIconSvg48,
} as const;

export function MusicIcon({ size = 20, className = '' }: IconProps) {
  const svg = MUSIC_ICON_SVG_BY_SIZE[size] ?? MusicIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
