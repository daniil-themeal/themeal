import InfoIconSvg16 from '../svg/info-16.svg?raw';
import InfoIconSvg20 from '../svg/info-20.svg?raw';
import InfoIconSvg24 from '../svg/info-24.svg?raw';
import InfoIconSvg32 from '../svg/info-32.svg?raw';
import InfoIconSvg40 from '../svg/info-40.svg?raw';
import InfoIconSvg48 from '../svg/info-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const INFO_ICON_SVG_BY_SIZE = {
  16: InfoIconSvg16,
  20: InfoIconSvg20,
  24: InfoIconSvg24,
  32: InfoIconSvg32,
  40: InfoIconSvg40,
  48: InfoIconSvg48,
} as const;

export function InfoIcon({ size = 20, className = '' }: IconProps) {
  const svg = INFO_ICON_SVG_BY_SIZE[size] ?? InfoIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
