#!/usr/bin/env bash
set -euo pipefail

# Quick deploy on Ubuntu VPS (without Docker)
# Usage: ./deploy-vps.sh

APP_DIR="/opt/themeal-bot"
REPO="https://github.com/daniil-themeal/themeal.git"

echo "==> Installing Node.js 22 if missing..."
if ! command -v node >/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs git
fi

echo "==> Cloning/updating repo..."
sudo mkdir -p "$APP_DIR"
sudo chown "$USER":"$USER" "$APP_DIR"
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" pull
else
  git clone "$REPO" "$APP_DIR"
fi

cd "$APP_DIR/telegram-cursor-bot"
npm ci

if [ ! -f .env ]; then
  cp .env.server.example .env
  echo ""
  echo "Edit $APP_DIR/telegram-cursor-bot/.env — add tokens, then run:"
  echo "  pm2 start npm --name themeal-bot -- start"
  echo "  pm2 save && pm2 startup"
  exit 0
fi

if command -v pm2 >/dev/null; then
  pm2 restart themeal-bot || pm2 start npm --name themeal-bot -- start
  pm2 save
  echo "Bot restarted via pm2"
else
  echo "Install pm2: npm i -g pm2"
  echo "Then: pm2 start npm --name themeal-bot -- start"
fi
