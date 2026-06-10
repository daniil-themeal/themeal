import LinkedinIconSvg16 from '../svg/linkedin-16.svg?raw';
import LinkedinIconSvg20 from '../svg/linkedin-20.svg?raw';
import LinkedinIconSvg24 from '../svg/linkedin-24.svg?raw';
import LinkedinIconSvg32 from '../svg/linkedin-32.svg?raw';
import LinkedinIconSvg40 from '../svg/linkedin-40.svg?raw';
import LinkedinIconSvg48 from '../svg/linkedin-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const LINKEDIN_ICON_SVG_BY_SIZE = {
  16: LinkedinIconSvg16,
  20: LinkedinIconSvg20,
  24: LinkedinIconSvg24,
  32: LinkedinIconSvg32,
  40: LinkedinIconSvg40,
  48: LinkedinIconSvg48,
} as const;

export function LinkedinIcon({ size = 20, className = '' }: IconProps) {
  const svg = LINKEDIN_ICON_SVG_BY_SIZE[size] ?? LinkedinIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
