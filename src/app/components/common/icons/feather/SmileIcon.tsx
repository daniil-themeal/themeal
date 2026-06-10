import SmileIconSvg16 from '../svg/smile-16.svg?raw';
import SmileIconSvg20 from '../svg/smile-20.svg?raw';
import SmileIconSvg24 from '../svg/smile-24.svg?raw';
import SmileIconSvg32 from '../svg/smile-32.svg?raw';
import SmileIconSvg40 from '../svg/smile-40.svg?raw';
import SmileIconSvg48 from '../svg/smile-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SMILE_ICON_SVG_BY_SIZE = {
  16: SmileIconSvg16,
  20: SmileIconSvg20,
  24: SmileIconSvg24,
  32: SmileIconSvg32,
  40: SmileIconSvg40,
  48: SmileIconSvg48,
} as const;

export function SmileIcon({ size = 20, className = '' }: IconProps) {
  const svg = SMILE_ICON_SVG_BY_SIZE[size] ?? SmileIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
