import TypeIconSvg16 from '../svg/type-16.svg?raw';
import TypeIconSvg20 from '../svg/type-20.svg?raw';
import TypeIconSvg24 from '../svg/type-24.svg?raw';
import TypeIconSvg32 from '../svg/type-32.svg?raw';
import TypeIconSvg40 from '../svg/type-40.svg?raw';
import TypeIconSvg48 from '../svg/type-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TYPE_ICON_SVG_BY_SIZE = {
  16: TypeIconSvg16,
  20: TypeIconSvg20,
  24: TypeIconSvg24,
  32: TypeIconSvg32,
  40: TypeIconSvg40,
  48: TypeIconSvg48,
} as const;

export function TypeIcon({ size = 20, className = '' }: IconProps) {
  const svg = TYPE_ICON_SVG_BY_SIZE[size] ?? TypeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
