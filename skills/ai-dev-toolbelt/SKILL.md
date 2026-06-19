---
name: ai-dev-toolbelt
description: Use when setting up a dev environment, or when you need fast code search, navigation, or structural refactors. Documents the recommended CLI toolbelt for coding agents (ripgrep, fd, tree, ast-grep, gh) — what each does, when to prefer it over the classic tool, and how to install them.
---

# AI Dev Toolbelt

Il set minimo di CLI che rende un coding agent molto più efficace: ricerca veloce,
navigazione, refactor strutturali e operazioni GitHub. Sono **binari esterni**, non
skill: questa skill documenta *quando usarli* e fornisce uno script d'installazione.

## Regole d'uso (preferenze per l'agente)

1. **Cerca con `rg`, non con `grep`.** `rg` rispetta `.gitignore`, è ricorsivo di default
   ed enormemente più veloce. `rg "useEffect" src` invece di `grep -rn`.
2. **Trova file con `fd`, non con `find`.** Sintassi umana, veloce, rispetta `.gitignore`.
   `fd -e tsx src` invece di `find src -name '*.tsx'`.
3. **Per refactor di codice usa `ast-grep`, non sed/regex.** Cerca e riscrive per
   **struttura sintattica**, quindi non rompe stringhe o commenti che "assomigliano" al
   pattern. `sg -p 'console.log($A)' -r 'logger.debug($A)' -l ts`.
4. **Mappa un repo sconosciuto con `tree`.** `tree -L 2 -I node_modules` per capire la
   struttura prima di tuffarti.
5. **Operazioni GitHub via `gh`.** PR, issue, release, API: `gh pr create`, `gh pr list`,
   `gh api`. Preferiscilo a costruire URL o chiamate REST a mano.

## I tool

| Tool | Sostituisce | A cosa serve | Docs |
|---|---|---|---|
| `rg` (ripgrep) | grep | Ricerca testo ricorsiva, velocissima, gitignore-aware | https://github.com/BurntSushi/ripgrep |
| `fd` | find | Trova file/cartelle con sintassi semplice | https://github.com/sharkdp/fd |
| `tree` | ls -R | Albero delle cartelle, per orientarsi nel repo | https://oldmanprogrammer.net/source.php?dir=projects/tree |
| `ast-grep` (`sg`) | sed/regex | Ricerca e refactor **strutturale** (AST), sicuro | https://ast-grep.github.io |
| `gh` | — | GitHub CLI: PR, issue, release, API | https://cli.github.com |

## Installazione

Script cross-OS incluso (rileva brew / apt / dnf / pacman / cargo / npm e installa solo
i mancanti):

```bash
bash scripts/install.sh
```

Note di piattaforma:
- **Debian/Ubuntu**: `fd` si installa come `fd-find` e il binario è `fdfind` → lo script
  crea un alias/symlink `fd` in `~/.local/bin` quando serve.
- **`gh`** su apt richiede il repo ufficiale GitHub: lo script lo aggiunge se manca.
- **`ast-grep`**: se non c'è brew, fallback su `npm i -g @ast-grep/cli` o `cargo install ast-grep`.

> Vedi anche la skill `cleversoft-design-system` e la dipendenza esterna **impeccable**
> (`npx impeccable install`) per il lato design.
