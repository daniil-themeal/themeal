import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Telegram user id as string — bucket key in tasks.json */
export type TaskSection = string;

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), "data");
const NAMES_FILE = join(DATA_DIR, "user-names.json");

const DEFAULT_NAMES: Record<number, string> = {
  113321584: "Daniil",
  47420604: "Stas",
};

let envNames: Record<number, string> = {};
let storedNames: Record<string, string> = {};

function loadStoredNames(): void {
  if (!existsSync(NAMES_FILE)) return;
  try {
    storedNames = JSON.parse(readFileSync(NAMES_FILE, "utf8")) as Record<string, string>;
  } catch {
    storedNames = {};
  }
}

function saveStoredNames(): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(NAMES_FILE, JSON.stringify(storedNames, null, 2), "utf8");
}

function parseUserNamesEnv(raw: string): Record<number, string> {
  const out: Record<number, string> = {};
  for (const part of raw.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const colon = trimmed.indexOf(":");
    if (colon <= 0) continue;
    const id = Number(trimmed.slice(0, colon));
    const name = trimmed.slice(colon + 1).trim();
    if (Number.isInteger(id) && name) out[id] = name;
  }
  return out;
}

export function initUserRegistry(userNamesEnv = ""): void {
  loadStoredNames();
  envNames = parseUserNamesEnv(userNamesEnv);
}

export function setUserName(userId: number, name: string): void {
  const trimmed = name.trim();
  if (!trimmed) return;
  storedNames[String(userId)] = trimmed;
  saveStoredNames();
}

export function rememberUser(from: {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
}): void {
  if (DEFAULT_NAMES[from.id] || envNames[from.id]) return;
  const name =
    [from.first_name, from.last_name].filter(Boolean).join(" ").trim() ||
    from.username?.trim();
  if (name) setUserName(from.id, name);
}

export function userDisplayName(userId: number): string {
  return (
    DEFAULT_NAMES[userId] ??
    envNames[userId] ??
    storedNames[String(userId)] ??
    `User ${userId}`
  );
}

export function userSections(allowedUserIds: number[]): TaskSection[] {
  return [...allowedUserIds].sort((a, b) => a - b).map(String);
}

export function isUserSection(section: string, allowedUserIds: number[]): boolean {
  const id = Number(section);
  return Number.isInteger(id) && allowedUserIds.includes(id);
}

type TelegramChat = {
  first_name?: string;
  last_name?: string;
  username?: string;
};

export async function syncUserNamesFromTelegram(
  telegram: { getChat: (chatId: number) => Promise<unknown> },
  userIds: number[],
): Promise<void> {
  for (const userId of userIds) {
    if (DEFAULT_NAMES[userId] || envNames[userId] || storedNames[String(userId)]) continue;
    try {
      const chat = (await telegram.getChat(userId)) as TelegramChat;
      const name =
        [chat.first_name, chat.last_name].filter(Boolean).join(" ").trim() ||
        chat.username?.trim();
      if (name) setUserName(userId, name);
    } catch {
      // пользователь ещё не писал боту — имя подтянется при первом сообщении
    }
  }
}
