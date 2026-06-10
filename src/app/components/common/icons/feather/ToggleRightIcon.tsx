import ToggleRightIconSvg16 from '../svg/toggle-right-16.svg?raw';
import ToggleRightIconSvg20 from '../svg/toggle-right-20.svg?raw';
import ToggleRightIconSvg24 from '../svg/toggle-right-24.svg?raw';
import ToggleRightIconSvg32 from '../svg/toggle-right-32.svg?raw';
import ToggleRightIconSvg40 from '../svg/toggle-right-40.svg?raw';
import ToggleRightIconSvg48 from '../svg/toggle-right-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TOGGLE_RIGHT_ICON_SVG_BY_SIZE = {
  16: ToggleRightIconSvg16,
  20: ToggleRightIconSvg20,
  24: ToggleRightIconSvg24,
  32: ToggleRightIconSvg32,
  40: ToggleRightIconSvg40,
  48: ToggleRightIconSvg48,
} as const;

export function ToggleRightIcon({ size = 20, className = '' }: IconProps) {
  const svg = TOGGLE_RIGHT_ICON_SVG_BY_SIZE[size] ?? ToggleRightIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
