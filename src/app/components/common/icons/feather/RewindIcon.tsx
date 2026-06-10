import RewindIconSvg16 from '../svg/rewind-16.svg?raw';
import RewindIconSvg20 from '../svg/rewind-20.svg?raw';
import RewindIconSvg24 from '../svg/rewind-24.svg?raw';
import RewindIconSvg32 from '../svg/rewind-32.svg?raw';
import RewindIconSvg40 from '../svg/rewind-40.svg?raw';
import RewindIconSvg48 from '../svg/rewind-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const REWIND_ICON_SVG_BY_SIZE = {
  16: RewindIconSvg16,
  20: RewindIconSvg20,
  24: RewindIconSvg24,
  32: RewindIconSvg32,
  40: RewindIconSvg40,
  48: RewindIconSvg48,
} as const;

export function RewindIcon({ size = 20, className = '' }: IconProps) {
  const svg = REWIND_ICON_SVG_BY_SIZE[size] ?? RewindIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
