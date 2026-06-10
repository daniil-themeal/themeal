import MicOffIconSvg16 from '../svg/mic-off-16.svg?raw';
import MicOffIconSvg20 from '../svg/mic-off-20.svg?raw';
import MicOffIconSvg24 from '../svg/mic-off-24.svg?raw';
import MicOffIconSvg32 from '../svg/mic-off-32.svg?raw';
import MicOffIconSvg40 from '../svg/mic-off-40.svg?raw';
import MicOffIconSvg48 from '../svg/mic-off-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MIC_OFF_ICON_SVG_BY_SIZE = {
  16: MicOffIconSvg16,
  20: MicOffIconSvg20,
  24: MicOffIconSvg24,
  32: MicOffIconSvg32,
  40: MicOffIconSvg40,
  48: MicOffIconSvg48,
} as const;

export function MicOffIcon({ size = 20, className = '' }: IconProps) {
  const svg = MIC_OFF_ICON_SVG_BY_SIZE[size] ?? MicOffIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
