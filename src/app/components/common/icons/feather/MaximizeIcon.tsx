import MaximizeIconSvg16 from '../svg/maximize-16.svg?raw';
import MaximizeIconSvg20 from '../svg/maximize-20.svg?raw';
import MaximizeIconSvg24 from '../svg/maximize-24.svg?raw';
import MaximizeIconSvg32 from '../svg/maximize-32.svg?raw';
import MaximizeIconSvg40 from '../svg/maximize-40.svg?raw';
import MaximizeIconSvg48 from '../svg/maximize-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MAXIMIZE_ICON_SVG_BY_SIZE = {
  16: MaximizeIconSvg16,
  20: MaximizeIconSvg20,
  24: MaximizeIconSvg24,
  32: MaximizeIconSvg32,
  40: MaximizeIconSvg40,
  48: MaximizeIconSvg48,
} as const;

export function MaximizeIcon({ size = 20, className = '' }: IconProps) {
  const svg = MAXIMIZE_ICON_SVG_BY_SIZE[size] ?? MaximizeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
