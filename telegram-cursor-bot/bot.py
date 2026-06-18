"""
Telegram bot that forwards messages to a Cursor agent (local or cloud).

Run:
  cd telegram-cursor-bot
  pip install -r requirements.txt
  copy .env.example .env   # then fill in values
  python bot.py
"""

from __future__ import annotations

import asyncio
import logging
import os
import sys
from dataclasses import dataclass
from typing import Optional

from dotenv import load_dotenv
from telegram import Update
from telegram.constants import ChatAction, ParseMode
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters

load_dotenv()

logging.basicConfig(
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    level=logging.INFO,
)
log = logging.getLogger("telegram-cursor-bot")

TELEGRAM_MAX_MESSAGE = 4096


def _env(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


def _parse_allowed_users(raw: str) -> set[int] | None:
    raw = raw.strip()
    if not raw:
        return None
    return {int(part.strip()) for part in raw.split(",") if part.strip()}


def _split_message(text: str, limit: int = TELEGRAM_MAX_MESSAGE) -> list[str]:
    if len(text) <= limit:
        return [text]
    chunks: list[str] = []
    start = 0
    while start < len(text):
        end = min(start + limit, len(text))
        if end < len(text):
            split_at = text.rfind("\n", start, end)
            if split_at <= start:
                split_at = end
            end = split_at
        chunks.append(text[start:end].rstrip())
        start = end
        while start < len(text) and text[start] == "\n":
            start += 1
    return [c for c in chunks if c]


@dataclass
class Settings:
    telegram_token: str
    cursor_api_key: str
    allowed_user_ids: set[int] | None
    agent_mode: str
    workspace: str
    cloud_repo_url: str
    cloud_repo_ref: str
    model: str


def load_settings() -> Settings:
    token = _env("TELEGRAM_BOT_TOKEN")
    api_key = _env("CURSOR_API_KEY")
    if not token:
        raise SystemExit("Set TELEGRAM_BOT_TOKEN in .env")
    if not api_key:
        raise SystemExit("Set CURSOR_API_KEY in .env")

    mode = _env("AGENT_MODE", "local").lower()
    if mode not in {"local", "cloud"}:
        raise SystemExit("AGENT_MODE must be 'local' or 'cloud'")

    workspace = _env("WORKSPACE") or os.getcwd()
    if mode == "local" and not os.path.isdir(workspace):
        raise SystemExit(f"WORKSPACE does not exist: {workspace}")

    return Settings(
        telegram_token=token,
        cursor_api_key=api_key,
        allowed_user_ids=_parse_allowed_users(_env("ALLOWED_USER_IDS")),
        agent_mode=mode,
        workspace=os.path.abspath(workspace),
        cloud_repo_url=_env("CLOUD_REPO_URL"),
        cloud_repo_ref=_env("CLOUD_REPO_REF", "main"),
        model=_env("CURSOR_MODEL", "composer-2.5"),
    )


class CursorBridge:
    """Keeps one Cursor agent per Telegram user."""

    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self._client = None
        self._agents: dict[int, object] = {}
        self._lock = asyncio.Lock()

    async def start(self) -> None:
        from cursor_sdk import AsyncClient

        self._client = await AsyncClient.launch_bridge(workspace=self.settings.workspace)

    async def stop(self) -> None:
        for agent in list(self._agents.values()):
            await agent.close()
        self._agents.clear()
        if self._client is not None:
            await self._client.aclose()
            self._client = None

    async def _create_agent(self, user_id: int):
        from cursor_sdk import CloudAgentOptions, CloudRepository, LocalAgentOptions

        if self.settings.agent_mode == "cloud":
            if not self.settings.cloud_repo_url:
                raise RuntimeError("Set CLOUD_REPO_URL for cloud mode")
            options = CloudAgentOptions(
                repos=[
                    CloudRepository(
                        url=self.settings.cloud_repo_url,
                        starting_ref=self.settings.cloud_repo_ref,
                    )
                ],
            )
            return await self._client.agents.create(
                model=self.settings.model,
                api_key=self.settings.cursor_api_key,
                cloud=options,
            )

        return await self._client.agents.create(
            model=self.settings.model,
            api_key=self.settings.cursor_api_key,
            local=LocalAgentOptions(cwd=self.settings.workspace),
        )

    async def _get_agent(self, user_id: int):
        async with self._lock:
            agent = self._agents.get(user_id)
            if agent is None:
                agent = await self._create_agent(user_id)
                self._agents[user_id] = agent
            return agent

    async def reset_user(self, user_id: int) -> None:
        async with self._lock:
            agent = self._agents.pop(user_id, None)
            if agent is not None:
                await agent.close()

    async def ask(self, user_id: int, prompt: str) -> str:
        agent = await self._get_agent(user_id)
        run = await agent.send(prompt)
        text = await run.text()
        result = await run.wait()
        if result.status == "error":
            raise RuntimeError(f"Cursor run failed: {result.id}")
        return text.strip() or "(empty response)"


def _is_allowed(update: Update, settings: Settings) -> bool:
    user = update.effective_user
    if user is None:
        return False
    if settings.allowed_user_ids is None:
        return True
    return user.id in settings.allowed_user_ids


async def cmd_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    settings: Settings = context.bot_data["settings"]
    if not _is_allowed(update, settings):
        await update.message.reply_text("Access denied.")
        return

    mode = "локальный (файлы на этом компьютере)" if settings.agent_mode == "local" else "cloud (репозиторий на GitHub)"
    await update.message.reply_text(
        "Привет! Я прокси к Cursor Agent.\n\n"
        f"Режим: {mode}\n"
        "• Напиши задачу — отправлю агенту\n"
        "• /reset — начать новый диалог с агентом\n"
        "• /status — текущие настройки"
    )


async def cmd_reset(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    settings: Settings = context.bot_data["settings"]
    bridge: CursorBridge = context.bot_data["bridge"]
    if not _is_allowed(update, settings):
        await update.message.reply_text("Access denied.")
        return

    user = update.effective_user
    await bridge.reset_user(user.id)
    await update.message.reply_text("Контекст агента сброшен. Следующее сообщение начнёт новый диалог.")


async def cmd_status(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    settings: Settings = context.bot_data["settings"]
    if not _is_allowed(update, settings):
        await update.message.reply_text("Access denied.")
        return

    lines = [
        f"mode: {settings.agent_mode}",
        f"model: {settings.model}",
    ]
    if settings.agent_mode == "local":
        lines.append(f"workspace: {settings.workspace}")
    else:
        lines.append(f"repo: {settings.cloud_repo_url} @ {settings.cloud_repo_ref}")
    await update.message.reply_text("\n".join(lines))


async def on_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    settings: Settings = context.bot_data["settings"]
    bridge: CursorBridge = context.bot_data["bridge"]

    if update.message is None or not update.message.text:
        return
    if not _is_allowed(update, settings):
        await update.message.reply_text("Access denied.")
        return

    prompt = update.message.text.strip()
    if not prompt:
        return

    chat = update.effective_chat
    await chat.send_action(ChatAction.TYPING)

    status_msg = await update.message.reply_text("Агент думает…")

    try:
        answer = await bridge.ask(update.effective_user.id, prompt)
    except Exception as exc:
        log.exception("Cursor agent error")
        await status_msg.edit_text(f"Ошибка: {exc}")
        return

    await status_msg.delete()
    for chunk in _split_message(answer):
        await update.message.reply_text(chunk)


async def _post_init(application: Application) -> None:
    bridge: CursorBridge = application.bot_data["bridge"]
    await bridge.start()
    log.info("Cursor bridge started (%s mode)", application.bot_data["settings"].agent_mode)


async def _post_shutdown(application: Application) -> None:
    bridge: CursorBridge = application.bot_data.get("bridge")
    if bridge is not None:
        await bridge.stop()
        log.info("Cursor bridge stopped")


def main() -> None:
    settings = load_settings()
    bridge = CursorBridge(settings)

    app = (
        Application.builder()
        .token(settings.telegram_token)
        .post_init(_post_init)
        .post_shutdown(_post_shutdown)
        .build()
    )
    app.bot_data["settings"] = settings
    app.bot_data["bridge"] = bridge

    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("reset", cmd_reset))
    app.add_handler(CommandHandler("status", cmd_status))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_message))

    log.info("Starting Telegram bot…")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(0)
