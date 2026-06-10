import CompassIconSvg16 from '../svg/compass-16.svg?raw';
import CompassIconSvg20 from '../svg/compass-20.svg?raw';
import CompassIconSvg24 from '../svg/compass-24.svg?raw';
import CompassIconSvg32 from '../svg/compass-32.svg?raw';
import CompassIconSvg40 from '../svg/compass-40.svg?raw';
import CompassIconSvg48 from '../svg/compass-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const COMPASS_ICON_SVG_BY_SIZE = {
  16: CompassIconSvg16,
  20: CompassIconSvg20,
  24: CompassIconSvg24,
  32: CompassIconSvg32,
  40: CompassIconSvg40,
  48: CompassIconSvg48,
} as const;

export function CompassIcon({ size = 20, className = '' }: IconProps) {
  const svg = COMPASS_ICON_SVG_BY_SIZE[size] ?? CompassIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
