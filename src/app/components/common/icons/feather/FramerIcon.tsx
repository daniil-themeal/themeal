import FramerIconSvg16 from '../svg/framer-16.svg?raw';
import FramerIconSvg20 from '../svg/framer-20.svg?raw';
import FramerIconSvg24 from '../svg/framer-24.svg?raw';
import FramerIconSvg32 from '../svg/framer-32.svg?raw';
import FramerIconSvg40 from '../svg/framer-40.svg?raw';
import FramerIconSvg48 from '../svg/framer-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FRAMER_ICON_SVG_BY_SIZE = {
  16: FramerIconSvg16,
  20: FramerIconSvg20,
  24: FramerIconSvg24,
  32: FramerIconSvg32,
  40: FramerIconSvg40,
  48: FramerIconSvg48,
} as const;

export function FramerIcon({ size = 20, className = '' }: IconProps) {
  const svg = FRAMER_ICON_SVG_BY_SIZE[size] ?? FramerIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
