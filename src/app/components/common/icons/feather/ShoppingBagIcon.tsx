import ShoppingBagIconSvg16 from '../svg/shopping-bag-16.svg?raw';
import ShoppingBagIconSvg20 from '../svg/shopping-bag-20.svg?raw';
import ShoppingBagIconSvg24 from '../svg/shopping-bag-24.svg?raw';
import ShoppingBagIconSvg32 from '../svg/shopping-bag-32.svg?raw';
import ShoppingBagIconSvg40 from '../svg/shopping-bag-40.svg?raw';
import ShoppingBagIconSvg48 from '../svg/shopping-bag-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SHOPPING_BAG_ICON_SVG_BY_SIZE = {
  16: ShoppingBagIconSvg16,
  20: ShoppingBagIconSvg20,
  24: ShoppingBagIconSvg24,
  32: ShoppingBagIconSvg32,
  40: ShoppingBagIconSvg40,
  48: ShoppingBagIconSvg48,
} as const;

export function ShoppingBagIcon({ size = 20, className = '' }: IconProps) {
  const svg = SHOPPING_BAG_ICON_SVG_BY_SIZE[size] ?? ShoppingBagIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
