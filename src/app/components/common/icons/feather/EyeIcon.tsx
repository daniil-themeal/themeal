import EyeIconSvg16 from '../svg/eye-16.svg?raw';
import EyeIconSvg20 from '../svg/eye-20.svg?raw';
import EyeIconSvg24 from '../svg/eye-24.svg?raw';
import EyeIconSvg32 from '../svg/eye-32.svg?raw';
import EyeIconSvg40 from '../svg/eye-40.svg?raw';
import EyeIconSvg48 from '../svg/eye-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const EYE_ICON_SVG_BY_SIZE = {
  16: EyeIconSvg16,
  20: EyeIconSvg20,
  24: EyeIconSvg24,
  32: EyeIconSvg32,
  40: EyeIconSvg40,
  48: EyeIconSvg48,
} as const;

export function EyeIcon({ size = 20, className = '' }: IconProps) {
  const svg = EYE_ICON_SVG_BY_SIZE[size] ?? EyeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
