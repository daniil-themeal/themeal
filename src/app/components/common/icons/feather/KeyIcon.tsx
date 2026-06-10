import KeyIconSvg16 from '../svg/key-16.svg?raw';
import KeyIconSvg20 from '../svg/key-20.svg?raw';
import KeyIconSvg24 from '../svg/key-24.svg?raw';
import KeyIconSvg32 from '../svg/key-32.svg?raw';
import KeyIconSvg40 from '../svg/key-40.svg?raw';
import KeyIconSvg48 from '../svg/key-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const KEY_ICON_SVG_BY_SIZE = {
  16: KeyIconSvg16,
  20: KeyIconSvg20,
  24: KeyIconSvg24,
  32: KeyIconSvg32,
  40: KeyIconSvg40,
  48: KeyIconSvg48,
} as const;

export function KeyIcon({ size = 20, className = '' }: IconProps) {
  const svg = KEY_ICON_SVG_BY_SIZE[size] ?? KeyIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
