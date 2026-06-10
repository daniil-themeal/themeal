import SettingsIconSvg16 from '../svg/settings-16.svg?raw';
import SettingsIconSvg20 from '../svg/settings-20.svg?raw';
import SettingsIconSvg24 from '../svg/settings-24.svg?raw';
import SettingsIconSvg32 from '../svg/settings-32.svg?raw';
import SettingsIconSvg40 from '../svg/settings-40.svg?raw';
import SettingsIconSvg48 from '../svg/settings-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SETTINGS_ICON_SVG_BY_SIZE = {
  16: SettingsIconSvg16,
  20: SettingsIconSvg20,
  24: SettingsIconSvg24,
  32: SettingsIconSvg32,
  40: SettingsIconSvg40,
  48: SettingsIconSvg48,
} as const;

export function SettingsIcon({ size = 20, className = '' }: IconProps) {
  const svg = SETTINGS_ICON_SVG_BY_SIZE[size] ?? SettingsIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
