#!/usr/bin/env bash
# Deploy telegram-cursor-bot to Railway (requires: npm i -g @railway/cli, railway login)
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v railway >/dev/null; then
  echo "Install Railway CLI: npm i -g @railway/cli"
  exit 1
fi

echo "Linking service (first time: railway link)..."
railway link 2>/dev/null || true

echo "Setting variables from .env if present..."
if [ -f .env ]; then
  railway variables set \
    TELEGRAM_BOT_TOKEN="$(grep ^TELEGRAM_BOT_TOKEN= .env | cut -d= -f2-)" \
    CURSOR_API_KEY="$(grep ^CURSOR_API_KEY= .env | cut -d= -f2-)" \
    ALLOWED_USER_IDS="$(grep ^ALLOWED_USER_IDS= .env | cut -d= -f2-)" \
    AGENT_MODE=cloud \
    CLOUD_REPO_URL=https://github.com/daniil-themeal/themeal.git \
    CLOUD_REPO_REF=feature/next \
    CURSOR_MODEL=composer-2.5
fi

echo "Deploying..."
railway up --detach

echo "Done. Logs: railway logs"
