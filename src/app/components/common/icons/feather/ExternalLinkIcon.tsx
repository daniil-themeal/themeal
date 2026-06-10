import ExternalLinkIconSvg16 from '../svg/external-link-16.svg?raw';
import ExternalLinkIconSvg20 from '../svg/external-link-20.svg?raw';
import ExternalLinkIconSvg24 from '../svg/external-link-24.svg?raw';
import ExternalLinkIconSvg32 from '../svg/external-link-32.svg?raw';
import ExternalLinkIconSvg40 from '../svg/external-link-40.svg?raw';
import ExternalLinkIconSvg48 from '../svg/external-link-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const EXTERNAL_LINK_ICON_SVG_BY_SIZE = {
  16: ExternalLinkIconSvg16,
  20: ExternalLinkIconSvg20,
  24: ExternalLinkIconSvg24,
  32: ExternalLinkIconSvg32,
  40: ExternalLinkIconSvg40,
  48: ExternalLinkIconSvg48,
} as const;

export function ExternalLinkIcon({ size = 20, className = '' }: IconProps) {
  const svg = EXTERNAL_LINK_ICON_SVG_BY_SIZE[size] ?? ExternalLinkIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
