import PlayIconSvg16 from '../svg/play-16.svg?raw';
import PlayIconSvg20 from '../svg/play-20.svg?raw';
import PlayIconSvg24 from '../svg/play-24.svg?raw';
import PlayIconSvg32 from '../svg/play-32.svg?raw';
import PlayIconSvg40 from '../svg/play-40.svg?raw';
import PlayIconSvg48 from '../svg/play-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PLAY_ICON_SVG_BY_SIZE = {
  16: PlayIconSvg16,
  20: PlayIconSvg20,
  24: PlayIconSvg24,
  32: PlayIconSvg32,
  40: PlayIconSvg40,
  48: PlayIconSvg48,
} as const;

export function PlayIcon({ size = 20, className = '' }: IconProps) {
  const svg = PLAY_ICON_SVG_BY_SIZE[size] ?? PlayIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
