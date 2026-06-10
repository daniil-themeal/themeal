import TrelloIconSvg16 from '../svg/trello-16.svg?raw';
import TrelloIconSvg20 from '../svg/trello-20.svg?raw';
import TrelloIconSvg24 from '../svg/trello-24.svg?raw';
import TrelloIconSvg32 from '../svg/trello-32.svg?raw';
import TrelloIconSvg40 from '../svg/trello-40.svg?raw';
import TrelloIconSvg48 from '../svg/trello-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TRELLO_ICON_SVG_BY_SIZE = {
  16: TrelloIconSvg16,
  20: TrelloIconSvg20,
  24: TrelloIconSvg24,
  32: TrelloIconSvg32,
  40: TrelloIconSvg40,
  48: TrelloIconSvg48,
} as const;

export function TrelloIcon({ size = 20, className = '' }: IconProps) {
  const svg = TRELLO_ICON_SVG_BY_SIZE[size] ?? TrelloIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
