import ScissorsIconSvg16 from '../svg/scissors-16.svg?raw';
import ScissorsIconSvg20 from '../svg/scissors-20.svg?raw';
import ScissorsIconSvg24 from '../svg/scissors-24.svg?raw';
import ScissorsIconSvg32 from '../svg/scissors-32.svg?raw';
import ScissorsIconSvg40 from '../svg/scissors-40.svg?raw';
import ScissorsIconSvg48 from '../svg/scissors-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SCISSORS_ICON_SVG_BY_SIZE = {
  16: ScissorsIconSvg16,
  20: ScissorsIconSvg20,
  24: ScissorsIconSvg24,
  32: ScissorsIconSvg32,
  40: ScissorsIconSvg40,
  48: ScissorsIconSvg48,
} as const;

export function ScissorsIcon({ size = 20, className = '' }: IconProps) {
  const svg = SCISSORS_ICON_SVG_BY_SIZE[size] ?? ScissorsIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
