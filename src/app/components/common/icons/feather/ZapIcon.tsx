import ZapIconSvg16 from '../svg/zap-16.svg?raw';
import ZapIconSvg20 from '../svg/zap-20.svg?raw';
import ZapIconSvg24 from '../svg/zap-24.svg?raw';
import ZapIconSvg32 from '../svg/zap-32.svg?raw';
import ZapIconSvg40 from '../svg/zap-40.svg?raw';
import ZapIconSvg48 from '../svg/zap-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ZAP_ICON_SVG_BY_SIZE = {
  16: ZapIconSvg16,
  20: ZapIconSvg20,
  24: ZapIconSvg24,
  32: ZapIconSvg32,
  40: ZapIconSvg40,
  48: ZapIconSvg48,
} as const;

export function ZapIcon({ size = 20, className = '' }: IconProps) {
  const svg = ZAP_ICON_SVG_BY_SIZE[size] ?? ZapIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
