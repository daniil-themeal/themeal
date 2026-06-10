import PauseCircleIconSvg16 from '../svg/pause-circle-16.svg?raw';
import PauseCircleIconSvg20 from '../svg/pause-circle-20.svg?raw';
import PauseCircleIconSvg24 from '../svg/pause-circle-24.svg?raw';
import PauseCircleIconSvg32 from '../svg/pause-circle-32.svg?raw';
import PauseCircleIconSvg40 from '../svg/pause-circle-40.svg?raw';
import PauseCircleIconSvg48 from '../svg/pause-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PAUSE_CIRCLE_ICON_SVG_BY_SIZE = {
  16: PauseCircleIconSvg16,
  20: PauseCircleIconSvg20,
  24: PauseCircleIconSvg24,
  32: PauseCircleIconSvg32,
  40: PauseCircleIconSvg40,
  48: PauseCircleIconSvg48,
} as const;

export function PauseCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = PAUSE_CIRCLE_ICON_SVG_BY_SIZE[size] ?? PauseCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
