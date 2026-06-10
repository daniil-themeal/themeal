import AwardIconSvg16 from '../svg/award-16.svg?raw';
import AwardIconSvg20 from '../svg/award-20.svg?raw';
import AwardIconSvg24 from '../svg/award-24.svg?raw';
import AwardIconSvg32 from '../svg/award-32.svg?raw';
import AwardIconSvg40 from '../svg/award-40.svg?raw';
import AwardIconSvg48 from '../svg/award-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const AWARD_ICON_SVG_BY_SIZE = {
  16: AwardIconSvg16,
  20: AwardIconSvg20,
  24: AwardIconSvg24,
  32: AwardIconSvg32,
  40: AwardIconSvg40,
  48: AwardIconSvg48,
} as const;

export function AwardIcon({ size = 20, className = '' }: IconProps) {
  const svg = AWARD_ICON_SVG_BY_SIZE[size] ?? AwardIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
