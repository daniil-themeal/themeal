import HelpCircleIconSvg16 from '../svg/help-circle-16.svg?raw';
import HelpCircleIconSvg20 from '../svg/help-circle-20.svg?raw';
import HelpCircleIconSvg24 from '../svg/help-circle-24.svg?raw';
import HelpCircleIconSvg32 from '../svg/help-circle-32.svg?raw';
import HelpCircleIconSvg40 from '../svg/help-circle-40.svg?raw';
import HelpCircleIconSvg48 from '../svg/help-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const HELP_CIRCLE_ICON_SVG_BY_SIZE = {
  16: HelpCircleIconSvg16,
  20: HelpCircleIconSvg20,
  24: HelpCircleIconSvg24,
  32: HelpCircleIconSvg32,
  40: HelpCircleIconSvg40,
  48: HelpCircleIconSvg48,
} as const;

export function HelpCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = HELP_CIRCLE_ICON_SVG_BY_SIZE[size] ?? HelpCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
