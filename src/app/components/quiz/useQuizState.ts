import { useCallback, useMemo, useState } from 'react';

import { calculateQuizResult } from './quizCalculations';
import {
  DEFAULT_QUIZ_ANSWERS,
  type QuizAnswers,
  type QuizCalculationResult,
  type QuizFlowPhase,
  type QuizStepId,
} from './quizTypes';

export function useQuizState() {
  const [answers, setAnswers] = useState<QuizAnswers>(DEFAULT_QUIZ_ANSWERS);
  const [phase, setPhase] = useState<QuizFlowPhase>({ kind: 'question', step: 1 });
  const [result, setResult] = useState<QuizCalculationResult | null>(null);

  const updateAnswers = useCallback((patch: Partial<QuizAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
  }, []);

  const goToResult = useCallback(() => {
    const nextResult = calculateQuizResult(answers);
    setResult(nextResult);
    setPhase({ kind: 'result' });
  }, [answers]);

  const goNext = useCallback(() => {
    if (phase.kind === 'question') {
      if (phase.step < 7) {
        setPhase({ kind: 'question', step: (phase.step + 1) as QuizStepId });
        return;
      }
      goToResult();
      return;
    }

    if (phase.kind === 'result') {
      setPhase({ kind: 'lead' });
      return;
    }

    if (phase.kind === 'lead') {
      setPhase({ kind: 'sms' });
    }
  }, [phase, goToResult]);

  const goBack = useCallback(() => {
    if (phase.kind === 'question' && phase.step > 1) {
      setPhase({ kind: 'question', step: (phase.step - 1) as QuizStepId });
      return;
    }

    if (phase.kind === 'result') {
      setPhase({ kind: 'question', step: 7 });
      setResult(null);
      return;
    }

    if (phase.kind === 'lead') {
      setPhase({ kind: 'result' });
      return;
    }

    if (phase.kind === 'sms') {
      setPhase({ kind: 'lead' });
    }
  }, [phase]);

  const goToSuccess = useCallback(() => {
    setPhase({ kind: 'success' });
  }, []);

  const reset = useCallback(() => {
    setAnswers(DEFAULT_QUIZ_ANSWERS);
    setPhase({ kind: 'question', step: 1 });
    setResult(null);
  }, []);

  const progressStep = useMemo(() => {
    if (phase.kind === 'question') return phase.step;
    return null;
  }, [phase]);

  const canGoBack =
    phase.kind === 'question' && phase.step > 1 ||
    phase.kind === 'result' ||
    phase.kind === 'lead' ||
    phase.kind === 'sms';

  return {
    answers,
    updateAnswers,
    phase,
    setPhase,
    result,
    progressStep,
    canGoBack,
    goNext,
    goBack,
    goToSuccess,
    reset,
  };
}
