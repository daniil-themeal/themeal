import type { QuizAnswers, QuizCalculationResult, QuizPain } from './quizTypes';

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
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-2">
        <Metric label="You spend now" value={`${money} AED/mo`} />
        <Metric label="Time it takes" value={`${timeWk} h/week`} />
        <Metric label="Meals per week" value={String(mealsWk)} />
      </div>

      <p className="text-muted-foreground text-center text-xs leading-relaxed">
        Where it comes from: groceries {mCook} · delivery {mOrder} · dining out {mRest} AED
      </p>

      <div className="bg-muted/50 flex flex-col gap-2 rounded-xl p-4">
        <h3 className="text-foreground text-base font-bold leading-snug">{heading}</h3>
        <p className="text-muted-foreground text-sm font-medium">{sub}</p>
        <p className="text-foreground text-sm leading-relaxed">{body}</p>
      </div>

      <p className="text-muted-foreground border-border rounded-lg border px-3 py-3 text-sm leading-relaxed">
        {upsell}
      </p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card border-border flex flex-col gap-1 rounded-lg border p-3 text-center">
      <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wide">
        {label}
      </span>
      <span className="text-foreground text-sm font-bold leading-tight">{value}</span>
    </div>
  );
}
