import TableIconSvg16 from '../svg/table-16.svg?raw';
import TableIconSvg20 from '../svg/table-20.svg?raw';
import TableIconSvg24 from '../svg/table-24.svg?raw';
import TableIconSvg32 from '../svg/table-32.svg?raw';
import TableIconSvg40 from '../svg/table-40.svg?raw';
import TableIconSvg48 from '../svg/table-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TABLE_ICON_SVG_BY_SIZE = {
  16: TableIconSvg16,
  20: TableIconSvg20,
  24: TableIconSvg24,
  32: TableIconSvg32,
  40: TableIconSvg40,
  48: TableIconSvg48,
} as const;

export function TableIcon({ size = 20, className = '' }: IconProps) {
  const svg = TABLE_ICON_SVG_BY_SIZE[size] ?? TableIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
