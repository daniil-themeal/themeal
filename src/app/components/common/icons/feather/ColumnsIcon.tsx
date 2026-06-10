import ColumnsIconSvg16 from '../svg/columns-16.svg?raw';
import ColumnsIconSvg20 from '../svg/columns-20.svg?raw';
import ColumnsIconSvg24 from '../svg/columns-24.svg?raw';
import ColumnsIconSvg32 from '../svg/columns-32.svg?raw';
import ColumnsIconSvg40 from '../svg/columns-40.svg?raw';
import ColumnsIconSvg48 from '../svg/columns-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const COLUMNS_ICON_SVG_BY_SIZE = {
  16: ColumnsIconSvg16,
  20: ColumnsIconSvg20,
  24: ColumnsIconSvg24,
  32: ColumnsIconSvg32,
  40: ColumnsIconSvg40,
  48: ColumnsIconSvg48,
} as const;

export function ColumnsIcon({ size = 20, className = '' }: IconProps) {
  const svg = COLUMNS_ICON_SVG_BY_SIZE[size] ?? ColumnsIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
