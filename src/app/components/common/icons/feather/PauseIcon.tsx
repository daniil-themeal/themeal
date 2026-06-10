import PauseIconSvg16 from '../svg/pause-16.svg?raw';
import PauseIconSvg20 from '../svg/pause-20.svg?raw';
import PauseIconSvg24 from '../svg/pause-24.svg?raw';
import PauseIconSvg32 from '../svg/pause-32.svg?raw';
import PauseIconSvg40 from '../svg/pause-40.svg?raw';
import PauseIconSvg48 from '../svg/pause-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PAUSE_ICON_SVG_BY_SIZE = {
  16: PauseIconSvg16,
  20: PauseIconSvg20,
  24: PauseIconSvg24,
  32: PauseIconSvg32,
  40: PauseIconSvg40,
  48: PauseIconSvg48,
} as const;

export function PauseIcon({ size = 20, className = '' }: IconProps) {
  const svg = PAUSE_ICON_SVG_BY_SIZE[size] ?? PauseIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
