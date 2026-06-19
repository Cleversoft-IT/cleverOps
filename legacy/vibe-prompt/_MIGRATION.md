# Nota di migrazione — vibe-prompt

Contenuti migrati dal repo `akkaz/vibe-prompt` (archiviato il 2026-06-19),
una vecchia collection di prompt per "vibe coding" usata con le estensioni
VS Code **Roo / Cline / KiloCode** in ambiente Drupal.

Conservati solo come riferimento storico. Lo stato dell'arte attuale è:

- `architect-*` / `orchestrator-*` / `code-*` / `debug-*` → superati dalla
  skill **`plan-auditor`** e dal planning nativo di Claude Code / Codex.
- `quotes-agent-instructions.md` → evoluto nell'agent
  **`cleversoft-preventivi-creator`** (vedi `agents/`).
- `enhance-prompt.md` → unico ancora potenzialmente utile: prompt-enhancer
  con traduzione IT→EN che preserva la formattazione, pensato per agenti
  Drupal. Da valutare se trasformarlo in una skill vera.
