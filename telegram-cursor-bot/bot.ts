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
import { Markup, Telegraf } from "telegraf";
import {
  addTask,
  deleteTask,
  formatTaskList,
  getTask,
  parseTaskId,
  sectionLabelWithCount,
  setTaskDeferred,
  toggleTaskDone,
  updateTask,
} from "./task-store.js";
import {
  CB_APPROVAL_PREFIX,
  CB_TASK_PREFIX,
  approvalKeyboard,
  deleteConfirmKeyboard,
  parseApprovalCallback,
  parseTaskCallback,
  type PendingTaskInput,
  runConfirmKeyboard,
  TASKS_PAGE_SIZE,
  sectionsMenuKeyboard,
  taskInputCancelKeyboard,
  tasksKeyboard,
  type TaskUiContext,
} from "./task-ui.js";
import {
  initUserRegistry,
  rememberUser,
  syncUserNamesFromTelegram,
  userDisplayName,
  userSections,
  type TaskSection,
} from "./user-registry.js";
import { createApprovalRequest, getApproval, resolveApproval } from "./task-approval.js";
import {
  accessRequestKeyboard,
  CB_ACCESS_PREFIX,
  formatAccessRequestMessage,
  grantUserAccess,
  parseAccessCallback,
} from "./access-control.js";
import { isVoiceConfigured, transcribeTelegramAudio, voiceFileId, voiceProviderLabel } from "./voice-transcribe.js";
import {
  checkProductionSite,
  gitPushFromWorkspace,
  sleep,
  triggerVercelDeploy,
} from "./deploy.js";
import {
  hideReplyKeyboard,
  mainReplyKeyboard,
  matchReplyButton,
  taskInputForceReply,
  BTN_SITE,
  CB_DEPLOY,
  CB_CANCEL,
  CB_OPEN_TASKS,
  deployOfferKeyboard,
  successDoneKeyboard,
} from "./reply-keyboard.js";
import {
  agentElapsedText,
  agentStreamingText,
  agentWorkHeader,
  deployStartMessage,
  taskToAgentMessage,
  userTaskAcceptedMessage,
  voiceDoneMessage,
  voiceStartMessage,
} from "./status-messages.js";

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
  vercelDeployHook: string;
  openaiApiKey: string;
  groqApiKey: string;
  whisperProvider: string;
  whisperLanguage: string;
  taskOwnerId: number;
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
    vercelUrl: env("VERCEL_URL", "https://themeal-test.vercel.app"),
    vercelDeployHook: env("VERCEL_DEPLOY_HOOK"),
    openaiApiKey: env("OPENAI_API_KEY"),
    groqApiKey: env("GROQ_API_KEY"),
    whisperProvider: env("WHISPER_PROVIDER"),
    whisperLanguage: env("WHISPER_LANGUAGE", "ru"),
    taskOwnerId: Number(env("TASK_OWNER_ID", "113321584")),
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
  return [
    "You are the Cursor agent for the theMeal landing page.",
    "Always respond in Russian.",
    `Repository: ${settings.cloudRepoUrl} (branch: ${settings.cloudRepoRef}).`,
    `Production site: ${settings.vercelUrl} (deploys after git push — user confirms push separately).`,
    "Stack: Vite + React, landing in src/app/landing-stas/.",
    "Design system: src/app/components/common/ (Button variant=primary uses purple primary tokens).",
    "Make minimal, focused changes. Match existing code style.",
    "",
    "IMPORTANT — do NOT push to remote. Do NOT deploy.",
    "After code changes: run `npm run build`, commit locally with a clear message, stop there.",
    "End your reply with a short summary of files changed and the commit message.",
    "",
    "User request:",
    userText,
  ].join("\n");
}

function buildPushPrompt(settings: Settings): string {
  return [
    "The user explicitly approved pushing to GitHub.",
    "Always respond in Russian.",
    `Repository branch: ${settings.cloudRepoRef}.`,
    "",
    "Do NOT make new feature changes.",
    "1. Check git status.",
    "2. If there are uncommitted changes, commit them.",
    "3. Run `npm run build` if source changed and build was not verified.",
    `4. Push to origin ${settings.cloudRepoRef}.`,
    "5. Confirm push succeeded and list what was published.",
  ].join("\n");
}

const CONFIRM_PUSH = /^(?:\/push|да|yes|push|пуш|опубликовать|deploy|деплой)$/i;
const REJECT_PUSH = /^(?:\/cancel|нет|no|cancel|отмена)$/i;

function buildWelcomeText(modeLabel: string, vercelUrl: string, owner: boolean): string {
  if (owner) {
    return [
      "Привет! Управление лендингом theMeal через Cursor Agent.",
      "",
      `Режим: ${modeLabel}`,
      `Сайт: ${vercelUrl}`,
      "",
      "Как работает:",
      "1. 📋 Задачи → ➕ Добавить → текст задачи",
      "2. «В работу» — отдать агенту",
      "3. 🚀 Деплой — публикация",
      "",
      "Свободный текст агенту — только вне экрана задач (или после 🔄 Сброс).",
    ].join("\n");
  }
  return [
    "Привет! Бот лендинга theMeal.",
    "",
    `Сайт: ${vercelUrl}`,
    "",
    "Как работать:",
    "1. 📋 Задачи → ➕ Добавить — опиши изменение",
    "2. «В работу» на задаче — Daniil подтвердит выполнение",
    "3. 🚀 Деплой — заявка Daniil на публикацию",
    "",
    "🌐 Сайт — кнопка внизу экрана",
    "",
    "Прямые сообщения агенту не принимаются — только через задачи.",
  ].join("\n");
}

async function disposeUserAgent(
  userId: number,
  userAgents: Map<number, Awaited<ReturnType<typeof Agent.create>>>,
) {
  const existing = userAgents.get(userId);
  if (existing) {
    await existing[Symbol.asyncDispose]?.();
    userAgents.delete(userId);
  }
}

function isAgentBusyError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return msg.includes("agent_busy") || msg.includes("active run");
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
    const detail =
      "error" in result && result.error && typeof result.error === "object" && "message" in result.error
        ? String((result.error as { message?: string }).message)
        : "";
    throw new Error(
      detail
        ? `Cursor run failed (${result.id}): ${detail}`
        : `Cursor run failed (${result.id}). Попробуй /reset или 🚀 Деплой ещё раз.`,
    );
  }
  return text.trim() || "(empty response)";
}

async function main() {
  const settings = loadSettings();
  initUserRegistry(env("USER_NAMES"));
  if (settings.allowedUserIds && !settings.allowedUserIds.has(settings.taskOwnerId)) {
    settings.allowedUserIds.add(settings.taskOwnerId);
  }
  const userAgents = new Map<number, Awaited<ReturnType<typeof Agent.create>>>();
  const userProcessing = new Set<number>();
  const awaitingPush = new Set<number>();
  const pendingTaskInput = new Map<number, PendingTaskInput>();
  const taskListPage = new Map<number, number>();
  const taskViewSection = new Map<number, TaskSection>();
  const taskInSectionView = new Map<number, boolean>();
  const tasksUiActive = new Map<number, boolean>();
  const taskInputPromptMsg = new Map<number, { chatId: number; messageId: number }>();
  const userActivity = new Map<number, string>();

  const isOwner = (userId: number) => userId === settings.taskOwnerId;

  const setSectionBrowseMode = (userId: number, inSection: boolean) => {
    taskInSectionView.set(userId, inSection);
  };

  const isInSectionView = (userId: number) => taskInSectionView.get(userId) ?? false;

  const setTasksUiActive = (userId: number, active: boolean) => {
    if (active) tasksUiActive.set(userId, true);
    else {
      tasksUiActive.delete(userId);
      taskInSectionView.delete(userId);
    }
  };

  const isInTasksUi = (userId: number) => tasksUiActive.get(userId) ?? false;

  const clearTaskInputPrompt = async (userId: number) => {
    const ref = taskInputPromptMsg.get(userId);
    if (!ref) return;
    await bot.telegram.deleteMessage(ref.chatId, ref.messageId).catch(() => undefined);
    taskInputPromptMsg.delete(userId);
  };

  const allowedUserIdList = (): number[] => [...(settings.allowedUserIds ?? [])];

  const visibleSections = (viewerId: number): TaskSection[] =>
    isOwner(viewerId) ? userSections(allowedUserIdList()) : [String(viewerId)];

  const taskUi = (viewerId: number): TaskUiContext => ({
    sections: visibleSections(viewerId),
    sectionName: (section) => userDisplayName(Number(section)),
  });

  const sectionTitle = (section: TaskSection) =>
    sectionLabelWithCount(section, userDisplayName(Number(section)));

  const defaultSection = (userId: number): TaskSection => String(userId);

  const getViewSection = (userId: number): TaskSection =>
    taskViewSection.get(userId) ?? defaultSection(userId);

  const resolveSection = (section: TaskSection | undefined, userId: number): TaskSection => {
    const allowed = visibleSections(userId);
    const candidate = section ?? getViewSection(userId);
    return allowed.includes(candidate) ? candidate : defaultSection(userId);
  };

  const ownSection = (userId: number): TaskSection => String(userId);

  const canAddToSection = (userId: number, section: TaskSection) => ownSection(userId) === section;

  const buildTasksPanel = (
    userId: number,
    section: TaskSection,
    page: number,
    prompt?: string,
    showCancel = false,
  ) => {
    const body = formatTaskList(
      section,
      sectionTitle(section),
      page,
      TASKS_PAGE_SIZE,
      !isOwner(userId),
    );
    const text = showCancel && prompt ? prompt : prompt ? `${prompt}\n\n${body}` : body;
    const keyboard = tasksKeyboard(section, page, taskUi(userId), {
      showCancel,
      canAdd: canAddToSection(userId, section),
    });
    return { text, keyboard };
  };

  const requesterLabel = (from?: { id?: number; first_name?: string; username?: string }) => {
    if (!from?.id) return "Пользователь";
    const name = from.first_name ?? from.username;
    return name ? `${name} (${from.id})` : String(from.id);
  };

  const notifyOwnerApproval = async (
    approvalId: number,
    section: TaskSection,
    text: string,
    requesterName: string,
    kind: "change" | "deploy" = "change",
    taskId?: number,
  ) => {
    const taskLine = taskId !== undefined ? `\nЗадача: #${taskId}` : "";
    const header = kind === "deploy" ? "🚀 Заявка на деплой" : "🔔 Запрос на изменения";
    const body =
      kind === "deploy"
        ? "Изменения готовы к публикации на GitHub и Vercel."
        : `«${text}»`;
    await bot.telegram.sendMessage(
      settings.taskOwnerId,
      [
        header,
        "",
        `От: ${requesterName}`,
        `Раздел: ${userDisplayName(Number(section))}${taskLine}`,
        "",
        body,
      ].join("\n"),
      approvalKeyboard(approvalId),
    );
  };

  const bot = new Telegraf(settings.telegramToken, { handlerTimeout: 600_000 });

  const pendingAccessNotified = new Set<number>();

  bot.use(async (ctx, next) => {
    const userId = ctx.from?.id;
    if (userId === undefined) return;

    const cbData =
      ctx.callbackQuery && "data" in ctx.callbackQuery
        ? String(ctx.callbackQuery.data)
        : undefined;
    if (cbData?.startsWith(CB_ACCESS_PREFIX) && userId === settings.taskOwnerId) {
      return next();
    }

    if (isAllowed(userId, settings)) return next();

    if (!pendingAccessNotified.has(userId)) {
      pendingAccessNotified.add(userId);
      let preview: string | undefined;
      if (ctx.message && "text" in ctx.message) {
        preview = ctx.message.text.trim();
      } else if (ctx.message && ("voice" in ctx.message || "audio" in ctx.message)) {
        preview = "🎤 голосовое сообщение";
      }
      await bot.telegram
        .sendMessage(
          settings.taskOwnerId,
          formatAccessRequestMessage({
            userId,
            name: requesterLabel(ctx.from),
            username: ctx.from?.username,
            preview,
          }),
          accessRequestKeyboard(userId),
        )
        .catch(() => undefined);
    }

    if (ctx.callbackQuery) {
      await ctx.answerCbQuery("Нет доступа").catch(() => undefined);
      return;
    }
    await ctx
      .reply("🔒 Доступ закрыт.\nDaniil получил запрос — жди подтверждения.")
      .catch(() => undefined);
  });

  bot.action(new RegExp(`^${CB_ACCESS_PREFIX}`), async (ctx) => {
    const ack = (text?: string) => ctx.answerCbQuery(text).catch(() => undefined);
    if (!ctx.from || ctx.from.id !== settings.taskOwnerId) {
      await ack("Только Daniil");
      return;
    }
    const data = "data" in ctx.callbackQuery ? ctx.callbackQuery.data : undefined;
    const parsed = data ? parseAccessCallback(String(data)) : null;
    if (!parsed) return;

    pendingAccessNotified.delete(parsed.userId);

    if (parsed.action === "no") {
      await ctx.editMessageReplyMarkup(undefined).catch(() => undefined);
      await ack("Отклонено");
      await bot.telegram
        .sendMessage(parsed.userId, "❌ Запрос на доступ к боту отклонён.")
        .catch(() => undefined);
      return;
    }

    settings.allowedUserIds = grantUserAccess(parsed.userId, settings.allowedUserIds);
    await syncUserNamesFromTelegram(bot.telegram, [parsed.userId]).catch(() => undefined);
    await ctx.editMessageReplyMarkup(undefined).catch(() => undefined);
    await ack("Доступ выдан");
    await bot.telegram
      .sendMessage(
        parsed.userId,
        "✅ Daniil дал доступ к боту!\n\nНапиши /start — можно работать.",
        mainReplyKeyboard(settings.vercelUrl, isOwner(parsed.userId)),
      )
      .catch(() => undefined);
    await ctx.reply(`✅ Доступ выдан пользователю ${parsed.userId}`);
  });

  const statusSettings = {
    agentMode: settings.agentMode,
    model: settings.model,
    vercelUrl: settings.vercelUrl,
    cloudRepoRef: settings.cloudRepoRef,
  };

  const setActivity = (userId: number, text: string) => {
    userActivity.set(userId, text);
  };

  const clearActivity = (userId: number) => {
    userActivity.delete(userId);
  };

  const showSectionPicker = async (
    ctx: {
      reply: (text: string, extra?: object) => Promise<unknown>;
      editMessageText?: (text: string, extra?: object) => Promise<unknown>;
      callbackQuery?: { message?: { message_id: number } };
    },
    userId: number,
    edit = false,
  ) => {
    pendingTaskInput.delete(userId);
    await clearTaskInputPrompt(userId);
    setTasksUiActive(userId, true);
    const ui = taskUi(userId);
    const lines = ui.sections.map((s) => `• ${sectionLabelWithCount(s, ui.sectionName(s))}`);
    const text = ["📋 Разделы задач", "", ...lines, "", "➕ Добавить задачу — зайди в раздел", "", "Выбери раздел:"].join(
      "\n",
    );
    const keyboard = sectionsMenuKeyboard(ui);
    setSectionBrowseMode(userId, false);
    if (edit && ctx.editMessageText && ctx.callbackQuery?.message) {
      await ctx.editMessageText(text, keyboard).catch(async () => {
        await ctx.reply(text, keyboard);
      });
      return;
    }
    await ctx.reply(text, keyboard);
  };

  const openTasks = async (
    ctx: Parameters<typeof showTasks>[0],
    userId: number,
    edit = false,
    hideKeyboard = false,
  ) => {
    if (hideKeyboard && !edit) {
      await ctx.reply("📋 Задачи", hideReplyKeyboard());
    }
    if (taskUi(userId).sections.length > 1) {
      await showSectionPicker(ctx, userId, edit);
      return;
    }
    await showTasks(ctx, userId, 0, edit);
  };

  const showTasks = async (
    ctx: {
      reply: (text: string, extra?: object) => Promise<unknown>;
      editMessageText?: (text: string, extra?: object) => Promise<unknown>;
      callbackQuery?: { message?: { message_id: number } };
    },
    userId: number,
    page = 0,
    edit = false,
    section?: TaskSection,
  ) => {
    const viewSection = resolveSection(section, userId);
    taskViewSection.set(userId, viewSection);
    taskListPage.set(userId, page);
    setTasksUiActive(userId, true);
    setSectionBrowseMode(userId, true);
    const { text, keyboard } = buildTasksPanel(userId, viewSection, page);
    if (edit && ctx.editMessageText && ctx.callbackQuery?.message) {
      await ctx.editMessageText(text, keyboard).catch(async () => {
        await ctx.reply(text, keyboard);
      });
      return;
    }
    await ctx.reply(text, keyboard);
  };

  const editOrReply = async (
    ctx: {
      reply: (text: string, extra?: object) => Promise<unknown>;
      editMessageText?: (text: string, extra?: object) => Promise<unknown>;
      callbackQuery?: { message?: { message_id: number } };
    },
    text: string,
    extra?: object,
  ) => {
    if (ctx.callbackQuery?.message && ctx.editMessageText) {
      await ctx.editMessageText(text, extra).catch(async () => {
        await ctx.reply(text, extra);
      });
      return;
    }
    await ctx.reply(text, extra);
  };

  const enterTaskInputMode = async (
    ctx: {
      reply: (text: string, extra?: object) => Promise<{ message_id: number }>;
      editMessageText?: (text: string, extra?: object) => Promise<unknown>;
      callbackQuery?: { message?: { chat: { id: number }; message_id: number } };
      chat?: { id: number };
    },
    userId: number,
    promptText: string,
    inlineKeyboard: object,
  ) => {
    await clearTaskInputPrompt(userId);
    await editOrReply(ctx, promptText, inlineKeyboard);
    const chatId = ctx.callbackQuery?.message?.chat.id ?? ctx.chat?.id;
    if (!chatId) return;
    const ref = await ctx.reply("👇 Отправь текст или 🎤 голосовое:", taskInputForceReply());
    taskInputPromptMsg.set(userId, { chatId, messageId: ref.message_id });
  };

  const handleTaskTextInput = async (
    userId: number,
    text: string,
    ctx: { reply: (text: string, extra?: object) => Promise<unknown> },
  ): Promise<boolean> => {
    const pending = pendingTaskInput.get(userId);
    if (!pending || pending.type === "delete_confirm") return false;

    await clearTaskInputPrompt(userId);
    pendingTaskInput.delete(userId);
    const trimmed = text.trim();
    if (trimmed.length < 2) {
      await ctx.reply("Текст слишком короткий. Открой /tasks и попробуй снова.");
      return true;
    }

    if (pending.type === "add") {
      if (!canAddToSection(userId, pending.section)) {
        await ctx.reply("➕ Задачи можно добавлять только в свой раздел.");
        await showTasks(ctx, userId, taskListPage.get(userId) ?? 0, false, ownSection(userId));
        return true;
      }
      const item = addTask(pending.section, trimmed, userId);
      await ctx.reply(`✅ Добавлена задача #${item.id} (${userDisplayName(Number(pending.section))}).`);
      await showTasks(ctx, userId, taskListPage.get(userId) ?? 0, false, pending.section);
      return true;
    }

    const updated = updateTask(pending.section, pending.taskId, trimmed);
    if (!updated) {
      await ctx.reply("Задача не найдена.");
      return true;
    }
    await ctx.reply(`✅ Задача #${updated.id} обновлена.`);
    await showTasks(ctx, userId, taskListPage.get(userId) ?? 0, false, pending.section);
    return true;
  };

  const runAgentTask = async (
    userId: number,
    ctx: {
      chat: { id: number };
      telegram: Telegraf["telegram"];
      sendChatAction: (action: "typing") => Promise<boolean>;
      reply: (text: string, extra?: object) => Promise<{ message_id: number }>;
    },
    prompt: string,
    statusTitle = "Агент работает",
  ) => {
    setActivity(userId, statusTitle);
    const header = agentWorkHeader(statusSettings, statusTitle);
    const status = await ctx.reply(header);
    await ctx.telegram.sendChatAction(ctx.chat.id, "typing").catch(() => undefined);

    const started = Date.now();
    const heartbeat = setInterval(() => {
      const minutes = Math.max(1, Math.floor((Date.now() - started) / 60_000));
      ctx.telegram
        .editMessageText(ctx.chat.id, status.message_id, undefined, agentElapsedText(header, minutes))
        .catch(() => undefined);
    }, 90_000);

    try {
      let agent = userAgents.get(userId);
      if (!agent) {
        setActivity(userId, "Подключаю Cursor Agent…");
        agent = await createAgent(settings);
        userAgents.set(userId, agent);
      }

      setActivity(userId, "Агент редактирует код…");
      const answer = await askAgentStreaming(agent, prompt, async (partial) => {
        setActivity(userId, "Агент пишет ответ…");
        await ctx.telegram
          .editMessageText(ctx.chat.id, status.message_id, undefined, agentStreamingText(header, partial))
          .catch(() => undefined);
      });

      await ctx.telegram.deleteMessage(ctx.chat.id, status.message_id).catch(() => undefined);

      for (const chunk of splitMessage(answer)) {
        await ctx.reply(chunk);
      }
      return answer;
    } catch (err) {
      if (isAgentBusyError(err)) {
        await disposeUserAgent(userId, userAgents);
        awaitingPush.delete(userId);
        await ctx.telegram
          .editMessageText(
            ctx.chat.id,
            status.message_id,
            undefined,
            "⚠️ Агент был занят — контекст сброшен.\nОтправь задачу ещё раз.",
          )
          .catch(() => undefined);
        return null;
      }

      await disposeUserAgent(userId, userAgents);
      const message =
        err instanceof CursorAgentError
          ? `Cursor startup error: ${err.message}`
          : err instanceof Error
            ? err.message
            : String(err);
      await ctx.telegram
        .editMessageText(
          ctx.chat.id,
          status.message_id,
          undefined,
          `❌ Ошибка агента:\n${message}\n\nКонтекст сброшен — /reset и попробуй снова.`,
        )
        .catch(() => undefined);
      return null;
    } finally {
      clearInterval(heartbeat);
      clearActivity(userId);
    }
  };

  type TaskCtx = {
    chat: { id: number };
    from?: { id: number; first_name?: string; username?: string };
    telegram: Telegraf["telegram"];
    sendChatAction: (action: "typing") => Promise<boolean>;
    reply: (text: string, extra?: object) => Promise<{ message_id: number }>;
    answerCbQuery?: (text?: string) => Promise<boolean>;
    clearKeyboard?: () => Promise<unknown>;
  };

  const buildTaskCtx = (ctx: {
    chat?: { id: number };
    callbackQuery?: { message?: { chat: { id: number } } };
    from?: { id: number };
    telegram: Telegraf["telegram"];
    reply: TaskCtx["reply"];
    answerCbQuery?: (text?: string) => Promise<boolean>;
    editMessageReplyMarkup?: (markup?: undefined) => Promise<unknown>;
  }): TaskCtx | null => {
    const chatId = ctx.chat?.id ?? ctx.callbackQuery?.message?.chat.id;
    if (chatId === undefined) return null;
    const isCallback = Boolean(ctx.callbackQuery);
    return {
      chat: { id: chatId },
      from: ctx.from,
      telegram: ctx.telegram,
      sendChatAction: (action) => ctx.telegram.sendChatAction(chatId, action),
      reply: (text, extra) => ctx.reply(text, extra),
      answerCbQuery:
        isCallback && ctx.answerCbQuery
          ? (text?: string) => ctx.answerCbQuery!(text).catch(() => false)
          : undefined,
      clearKeyboard:
        isCallback && ctx.editMessageReplyMarkup
          ? () => ctx.editMessageReplyMarkup!(undefined)
          : undefined,
    };
  };

  const executeDeploy = async (
    actorUserId: number,
    ctx: TaskCtx,
    changeOwnerId: number,
  ) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.answerCbQuery?.("Access denied.");
      return;
    }
    if (!isOwner(actorUserId)) {
      await ctx.answerCbQuery?.("Только Daniil");
      return;
    }
    if (!awaitingPush.has(changeOwnerId)) {
      await ctx.answerCbQuery?.("Нет изменений для деплоя.");
      await ctx.reply(
        changeOwnerId === actorUserId
          ? "ℹ️ Нечего деплоить.\n\nСначала дай задачу агенту, дождись ответа, потом 🚀 Деплой."
          : "ℹ️ У автора заявки больше нет неопубликованных изменений.",
      );
      return;
    }
    if (userProcessing.has(actorUserId)) {
      await ctx.answerCbQuery?.("Подожди…");
      await ctx.reply("⏳ Уже выполняется другая операция. Подожди или /reset.");
      return;
    }

    await ctx.answerCbQuery?.("Запускаю деплой…");
    await ctx.reply(deployStartMessage(statusSettings));
    userProcessing.add(actorUserId);
    const doneKeyboard = successDoneKeyboard(settings.vercelUrl);
    const notifyRequester = async (text: string, withButtons = true) => {
      if (changeOwnerId !== actorUserId) {
        await bot.telegram
          .sendMessage(changeOwnerId, text, withButtons ? doneKeyboard : undefined)
          .catch(() => undefined);
      }
    };
    try {
      let pushOk = false;

      if (settings.agentMode === "local") {
        setActivity(actorUserId, "Деплой: git push…");
        const push = await gitPushFromWorkspace(settings.workspace, settings.cloudRepoRef);
        pushOk = push.ok;
        if (push.ok) {
          await ctx.reply(`✓ git push origin ${settings.cloudRepoRef}`);
        } else {
          await ctx.reply(`⚠️ git push не удался:\n${push.detail.slice(0, 400)}`);
        }
      } else {
        // Cloud: не дергаем Cursor Agent для push — часто падает, код уже на GitHub после задачи.
        setActivity(actorUserId, "Деплой: проверка git push…");
        const localPush = await gitPushFromWorkspace(settings.workspace, settings.cloudRepoRef);
        if (localPush.ok) {
          pushOk = true;
          await ctx.reply(`✓ git push origin ${settings.cloudRepoRef}`);
        } else if (/already up to date|Everything up-to-date|up to date/i.test(localPush.detail)) {
          pushOk = true;
          await ctx.reply(`ℹ️ На GitHub уже актуально (${settings.cloudRepoRef})`);
        } else {
          await ctx.reply(
            `ℹ️ git push из WORKSPACE не выполнен — продолжаю через Vercel hook.\n${localPush.detail.slice(0, 200)}`,
          );
        }
      }

      if (settings.vercelDeployHook) {
        setActivity(actorUserId, "Деплой: Vercel production…");
        await ctx.reply("🔄 Запускаю production-сборку на Vercel…");
        const deploy = await triggerVercelDeploy(settings.vercelDeployHook);
        if (deploy.ok) {
          awaitingPush.delete(changeOwnerId);
          await ctx.clearKeyboard?.().catch(() => undefined);
          await ctx.reply("⏳ Жду сборку Vercel и проверяю production…");
          await sleep(90_000);
          const live = await checkProductionSite(settings.vercelUrl);
          const lines = [
            pushOk
              ? `✓ Push на GitHub (${settings.cloudRepoRef})`
              : "ℹ️ Push не подтвердился — код, скорее всего, уже на GitHub",
            "✓ Vercel принял deploy hook",
            "",
          ];
          if (live.reachable && live.hasLatestFix) {
            lines.unshift("✅ Production обновлён");
            lines.push(`Сайт: ${settings.vercelUrl}`);
            if (live.jsBundle) lines.push(`Сборка: ${live.jsBundle}`);
          } else if (live.reachable) {
            lines.unshift("⚠️ Код на GitHub, но production НЕ обновился");
            lines.push(
              `Сайт ${settings.vercelUrl} — старая сборка`,
              live.jsBundle ? `Сейчас: ${live.jsBundle}` : "",
              "",
              "Vercel Dashboard → Deployments → Promote to Production",
            );
          } else {
            lines.unshift("⚠️ Deploy hook OK, проверить сайт не удалось");
            lines.push(settings.vercelUrl);
          }
          const result = lines.filter(Boolean).join("\n");
          await ctx.reply(result, doneKeyboard);
          await notifyRequester(`✅ Daniil опубликовал изменения.\n\n${result}`);
          return;
        }
        if (pushOk) {
          awaitingPush.delete(changeOwnerId);
          await ctx.clearKeyboard?.().catch(() => undefined);
          const result = [
            "✅ Push на GitHub выполнен",
            "",
            `Ветка: ${settings.cloudRepoRef}`,
            `❌ Vercel hook: ${deploy.detail}`,
            settings.vercelUrl,
          ].join("\n");
          await ctx.reply(result, doneKeyboard);
          await notifyRequester(`✅ Push OK, но Vercel hook упал.\n\n${settings.vercelUrl}`);
          return;
        }
        await ctx.reply(`❌ Vercel hook: ${deploy.detail}`);
        await notifyRequester(`❌ Деплой не удался: ${deploy.detail}`, false);
        return;
      }

      if (pushOk) {
        awaitingPush.delete(changeOwnerId);
        await ctx.clearKeyboard?.().catch(() => undefined);
        const result = [
          "✅ Push на GitHub выполнен",
          "",
          `Ветка: ${settings.cloudRepoRef}`,
          "GitHub Action должен вызвать Vercel.",
          settings.vercelUrl,
        ].join("\n");
        await ctx.reply(result, doneKeyboard);
        await notifyRequester(`✅ Daniil опубликовал изменения на GitHub.\n\n${settings.vercelUrl}`);
        return;
      }

      await ctx.reply(
        [
          "❌ Деплой не завершён",
          "",
          "Push не прошёл. Попробуй /reset и 🚀 Деплой ещё раз.",
        ].join("\n"),
      );
      await notifyRequester("❌ Деплой не завершён. Daniil попробует ещё раз.", false);
    } finally {
      userProcessing.delete(actorUserId);
    }
  };

  const handleDeploy = async (userId: number, ctx: TaskCtx, section?: TaskSection) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.answerCbQuery?.("Access denied.");
      return;
    }
    if (!awaitingPush.has(userId)) {
      await ctx.answerCbQuery?.("Нет изменений для деплоя.");
      await ctx.reply(
        "ℹ️ Нечего деплоить.\n\nСначала выполни задачу агентом, потом 🚀 Деплой.",
      );
      return;
    }
    if (isOwner(userId)) {
      await executeDeploy(userId, ctx, userId);
      return;
    }
    const deploySection = section ?? getViewSection(userId);
    const name = requesterLabel(ctx.from);
    const approval = createApprovalRequest({
      kind: "deploy",
      section: deploySection,
      text: "Публикация на GitHub и Vercel",
      requesterId: userId,
      requesterName: name,
    });
    await notifyOwnerApproval(
      approval.id,
      deploySection,
      approval.text,
      name,
      "deploy",
    );
    await ctx.answerCbQuery?.("Заявка отправлена");
    await ctx.reply(
      "📨 Заявка на деплой отправлена Daniil.\nОн получит кнопки «Подтвердить» / «Отложить».",
    );
  };

  const executeCancel = async (
    userId: number,
    ctx: Pick<TaskCtx, "from" | "reply" | "answerCbQuery">,
  ) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.answerCbQuery?.("Access denied.");
      return;
    }
    if (awaitingPush.delete(userId)) {
      await ctx.answerCbQuery?.("Отменено");
      await ctx.reply("❌ Push отменён.\nИзменения остались локально в git (не опубликованы).");
    } else {
      await ctx.answerCbQuery?.("Нечего отменять");
      await ctx.reply("ℹ️ Нечего отменять — нет ожидающего деплоя.");
    }
  };

  const buildRequesterCtx = (requesterId: number): TaskCtx => ({
    chat: { id: requesterId },
    from: { id: requesterId },
    telegram: bot.telegram,
    sendChatAction: (action) => bot.telegram.sendChatAction(requesterId, action),
    reply: (text, extra) => bot.telegram.sendMessage(requesterId, text, extra),
  });

  const runAgentAndOfferDeploy = async (
    userId: number,
    ctx: TaskCtx,
    prompt: string,
    statusTitle: string,
    successHeader: string,
  ) => {
    userProcessing.add(userId);
    try {
      const answer = await runAgentTask(userId, ctx, buildAgentPrompt(prompt, settings), statusTitle);
      if (answer !== null) {
        if (isOwner(userId)) {
          awaitingPush.add(userId);
          await ctx.reply(
            [
              successHeader,
              "",
              "Изменения закоммичены локально.",
              "🚀 Деплой — опубликовать на GitHub и Vercel",
              "❌ Отмена — не публиковать",
            ].join("\n"),
            deployOfferKeyboard(settings.vercelUrl),
          );
        } else {
          awaitingPush.add(userId);
          await ctx.reply(
            [
              successHeader,
              "",
              "Изменения закоммичены локально.",
              "🚀 Деплой — заявка на публикацию (нужно подтверждение Daniil)",
              "❌ Отмена — не публиковать",
            ].join("\n"),
            deployOfferKeyboard(settings.vercelUrl),
          );
        }
      }
    } finally {
      userProcessing.delete(userId);
    }
  };

  const executeTaskToAgent = async (
    userId: number,
    section: TaskSection,
    taskId: number,
    ctx: TaskCtx,
  ) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.answerCbQuery?.("Access denied.");
      return;
    }
    const task = getTask(section, taskId);
    if (!task) {
      await ctx.answerCbQuery?.("Задача не найдена");
      await ctx.reply(`Задача #${taskId} не найдена.`);
      return;
    }
    if (userProcessing.has(userId)) {
      await ctx.answerCbQuery?.("Подожди…");
      await ctx.reply("⏳ Агент уже занят. Подожди или /reset.");
      return;
    }

    if (!isOwner(userId)) {
      const approval = createApprovalRequest({
        section,
        taskId,
        text: task.text,
        requesterId: userId,
        requesterName: requesterLabel(ctx.from),
      });
      await notifyOwnerApproval(
        approval.id,
        section,
        task.text,
        requesterLabel(ctx.from),
        "change",
        taskId,
      );
      await ctx.answerCbQuery?.("Отправлено Daniil");
      await ctx.reply(
        "📨 Запрос отправлен Daniil.\nОн получит кнопки «Подтвердить» / «Отложить».",
      );
      return;
    }

    await ctx.answerCbQuery?.("Отдаю агенту…");
    await ctx.reply(taskToAgentMessage(taskId, task.text, statusSettings));
    await runAgentAndOfferDeploy(
      userId,
      ctx,
      task.text,
      `Задача #${taskId}`,
      `✅ Задача #${taskId} выполнена агентом`,
    );
  };

  const modeLabel =
    settings.agentMode === "local"
      ? "локальный (файлы на этом ПК)"
      : "cloud (GitHub: themeal)";

  const executeReset = async (
    userId: number,
    ctx: { reply: (text: string, extra?: object) => Promise<unknown> },
  ) => {
    await disposeUserAgent(userId, userAgents);
    awaitingPush.delete(userId);
    pendingTaskInput.delete(userId);
    await clearTaskInputPrompt(userId);
    setTasksUiActive(userId, false);
    await ctx.reply("🔄 Сброс: контекст агента очищен.\nМожешь отправить новую задачу.", mainReplyKeyboard(settings.vercelUrl, isOwner(userId)));
  };

  bot.start(async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    if (ctx.from) rememberUser(ctx.from);
    await ctx.reply(buildWelcomeText(modeLabel, settings.vercelUrl, isOwner(ctx.from!.id)), mainReplyKeyboard(settings.vercelUrl, isOwner(ctx.from!.id)));
  });

  bot.command("reset", async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    await executeReset(ctx.from!.id, ctx);
  });

  bot.command("push", async (ctx) => {
    const taskCtx = buildTaskCtx(ctx);
    if (!taskCtx || !ctx.from) return;
    await handleDeploy(ctx.from.id, taskCtx);
  });

  bot.command("cancel", async (ctx) => {
    const taskCtx = buildTaskCtx(ctx);
    if (!taskCtx || !ctx.from) return;
    await executeCancel(ctx.from.id, taskCtx);
  });

  bot.action(CB_DEPLOY, async (ctx) => {
    const taskCtx = buildTaskCtx(ctx);
    if (!taskCtx || !ctx.from) return;
    await handleDeploy(ctx.from.id, taskCtx);
  });

  bot.action(CB_CANCEL, async (ctx) => {
    const taskCtx = buildTaskCtx(ctx);
    if (!taskCtx || !ctx.from) return;
    await executeCancel(ctx.from.id, taskCtx);
    await ctx.editMessageReplyMarkup(undefined).catch(() => undefined);
  });

  bot.action(CB_OPEN_TASKS, async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.answerCbQuery("Access denied.");
      return;
    }
    await ctx.answerCbQuery();
    const taskCtx = buildTaskCtx(ctx);
    if (!taskCtx || !ctx.from) return;
    await openTasks(taskCtx, ctx.from.id, false, true);
  });

  const replyStatus = async (ctx: { from?: { id: number }; reply: (text: string) => Promise<unknown> }) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    if (!isOwner(ctx.from!.id)) {
      await ctx.reply("📊 Статус доступен только Daniil.");
      return;
    }
    const userId = ctx.from!.id;
    const busy = userProcessing.has(userId) ? "занят" : "свободен";
    const activity = userActivity.get(userId);
    const lines = [
      `mode: ${settings.agentMode}`,
      `model: ${settings.model}`,
      `site: ${settings.vercelUrl}`,
      `agent: ${userAgents.has(userId) ? "активен" : "не создан"}`,
      `status: ${busy}`,
      activity ? `сейчас: ${activity}` : "сейчас: —",
      `awaiting_push: ${awaitingPush.has(userId) ? "да (можно 🚀 Деплой)" : "нет"}`,
      `voice: ${isVoiceConfigured(settings) ? voiceProviderLabel(settings) : "выкл (GROQ_API_KEY или OPENAI_API_KEY)"}`,
    ];
    if (settings.agentMode === "local") {
      lines.push(`workspace: ${settings.workspace}`);
    } else {
      lines.push(`repo: ${settings.cloudRepoUrl} @ ${settings.cloudRepoRef}`);
    }
    await ctx.reply(lines.join("\n"));
  };

  bot.command("status", replyStatus);

  bot.command("tasks", async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    await openTasks(ctx, ctx.from!.id, false, true);
  });

  bot.command("task_add", async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    const userId = ctx.from!.id;
    const text = ctx.message.text.replace(/^\/task_add(?:@\w+)?\s*/i, "").trim();
    if (!isInSectionView(userId)) {
      await ctx.reply("➕ Сначала зайди в раздел пользователя, затем нажми «➕ Добавить».");
      await openTasks(ctx, userId, false, true);
      return;
    }
    const section = ownSection(userId);
    if (!canAddToSection(userId, getViewSection(userId))) {
      await ctx.reply("➕ Задачи можно добавлять только в свой раздел.");
      await showTasks(ctx, userId, taskListPage.get(userId) ?? 0, false, section);
      return;
    }
    if (!text) {
      pendingTaskInput.set(userId, { type: "add", section });
      const panel = buildTasksPanel(
        userId,
        section,
        taskListPage.get(userId) ?? 0,
        `➕ Новая задача (${userDisplayName(Number(section))})\n\nОтправь текст или 🎤 голосовое:`,
        true,
      );
      await enterTaskInputMode(ctx, userId, panel.text, panel.keyboard);
      return;
    }
    const item = addTask(section, text, userId);
    await ctx.reply(`✅ Добавлена задача #${item.id} (${userDisplayName(Number(section))}).`);
    await showTasks(ctx, userId, taskListPage.get(userId) ?? 0, false, section);
  });

  bot.command("task_edit", async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    const userId = ctx.from!.id;
    const section = getViewSection(userId);
    const args = ctx.message.text.replace(/^\/task_edit(?:@\w+)?\s*/i, "").trim();
    const space = args.indexOf(" ");
    if (space === -1) {
      await ctx.reply("Формат: /task_edit <номер> <новый текст>");
      return;
    }
    const id = parseTaskId(args.slice(0, space));
    const text = args.slice(space + 1).trim();
    if (!id || !text) {
      await ctx.reply("Формат: /task_edit <номер> <новый текст>");
      return;
    }
    const updated = updateTask(section, id, text);
    if (!updated) {
      await ctx.reply(`Задача #${id} не найдена.`);
      return;
    }
    await ctx.reply(`✅ Задача #${updated.id} обновлена.`);
    await showTasks(ctx, userId, taskListPage.get(userId) ?? 0, false, section);
  });

  bot.command("task_delete", async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    const userId = ctx.from!.id;
    const section = getViewSection(userId);
    const id = parseTaskId(ctx.message.text.replace(/^\/task_delete(?:@\w+)?\s*/i, "").trim());
    if (!id) {
      await ctx.reply("Формат: /task_delete <номер>");
      return;
    }
    if (!deleteTask(section, id)) {
      await ctx.reply(`Задача #${id} не найдена.`);
      return;
    }
    await ctx.reply(`🗑 Задача #${id} удалена.`);
    await showTasks(ctx, userId, taskListPage.get(userId) ?? 0, false, section);
  });

  bot.command("task_done", async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    const userId = ctx.from!.id;
    const section = getViewSection(userId);
    const id = parseTaskId(ctx.message.text.replace(/^\/task_done(?:@\w+)?\s*/i, "").trim());
    if (!id) {
      await ctx.reply("Формат: /task_done <номер>");
      return;
    }
    const updated = toggleTaskDone(section, id);
    if (!updated) {
      await ctx.reply(`Задача #${id} не найдена.`);
      return;
    }
    await ctx.reply(`#${id} — ${updated.done ? "сделана" : "ожидает"}.`);
    await showTasks(ctx, userId, taskListPage.get(userId) ?? 0, false, section);
  });

  bot.command("task_run", async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    const userId = ctx.from!.id;
    const section = getViewSection(userId);
    const id = parseTaskId(ctx.message.text.replace(/^\/task_run(?:@\w+)?\s*/i, "").trim());
    if (!id) {
      await ctx.reply("Формат: /task_run <номер> — отдать задачу агенту");
      return;
    }
    const task = getTask(section, id);
    if (!task) {
      await ctx.reply(`Задача #${id} не найдена.`);
      return;
    }
    await ctx.reply(
      `🚀 Отдать задачу #${id} в работу?\n\n«${task.text}»`,
      runConfirmKeyboard(section, id, taskListPage.get(userId) ?? 0, taskUi(userId)),
    );
  });

  bot.action(new RegExp(`^${CB_TASK_PREFIX}`), async (ctx) => {
    const ack = (text?: string) => ctx.answerCbQuery(text).catch(() => undefined);
    if (!isAllowed(ctx.from?.id, settings)) {
      await ack("Access denied.");
      return;
    }
    const data = "data" in ctx.callbackQuery ? ctx.callbackQuery.data : undefined;
    const parsed = data ? parseTaskCallback(String(data)) : null;
    if (!parsed || !ctx.from) return;

    const userId = ctx.from.id;
    const { action, id, section: parsedSection } = parsed;
    const section = resolveSection(parsedSection, userId);
    const page = taskListPage.get(userId) ?? 0;

    switch (action) {
      case "sections":
        await ack();
        await showSectionPicker(ctx, userId, true);
        break;
      case "sec":
        if (parsedSection) {
          await ack();
          await showTasks(ctx, userId, 0, true, parsedSection);
        }
        break;
      case "menu":
        await ack();
        await showTasks(ctx, userId, page, true, section);
        break;
      case "page":
        await ack();
        await showTasks(ctx, userId, id ?? page, true, section);
        break;
      case "back":
        await ack();
        pendingTaskInput.delete(userId);
        await clearTaskInputPrompt(userId);
        await showTasks(ctx, userId, id ?? page, true, section);
        break;
      case "add":
        if (!canAddToSection(userId, section)) {
          await ack("Только в свой раздел");
          return;
        }
        pendingTaskInput.set(userId, { type: "add", section });
        const addPanel = buildTasksPanel(
          userId,
          section,
          page,
          `➕ Новая задача (${userDisplayName(Number(section))})\n\nОтправь текст или 🎤 голосовое:`,
          true,
        );
        await ack();
        await enterTaskInputMode(ctx, userId, addPanel.text, addPanel.keyboard);
        break;
      case "edit": {
        if (id === undefined) return;
        const task = getTask(section, id);
        if (!task) {
          await ack("Задача не найдена");
          return;
        }
        pendingTaskInput.set(userId, { type: "edit", section, taskId: id });
        await ack();
        await enterTaskInputMode(
          ctx,
          userId,
          `✏️ Редактирование #${id}\n\nТекущий текст:\n${task.text}\n\nОтправь новый текст или 🎤 голосовое:`,
          taskInputCancelKeyboard(section, page),
        );
        break;
      }
      case "deploy": {
        pendingTaskInput.delete(userId);
        await clearTaskInputPrompt(userId);
        const deployCtx = buildTaskCtx(ctx);
        if (!deployCtx) return;
        await handleDeploy(userId, deployCtx, section);
        break;
      }
      case "run": {
        if (id === undefined) return;
        const task = getTask(section, id);
        if (!task) {
          await ack("Задача не найдена");
          return;
        }
        await ack();
        await ctx.reply(
          `🚀 Отдать задачу #${id} в работу?\n\n«${task.text}»`,
          runConfirmKeyboard(section, id, page, taskUi(userId)),
        );
        break;
      }
      case "run_ok": {
        if (id === undefined) return;
        const runCtx = buildTaskCtx(ctx);
        if (!runCtx) return;
        await executeTaskToAgent(userId, section, id, runCtx);
        break;
      }
      case "done":
      case "toggle": {
        if (id === undefined) return;
        const updated = toggleTaskDone(section, id);
        await ack(updated ? (updated.done ? "Сделана ✓" : "Снова ожидает") : "Не найдена");
        if (updated) await showTasks(ctx, userId, page, true, section);
        break;
      }
      case "del": {
        if (id === undefined) return;
        const task = getTask(section, id);
        if (!task) {
          await ack("Задача не найдена");
          return;
        }
        await ack();
        await ctx.reply(
          `Удалить задачу #${id}?\n«${task.text}»`,
          deleteConfirmKeyboard(section, id, page, taskUi(userId)),
        );
        break;
      }
      case "del_ok": {
        if (id === undefined) return;
        if (deleteTask(section, id)) {
          await ack("Удалено");
          await showTasks(ctx, userId, page, true, section);
        } else {
          await ack("Не найдена");
        }
        break;
      }
      default:
        await ack();
    }
  });

  bot.action(new RegExp(`^${CB_APPROVAL_PREFIX}`), async (ctx) => {
    const ack = (text?: string) => ctx.answerCbQuery(text).catch(() => undefined);
    if (!ctx.from || !isOwner(ctx.from.id)) {
      await ack("Только Daniil может подтверждать.");
      return;
    }
    const data = "data" in ctx.callbackQuery ? ctx.callbackQuery.data : undefined;
    const parsed = data ? parseApprovalCallback(String(data)) : null;
    if (!parsed) return;

    const approval = getApproval(parsed.id);
    if (!approval || approval.status !== "pending") {
      await ack("Запрос уже обработан");
      return;
    }

    if (parsed.action === "def") {
      resolveApproval(parsed.id, "deferred");
      await ctx.editMessageReplyMarkup(undefined).catch(() => undefined);
      if (approval.kind === "deploy") {
        await ctx.telegram
          .sendMessage(approval.requesterId, "⏸ Daniil отложил деплой.")
          .catch(() => undefined);
        await ack("Деплой отложен");
        return;
      }
      if (approval.taskId !== undefined) {
        setTaskDeferred(approval.section, approval.taskId, true);
      }
      await ctx.telegram
        .sendMessage(
          approval.requesterId,
          `⏸ Daniil отложил запрос (${userDisplayName(Number(approval.section))}).\n«${approval.text}»`,
        )
        .catch(() => undefined);
      await ack("Отложено");
      return;
    }

    if (approval.kind === "deploy") {
      resolveApproval(parsed.id, "approved");
      await ctx.editMessageReplyMarkup(undefined).catch(() => undefined);
      await ack("Подтверждено — деплою");
      const ownerCtx = buildTaskCtx(ctx);
      if (!ownerCtx) return;
      await ctx.telegram
        .sendMessage(approval.requesterId, "✅ Daniil подтвердил деплой — публикую…")
        .catch(() => undefined);
      await executeDeploy(ctx.from.id, ownerCtx, approval.requesterId);
      return;
    }

    if (userProcessing.has(approval.requesterId)) {
      await ack("Агент занят");
      await ctx.reply("⏳ У автора запроса уже выполняется другая задача.");
      await ctx.telegram
        .sendMessage(
          approval.requesterId,
          "⏳ Агент уже занят другой задачей.\nПодожди завершения — Daniil сможет подтвердить снова.",
        )
        .catch(() => undefined);
      return;
    }

    resolveApproval(parsed.id, "approved");
    await ctx.editMessageReplyMarkup(undefined).catch(() => undefined);
    await ack("Подтверждено — запускаю агента");

    await ctx.telegram
      .sendMessage(approval.requesterId, "✅ Daniil подтвердил — агент выполняет задачу…")
      .catch(() => undefined);

    const requesterCtx = buildRequesterCtx(approval.requesterId);
    const title =
      approval.taskId !== undefined
        ? `Задача #${approval.taskId} (${userDisplayName(Number(approval.section))})`
        : `Запрос (${userDisplayName(Number(approval.section))})`;
    await runAgentAndOfferDeploy(
      approval.requesterId,
      requesterCtx,
      approval.text,
      title,
      `✅ ${title} выполнена`,
    );
  });

  bot.catch(async (err, ctx) => {
    console.error("Unhandled bot error:", err);
    if (ctx.from?.id) userProcessing.delete(ctx.from.id);
    await ctx.reply("Произошла ошибка. Попробуй ещё раз или /reset.").catch(() => undefined);
  });

  const processUserMessage = async (userId: number, prompt: string, taskCtx: TaskCtx) => {
    const replyCtx = taskCtx;
    if (taskCtx.from) rememberUser(taskCtx.from);
    const replyBtn = matchReplyButton(prompt);
    if (replyBtn === "tasks") {
      await openTasks(replyCtx, userId, false, true);
      return;
    }
    if (replyBtn === "status") {
      if (!isOwner(userId)) return;
      await replyCtx.reply("📊 Статус бота:");
      await replyStatus(replyCtx);
      return;
    }
    if (replyBtn === "site" || prompt.trim() === BTN_SITE || /^сайт$/i.test(prompt.trim())) {
      await replyCtx.reply(
        `🌐 Лендинг theMeal:\n${settings.vercelUrl}`,
        Markup.inlineKeyboard([[Markup.button.url("Открыть сайт", settings.vercelUrl)]]),
      );
      return;
    }
    if (replyBtn === "deploy") {
      await handleDeploy(userId, taskCtx);
      return;
    }
    if (replyBtn === "cancel") {
      await executeCancel(userId, taskCtx);
      return;
    }
    if (replyBtn === "reset") {
      await executeReset(userId, taskCtx);
      return;
    }

    if (/^статус$/i.test(prompt)) {
      if (!isOwner(userId)) return;
      await replyStatus(replyCtx);
      return;
    }

    if (/^задачи$/i.test(prompt)) {
      await openTasks(replyCtx, userId, false, true);
      return;
    }

    if (await handleTaskTextInput(userId, prompt, replyCtx)) {
      return;
    }

    if (isInTasksUi(userId) && !pendingTaskInput.has(userId)) {
      return;
    }

    if (CONFIRM_PUSH.test(prompt)) {
      await handleDeploy(userId, taskCtx);
      return;
    }

    if (REJECT_PUSH.test(prompt)) {
      await executeCancel(userId, taskCtx);
      return;
    }

    if (userProcessing.has(userId)) {
      await taskCtx.reply("⏳ Предыдущая задача ещё выполняется. Подожди или /reset.");
      return;
    }

    if (!isOwner(userId)) {
      await taskCtx.reply(
        [
          "📋 Работа только через задачи.",
          "",
          "1. 📋 Задачи → ➕ Добавить",
          "2. «В работу» — запрос Daniil на выполнение",
          "3. 🚀 Деплой — заявка Daniil после выполнения",
        ].join("\n"),
      );
      return;
    }

    await taskCtx.reply(userTaskAcceptedMessage(statusSettings), mainReplyKeyboard(settings.vercelUrl, isOwner(userId)));
    setTasksUiActive(userId, false);
    await runAgentAndOfferDeploy(
      userId,
      taskCtx,
      prompt,
      "Новая задача",
      "✅ Готово — изменения закоммичены локально",
    );
  };

  const handleVoiceMessage = async (ctx: {
    chat: { id: number };
    from?: { id: number };
    message: { voice?: { file_id: string }; audio?: { file_id: string } };
    reply: TaskCtx["reply"];
    telegram: Telegraf["telegram"];
  }) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    if (!isVoiceConfigured(settings)) {
      await ctx.reply(
        "🎤 Голосовые отключены.\n\nБесплатно: console.groq.com → API key → в .env:\nGROQ_API_KEY=gsk_...\nWHISPER_PROVIDER=groq\n\nИли добавь billing на platform.openai.com",
      );
      return;
    }

    const fileId = voiceFileId(ctx.message);
    if (!fileId) return;

    const userId = ctx.from!.id;

    if (isInTasksUi(userId) && !pendingTaskInput.has(userId)) {
      await ctx.reply("Сначала нажми «➕ Добавить» или ✏️ у задачи.");
      return;
    }

    await ctx.reply(voiceStartMessage());

    try {
      const text = await transcribeTelegramAudio(ctx.telegram, fileId, settings);
      await ctx.reply(voiceDoneMessage(text));
      const taskCtx = buildTaskCtx(ctx);
      if (taskCtx) await processUserMessage(userId, text, taskCtx);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await ctx.reply(`Не удалось расшифровать: ${message}`);
    }
  };

  bot.on("text", async (ctx) => {
    if (!isAllowed(ctx.from?.id, settings)) {
      await ctx.reply("Access denied.");
      return;
    }
    const prompt = ctx.message.text.trim();
    if (!prompt || prompt.startsWith("/")) return;
    const taskCtx = buildTaskCtx(ctx);
    if (!taskCtx || !ctx.from) return;
    await processUserMessage(ctx.from.id, prompt, taskCtx);
  });

  bot.on("voice", handleVoiceMessage);
  bot.on("audio", handleVoiceMessage);

  const shutdown = async () => {
    for (const agent of userAgents.values()) {
      await agent[Symbol.asyncDispose]?.();
    }
    userAgents.clear();
    bot.stop("SIGINT");
  };

  process.once("SIGINT", () => void shutdown());
  process.once("SIGTERM", () => void shutdown());

  const port = Number(process.env.PORT || 0);
  if (port > 0) {
    const server = createServer((req, res) => {
      if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("ok");
        return;
      }
      res.writeHead(404);
      res.end();
    });
    server.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE") {
        console.warn(`Health port ${port} busy — skipping health server`);
        return;
      }
      throw err;
    });
    server.listen(port, () => console.log(`Health check on :${port}/health`));
  }

  console.log(`Bot started (${settings.agentMode}, workspace: ${settings.workspace})`);

  await syncUserNamesFromTelegram(bot.telegram, allowedUserIdList()).catch(() => undefined);

  await bot.telegram
    .setMyDescription(
      [
        "Управление лендингом theMeal через Cursor Agent.",
        "",
        "1. Отправь задачу текстом или 🎤 голосом — агент изменит код",
        "2. После ответа нажми кнопку:",
        "   🚀 Деплой — опубликовать (GitHub → Vercel)",
        "   ❌ Отмена — не публиковать",
        "",
        "/tasks — список задач с номерами, статусом и кнопками управления.",
      ].join("\n"),
    )
    .catch((err) => console.warn("setMyDescription failed:", err));
  await bot.telegram
    .setMyShortDescription("Лендинг theMeal → Cursor Agent → 🚀 Деплой / ❌ Отмена")
    .catch((err) => console.warn("setMyShortDescription failed:", err));
  await bot.telegram
    .setMyCommands([
      { command: "start", description: "Инструкция и кнопки 🚀 Деплой / ❌ Отмена" },
      { command: "tasks", description: "Список задач — «В работу», статус" },
      { command: "task_add", description: "Добавить задачу: /task_add текст" },
      { command: "task_run", description: "Отдать задачу агенту: /task_run 3" },
      { command: "push", description: "Опубликовать изменения (🚀 Деплой)" },
      { command: "cancel", description: "Отменить публикацию (❌ Отмена)" },
      { command: "reset", description: "Сбросить диалог с агентом" },
      { command: "status", description: "Режим, сайт, статус агента" },
    ])
    .catch((err) => console.warn("setMyCommands failed:", err));

  await bot.launch();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
