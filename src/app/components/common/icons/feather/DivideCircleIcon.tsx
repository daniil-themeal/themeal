import DivideCircleIconSvg16 from '../svg/divide-circle-16.svg?raw';
import DivideCircleIconSvg20 from '../svg/divide-circle-20.svg?raw';
import DivideCircleIconSvg24 from '../svg/divide-circle-24.svg?raw';
import DivideCircleIconSvg32 from '../svg/divide-circle-32.svg?raw';
import DivideCircleIconSvg40 from '../svg/divide-circle-40.svg?raw';
import DivideCircleIconSvg48 from '../svg/divide-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const DIVIDE_CIRCLE_ICON_SVG_BY_SIZE = {
  16: DivideCircleIconSvg16,
  20: DivideCircleIconSvg20,
  24: DivideCircleIconSvg24,
  32: DivideCircleIconSvg32,
  40: DivideCircleIconSvg40,
  48: DivideCircleIconSvg48,
} as const;

export function DivideCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = DIVIDE_CIRCLE_ICON_SVG_BY_SIZE[size] ?? DivideCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
