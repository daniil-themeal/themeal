import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Bike, ChefHat, Store } from 'lucide-react';

import { Button } from '../common/Button';
import { ChevronLeftIcon } from '../common/icons';
import { ModalHeader } from '../common/Modal';
import { ModalShell } from '../common/ModalShell';
import { modalTokensStyle } from '../common/modalTokens';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import { CHECKOUT_ROOT_CLASSNAME } from '../checkout/checkoutModalShellTokens';
import { QuizCardOption } from './QuizCardOption';
import { QuizLeadFlow } from './QuizLeadFlow';
import { QuizResultView } from './QuizResultView';
import { QuizStepHeader } from './QuizStepHeader';
import { QuizValueSlider } from './QuizValueSlider';
import { toCheckoutSelection } from './quizCalculations';
import type { QuizCheckoutSelection, QuizFreeDays, QuizPain, QuizPeople } from './quizTypes';
import {
  QUIZ_FOOTER_ACTIONS_CLASSNAME,
  QUIZ_MODAL_BODY_CLASSNAME,
  QUIZ_MODAL_FOOTER_CLASSNAME,
  QUIZ_MODAL_SCROLL_CLASSNAME,
  QUIZ_MODAL_SHELL_INNER_CLASSNAME,
  QUIZ_MODAL_SHELL_PANEL_CLASSNAME,
  QUIZ_MODAL_SHELL_ROOT_CLASSNAME,
  QUIZ_SECTION_PB_CLASSNAME,
  QUIZ_SECTION_PT_CLASSNAME,
  QUIZ_STEP_BODY_CLASSNAME,
  quizTokensStyle,
} from './quizTokens';
import { useQuizState } from './useQuizState';

type QuizModalProps = {
  open: boolean;
  onClose: () => void;
  onSeePlan: (selection: QuizCheckoutSelection, phone: string) => void;
};

function MealsTotalHint({ total }: { total: number }) {
  let hint = '';
  if (total > 28) hint = '— that\'s a lot, double-check';
  else if (total < 7) hint = '— what about the rest?';

  return (
    <p className="text-center font-sans text-[length:var(--quiz-body-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
      Total meals per week:{' '}
      <span className="font-bold text-[var(--quiz-text)]">{total}</span>
      {hint ? <span>{hint}</span> : null}
    </p>
  );
}

export function QuizModal({ open, onClose, onSeePlan }: QuizModalProps) {
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
    goToStep,
    reset,
  } = useQuizState();

  const [verifiedPhone, setVerifiedPhone] = useState('');
  const devStepSelectProps = import.meta.env.DEV ? { onStepSelect: goToStep } : {};

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

  const mealsTotal = answers.freqCook + answers.freqOrder + answers.freqRest;

  const showQuestionFooter = phase.kind === 'question';
  const showBackOnlyFooter = phase.kind === 'result' || phase.kind === 'sms';
  const isLeadFlowActive =
    (phase.kind === 'result' && Boolean(result)) ||
    phase.kind === 'sms' ||
    phase.kind === 'success';

  const leadFlowPhase =
    phase.kind === 'result' ? 'offer' : phase.kind === 'sms' ? 'sms' : 'success';

  const footerActions =
    showQuestionFooter || showBackOnlyFooter
      ? (
          <>
            {canGoBack ? (
              <Button
                type="button"
                variant="neutral"
                outline
                size="medium"
                leftIcon={<ChevronLeftIcon size={20} />}
                className="shrink-0"
                onClick={goBack}
              >
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
          </>
        )
      : null;

  if (!open) return null;

  return createPortal(
    <ModalShell
      isOpen={open}
      onClose={onClose}
      variant="fullscreen"
      zIndex={Z_INDEX_TOKENS.modal}
      rootClassName={`${CHECKOUT_ROOT_CLASSNAME} ${QUIZ_MODAL_SHELL_ROOT_CLASSNAME}`}
      panelClassName={QUIZ_MODAL_SHELL_PANEL_CLASSNAME}
    >
      {(requestClose) => (
        <div
          style={{ ...modalTokensStyle, ...quizTokensStyle }}
          className={QUIZ_MODAL_SHELL_INNER_CLASSNAME}
          role="dialog"
          aria-modal="true"
          aria-label="Real spend test"
        >
          <ModalHeader
            title="Real spend test"
            subtitle="Compare your real food spend with TheMeal"
            onClose={requestClose}
            closeAriaLabel="Close quiz"
          />

          <div className={QUIZ_MODAL_BODY_CLASSNAME}>
            <div className={QUIZ_MODAL_SCROLL_CLASSNAME}>
              <div
                className={[
                  'flex flex-col gap-[24px]',
                  QUIZ_SECTION_PT_CLASSNAME,
                  footerActions ? '' : QUIZ_SECTION_PB_CLASSNAME,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
        {phase.kind === 'question' && phase.step === 1 ? (
          <div className={QUIZ_STEP_BODY_CLASSNAME}>
            <QuizStepHeader
              step={progressStep}
              {...devStepSelectProps}
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
          <div className={QUIZ_STEP_BODY_CLASSNAME}>
            <QuizStepHeader
              step={progressStep}
              {...devStepSelectProps}
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
          <div className={QUIZ_STEP_BODY_CLASSNAME}>
            <QuizStepHeader
              step={progressStep}
              {...devStepSelectProps}
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
          <div className={QUIZ_STEP_BODY_CLASSNAME}>
            <QuizStepHeader
              step={progressStep}
              {...devStepSelectProps}
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
          <div className={QUIZ_STEP_BODY_CLASSNAME}>
            <QuizStepHeader
              step={progressStep}
              {...devStepSelectProps}
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
          <div className={QUIZ_STEP_BODY_CLASSNAME}>
            <QuizStepHeader
              step={progressStep}
              {...devStepSelectProps}
              title="Roughly how much does one such meal cost?"
              subtitle="Adjust to your reality — these are your numbers, not ours"
            />
            <div className="flex flex-col gap-[20px]">
              {answers.freqCook > 0 ? (
                <QuizValueSlider
                  caption="Groceries for one home-cooked meal"
                  label={`${answers.costCook} AED`}
                  value={answers.costCook}
                  min={6}
                  max={30}
                  onChange={(v) => updateAnswers({ costCook: v })}
                />
              ) : null}
              {answers.freqOrder > 0 ? (
                <QuizValueSlider
                  caption="One delivery order"
                  label={`${answers.costOrder} AED`}
                  value={answers.costOrder}
                  min={25}
                  max={150}
                  onChange={(v) => updateAnswers({ costOrder: v })}
                />
              ) : null}
              {answers.freqRest > 0 ? (
                <QuizValueSlider
                  caption="One cafe / restaurant visit"
                  label={`${answers.costRest} AED`}
                  value={answers.costRest}
                  min={25}
                  max={200}
                  onChange={(v) => updateAnswers({ costRest: v })}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        {phase.kind === 'question' && phase.step === 7 ? (
          <div className={QUIZ_STEP_BODY_CLASSNAME}>
            <QuizStepHeader
              step={progressStep}
              {...devStepSelectProps}
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
          <QuizResultView result={result} />
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
          />
        ) : null}
              </div>
            </div>

            {footerActions ? (
              <div className={QUIZ_MODAL_FOOTER_CLASSNAME}>
                <div className={QUIZ_FOOTER_ACTIONS_CLASSNAME}>{footerActions}</div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </ModalShell>,
    document.body,
  );
}

export default QuizModal;
