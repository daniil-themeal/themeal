import SkipBackIconSvg16 from '../svg/skip-back-16.svg?raw';
import SkipBackIconSvg20 from '../svg/skip-back-20.svg?raw';
import SkipBackIconSvg24 from '../svg/skip-back-24.svg?raw';
import SkipBackIconSvg32 from '../svg/skip-back-32.svg?raw';
import SkipBackIconSvg40 from '../svg/skip-back-40.svg?raw';
import SkipBackIconSvg48 from '../svg/skip-back-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SKIP_BACK_ICON_SVG_BY_SIZE = {
  16: SkipBackIconSvg16,
  20: SkipBackIconSvg20,
  24: SkipBackIconSvg24,
  32: SkipBackIconSvg32,
  40: SkipBackIconSvg40,
  48: SkipBackIconSvg48,
} as const;

export function SkipBackIcon({ size = 20, className = '' }: IconProps) {
  const svg = SKIP_BACK_ICON_SVG_BY_SIZE[size] ?? SkipBackIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
