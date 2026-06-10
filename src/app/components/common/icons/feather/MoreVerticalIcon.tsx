import MoreVerticalIconSvg16 from '../svg/more-vertical-16.svg?raw';
import MoreVerticalIconSvg20 from '../svg/more-vertical-20.svg?raw';
import MoreVerticalIconSvg24 from '../svg/more-vertical-24.svg?raw';
import MoreVerticalIconSvg32 from '../svg/more-vertical-32.svg?raw';
import MoreVerticalIconSvg40 from '../svg/more-vertical-40.svg?raw';
import MoreVerticalIconSvg48 from '../svg/more-vertical-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MORE_VERTICAL_ICON_SVG_BY_SIZE = {
  16: MoreVerticalIconSvg16,
  20: MoreVerticalIconSvg20,
  24: MoreVerticalIconSvg24,
  32: MoreVerticalIconSvg32,
  40: MoreVerticalIconSvg40,
  48: MoreVerticalIconSvg48,
} as const;

export function MoreVerticalIcon({ size = 20, className = '' }: IconProps) {
  const svg = MORE_VERTICAL_ICON_SVG_BY_SIZE[size] ?? MoreVerticalIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
