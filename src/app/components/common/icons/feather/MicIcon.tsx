import MicIconSvg16 from '../svg/mic-16.svg?raw';
import MicIconSvg20 from '../svg/mic-20.svg?raw';
import MicIconSvg24 from '../svg/mic-24.svg?raw';
import MicIconSvg32 from '../svg/mic-32.svg?raw';
import MicIconSvg40 from '../svg/mic-40.svg?raw';
import MicIconSvg48 from '../svg/mic-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MIC_ICON_SVG_BY_SIZE = {
  16: MicIconSvg16,
  20: MicIconSvg20,
  24: MicIconSvg24,
  32: MicIconSvg32,
  40: MicIconSvg40,
  48: MicIconSvg48,
} as const;

export function MicIcon({ size = 20, className = '' }: IconProps) {
  const svg = MIC_ICON_SVG_BY_SIZE[size] ?? MicIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
