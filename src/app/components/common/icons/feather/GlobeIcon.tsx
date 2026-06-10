import GlobeIconSvg16 from '../svg/globe-16.svg?raw';
import GlobeIconSvg20 from '../svg/globe-20.svg?raw';
import GlobeIconSvg24 from '../svg/globe-24.svg?raw';
import GlobeIconSvg32 from '../svg/globe-32.svg?raw';
import GlobeIconSvg40 from '../svg/globe-40.svg?raw';
import GlobeIconSvg48 from '../svg/globe-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const GLOBE_ICON_SVG_BY_SIZE = {
  16: GlobeIconSvg16,
  20: GlobeIconSvg20,
  24: GlobeIconSvg24,
  32: GlobeIconSvg32,
  40: GlobeIconSvg40,
  48: GlobeIconSvg48,
} as const;

export function GlobeIcon({ size = 20, className = '' }: IconProps) {
  const svg = GLOBE_ICON_SVG_BY_SIZE[size] ?? GlobeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
