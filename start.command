#!/bin/bash
# macOS: double-click this file, or use `bash start.command` in Terminal.
set -e
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "Node.js and npm are required. Install Node.js 22 LTS, then rerun this file."
  read -r -p "Press Enter to close..."
  exit 1
fi
echo "ATOM Design System - installing dependencies..."
npm install
echo "Starting ATOM on http://localhost:5173/"
npm run dev -- --open
