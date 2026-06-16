import { Markup } from "telegraf";

/** Тексты кнопок reply-клавиатуры (физические кнопки внизу чата). */
export const BTN_TASKS = "📋 Задачи";
export const BTN_STATUS = "📊 Статус";
export const BTN_SITE = "🌐 Сайт";
export const BTN_DEPLOY = "🚀 Деплой";
export const BTN_CANCEL = "⛔ Отмена";
export const BTN_RESET = "🔄 Сброс";

export type ReplyButtonAction = "tasks" | "status" | "site" | "deploy" | "cancel" | "reset";

/** Постоянная клавиатура внизу — не путать с inline-кнопками под сообщением. */
export function mainReplyKeyboard(_siteUrl: string, owner = true) {
  const rows = owner
    ? [[BTN_TASKS, BTN_STATUS], [BTN_SITE], [BTN_RESET]]
    : [[BTN_TASKS, BTN_SITE], [BTN_RESET]];
  return Markup.keyboard(rows).resize().persistent();
}

export function matchReplyButton(text: string): ReplyButtonAction | null {
  const t = text.trim();
  if (t === BTN_TASKS) return "tasks";
  if (t === BTN_STATUS) return "status";
  if (t === BTN_SITE) return "site";
  if (t === BTN_DEPLOY) return "deploy";
  if (t === BTN_CANCEL) return "cancel";
  if (t === BTN_RESET) return "reset";
  return null;
}
