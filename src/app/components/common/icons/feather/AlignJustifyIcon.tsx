import AlignJustifyIconSvg16 from '../svg/align-justify-16.svg?raw';
import AlignJustifyIconSvg20 from '../svg/align-justify-20.svg?raw';
import AlignJustifyIconSvg24 from '../svg/align-justify-24.svg?raw';
import AlignJustifyIconSvg32 from '../svg/align-justify-32.svg?raw';
import AlignJustifyIconSvg40 from '../svg/align-justify-40.svg?raw';
import AlignJustifyIconSvg48 from '../svg/align-justify-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ALIGN_JUSTIFY_ICON_SVG_BY_SIZE = {
  16: AlignJustifyIconSvg16,
  20: AlignJustifyIconSvg20,
  24: AlignJustifyIconSvg24,
  32: AlignJustifyIconSvg32,
  40: AlignJustifyIconSvg40,
  48: AlignJustifyIconSvg48,
} as const;

export function AlignJustifyIcon({ size = 20, className = '' }: IconProps) {
  const svg = ALIGN_JUSTIFY_ICON_SVG_BY_SIZE[size] ?? AlignJustifyIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
