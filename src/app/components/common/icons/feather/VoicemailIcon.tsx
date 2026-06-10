import VoicemailIconSvg16 from '../svg/voicemail-16.svg?raw';
import VoicemailIconSvg20 from '../svg/voicemail-20.svg?raw';
import VoicemailIconSvg24 from '../svg/voicemail-24.svg?raw';
import VoicemailIconSvg32 from '../svg/voicemail-32.svg?raw';
import VoicemailIconSvg40 from '../svg/voicemail-40.svg?raw';
import VoicemailIconSvg48 from '../svg/voicemail-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const VOICEMAIL_ICON_SVG_BY_SIZE = {
  16: VoicemailIconSvg16,
  20: VoicemailIconSvg20,
  24: VoicemailIconSvg24,
  32: VoicemailIconSvg32,
  40: VoicemailIconSvg40,
  48: VoicemailIconSvg48,
} as const;

export function VoicemailIcon({ size = 20, className = '' }: IconProps) {
  const svg = VOICEMAIL_ICON_SVG_BY_SIZE[size] ?? VoicemailIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
