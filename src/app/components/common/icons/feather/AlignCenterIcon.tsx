import AlignCenterIconSvg16 from '../svg/align-center-16.svg?raw';
import AlignCenterIconSvg20 from '../svg/align-center-20.svg?raw';
import AlignCenterIconSvg24 from '../svg/align-center-24.svg?raw';
import AlignCenterIconSvg32 from '../svg/align-center-32.svg?raw';
import AlignCenterIconSvg40 from '../svg/align-center-40.svg?raw';
import AlignCenterIconSvg48 from '../svg/align-center-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ALIGN_CENTER_ICON_SVG_BY_SIZE = {
  16: AlignCenterIconSvg16,
  20: AlignCenterIconSvg20,
  24: AlignCenterIconSvg24,
  32: AlignCenterIconSvg32,
  40: AlignCenterIconSvg40,
  48: AlignCenterIconSvg48,
} as const;

export function AlignCenterIcon({ size = 20, className = '' }: IconProps) {
  const svg = ALIGN_CENTER_ICON_SVG_BY_SIZE[size] ?? AlignCenterIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
