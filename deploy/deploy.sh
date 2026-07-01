#!/usr/bin/env bash
# Build & (re)deploy Porto on the VPS.
# Run as the "porto" user from the repo root: bash deploy/deploy.sh
set -euo pipefail

APP_DIR="/var/www/porto"
cd "$APP_DIR"

echo "==> Pulling latest code"
git pull origin main

# ---------- Backend ----------
echo "==> Building Go API"
cd "$APP_DIR/go-api"
go build -ldflags="-s -w" -o porto-api .

# ---------- Frontend ----------
echo "==> Building Next.js"
cd "$APP_DIR/nextjs"
npm ci
npm run build

# Standalone output needs static assets + public copied alongside server.js
echo "==> Assembling standalone bundle"
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# ---------- Restart services ----------
echo "==> Restarting services"
sudo systemctl restart porto-api
sudo systemctl restart porto-web

echo "==> Done. Status:"
sudo systemctl --no-pager status porto-api porto-web | grep -E "porto-(api|web)|Active:"
