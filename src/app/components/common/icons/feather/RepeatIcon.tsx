import RepeatIconSvg16 from '../svg/repeat-16.svg?raw';
import RepeatIconSvg20 from '../svg/repeat-20.svg?raw';
import RepeatIconSvg24 from '../svg/repeat-24.svg?raw';
import RepeatIconSvg32 from '../svg/repeat-32.svg?raw';
import RepeatIconSvg40 from '../svg/repeat-40.svg?raw';
import RepeatIconSvg48 from '../svg/repeat-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const REPEAT_ICON_SVG_BY_SIZE = {
  16: RepeatIconSvg16,
  20: RepeatIconSvg20,
  24: RepeatIconSvg24,
  32: RepeatIconSvg32,
  40: RepeatIconSvg40,
  48: RepeatIconSvg48,
} as const;

export function RepeatIcon({ size = 20, className = '' }: IconProps) {
  const svg = REPEAT_ICON_SVG_BY_SIZE[size] ?? RepeatIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
