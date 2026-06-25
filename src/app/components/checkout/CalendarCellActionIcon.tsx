import { COLOR_TOKENS } from '../common/colorTokens';
import { CALENDAR_CELL_ACTION_CIRCLE_SIZE_PX } from '../common/fieldSizeTokens';
import { MinusIcon, PlusIcon } from '../common/icons';

type CalendarCellActionIconProps = {
  icon: 'plus' | 'minus';
  tone?: 'primary' | 'neutral';
};

export function CalendarCellActionIcon({ icon, tone = 'primary' }: CalendarCellActionIconProps) {
  const Icon = icon === 'plus' ? PlusIcon : MinusIcon;
  const backgroundColor =
    icon === 'minus'
      ? tone === 'neutral'
        ? COLOR_TOKENS.neutral[50]
        : COLOR_TOKENS.primary[75]
      : tone === 'neutral'
        ? COLOR_TOKENS.neutral[50]
        : COLOR_TOKENS.primary[50];
  const iconColor = tone === 'neutral' ? COLOR_TOKENS.neutral[500] : COLOR_TOKENS.primary[500];

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: CALENDAR_CELL_ACTION_CIRCLE_SIZE_PX,
        height: CALENDAR_CELL_ACTION_CIRCLE_SIZE_PX,
        backgroundColor,
        color: iconColor,
      }}
    >
      <Icon size={16} />
    </span>
  );
}
