import RadioIconSvg16 from '../svg/radio-16.svg?raw';
import RadioIconSvg20 from '../svg/radio-20.svg?raw';
import RadioIconSvg24 from '../svg/radio-24.svg?raw';
import RadioIconSvg32 from '../svg/radio-32.svg?raw';
import RadioIconSvg40 from '../svg/radio-40.svg?raw';
import RadioIconSvg48 from '../svg/radio-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const RADIO_ICON_SVG_BY_SIZE = {
  16: RadioIconSvg16,
  20: RadioIconSvg20,
  24: RadioIconSvg24,
  32: RadioIconSvg32,
  40: RadioIconSvg40,
  48: RadioIconSvg48,
} as const;

export function RadioIcon({ size = 20, className = '' }: IconProps) {
  const svg = RADIO_ICON_SVG_BY_SIZE[size] ?? RadioIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
