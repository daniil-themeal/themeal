import ShoppingCartIconSvg16 from '../svg/shopping-cart-16.svg?raw';
import ShoppingCartIconSvg20 from '../svg/shopping-cart-20.svg?raw';
import ShoppingCartIconSvg24 from '../svg/shopping-cart-24.svg?raw';
import ShoppingCartIconSvg32 from '../svg/shopping-cart-32.svg?raw';
import ShoppingCartIconSvg40 from '../svg/shopping-cart-40.svg?raw';
import ShoppingCartIconSvg48 from '../svg/shopping-cart-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SHOPPING_CART_ICON_SVG_BY_SIZE = {
  16: ShoppingCartIconSvg16,
  20: ShoppingCartIconSvg20,
  24: ShoppingCartIconSvg24,
  32: ShoppingCartIconSvg32,
  40: ShoppingCartIconSvg40,
  48: ShoppingCartIconSvg48,
} as const;

export function ShoppingCartIcon({ size = 20, className = '' }: IconProps) {
  const svg = SHOPPING_CART_ICON_SVG_BY_SIZE[size] ?? ShoppingCartIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
