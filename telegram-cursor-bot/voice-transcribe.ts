import type { Telegram } from "telegraf";

export type WhisperProvider = "openai" | "groq";

export type VoiceSettings = {
  whisperProvider: string;
  openaiApiKey: string;
  groqApiKey: string;
  whisperLanguage: string;
};

export function resolveWhisperProvider(settings: VoiceSettings): WhisperProvider | null {
  const explicit = settings.whisperProvider.trim().toLowerCase();
  if (explicit === "groq" || explicit === "openai") return explicit;
  if (settings.groqApiKey) return "groq";
  if (settings.openaiApiKey) return "openai";
  return null;
}

export function isVoiceConfigured(settings: VoiceSettings): boolean {
  return resolveWhisperProvider(settings) !== null;
}

export function voiceProviderLabel(settings: VoiceSettings): string {
  const provider = resolveWhisperProvider(settings);
  if (!provider) return "выкл";
  const name = provider === "groq" ? "Groq Whisper" : "OpenAI Whisper";
  return `${name} (${settings.whisperLanguage})`;
}

function parseApiError(status: number, detail: string, provider: WhisperProvider): string {
  const lower = detail.toLowerCase();
  if (status === 429 && (lower.includes("quota") || lower.includes("rate limit"))) {
    if (provider === "openai") {
      return [
        "Квота OpenAI исчерпана (нет billing или лимит).",
        "Варианты:",
        "1. platform.openai.com → Billing",
        "2. Бесплатно: console.groq.com → API key → в .env:",
        "   WHISPER_PROVIDER=groq",
        "   GROQ_API_KEY=gsk_...",
      ].join("\n");
    }
    return "Лимит Groq API. Подождите минуту или проверьте console.groq.com";
  }
  if (status === 401) {
    return `Неверный API key (${provider}). Проверь .env`;
  }
  return `Whisper API error ${status}${detail ? `: ${detail.slice(0, 180)}` : ""}`;
}

async function downloadTelegramAudio(telegram: Telegram, fileId: string): Promise<Buffer> {
  const url = await telegram.getFileLink(fileId);
  const audioRes = await fetch(url.href);
  if (!audioRes.ok) {
    throw new Error(`Failed to download voice file (${audioRes.status})`);
  }
  return Buffer.from(await audioRes.arrayBuffer());
}

async function transcribeWithProvider(
  buffer: Buffer,
  provider: WhisperProvider,
  settings: VoiceSettings,
): Promise<string> {
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(buffer)], { type: "audio/ogg" }), "voice.ogg");
  form.append("language", settings.whisperLanguage);

  let endpoint: string;
  let apiKey: string;
  if (provider === "groq") {
    endpoint = "https://api.groq.com/openai/v1/audio/transcriptions";
    apiKey = settings.groqApiKey;
    form.append("model", "whisper-large-v3-turbo");
  } else {
    endpoint = "https://api.openai.com/v1/audio/transcriptions";
    apiKey = settings.openaiApiKey;
    form.append("model", "whisper-1");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(parseApiError(res.status, detail, provider));
  }

  const data = (await res.json()) as { text?: string };
  const text = data.text?.trim();
  if (!text) throw new Error("Empty transcription");
  return text;
}

export async function transcribeTelegramAudio(
  telegram: Telegram,
  fileId: string,
  settings: VoiceSettings,
): Promise<string> {
  const provider = resolveWhisperProvider(settings);
  if (!provider) {
    throw new Error(
      "Голосовые отключены. Укажи GROQ_API_KEY (бесплатно) или OPENAI_API_KEY в .env",
    );
  }

  const buffer = await downloadTelegramAudio(telegram, fileId);
  return transcribeWithProvider(buffer, provider, settings);
}

export function voiceFileId(message: {
  voice?: { file_id: string };
  audio?: { file_id: string };
}): string | null {
  return message.voice?.file_id ?? message.audio?.file_id ?? null;
}
