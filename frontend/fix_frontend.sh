#!/bin/bash
echo "Cleaning node_modules and lockfiles..."
rm -rf node_modules package-lock.json pnpm-lock.yaml yarn.lock

echo "Reinstalling dependencies..."
npm install

echo "Clearing Vite cache..."
rm -rf node_modules/.vite

echo "Starting Vite dev server..."
npm run dev
