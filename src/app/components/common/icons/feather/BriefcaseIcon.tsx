import BriefcaseIconSvg16 from '../svg/briefcase-16.svg?raw';
import BriefcaseIconSvg20 from '../svg/briefcase-20.svg?raw';
import BriefcaseIconSvg24 from '../svg/briefcase-24.svg?raw';
import BriefcaseIconSvg32 from '../svg/briefcase-32.svg?raw';
import BriefcaseIconSvg40 from '../svg/briefcase-40.svg?raw';
import BriefcaseIconSvg48 from '../svg/briefcase-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BRIEFCASE_ICON_SVG_BY_SIZE = {
  16: BriefcaseIconSvg16,
  20: BriefcaseIconSvg20,
  24: BriefcaseIconSvg24,
  32: BriefcaseIconSvg32,
  40: BriefcaseIconSvg40,
  48: BriefcaseIconSvg48,
} as const;

export function BriefcaseIcon({ size = 20, className = '' }: IconProps) {
  const svg = BRIEFCASE_ICON_SVG_BY_SIZE[size] ?? BriefcaseIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
