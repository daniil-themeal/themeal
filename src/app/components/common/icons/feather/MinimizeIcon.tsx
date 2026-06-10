import MinimizeIconSvg16 from '../svg/minimize-16.svg?raw';
import MinimizeIconSvg20 from '../svg/minimize-20.svg?raw';
import MinimizeIconSvg24 from '../svg/minimize-24.svg?raw';
import MinimizeIconSvg32 from '../svg/minimize-32.svg?raw';
import MinimizeIconSvg40 from '../svg/minimize-40.svg?raw';
import MinimizeIconSvg48 from '../svg/minimize-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MINIMIZE_ICON_SVG_BY_SIZE = {
  16: MinimizeIconSvg16,
  20: MinimizeIconSvg20,
  24: MinimizeIconSvg24,
  32: MinimizeIconSvg32,
  40: MinimizeIconSvg40,
  48: MinimizeIconSvg48,
} as const;

export function MinimizeIcon({ size = 20, className = '' }: IconProps) {
  const svg = MINIMIZE_ICON_SVG_BY_SIZE[size] ?? MinimizeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
