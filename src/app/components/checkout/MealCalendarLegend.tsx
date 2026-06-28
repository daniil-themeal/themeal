import { COLOR_TOKENS } from '../common/colorTokens';
import { DeliveryIcon, PlusIcon } from '../common/icons';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';

type MealCalendarLegendProps = {
  showAddMealDays?: boolean;
  className?: string;
};

export function MealCalendarLegend({
  showAddMealDays = false,
  className = '',
}: MealCalendarLegendProps) {
  const addMealDayLegendItem = showAddMealDays ? (
    <div className="flex items-center gap-[6px]">
      <span style={{ color: COLOR_TOKENS.primary[500] }}>
        <PlusIcon size={16} />
      </span>
      <span
        className={[TEXT_TRIM_CLASS_NAME, 'font-sans text-[12px] font-semibold'].join(' ')}
        style={{ color: COLOR_TOKENS.neutral[600] }}
      >
        Tap to add
      </span>
    </div>
  ) : null;

  return (
    <div
      className={['flex flex-wrap items-center gap-x-[20px] gap-y-[8px]', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-center gap-[6px]">
        <div
          className="h-[14px] w-[14px] rounded-[3px]"
          style={{ backgroundColor: COLOR_TOKENS.primary[50] }}
        />
        <span
          className={[TEXT_TRIM_CLASS_NAME, 'font-sans text-[12px] font-semibold'].join(' ')}
          style={{ color: COLOR_TOKENS.neutral[600] }}
        >
          Meal days
        </span>
      </div>

      <div className="flex items-center gap-[6px]">
        <span style={{ color: COLOR_TOKENS.neutral[900] }}>
          <DeliveryIcon size={16} />
        </span>
        <span
          className={[TEXT_TRIM_CLASS_NAME, 'font-sans text-[12px] font-semibold'].join(' ')}
          style={{ color: COLOR_TOKENS.neutral[600] }}
        >
          Delivery days
        </span>
      </div>

      {addMealDayLegendItem}
    </div>
  );
}
