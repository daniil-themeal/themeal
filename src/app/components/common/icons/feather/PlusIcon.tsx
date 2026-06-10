import PlusIconSvg16 from '../svg/plus-16.svg?raw';
import PlusIconSvg20 from '../svg/plus-20.svg?raw';
import PlusIconSvg24 from '../svg/plus-24.svg?raw';
import PlusIconSvg32 from '../svg/plus-32.svg?raw';
import PlusIconSvg40 from '../svg/plus-40.svg?raw';
import PlusIconSvg48 from '../svg/plus-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PLUS_ICON_SVG_BY_SIZE = {
  16: PlusIconSvg16,
  20: PlusIconSvg20,
  24: PlusIconSvg24,
  32: PlusIconSvg32,
  40: PlusIconSvg40,
  48: PlusIconSvg48,
} as const;

export function PlusIcon({ size = 20, className = '' }: IconProps) {
  const svg = PLUS_ICON_SVG_BY_SIZE[size] ?? PlusIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
