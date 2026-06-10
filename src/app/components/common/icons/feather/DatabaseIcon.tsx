import DatabaseIconSvg16 from '../svg/database-16.svg?raw';
import DatabaseIconSvg20 from '../svg/database-20.svg?raw';
import DatabaseIconSvg24 from '../svg/database-24.svg?raw';
import DatabaseIconSvg32 from '../svg/database-32.svg?raw';
import DatabaseIconSvg40 from '../svg/database-40.svg?raw';
import DatabaseIconSvg48 from '../svg/database-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const DATABASE_ICON_SVG_BY_SIZE = {
  16: DatabaseIconSvg16,
  20: DatabaseIconSvg20,
  24: DatabaseIconSvg24,
  32: DatabaseIconSvg32,
  40: DatabaseIconSvg40,
  48: DatabaseIconSvg48,
} as const;

export function DatabaseIcon({ size = 20, className = '' }: IconProps) {
  const svg = DATABASE_ICON_SVG_BY_SIZE[size] ?? DatabaseIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
