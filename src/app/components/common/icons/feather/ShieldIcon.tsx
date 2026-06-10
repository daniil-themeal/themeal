import ShieldIconSvg16 from '../svg/shield-16.svg?raw';
import ShieldIconSvg20 from '../svg/shield-20.svg?raw';
import ShieldIconSvg24 from '../svg/shield-24.svg?raw';
import ShieldIconSvg32 from '../svg/shield-32.svg?raw';
import ShieldIconSvg40 from '../svg/shield-40.svg?raw';
import ShieldIconSvg48 from '../svg/shield-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SHIELD_ICON_SVG_BY_SIZE = {
  16: ShieldIconSvg16,
  20: ShieldIconSvg20,
  24: ShieldIconSvg24,
  32: ShieldIconSvg32,
  40: ShieldIconSvg40,
  48: ShieldIconSvg48,
} as const;

export function ShieldIcon({ size = 20, className = '' }: IconProps) {
  const svg = SHIELD_ICON_SVG_BY_SIZE[size] ?? ShieldIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
