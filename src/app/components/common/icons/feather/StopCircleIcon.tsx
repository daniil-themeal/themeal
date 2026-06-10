import StopCircleIconSvg16 from '../svg/stop-circle-16.svg?raw';
import StopCircleIconSvg20 from '../svg/stop-circle-20.svg?raw';
import StopCircleIconSvg24 from '../svg/stop-circle-24.svg?raw';
import StopCircleIconSvg32 from '../svg/stop-circle-32.svg?raw';
import StopCircleIconSvg40 from '../svg/stop-circle-40.svg?raw';
import StopCircleIconSvg48 from '../svg/stop-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const STOP_CIRCLE_ICON_SVG_BY_SIZE = {
  16: StopCircleIconSvg16,
  20: StopCircleIconSvg20,
  24: StopCircleIconSvg24,
  32: StopCircleIconSvg32,
  40: StopCircleIconSvg40,
  48: StopCircleIconSvg48,
} as const;

export function StopCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = STOP_CIRCLE_ICON_SVG_BY_SIZE[size] ?? StopCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
