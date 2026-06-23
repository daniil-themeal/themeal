import type { QuizAnswers, QuizCalculationResult } from '../components/quiz/quizTypes';

export type QuizLeadOutcome = 'see_plan' | 'whatsapp_first';

export type QuizLeadPayload = {
  phone: string;
  answers: QuizAnswers;
  result: Pick<
    QuizCalculationResult,
    'money' | 'timeWk' | 'mealsWk' | 'dishes' | 'planMonth' | 'axis'
  >;
  outcome?: QuizLeadOutcome;
};

// TODO: wire to VITE_QUIZ_SMS_SEND_URL when backend is ready
export async function sendQuizSms(_phone: string): Promise<void> {
  return Promise.resolve();
}

// TODO: wire to VITE_QUIZ_SMS_VERIFY_URL when backend is ready
export async function verifyQuizSms(_phone: string, _code: string): Promise<boolean> {
  return Promise.resolve(true);
}

// TODO: wire to VITE_RESPOND_IO_WEBHOOK_URL when backend is ready
export async function sendQuizLeadWebhook(_payload: QuizLeadPayload): Promise<void> {
  return Promise.resolve();
}
