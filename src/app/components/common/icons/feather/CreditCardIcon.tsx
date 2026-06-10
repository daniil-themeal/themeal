import CreditCardIconSvg16 from '../svg/credit-card-16.svg?raw';
import CreditCardIconSvg20 from '../svg/credit-card-20.svg?raw';
import CreditCardIconSvg24 from '../svg/credit-card-24.svg?raw';
import CreditCardIconSvg32 from '../svg/credit-card-32.svg?raw';
import CreditCardIconSvg40 from '../svg/credit-card-40.svg?raw';
import CreditCardIconSvg48 from '../svg/credit-card-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CREDIT_CARD_ICON_SVG_BY_SIZE = {
  16: CreditCardIconSvg16,
  20: CreditCardIconSvg20,
  24: CreditCardIconSvg24,
  32: CreditCardIconSvg32,
  40: CreditCardIconSvg40,
  48: CreditCardIconSvg48,
} as const;

export function CreditCardIcon({ size = 20, className = '' }: IconProps) {
  const svg = CREDIT_CARD_ICON_SVG_BY_SIZE[size] ?? CreditCardIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
