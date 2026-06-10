import ChromeIconSvg16 from '../svg/chrome-16.svg?raw';
import ChromeIconSvg20 from '../svg/chrome-20.svg?raw';
import ChromeIconSvg24 from '../svg/chrome-24.svg?raw';
import ChromeIconSvg32 from '../svg/chrome-32.svg?raw';
import ChromeIconSvg40 from '../svg/chrome-40.svg?raw';
import ChromeIconSvg48 from '../svg/chrome-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHROME_ICON_SVG_BY_SIZE = {
  16: ChromeIconSvg16,
  20: ChromeIconSvg20,
  24: ChromeIconSvg24,
  32: ChromeIconSvg32,
  40: ChromeIconSvg40,
  48: ChromeIconSvg48,
} as const;

export function ChromeIcon({ size = 20, className = '' }: IconProps) {
  const svg = CHROME_ICON_SVG_BY_SIZE[size] ?? ChromeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
