type OrderSummaryMealCardMeal = {
  id: string;
  name: string;
  img: string;
};

type OrderSummaryMealCardProps = {
  meal: OrderSummaryMealCardMeal;
  onClick: () => void;
};

export function OrderSummaryMealCard({ meal, onClick }: OrderSummaryMealCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative z-0 flex w-[150px] shrink-0 cursor-pointer flex-col gap-[8px] text-left hover:z-10 focus-visible:z-10"
    >
      <div className="flex h-[114px] w-full items-center justify-center overflow-visible">
        <img
          src={meal.img}
          alt={meal.name}
          className="pointer-events-none h-[108px] w-full origin-center rounded-[8px] object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="w-full overflow-hidden px-[4px]">
        <p
          className={[
            'line-clamp-2 w-full [text-box-edge:auto] [text-box-trim:none] font-sans text-[length:var(--order-summary-body-font-size)] font-semibold leading-[140%] text-[var(--order-summary-text)] transition-colors group-hover:text-[var(--order-summary-primary)]',
          ].join(' ')}
        >
          {meal.name}
        </p>
      </div>
    </button>
  );
}
