import PlusCircleIconSvg16 from '../svg/plus-circle-16.svg?raw';
import PlusCircleIconSvg20 from '../svg/plus-circle-20.svg?raw';
import PlusCircleIconSvg24 from '../svg/plus-circle-24.svg?raw';
import PlusCircleIconSvg32 from '../svg/plus-circle-32.svg?raw';
import PlusCircleIconSvg40 from '../svg/plus-circle-40.svg?raw';
import PlusCircleIconSvg48 from '../svg/plus-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PLUS_CIRCLE_ICON_SVG_BY_SIZE = {
  16: PlusCircleIconSvg16,
  20: PlusCircleIconSvg20,
  24: PlusCircleIconSvg24,
  32: PlusCircleIconSvg32,
  40: PlusCircleIconSvg40,
  48: PlusCircleIconSvg48,
} as const;

export function PlusCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = PLUS_CIRCLE_ICON_SVG_BY_SIZE[size] ?? PlusCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
