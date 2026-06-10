import DollarSignIconSvg16 from '../svg/dollar-sign-16.svg?raw';
import DollarSignIconSvg20 from '../svg/dollar-sign-20.svg?raw';
import DollarSignIconSvg24 from '../svg/dollar-sign-24.svg?raw';
import DollarSignIconSvg32 from '../svg/dollar-sign-32.svg?raw';
import DollarSignIconSvg40 from '../svg/dollar-sign-40.svg?raw';
import DollarSignIconSvg48 from '../svg/dollar-sign-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const DOLLAR_SIGN_ICON_SVG_BY_SIZE = {
  16: DollarSignIconSvg16,
  20: DollarSignIconSvg20,
  24: DollarSignIconSvg24,
  32: DollarSignIconSvg32,
  40: DollarSignIconSvg40,
  48: DollarSignIconSvg48,
} as const;

export function DollarSignIcon({ size = 20, className = '' }: IconProps) {
  const svg = DOLLAR_SIGN_ICON_SVG_BY_SIZE[size] ?? DollarSignIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
