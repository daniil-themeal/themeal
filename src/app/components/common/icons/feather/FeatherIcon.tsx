import FeatherIconSvg16 from '../svg/feather-16.svg?raw';
import FeatherIconSvg20 from '../svg/feather-20.svg?raw';
import FeatherIconSvg24 from '../svg/feather-24.svg?raw';
import FeatherIconSvg32 from '../svg/feather-32.svg?raw';
import FeatherIconSvg40 from '../svg/feather-40.svg?raw';
import FeatherIconSvg48 from '../svg/feather-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FEATHER_ICON_SVG_BY_SIZE = {
  16: FeatherIconSvg16,
  20: FeatherIconSvg20,
  24: FeatherIconSvg24,
  32: FeatherIconSvg32,
  40: FeatherIconSvg40,
  48: FeatherIconSvg48,
} as const;

export function FeatherIcon({ size = 20, className = '' }: IconProps) {
  const svg = FEATHER_ICON_SVG_BY_SIZE[size] ?? FeatherIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
