import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Markup } from "telegraf";

export const CB_ACCESS_PREFIX = "acc:";

const ENV_PATH = join(dirname(fileURLToPath(import.meta.url)), ".env");

export function accessRequestKeyboard(userId: number) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("✅ Дать доступ", `${CB_ACCESS_PREFIX}ok:${userId}`),
      Markup.button.callback("❌ Отклонить", `${CB_ACCESS_PREFIX}no:${userId}`),
    ],
  ]);
}

export function parseAccessCallback(
  data: string,
): { action: "ok" | "no"; userId: number } | null {
  if (!data.startsWith(CB_ACCESS_PREFIX)) return null;
  const rest = data.slice(CB_ACCESS_PREFIX.length);
  const [action, idRaw] = rest.split(":");
  if (action !== "ok" && action !== "no") return null;
  const userId = Number(idRaw);
  if (!Number.isInteger(userId) || userId <= 0) return null;
  return { action, userId };
}

export function grantUserAccess(userId: number, allowed: Set<number> | null): Set<number> {
  const next = allowed ?? new Set<number>();
  next.add(userId);

  const content = readFileSync(ENV_PATH, "utf8");
  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  const lines = content.split(/\r?\n/);
  let found = false;
  const updated = lines.map((line) => {
    if (!line.startsWith("ALLOWED_USER_IDS=")) return line;
    found = true;
    const ids = line
      .slice("ALLOWED_USER_IDS=".length)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!ids.includes(String(userId))) ids.push(String(userId));
    return `ALLOWED_USER_IDS=${ids.join(",")}`;
  });
  if (!found) {
    updated.push(`ALLOWED_USER_IDS=${[...next].join(",")}`);
  }
  writeFileSync(ENV_PATH, updated.join(eol), "utf8");
  process.env.ALLOWED_USER_IDS = [...next].join(",");
  return next;
}

export function formatAccessRequestMessage(input: {
  userId: number;
  name: string;
  username?: string;
  preview?: string;
}): string {
  const lines = [
    "👤 Запрос доступа к боту",
    "",
    `Имя: ${input.name}`,
    `ID: ${input.userId}`,
  ];
  if (input.username) lines.push(`Username: @${input.username}`);
  if (input.preview) {
    lines.push("", "Сообщение:", `«${input.preview.slice(0, 300)}»`);
  }
  return lines.join("\n");
}
