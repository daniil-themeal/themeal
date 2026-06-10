import ToggleLeftIconSvg16 from '../svg/toggle-left-16.svg?raw';
import ToggleLeftIconSvg20 from '../svg/toggle-left-20.svg?raw';
import ToggleLeftIconSvg24 from '../svg/toggle-left-24.svg?raw';
import ToggleLeftIconSvg32 from '../svg/toggle-left-32.svg?raw';
import ToggleLeftIconSvg40 from '../svg/toggle-left-40.svg?raw';
import ToggleLeftIconSvg48 from '../svg/toggle-left-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TOGGLE_LEFT_ICON_SVG_BY_SIZE = {
  16: ToggleLeftIconSvg16,
  20: ToggleLeftIconSvg20,
  24: ToggleLeftIconSvg24,
  32: ToggleLeftIconSvg32,
  40: ToggleLeftIconSvg40,
  48: ToggleLeftIconSvg48,
} as const;

export function ToggleLeftIcon({ size = 20, className = '' }: IconProps) {
  const svg = TOGGLE_LEFT_ICON_SVG_BY_SIZE[size] ?? ToggleLeftIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
