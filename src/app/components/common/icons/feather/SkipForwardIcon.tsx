import SkipForwardIconSvg16 from '../svg/skip-forward-16.svg?raw';
import SkipForwardIconSvg20 from '../svg/skip-forward-20.svg?raw';
import SkipForwardIconSvg24 from '../svg/skip-forward-24.svg?raw';
import SkipForwardIconSvg32 from '../svg/skip-forward-32.svg?raw';
import SkipForwardIconSvg40 from '../svg/skip-forward-40.svg?raw';
import SkipForwardIconSvg48 from '../svg/skip-forward-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SKIP_FORWARD_ICON_SVG_BY_SIZE = {
  16: SkipForwardIconSvg16,
  20: SkipForwardIconSvg20,
  24: SkipForwardIconSvg24,
  32: SkipForwardIconSvg32,
  40: SkipForwardIconSvg40,
  48: SkipForwardIconSvg48,
} as const;

export function SkipForwardIcon({ size = 20, className = '' }: IconProps) {
  const svg = SKIP_FORWARD_ICON_SVG_BY_SIZE[size] ?? SkipForwardIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
