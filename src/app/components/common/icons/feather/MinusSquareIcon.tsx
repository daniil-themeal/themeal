import MinusSquareIconSvg16 from '../svg/minus-square-16.svg?raw';
import MinusSquareIconSvg20 from '../svg/minus-square-20.svg?raw';
import MinusSquareIconSvg24 from '../svg/minus-square-24.svg?raw';
import MinusSquareIconSvg32 from '../svg/minus-square-32.svg?raw';
import MinusSquareIconSvg40 from '../svg/minus-square-40.svg?raw';
import MinusSquareIconSvg48 from '../svg/minus-square-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MINUS_SQUARE_ICON_SVG_BY_SIZE = {
  16: MinusSquareIconSvg16,
  20: MinusSquareIconSvg20,
  24: MinusSquareIconSvg24,
  32: MinusSquareIconSvg32,
  40: MinusSquareIconSvg40,
  48: MinusSquareIconSvg48,
} as const;

export function MinusSquareIcon({ size = 20, className = '' }: IconProps) {
  const svg = MINUS_SQUARE_ICON_SVG_BY_SIZE[size] ?? MinusSquareIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
