import FastForwardIconSvg16 from '../svg/fast-forward-16.svg?raw';
import FastForwardIconSvg20 from '../svg/fast-forward-20.svg?raw';
import FastForwardIconSvg24 from '../svg/fast-forward-24.svg?raw';
import FastForwardIconSvg32 from '../svg/fast-forward-32.svg?raw';
import FastForwardIconSvg40 from '../svg/fast-forward-40.svg?raw';
import FastForwardIconSvg48 from '../svg/fast-forward-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FAST_FORWARD_ICON_SVG_BY_SIZE = {
  16: FastForwardIconSvg16,
  20: FastForwardIconSvg20,
  24: FastForwardIconSvg24,
  32: FastForwardIconSvg32,
  40: FastForwardIconSvg40,
  48: FastForwardIconSvg48,
} as const;

export function FastForwardIcon({ size = 20, className = '' }: IconProps) {
  const svg = FAST_FORWARD_ICON_SVG_BY_SIZE[size] ?? FastForwardIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
