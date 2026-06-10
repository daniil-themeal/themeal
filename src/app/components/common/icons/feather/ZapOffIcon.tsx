import ZapOffIconSvg16 from '../svg/zap-off-16.svg?raw';
import ZapOffIconSvg20 from '../svg/zap-off-20.svg?raw';
import ZapOffIconSvg24 from '../svg/zap-off-24.svg?raw';
import ZapOffIconSvg32 from '../svg/zap-off-32.svg?raw';
import ZapOffIconSvg40 from '../svg/zap-off-40.svg?raw';
import ZapOffIconSvg48 from '../svg/zap-off-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ZAP_OFF_ICON_SVG_BY_SIZE = {
  16: ZapOffIconSvg16,
  20: ZapOffIconSvg20,
  24: ZapOffIconSvg24,
  32: ZapOffIconSvg32,
  40: ZapOffIconSvg40,
  48: ZapOffIconSvg48,
} as const;

export function ZapOffIcon({ size = 20, className = '' }: IconProps) {
  const svg = ZAP_OFF_ICON_SVG_BY_SIZE[size] ?? ZapOffIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
