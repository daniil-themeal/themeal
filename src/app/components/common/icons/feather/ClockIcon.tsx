import ClockIconSvg16 from '../svg/clock-16.svg?raw';
import ClockIconSvg20 from '../svg/clock-20.svg?raw';
import ClockIconSvg24 from '../svg/clock-24.svg?raw';
import ClockIconSvg32 from '../svg/clock-32.svg?raw';
import ClockIconSvg40 from '../svg/clock-40.svg?raw';
import ClockIconSvg48 from '../svg/clock-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CLOCK_ICON_SVG_BY_SIZE = {
  16: ClockIconSvg16,
  20: ClockIconSvg20,
  24: ClockIconSvg24,
  32: ClockIconSvg32,
  40: ClockIconSvg40,
  48: ClockIconSvg48,
} as const;

export function ClockIcon({ size = 20, className = '' }: IconProps) {
  const svg = CLOCK_ICON_SVG_BY_SIZE[size] ?? ClockIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
