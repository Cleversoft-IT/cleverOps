#!/usr/bin/env bash
# Installa le skill e gli agent di cleverOps in Claude Code e Codex.
# Default: symlink (le modifiche al repo si riflettono subito).
# Con --copy: copia i file invece di symlinkarli.
set -euo pipefail

MODE="symlink"
[ "${1:-}" = "--copy" ] && MODE="copy"

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

link() { # $1 = sorgente, $2 = destinazione
  mkdir -p "$(dirname "$2")"
  rm -rf "$2"
  if [ "$MODE" = "copy" ]; then cp -r "$1" "$2"; else ln -s "$1" "$2"; fi
  echo "  $2"
}

for base in "$HOME/.claude" "$HOME/.codex"; do
  echo "→ $base"
  for skill in "$REPO"/skills/*/; do
    [ -d "$skill" ] || continue
    link "${skill%/}" "$base/skills/$(basename "$skill")"
  done
done

echo "→ $HOME/.claude/agents"
for agent in "$REPO"/agents/*.md; do
  [ -f "$agent" ] || continue
  link "$agent" "$HOME/.claude/agents/$(basename "$agent")"
done

echo "Fatto (modalità: $MODE)."
