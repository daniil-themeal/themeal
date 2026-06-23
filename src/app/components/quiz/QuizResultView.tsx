import type { QuizAnswers, QuizCalculationResult, QuizPain } from './quizTypes';
import { QUIZ_METRIC_VARIANTS, QUIZ_SECTION_PX_CLASSNAME, type QuizMetricVariant } from './quizTokens';

const PAIN_LINES: Record<QuizPain, string> = {
  variety: 'And a new menu every week — no more "same thing again".',
  time: 'That time comes back to you — for whatever you want.',
  money: 'That money stays in your pocket every month.',
  health: "And it's balanced, with nothing extra.",
};

type QuizResultViewProps = {
  answers: QuizAnswers;
  result: QuizCalculationResult;
};

export function QuizResultView({ answers, result }: QuizResultViewProps) {
  const { pain } = answers;
  const {
    segment,
    money,
    timeWk,
    mealsWk,
    mCook,
    mOrder,
    mRest,
    planMonth,
    plan2moPM,
    plan2moPeriod,
    saved,
  } = result;

  let heading = '';
  let sub = '';
  let body = '';

  if (segment === 'money') {
    heading = 'Your current setup costs more than a ready plan';
    sub = "Here's what food actually costs you each month";
    body = `With TheMeal it's ${planMonth} AED/mo — that's about ${saved} AED saved every month. Plus you get back ~${timeWk} hours a week on cooking, dishes and shopping.`;
  } else if (segment === 'family') {
    heading = "You're cooking for the whole family almost every day";
    sub = "The real price of this setup isn't money — it's this";
    body = `TheMeal is ${planMonth} AED/mo. You get back ~${timeWk} hours a week — nobody stuck at the stove.`;
    if (saved > 0) {
      body += ` And about ${saved} AED saved on top.`;
    }
    body += ' Ready, healthy, delivered to your door.';
  } else {
    heading = "Money-wise it's about the same. Time and hassle — not even close";
    sub = "You cook economically, and that's fair. But here's what it costs beyond money";
    body = `TheMeal is ${planMonth} AED/mo, about what you spend now. But you reclaim ~${timeWk} hours a week at the stove and the store — no shopping, no cooking, no dishes.`;
  }

  body += ` ${PAIN_LINES[pain]}`;

  const upsell = `Go for 2 months at once — ${plan2moPM} AED/mo instead of ${planMonth} (save another ${planMonth - plan2moPM} AED/mo, ${plan2moPeriod} AED for the period).`;

  return (
    <div className="flex flex-col gap-[20px]">
      <div className={QUIZ_SECTION_PX_CLASSNAME}>
        <div className="grid grid-cols-3 gap-[8px]">
          <Metric variant="money" label="You spend now" value={`${money} AED/mo`} />
          <Metric variant="time" label="Time it takes" value={`${timeWk} h/week`} />
          <Metric variant="meals" label="Meals per week" value={String(mealsWk)} />
        </div>
      </div>

      <div className={QUIZ_SECTION_PX_CLASSNAME}>
        <p className="text-center font-sans text-[length:var(--quiz-caption-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
          Where it comes from: Groceries{' '}
          <span className="font-bold">{mCook}</span> · Delivery{' '}
          <span className="font-bold">{mOrder}</span> · Dining out{' '}
          <span className="font-bold">AED{'\u00A0'}{mRest}</span>
        </p>
      </div>

      <div className={QUIZ_SECTION_PX_CLASSNAME}>
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h3 className="mb-[12px] font-sans text-[length:var(--quiz-title-font-size)] font-bold leading-[130%] text-[var(--quiz-text)]">
              {heading}
            </h3>
            <p className="font-sans text-[length:var(--quiz-body-font-size)] font-semibold leading-[140%] text-[var(--quiz-muted)]">
              {sub}
            </p>
          </div>
          <p className="font-sans text-[length:var(--quiz-body-font-size)] font-medium leading-[140%] text-[var(--quiz-text)]">
            {body}
          </p>
        </div>
      </div>

      <div className={QUIZ_SECTION_PX_CLASSNAME}>
        <p className="rounded-[12px] border border-[var(--quiz-border)] px-[12px] py-[12px] font-sans text-[length:var(--quiz-body-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
          {upsell}
        </p>
      </div>
    </div>
  );
}

function Metric({
  variant,
  label,
  value,
}: {
  variant: QuizMetricVariant;
  label: string;
  value: string;
}) {
  const styles = QUIZ_METRIC_VARIANTS[variant];

  return (
    <div
      className="flex min-h-[72px] flex-col items-center justify-center gap-[6px] rounded-[12px] p-[14px] text-center"
      style={{ background: styles.background, boxShadow: styles.boxShadow }}
    >
      <span
        className="font-sans text-[10px] font-bold uppercase tracking-[0.08em]"
        style={{ color: styles.labelColor }}
      >
        {label}
      </span>
      <span
        className="font-sans text-[length:var(--quiz-body-font-size)] font-bold leading-[130%]"
        style={{ color: styles.valueColor }}
      >
        {value}
      </span>
    </div>
  );
}
