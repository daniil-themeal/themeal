import PlusSquareIconSvg16 from '../svg/plus-square-16.svg?raw';
import PlusSquareIconSvg20 from '../svg/plus-square-20.svg?raw';
import PlusSquareIconSvg24 from '../svg/plus-square-24.svg?raw';
import PlusSquareIconSvg32 from '../svg/plus-square-32.svg?raw';
import PlusSquareIconSvg40 from '../svg/plus-square-40.svg?raw';
import PlusSquareIconSvg48 from '../svg/plus-square-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PLUS_SQUARE_ICON_SVG_BY_SIZE = {
  16: PlusSquareIconSvg16,
  20: PlusSquareIconSvg20,
  24: PlusSquareIconSvg24,
  32: PlusSquareIconSvg32,
  40: PlusSquareIconSvg40,
  48: PlusSquareIconSvg48,
} as const;

export function PlusSquareIcon({ size = 20, className = '' }: IconProps) {
  const svg = PLUS_SQUARE_ICON_SVG_BY_SIZE[size] ?? PlusSquareIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
