import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Bike, ChefHat, Store } from 'lucide-react';

import { Button } from '../common/Button';
import { XIcon } from '../common/icons';
import { iconColorClassName, iconColorStyle } from '../common/iconColorTokens';
import { ModalShell } from '../common/ModalShell';
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

type LeadSubPhase = 'offer' | 'sms' | 'success';

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

  const [leadPhase, setLeadPhase] = useState<LeadSubPhase>('offer');
  const [verifiedPhone, setVerifiedPhone] = useState('');

  useEffect(() => {
    if (!open) {
      reset();
      setLeadPhase('offer');
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

  const showNavFooter = phase.kind === 'question' || phase.kind === 'result';
  const showLeadBackOnly = phase.kind === 'lead' && leadPhase === 'offer';

  if (!open) return null;

  return createPortal(
    <ModalShell
      isOpen={open}
      onClose={onClose}
      variant="bottom-sheet"
      sheetVerticalAlign="center-on-sm"
      zIndex={Z_INDEX_TOKENS.modal}
      panelClassName={QUIZ_MODAL_PANEL_CLASSNAME}
    >
      {(requestClose) => (
        <div
          style={quizTokensStyle}
          className={QUIZ_MODAL_INNER_CLASSNAME}
          role="dialog"
          aria-modal="true"
          aria-label="Real spend test"
        >
          <div className="flex shrink-0 items-start justify-between gap-[12px] border-b border-[var(--quiz-border)] px-[20px] py-[16px]">
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[length:var(--quiz-option-font-size)] font-bold leading-[130%] text-[var(--quiz-text)]">
                Real spend test
              </p>
              <p className="mt-[2px] font-sans text-[length:var(--quiz-caption-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
                Compare your real food spend with TheMeal
              </p>
            </div>
            <button
              type="button"
              onClick={requestClose}
              className="group flex size-[40px] shrink-0 cursor-pointer items-center justify-center"
              aria-label="Close quiz"
            >
              <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--quiz-close-bg)] transition-colors duration-150 group-hover:bg-[var(--quiz-close-bg-hover)]">
                <span className={iconColorClassName.emphasis} style={iconColorStyle.emphasis}>
                  <XIcon size={16} />
                </span>
              </span>
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-[20px] py-[16px] scrollbar-hide">
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
                />
                <QuizValueSlider
                  label={`${answers.freqCook} times/week`}
                  value={answers.freqCook}
                  min={0}
                  max={28}
                  onChange={(v) => updateAnswers({ freqCook: v })}
                />
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
                />
                <QuizValueSlider
                  label={`${answers.freqOrder} times/week`}
                  value={answers.freqOrder}
                  min={0}
                  max={21}
                  onChange={(v) => updateAnswers({ freqOrder: v })}
                />
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
                />
                <QuizValueSlider
                  label={`${answers.freqRest} times/week`}
                  value={answers.freqRest}
                  min={0}
                  max={21}
                  onChange={(v) => updateAnswers({ freqRest: v })}
                />
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

            {phase.kind === 'lead' || phase.kind === 'sms' || phase.kind === 'success' ? (
              <QuizLeadFlow
                phase={phase.kind === 'sms' ? 'sms' : phase.kind === 'success' ? 'success' : leadPhase}
                onPhaseChange={(p) => {
                  setLeadPhase(p);
                  if (p === 'sms') setPhase({ kind: 'sms' });
                  else if (p === 'success') setPhase({ kind: 'success' });
                  else setPhase({ kind: 'lead' });
                }}
                onSmsVerified={setVerifiedPhone}
                onSeePlan={handleSeePlan}
                onWhatsAppFirst={handleWhatsAppFirst}
              />
            ) : null}
          </div>

          {showNavFooter || showLeadBackOnly ? (
            <div className="flex shrink-0 gap-[12px] border-t border-[var(--quiz-border)] px-[20px] py-[16px]">
              {canGoBack ? (
                <Button type="button" variant="neutral" outline size="medium" className="min-w-[88px]" onClick={goBack}>
                  Back
                </Button>
              ) : null}
              {showNavFooter ? (
                <Button
                  type="button"
                  variant="primary"
                  size="medium"
                  className="flex-1"
                  onClick={() => {
                    if (phase.kind === 'result') {
                      setPhase({ kind: 'lead' });
                      setLeadPhase('offer');
                    } else {
                      goNext();
                    }
                  }}
                >
                  {phase.kind === 'result' ? 'Continue' : 'Next'}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      )}
    </ModalShell>,
    document.body,
  );
}

export default QuizModal;
