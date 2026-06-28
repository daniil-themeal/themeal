import { ChevronRightIcon } from '../../components/common/icons/feather/ChevronRightIcon';

type AccountMealplanSwitcherProps = {
  title: string;
  planCount: number;
  activePlanIndex: number;
  onPlanChange: (planIndex: number) => void;
  onTitleClick?: () => void;
  className?: string;
};

export function AccountMealplanSwitcher({
  title,
  planCount,
  activePlanIndex,
  onPlanChange,
  onTitleClick,
  className = '',
}: AccountMealplanSwitcherProps) {
  const showPlanDots = planCount >= 2;

  return (
    <div className={['account-mealplan-switcher', className].filter(Boolean).join(' ')}>
      <div className="account-mealplan-switcher__title-row">
        {onTitleClick ? (
          <button type="button" className="account-mealplan-switcher__title-btn" onClick={onTitleClick}>
            <span className="account-mealplan-switcher__title">{title}</span>
            <ChevronRightIcon size={16} className="account-mealplan-switcher__chevron" />
          </button>
        ) : (
          <div className="account-mealplan-switcher__title-btn account-mealplan-switcher__title-btn--static">
            <span className="account-mealplan-switcher__title">{title}</span>
            <ChevronRightIcon size={16} className="account-mealplan-switcher__chevron" />
          </div>
        )}
      </div>

      {showPlanDots ? (
        <div
          className="account-mealplan-switcher__dots"
          role="tablist"
          aria-label="Meal plan"
        >
          {Array.from({ length: planCount }, (_, index) => {
            const active = index === activePlanIndex;

            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Meal plan ${index + 1}`}
                className={[
                  'account-mealplan-switcher__dot',
                  active ? 'account-mealplan-switcher__dot--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => onPlanChange(index)}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
