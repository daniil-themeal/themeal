import DivideSquareIconSvg16 from '../svg/divide-square-16.svg?raw';
import DivideSquareIconSvg20 from '../svg/divide-square-20.svg?raw';
import DivideSquareIconSvg24 from '../svg/divide-square-24.svg?raw';
import DivideSquareIconSvg32 from '../svg/divide-square-32.svg?raw';
import DivideSquareIconSvg40 from '../svg/divide-square-40.svg?raw';
import DivideSquareIconSvg48 from '../svg/divide-square-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const DIVIDE_SQUARE_ICON_SVG_BY_SIZE = {
  16: DivideSquareIconSvg16,
  20: DivideSquareIconSvg20,
  24: DivideSquareIconSvg24,
  32: DivideSquareIconSvg32,
  40: DivideSquareIconSvg40,
  48: DivideSquareIconSvg48,
} as const;

export function DivideSquareIcon({ size = 20, className = '' }: IconProps) {
  const svg = DIVIDE_SQUARE_ICON_SVG_BY_SIZE[size] ?? DivideSquareIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
