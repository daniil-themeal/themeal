import type { QuizCalculationResult } from './quizTypes';
import { formatQuizNumber } from './quizFormat';
import { QuizStepHeader } from './QuizStepHeader';
import { QUIZ_METRIC_VARIANTS, QUIZ_SECTION_PX_CLASSNAME, type QuizMetricVariant } from './quizTokens';
type QuizResultViewProps = {
  result: QuizCalculationResult;
};

export function QuizResultView({ result }: QuizResultViewProps) {
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
    saved,
  } = result;

  let heading = '';
  let body = '';

  if (segment === 'money') {
    heading = 'Your setup costs more than a ready plan';
    body = `TheMeal is ${formatQuizNumber(planMonth)} AED/mo — you save ~${formatQuizNumber(saved)} AED and ~${timeWk} h/week.`;
  } else if (segment === 'family') {
    heading = "You're cooking for everyone, every day";
    body = `TheMeal is ${formatQuizNumber(planMonth)} AED/mo. You get back ~${timeWk} h/week — nobody at the stove.`;
  } else {
    heading = 'Same money. Far less hassle';
    body = `About the same price — but you reclaim ~${timeWk} h/week. No shopping, cooking or dishes.`;
  }

  const upsellSave = planMonth - plan2moPM;
  const upsell = `2 months at once: ${formatQuizNumber(plan2moPM)} AED/mo (save ${formatQuizNumber(upsellSave)} more).`;

  return (
    <div className="flex flex-col gap-[32px]">
      <div className={`${QUIZ_SECTION_PX_CLASSNAME} flex flex-col gap-[16px]`}>
        <div className="grid grid-cols-3 gap-[8px]">
          <Metric variant="money" label="YOU SPEND NOW" value={`${formatQuizNumber(money)} AED/mo`} />
          <Metric variant="time" label="TIME IT TAKES" value={`${timeWk} h/week`} />
          <Metric variant="meals" label="MEALS/WEEK" value={String(mealsWk)} />
        </div>
        <p className="text-center font-sans text-[length:var(--quiz-caption-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
          Groceries{' '}
          <span className="font-bold">{formatQuizNumber(mCook)}</span> · Delivery{' '}
          <span className="font-bold">{formatQuizNumber(mOrder)}</span> · Dining out{' '}
          <span className="font-bold">{formatQuizNumber(mRest)}</span> AED
        </p>
      </div>

      <div className={`${QUIZ_SECTION_PX_CLASSNAME} flex flex-col gap-[16px]`}>
        <QuizStepHeader title={heading} subtitle={body} titleSubtitleGap="lead" />
        <p className="rounded-[12px] border border-[var(--quiz-border)] px-[12px] py-[12px] font-sans text-[length:var(--quiz-body-font-size)] font-medium leading-[140%] text-[var(--neutral-900)]">
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
        style={{ color: styles.labelColor, opacity: styles.labelOpacity }}
      >
        {label}
      </span>
      <span
        className={[
          'font-sans text-[length:var(--quiz-body-font-size)] leading-[130%]',
          styles.valueFontWeightClass,
        ].join(' ')}
        style={{ color: styles.valueColor }}
      >
        {value}
      </span>
    </div>
  );
}
