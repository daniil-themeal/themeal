import PlayCircleIconSvg16 from '../svg/play-circle-16.svg?raw';
import PlayCircleIconSvg20 from '../svg/play-circle-20.svg?raw';
import PlayCircleIconSvg24 from '../svg/play-circle-24.svg?raw';
import PlayCircleIconSvg32 from '../svg/play-circle-32.svg?raw';
import PlayCircleIconSvg40 from '../svg/play-circle-40.svg?raw';
import PlayCircleIconSvg48 from '../svg/play-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PLAY_CIRCLE_ICON_SVG_BY_SIZE = {
  16: PlayCircleIconSvg16,
  20: PlayCircleIconSvg20,
  24: PlayCircleIconSvg24,
  32: PlayCircleIconSvg32,
  40: PlayCircleIconSvg40,
  48: PlayCircleIconSvg48,
} as const;

export function PlayCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = PLAY_CIRCLE_ICON_SVG_BY_SIZE[size] ?? PlayCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
