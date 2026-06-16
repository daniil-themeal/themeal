type StatusSettings = {
  agentMode: "local" | "cloud";
  model: string;
  vercelUrl: string;
  cloudRepoRef: string;
};

export function modeLabel(settings: StatusSettings): string {
  return settings.agentMode === "cloud"
    ? `cloud → ${settings.cloudRepoRef}`
    : "local → файлы на ПК";
}

export function agentWorkHeader(settings: StatusSettings, title: string): string {
  return [
    `⏳ ${title}`,
    "",
    "Cursor Agent сейчас:",
    "1. Читает код репозитория",
    "2. Вносит изменения",
    "3. Запускает npm run build",
    "4. Коммитит локально (без push)",
    "",
    `Модель: ${settings.model}`,
    `Режим: ${modeLabel(settings)}`,
    "",
    "Подожди — ниже будет обновляться ответ агента.",
  ].join("\n");
}

export function agentStreamingText(header: string, partial: string): string {
  const body = partial.trim() || "…";
  return `${header}\n\n---\n${body}`;
}

export function agentElapsedText(header: string, minutes: number): string {
  return `${header}\n\n⏳ Прошло ${minutes}+ мин — агент ещё работает…`;
}

export function deployStartMessage(settings: StatusSettings): string {
  return [
    "🚀 Деплой — публикация",
    "",
    "Сейчас:",
    `1. Push на GitHub (${settings.cloudRepoRef})`,
    "2. Vercel deploy hook",
    `3. Проверка production: ${settings.vercelUrl}`,
    "",
    "Запускаю Vercel deploy hook (и git push, если нужно)…",
  ].join("\n");
}

export function taskToAgentMessage(taskId: number, taskText: string, settings: StatusSettings): string {
  return [
    `▶️ Задача #${taskId} → Cursor Agent`,
    "",
    `«${taskText}»`,
    "",
    "Агент изменит код и закоммитит локально.",
    "После ответа нажми 🚀 Деплой для публикации.",
    "",
    `Модель: ${settings.model} | ${modeLabel(settings)}`,
  ].join("\n");
}

export function userTaskAcceptedMessage(settings: StatusSettings): string {
  return [
    "📝 Задача принята",
    "",
    "Cursor Agent сейчас:",
    "• правки в landing-stas",
    "• npm run build",
    "• локальный commit",
    "",
    `Push на GitHub — только после 🚀 Деплой`,
    `Модель: ${settings.model}`,
  ].join("\n");
}

export function voiceStartMessage(): string {
  return "🎤 Расшифровываю голосовое (Groq Whisper)…";
}

export function voiceDoneMessage(text: string): string {
  return `🎤 Расшифровка:\n«${text}»\n\nПередаю дальше…`;
}
