import HashIconSvg16 from '../svg/hash-16.svg?raw';
import HashIconSvg20 from '../svg/hash-20.svg?raw';
import HashIconSvg24 from '../svg/hash-24.svg?raw';
import HashIconSvg32 from '../svg/hash-32.svg?raw';
import HashIconSvg40 from '../svg/hash-40.svg?raw';
import HashIconSvg48 from '../svg/hash-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const HASH_ICON_SVG_BY_SIZE = {
  16: HashIconSvg16,
  20: HashIconSvg20,
  24: HashIconSvg24,
  32: HashIconSvg32,
  40: HashIconSvg40,
  48: HashIconSvg48,
} as const;

export function HashIcon({ size = 20, className = '' }: IconProps) {
  const svg = HASH_ICON_SVG_BY_SIZE[size] ?? HashIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
