/**
 * Telegram bot → Cursor Agent bridge (local or cloud).
 *
 * Setup:  npm run setup
 * Start:  npm start
 */

import "dotenv/config";
import { createServer } from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Agent, CursorAgentError } from "@cursor/sdk";
import { Telegraf } from "telegraf";

const TELEGRAM_MAX = 4096;
const STREAM_EDIT_MS = 1200;

type Settings = {
  telegramToken: string;
  cursorApiKey: string;
  allowedUserIds: Set<number> | null;
  agentMode: "local" | "cloud";
  workspace: string;
  cloudRepoUrl: string;
  cloudRepoRef: string;
  model: string;
  vercelUrl: string;
  autoPush: boolean;
  vercelDeployHook: string;
};

function env(name: string, fallback = ""): string {
  return (process.env[name] ?? fallback).trim();
}

function loadSettings(): Settings {
  const telegramToken = env("TELEGRAM_BOT_TOKEN");
  const cursorApiKey = env("CURSOR_API_KEY");
  if (!telegramToken) throw new Error("Run npm run setup — TELEGRAM_BOT_TOKEN is missing");
  if (!cursorApiKey) throw new Error("Run npm run setup — CURSOR_API_KEY is missing");

  const agentMode = env("AGENT_MODE", "local") as "local" | "cloud";
  if (agentMode !== "local" && agentMode !== "cloud") {
    throw new Error("AGENT_MODE must be local or cloud");
  }

  const workspace = env("WORKSPACE") || resolveWorkspace();
  const allowedRaw = env("ALLOWED_USER_IDS");
  const allowedUserIds = allowedRaw
    ? new Set(allowedRaw.split(",").map((s) => Number(s.trim())).filter(Boolean))
    : null;

  if (allowedUserIds && allowedUserIds.size === 0) {
    throw new Error("Set ALLOWED_USER_IDS in .env (your Telegram user ID from @userinfobot)");
  }

  return {
    telegramToken,
    cursorApiKey,
    allowedUserIds,
    agentMode,
    workspace,
    cloudRepoUrl: env("CLOUD_REPO_URL", "https://github.com/daniil-themeal/themeal.git"),
    cloudRepoRef: env("CLOUD_REPO_REF", "feature/next"),
    model: env("CURSOR_MODEL", "composer-2.5"),
    vercelUrl: env("VERCEL_URL", "https://landing-20-05-test.vercel.app"),
    autoPush: env("AUTO_PUSH", "true") !== "false",
    vercelDeployHook: env("VERCEL_DEPLOY_HOOK"),
  };
}

function resolveWorkspace(): string {
  return resolve(dirname(fileURLToPath(import.meta.url)), "..");
}

function splitMessage(text: string, limit = TELEGRAM_MAX): string[] {
  if (text.length <= limit) return [text];
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + limit, text.length);
    if (end < text.length) {
      const splitAt = text.lastIndexOf("\n", end);
      end = splitAt > start ? splitAt : end;
    }
    chunks.push(text.slice(start, end).trimEnd());
    start = end;
    while (start < text.length && text[start] === "\n") start += 1;
  }
  return chunks.filter(Boolean);
}

function preview(text: string, max = TELEGRAM_MAX - 20): string {
  if (text.length <= max) return text || "…";
  return text.slice(0, max) + "…";
}

function isAllowed(userId: number | undefined, settings: Settings): boolean {
  if (userId == null) return false;
  if (!settings.allowedUserIds) return true;
  return settings.allowedUserIds.has(userId);
}

function buildAgentPrompt(userText: string, settings: Settings): string {
  const pushBlock = settings.autoPush
    ? [
        "After completing the task:",
        "1. Run `npm run build` if you changed source code.",
        `2. Commit with a clear message and push to origin ${settings.cloudRepoRef}.`,
        `3. Confirm the push succeeded — production deploy will run automatically.`,
      ].join("\n")
    : "Report what changed; do not push unless the user explicitly asks.";

  return [
    "You are the Cursor agent for the theMeal landing page.",
    `Repository: ${settings.cloudRepoUrl} (branch: ${settings.cloudRepoRef}).`,
    `Production site: ${settings.vercelUrl} (Vercel, auto-deploy on git push).`,
    "Stack: Vite + React, landing in src/app/landing-stas/.",
    "Make minimal, focused changes. Match existing code style.",
    "",
    pushBlock,
    "",
    "User request:",
    userText,
  ].join("\n");
}

async function createAgent(settings: Settings) {
  const base = {
    apiKey: settings.cursorApiKey,
    model: { id: settings.model },
  };

  if (settings.agentMode === "cloud") {
    return Agent.create({
      ...base,
      cloud: {
        repos: [{ url: settings.cloudRepoUrl, startingRef: settings.cloudRepoRef }],
      },
    });
  }

  return Agent.create({
    ...base,
    local: { cwd: settings.workspace },
  });
}

async function askAgentStreaming(
  agent: Awaited<ReturnType<typeof Agent.create>>,
  prompt: string,
  onUpdate: (text: string) => Promise<void>,
): Promise<string> {
  const run = await agent.send(prompt);
  let text = "";
  let lastEdit = 0;

  for await (const event of run.stream()) {
    if (event.type === "assistant") {
      for (const block of event.message.content) {
        if (block.type === "text") text += block.text;
      }
      const now = Date.now();
      if (now - lastEdit >= STREAM_EDIT_MS) {
        lastEdit = now;
        await onUpdate(preview(text)).catch(() => undefined);
      }
    }
  }

  const result = await run.wait();
  if (result.status === "error") {
    throw new Error(`Cursor run failed: ${result.id}`);
  }
  return text.trim() || "(empty response)";
}

async function triggerVercelDeploy(settings: Settings): Promise<string | null> {
  if (!settings.vercelDeployHook) return null;
  const res = await fetch(settings.vercelDeployHook, { method: "POST" });
  if (!res.ok) {
    throw new Error(`Vercel deploy hook failed: ${res.status}`);
  }
  const data = (await res.json()) as { job?: { id?: string } };
  return data.job?.id ?? "started";
}

async function main() {
  const settings = loadSettings();
  const userAgents = new Map<number, Awaited<ReturnType<typeof Agent.create>>>();

  const bot = new Telegraf(settings.telegramToken);

  const modeLabel =
    settings.agentMode === "local"
      ? "локальный (файлы на этом ПК)"
      : "cloud (GitHub: themeal)";

  bot.start(async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    await ctx.reply(
      [
        "Привет! Управление лендингом theMeal через Cursor Agent.",
        "",
        `Режим: ${modeLabel}`,
        `Сайт: ${settings.vercelUrl}`,
        "",
        "Как работает:",
        "1. Пишешь задачу (например: «увеличь gap в hero до 20px»)",
        "2. Агент меняет код в GitHub",
        "3. Пушит в ветку → Vercel деплоит автоматически",
        "",
        "• /reset — новый диалог",
        "• /status — настройки",
      ].join("\n"),
    );
  });

  bot.command("reset", async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    const userId = ctx.from!.id;
    const existing = userAgents.get(userId);
    if (existing) {
      await existing[Symbol.asyncDispose]?.();
      userAgents.delete(userId);
    }
    await ctx.reply("Контекст агента сброшен.");
  });

  bot.command("status", async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    const lines = [`mode: ${settings.agentMode}`, `model: ${settings.model}`, `site: ${settings.vercelUrl}`];
    if (settings.agentMode === "local") {
      lines.push(`workspace: ${settings.workspace}`);
    } else {
      lines.push(`repo: ${settings.cloudRepoUrl} @ ${settings.cloudRepoRef}`);
    }
    await ctx.reply(lines.join("\n"));
  });

  bot.on("text", async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    const prompt = ctx.message.text.trim();
    if (!prompt || prompt.startsWith("/")) return;

    const userId = ctx.from!.id;
    const status = await ctx.reply("Агент думает…");
    await ctx.sendChatAction("typing");

    try {
      let agent = userAgents.get(userId);
      if (!agent) {
        agent = await createAgent(settings);
        userAgents.set(userId, agent);
      }

      const answer = await askAgentStreaming(
        agent,
        buildAgentPrompt(prompt, settings),
        async (partial) => {
        await ctx.telegram.editMessageText(ctx.chat.id, status.message_id, undefined, partial);
      });

      await ctx.telegram.deleteMessage(ctx.chat.id, status.message_id).catch(() => undefined);

      for (const chunk of splitMessage(answer)) {
        await ctx.reply(chunk);
      }

      if (settings.autoPush && settings.vercelDeployHook) {
        await ctx.reply("Запускаю деплой на Vercel…");
        const jobId = await triggerVercelDeploy(settings);
        await ctx.reply(`Production deploy: ${settings.vercelUrl}${jobId ? `\njob: ${jobId}` : ""}`);
      }
    } catch (err) {
      const message =
        err instanceof CursorAgentError
          ? `Cursor startup error: ${err.message}`
          : err instanceof Error
            ? err.message
            : String(err);
      await ctx.telegram.editMessageText(ctx.chat.id, status.message_id, undefined, `Ошибка: ${message}`);
    }
  });

  const shutdown = async () => {
    for (const agent of userAgents.values()) {
      await agent[Symbol.asyncDispose]?.();
    }
    userAgents.clear();
    bot.stop("SIGINT");
  };

  process.once("SIGINT", () => void shutdown());
  process.once("SIGTERM", () => void shutdown());

  const port = Number(process.env.PORT || 8080);
  createServer((req, res) => {
      if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("ok");
        return;
      }
      res.writeHead(404);
      res.end();
    }).listen(port, () => console.log(`Health check on :${port}/health`));

  console.log(`Bot started (${settings.agentMode}, workspace: ${settings.workspace})`);
  await bot.launch();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
