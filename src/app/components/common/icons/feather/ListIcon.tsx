import ListIconSvg16 from '../svg/list-16.svg?raw';
import ListIconSvg20 from '../svg/list-20.svg?raw';
import ListIconSvg24 from '../svg/list-24.svg?raw';
import ListIconSvg32 from '../svg/list-32.svg?raw';
import ListIconSvg40 from '../svg/list-40.svg?raw';
import ListIconSvg48 from '../svg/list-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const LIST_ICON_SVG_BY_SIZE = {
  16: ListIconSvg16,
  20: ListIconSvg20,
  24: ListIconSvg24,
  32: ListIconSvg32,
  40: ListIconSvg40,
  48: ListIconSvg48,
} as const;

export function ListIcon({ size = 20, className = '' }: IconProps) {
  const svg = LIST_ICON_SVG_BY_SIZE[size] ?? ListIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
