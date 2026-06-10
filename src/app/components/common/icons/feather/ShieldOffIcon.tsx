import ShieldOffIconSvg16 from '../svg/shield-off-16.svg?raw';
import ShieldOffIconSvg20 from '../svg/shield-off-20.svg?raw';
import ShieldOffIconSvg24 from '../svg/shield-off-24.svg?raw';
import ShieldOffIconSvg32 from '../svg/shield-off-32.svg?raw';
import ShieldOffIconSvg40 from '../svg/shield-off-40.svg?raw';
import ShieldOffIconSvg48 from '../svg/shield-off-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SHIELD_OFF_ICON_SVG_BY_SIZE = {
  16: ShieldOffIconSvg16,
  20: ShieldOffIconSvg20,
  24: ShieldOffIconSvg24,
  32: ShieldOffIconSvg32,
  40: ShieldOffIconSvg40,
  48: ShieldOffIconSvg48,
} as const;

export function ShieldOffIcon({ size = 20, className = '' }: IconProps) {
  const svg = SHIELD_OFF_ICON_SVG_BY_SIZE[size] ?? ShieldOffIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
