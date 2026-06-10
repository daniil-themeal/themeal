import MailIconSvg16 from '../svg/mail-16.svg?raw';
import MailIconSvg20 from '../svg/mail-20.svg?raw';
import MailIconSvg24 from '../svg/mail-24.svg?raw';
import MailIconSvg32 from '../svg/mail-32.svg?raw';
import MailIconSvg40 from '../svg/mail-40.svg?raw';
import MailIconSvg48 from '../svg/mail-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MAIL_ICON_SVG_BY_SIZE = {
  16: MailIconSvg16,
  20: MailIconSvg20,
  24: MailIconSvg24,
  32: MailIconSvg32,
  40: MailIconSvg40,
  48: MailIconSvg48,
} as const;

export function MailIcon({ size = 20, className = '' }: IconProps) {
  const svg = MAIL_ICON_SVG_BY_SIZE[size] ?? MailIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
