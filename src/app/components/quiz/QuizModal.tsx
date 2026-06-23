import { useCallback, useEffect, useState } from 'react';
import { Bike, ChefHat, Store } from 'lucide-react';

import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import { QuizCardOption } from './QuizCardOption';
import { QuizLeadFlow } from './QuizLeadFlow';
import { QuizResultView } from './QuizResultView';
import { QuizStepHeader } from './QuizStepHeader';
import { QuizValueSlider } from './QuizValueSlider';
import { toCheckoutSelection } from './quizCalculations';
import type { QuizCheckoutSelection, QuizFreeDays, QuizPain, QuizPeople } from './quizTypes';
import {
  QUIZ_MODAL_INNER_CLASSNAME,
  QUIZ_MODAL_PANEL_CLASSNAME,
  quizTokensStyle,
} from './quizTokens';
import { useQuizState } from './useQuizState';

type QuizModalProps = {
  open: boolean;
  onClose: () => void;
  onSeePlan: (selection: QuizCheckoutSelection, phone: string) => void;
  onWhatsAppFirst: () => void;
};

function MealsTotalHint({ total }: { total: number }) {
  let hint = '';
  if (total > 28) hint = '— that\'s a lot, double-check';
  else if (total < 7) hint = '— what about the rest?';

  return (
    <p className="font-sans text-[length:var(--quiz-body-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
      Total meals per week:{' '}
      <span className="font-bold text-[var(--quiz-text)]">{total}</span>
      {hint ? <span>{hint}</span> : null}
    </p>
  );
}

export function QuizModal({ open, onClose, onSeePlan, onWhatsAppFirst }: QuizModalProps) {
  const {
    answers,
    updateAnswers,
    phase,
    setPhase,
    result,
    progressStep,
    canGoBack,
    goNext,
    goBack,
    reset,
  } = useQuizState();

  const [verifiedPhone, setVerifiedPhone] = useState('');

  useEffect(() => {
    if (!open) {
      reset();
      setVerifiedPhone('');
    }
  }, [open, reset]);

  const handleSeePlan = useCallback(() => {
    if (!result) return;
    onSeePlan(toCheckoutSelection(answers, result), verifiedPhone);
  }, [answers, result, onSeePlan, verifiedPhone]);

  const handleWhatsAppFirst = useCallback(() => {
    onWhatsAppFirst();
    onClose();
  }, [onClose, onWhatsAppFirst]);

  const mealsTotal = answers.freqCook + answers.freqOrder + answers.freqRest;

  const showQuestionFooter = phase.kind === 'question';
  const showBackOnlyFooter = phase.kind === 'result' || phase.kind === 'sms';
  const isLeadFlowActive =
    (phase.kind === 'result' && Boolean(result)) ||
    phase.kind === 'sms' ||
    phase.kind === 'success';

  const leadFlowPhase =
    phase.kind === 'result' ? 'offer' : phase.kind === 'sms' ? 'sms' : 'success';

  const footer =
    showQuestionFooter || showBackOnlyFooter
      ? (
          <div className="flex w-full gap-[12px] px-[length:var(--checkout-card-padding)] py-[length:var(--checkout-card-padding)] sm:px-[length:var(--meal-detail-content-p)]">
            {canGoBack ? (
              <Button type="button" variant="neutral" outline size="medium" className="min-w-[88px]" onClick={goBack}>
                Back
              </Button>
            ) : null}
            {showQuestionFooter ? (
              <Button
                type="button"
                variant="primary"
                size="medium"
                className="flex-1"
                onClick={goNext}
              >
                Next
              </Button>
            ) : null}
          </div>
        )
      : null;

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      ariaLabel="Real spend test"
      title="Real spend test"
      subtitle="Compare your real food spend with TheMeal"
      closeAriaLabel="Close quiz"
      sheetVerticalAlign="center-on-sm"
      bodyWrapper={false}
      rootClassName="overflow-y-auto scrollbar-hide"
      zIndex={Z_INDEX_TOKENS.modal}
      panelClassName={QUIZ_MODAL_PANEL_CLASSNAME}
      innerClassName={QUIZ_MODAL_INNER_CLASSNAME}
      footer={footer}
      footerClassName="border-t-0"
      style={quizTokensStyle}
    >
      <div className="flex flex-col gap-[16px] p-[length:var(--checkout-card-padding)] pb-0 sm:p-[length:var(--meal-detail-content-p)] sm:pb-0">
        {phase.kind === 'question' && phase.step === 1 ? (
          <div className="flex flex-col gap-[16px]">
            <QuizStepHeader
              step={progressStep}
              title="How many people usually eat at home?"
              subtitle="We'll count the spend for everyone who eats with you"
            />
            <div className="flex flex-col gap-[8px]">
              <QuizCardOption
                label="Just me"
                selected={answers.people === 1}
                onSelect={() => updateAnswers({ people: 1 as QuizPeople })}
              />
              <QuizCardOption
                label="Two of us"
                selected={answers.people === 2}
                onSelect={() => updateAnswers({ people: 2 as QuizPeople })}
              />
              <QuizCardOption
                label="Three or more"
                selected={answers.people === 3}
                onSelect={() => updateAnswers({ people: 3 as QuizPeople })}
              />
            </div>
          </div>
        ) : null}

        {phase.kind === 'question' && phase.step === 2 ? (
          <div className="flex flex-col gap-[16px]">
            <QuizStepHeader
              step={progressStep}
              title="How many times a week do you cook at home?"
              subtitle="Breakfasts, lunches, dinners — anything you cook yourself"
              icon={<ChefHat className="size-5" />}
            >
              <QuizValueSlider
                label={`${answers.freqCook} times/week`}
                value={answers.freqCook}
                min={0}
                max={28}
                onChange={(v) => updateAnswers({ freqCook: v })}
              />
            </QuizStepHeader>
            <MealsTotalHint total={mealsTotal} />
          </div>
        ) : null}

        {phase.kind === 'question' && phase.step === 3 ? (
          <div className="flex flex-col gap-[16px]">
            <QuizStepHeader
              step={progressStep}
              title="How many times a week do you order delivery?"
              subtitle="Talabat, Deliveroo, Noon and the like"
              icon={<Bike className="size-5" />}
            >
              <QuizValueSlider
                label={`${answers.freqOrder} times/week`}
                value={answers.freqOrder}
                min={0}
                max={21}
                onChange={(v) => updateAnswers({ freqOrder: v })}
              />
            </QuizStepHeader>
            <MealsTotalHint total={mealsTotal} />
          </div>
        ) : null}

        {phase.kind === 'question' && phase.step === 4 ? (
          <div className="flex flex-col gap-[16px]">
            <QuizStepHeader
              step={progressStep}
              title="How many times a week do you eat out at a cafe or restaurant?"
              subtitle="Any meal away from home"
              icon={<Store className="size-5" />}
            >
              <QuizValueSlider
                label={`${answers.freqRest} times/week`}
                value={answers.freqRest}
                min={0}
                max={21}
                onChange={(v) => updateAnswers({ freqRest: v })}
              />
            </QuizStepHeader>
            <MealsTotalHint total={mealsTotal} />
          </div>
        ) : null}

        {phase.kind === 'question' && phase.step === 5 ? (
          <div className="flex flex-col gap-[16px]">
            <QuizStepHeader
              step={progressStep}
              title="What do you want to free yourself from cooking?"
              subtitle="We'll match how many days the plan should cover"
            />
            <div className="flex flex-col gap-[8px]">
              <QuizCardOption
                label="Weekdays only — I cook on weekends"
                selected={answers.freeDays === 'weekdays'}
                onSelect={() => updateAnswers({ freeDays: 'weekdays' as QuizFreeDays })}
              />
              <QuizCardOption
                label="Weekdays and Saturday"
                selected={answers.freeDays === 'sat'}
                onSelect={() => updateAnswers({ freeDays: 'sat' as QuizFreeDays })}
              />
              <QuizCardOption
                label="Every day — all 7 days"
                selected={answers.freeDays === 'full'}
                onSelect={() => updateAnswers({ freeDays: 'full' as QuizFreeDays })}
              />
            </div>
          </div>
        ) : null}

        {phase.kind === 'question' && phase.step === 6 ? (
          <div className="flex flex-col gap-[16px]">
            <QuizStepHeader
              step={progressStep}
              title="Roughly how much does one such meal cost?"
              subtitle="Adjust to your reality — these are your numbers, not ours"
            />
            <div className="flex flex-col gap-[20px]">
              {answers.freqCook > 0 ? (
                <QuizValueSlider
                  label="Groceries for one home-cooked meal"
                  value={answers.costCook}
                  min={6}
                  max={30}
                  unit="AED"
                  onChange={(v) => updateAnswers({ costCook: v })}
                />
              ) : null}
              {answers.freqOrder > 0 ? (
                <QuizValueSlider
                  label="One delivery order"
                  value={answers.costOrder}
                  min={25}
                  max={150}
                  unit="AED"
                  onChange={(v) => updateAnswers({ costOrder: v })}
                />
              ) : null}
              {answers.freqRest > 0 ? (
                <QuizValueSlider
                  label="One cafe / restaurant visit"
                  value={answers.costRest}
                  min={25}
                  max={200}
                  unit="AED"
                  onChange={(v) => updateAnswers({ costRest: v })}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        {phase.kind === 'question' && phase.step === 7 ? (
          <div className="flex flex-col gap-[16px]">
            <QuizStepHeader
              step={progressStep}
              title="What bothers you most about all this?"
              subtitle="We'll show the result that matters most to you"
            />
            <div className="flex flex-col gap-[8px]">
              <QuizCardOption
                label="Too repetitive"
                selected={answers.pain === 'variety'}
                onSelect={() => updateAnswers({ pain: 'variety' as QuizPain })}
              />
              <QuizCardOption
                label="Not enough time"
                selected={answers.pain === 'time'}
                onSelect={() => updateAnswers({ pain: 'time' as QuizPain })}
              />
              <QuizCardOption
                label="Too expensive"
                selected={answers.pain === 'money'}
                onSelect={() => updateAnswers({ pain: 'money' as QuizPain })}
              />
              <QuizCardOption
                label="Hard to eat well"
                selected={answers.pain === 'health'}
                onSelect={() => updateAnswers({ pain: 'health' as QuizPain })}
              />
            </div>
          </div>
        ) : null}

        {phase.kind === 'result' && result ? (
          <QuizResultView answers={answers} result={result} />
        ) : null}

        {isLeadFlowActive ? (
          <QuizLeadFlow
            phase={leadFlowPhase}
            embedded={phase.kind === 'result'}
            onPhaseChange={(p) => {
              if (p === 'sms') setPhase({ kind: 'sms' });
              else if (p === 'success') setPhase({ kind: 'success' });
              else setPhase({ kind: 'result' });
            }}
            onSmsVerified={setVerifiedPhone}
            onSeePlan={handleSeePlan}
            onWhatsAppFirst={handleWhatsAppFirst}
          />
        ) : null}
      </div>
    </Modal>
  );
}

export default QuizModal;
