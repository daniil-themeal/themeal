import EyeOffIconSvg16 from '../svg/eye-off-16.svg?raw';
import EyeOffIconSvg20 from '../svg/eye-off-20.svg?raw';
import EyeOffIconSvg24 from '../svg/eye-off-24.svg?raw';
import EyeOffIconSvg32 from '../svg/eye-off-32.svg?raw';
import EyeOffIconSvg40 from '../svg/eye-off-40.svg?raw';
import EyeOffIconSvg48 from '../svg/eye-off-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const EYE_OFF_ICON_SVG_BY_SIZE = {
  16: EyeOffIconSvg16,
  20: EyeOffIconSvg20,
  24: EyeOffIconSvg24,
  32: EyeOffIconSvg32,
  40: EyeOffIconSvg40,
  48: EyeOffIconSvg48,
} as const;

export function EyeOffIcon({ size = 20, className = '' }: IconProps) {
  const svg = EYE_OFF_ICON_SVG_BY_SIZE[size] ?? EyeOffIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
