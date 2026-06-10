import DivideIconSvg16 from '../svg/divide-16.svg?raw';
import DivideIconSvg20 from '../svg/divide-20.svg?raw';
import DivideIconSvg24 from '../svg/divide-24.svg?raw';
import DivideIconSvg32 from '../svg/divide-32.svg?raw';
import DivideIconSvg40 from '../svg/divide-40.svg?raw';
import DivideIconSvg48 from '../svg/divide-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const DIVIDE_ICON_SVG_BY_SIZE = {
  16: DivideIconSvg16,
  20: DivideIconSvg20,
  24: DivideIconSvg24,
  32: DivideIconSvg32,
  40: DivideIconSvg40,
  48: DivideIconSvg48,
} as const;

export function DivideIcon({ size = 20, className = '' }: IconProps) {
  const svg = DIVIDE_ICON_SVG_BY_SIZE[size] ?? DivideIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
