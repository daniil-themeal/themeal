import CoffeeIconSvg16 from '../svg/coffee-16.svg?raw';
import CoffeeIconSvg20 from '../svg/coffee-20.svg?raw';
import CoffeeIconSvg24 from '../svg/coffee-24.svg?raw';
import CoffeeIconSvg32 from '../svg/coffee-32.svg?raw';
import CoffeeIconSvg40 from '../svg/coffee-40.svg?raw';
import CoffeeIconSvg48 from '../svg/coffee-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const COFFEE_ICON_SVG_BY_SIZE = {
  16: CoffeeIconSvg16,
  20: CoffeeIconSvg20,
  24: CoffeeIconSvg24,
  32: CoffeeIconSvg32,
  40: CoffeeIconSvg40,
  48: CoffeeIconSvg48,
} as const;

export function CoffeeIcon({ size = 20, className = '' }: IconProps) {
  const svg = COFFEE_ICON_SVG_BY_SIZE[size] ?? CoffeeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
