#!/usr/bin/env bash
#
# cleverOps installer — interattivo e sicuro.
#
# Installa skill e agent in Claude Code / Codex, a livello utente o di
# progetto, in modalità symlink (sviluppo) o copia (hosting/standalone).
#
# Interattivo:   ./install.sh
# Non interattivo (automazione / nuovo hosting):
#   ./install.sh --target project --copy --all
#   ./install.sh --target claude,codex --link --skills drupal-expert,plan-auditor
#   ./install.sh --target project --project /var/www/sito --copy --all -y
#
# Flag:
#   --target LIST   claude | codex | project  (separati da virgola)
#   --project PATH  cartella di progetto per il target "project" (default: cwd)
#   --copy          copia i file (consigliato su hosting/effimero)
#   --link          symlink al repo (default interattivo: single source)
#   --all           tutte le skill e gli agent
#   --skills LIST   skill specifiche (separate da virgola)
#   --agents LIST   agent specifici (separati da virgola)
#   --ccstatusline  installa anche ccstatusline-gradient (statusline, via npx)
#   -y, --yes       non chiedere conferma finale
#   -h, --help      questo aiuto
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BLU=$'\033[1;34m'; GRN=$'\033[1;32m'; YEL=$'\033[1;33m'; RED=$'\033[1;31m'; DIM=$'\033[2m'; RST=$'\033[0m'

usage() { sed -n '2,30p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0; }

# ---- parsing flag ----
TARGETS=""; PROJECT=""; MODE=""; PICK_SKILLS=""; PICK_AGENTS=""; ALL=0; ASSUME_YES=0; INTERACTIVE=1; CCSTATUS=""
while [ $# -gt 0 ]; do
  case "$1" in
    --target) TARGETS="$2"; INTERACTIVE=0; shift 2;;
    --project) PROJECT="$2"; shift 2;;
    --copy) MODE="copy"; INTERACTIVE=0; shift;;
    --link) MODE="link"; INTERACTIVE=0; shift;;
    --all) ALL=1; INTERACTIVE=0; shift;;
    --skills) PICK_SKILLS="$2"; INTERACTIVE=0; shift 2;;
    --agents) PICK_AGENTS="$2"; INTERACTIVE=0; shift 2;;
    --ccstatusline) CCSTATUS=1; shift;;
    --no-ccstatusline) CCSTATUS=0; shift;;
    -y|--yes) ASSUME_YES=1; shift;;
    -h|--help) usage;;
    *) echo "${RED}Flag sconosciuto: $1${RST}"; exit 1;;
  esac
done

# ---- inventario repo ----
mapfile -t ALL_SKILLS < <(find "$REPO/skills" -maxdepth 1 -mindepth 1 -type d -printf '%f\n' | sort)
mapfile -t ALL_AGENTS < <(find "$REPO/agents" -maxdepth 1 -mindepth 1 -name '*.md' -printf '%f\n' 2>/dev/null | sort)

# ---- multiselect: fzf se presente, altrimenti menu a numeri ----
# uso: multiselect "Titolo" out_array_name item1 item2 ...
multiselect() {
  local title="$1"; local -n _out="$2"; shift 2; local items=("$@"); _out=()
  if command -v fzf >/dev/null 2>&1; then
    mapfile -t _out < <(printf '%s\n' "${items[@]}" | fzf --multi --height=40% --reverse \
      --prompt="$title (TAB seleziona, INVIO conferma) > " --header="$title")
    return
  fi
  echo "${BLU}$title${RST} ${DIM}(numeri separati da spazio, 'a'=tutti, INVIO=conferma)${RST}"
  local i=1; for it in "${items[@]}"; do printf "  %2d) %s\n" "$i" "$it"; i=$((i+1)); done
  printf "Scelta > "; local reply; read -r reply
  if [[ "$reply" =~ ^[Aa]$ || -z "$reply" ]]; then _out=("${items[@]}"); return; fi
  for n in $reply; do [[ "$n" =~ ^[0-9]+$ ]] && [ "$n" -ge 1 ] && [ "$n" -le "${#items[@]}" ] && _out+=("${items[$((n-1))]}"); done
}

# ---- scelta target ----
declare -a SEL_TARGETS
if [ "$INTERACTIVE" = 1 ]; then
  echo "${GRN}== cleverOps installer ==${RST}"
  declare -a topts=()
  topts+=("claude  → ~/.claude (utente)")
  if command -v codex >/dev/null 2>&1 || [ -d "$HOME/.codex" ]; then topts+=("codex   → ~/.codex (utente)"); fi
  topts+=("project → <progetto>/.claude (cartella corrente)")
  declare -a tchosen; multiselect "Dove installare?" tchosen "${topts[@]}"
  for t in "${tchosen[@]}"; do case "$t" in claude*) SEL_TARGETS+=(claude);; codex*) SEL_TARGETS+=(codex);; project*) SEL_TARGETS+=(project);; esac; done
else
  IFS=',' read -ra SEL_TARGETS <<< "${TARGETS:-claude}"
fi
[ "${#SEL_TARGETS[@]}" -eq 0 ] && { echo "${YEL}Nessun target scelto. Esco.${RST}"; exit 0; }

# project path
if printf '%s\n' "${SEL_TARGETS[@]}" | grep -qx project; then
  if [ -z "$PROJECT" ]; then
    if [ "$INTERACTIVE" = 1 ]; then printf "Path progetto [%s]: " "$PWD"; read -r PROJECT; fi
    PROJECT="${PROJECT:-$PWD}"
  fi
  [ -d "$PROJECT" ] || { echo "${RED}Progetto non trovato: $PROJECT${RST}"; exit 1; }
fi

# ---- modalità ----
if [ -z "$MODE" ]; then
  if [ "$INTERACTIVE" = 1 ]; then
    printf "Modalità: [s]ymlink (single-source, sviluppo) / [c]opia (hosting/standalone) [s/c]: "
    read -r m; case "$m" in c|C) MODE="copy";; *) MODE="link";; esac
  else MODE="link"; fi
fi

# ---- selezione contenuti ----
declare -a SEL_SKILLS SEL_AGENTS
if [ "$ALL" = 1 ]; then SEL_SKILLS=("${ALL_SKILLS[@]}"); SEL_AGENTS=("${ALL_AGENTS[@]}")
elif [ -n "$PICK_SKILLS" ] || [ -n "$PICK_AGENTS" ]; then
  [ -n "$PICK_SKILLS" ] && IFS=',' read -ra SEL_SKILLS <<< "$PICK_SKILLS"
  [ -n "$PICK_AGENTS" ] && IFS=',' read -ra SEL_AGENTS <<< "$PICK_AGENTS"
else
  multiselect "Quali SKILL installare?" SEL_SKILLS "${ALL_SKILLS[@]}"
  [ "${#ALL_AGENTS[@]}" -gt 0 ] && multiselect "Quali AGENT installare?" SEL_AGENTS "${ALL_AGENTS[@]}"
fi
[ "${#SEL_SKILLS[@]}" -eq 0 ] && [ "${#SEL_AGENTS[@]}" -eq 0 ] && { echo "${YEL}Niente da installare. Esco.${RST}"; exit 0; }

# ---- destinazioni per target ----
skills_dir() { case "$1" in claude) echo "$HOME/.claude/skills";; codex) echo "$HOME/.codex/skills";; project) echo "$PROJECT/.claude/skills";; esac; }
agents_dir() { case "$1" in claude) echo "$HOME/.claude/agents";; codex) echo "$HOME/.codex/agents";; project) echo "$PROJECT/.claude/agents";; esac; }

# ---- riepilogo + conferma ----
echo; echo "${GRN}Riepilogo:${RST}"
echo "  Target:   ${SEL_TARGETS[*]}"; printf '%s\n' "${SEL_TARGETS[@]}" | grep -qx project && echo "  Progetto: $PROJECT"
echo "  Modalità: $MODE"
echo "  Skill:    ${SEL_SKILLS[*]:-(nessuna)}"
echo "  Agent:    ${SEL_AGENTS[*]:-(nessuno)}"
if [ "$ASSUME_YES" != 1 ]; then printf "Procedo? [y/N]: "; read -r ok; [[ "$ok" =~ ^[Yy]$ ]] || { echo "Annullato."; exit 0; }; fi

# ---- installazione (sicura) ----
install_one() { # $1 sorgente  $2 destinazione
  local src="$1" dst="$2"
  mkdir -p "$(dirname "$dst")"
  if [ -e "$dst" ] && [ ! -L "$dst" ]; then
    local bak="$dst.bak-$(date +%Y%m%d%H%M%S)"
    echo "    ${YEL}esiste (non-symlink): backup → $(basename "$bak")${RST}"; mv "$dst" "$bak"
  else rm -rf "$dst"; fi
  if [ "$MODE" = "copy" ]; then cp -r "$src" "$dst"; else ln -s "$src" "$dst"; fi
  echo "    ${GRN}✓${RST} $dst"
}

for t in "${SEL_TARGETS[@]}"; do
  echo "${BLU}→ target: $t${RST}"
  sd="$(skills_dir "$t")"; ad="$(agents_dir "$t")"
  for s in "${SEL_SKILLS[@]}"; do
    [ -d "$REPO/skills/$s" ] || { echo "    ${RED}skill inesistente: $s${RST}"; continue; }
    install_one "$REPO/skills/$s" "$sd/$s"
  done
  for a in "${SEL_AGENTS[@]}"; do
    [ -f "$REPO/agents/$a" ] || { echo "    ${RED}agent inesistente: $a${RST}"; continue; }
    install_one "$REPO/agents/$a" "$ad/$a"
  done
done

# ---- note post-install ----
if printf '%s\n' "${SEL_SKILLS[@]}" | grep -qx transcribe && [ ! -d "$HOME/.whisper-env" ]; then
  echo "${YEL}Nota: la skill 'transcribe' richiede l'env Python ~/.whisper-env con Whisper (assente qui).${RST}"
fi

# ---- componente extra: ccstatusline-gradient (statusline, repo separato/npm) ----
# Non è una skill: è un pacchetto npm con la sua TUI di onboarding che si
# aggancia a ~/.claude/settings.json. Lo lanciamo via npx dal suo repo.
if [ -z "$CCSTATUS" ] && [ "$INTERACTIVE" = 1 ]; then
  printf "Installare anche ${GRN}ccstatusline-gradient${RST} (statusline AI per Claude Code)? [y/N]: "
  read -r cc; [[ "$cc" =~ ^[Yy]$ ]] && CCSTATUS=1 || CCSTATUS=0
fi
if [ "${CCSTATUS:-0}" = 1 ]; then
  if command -v npx >/dev/null 2>&1; then
    echo "${BLU}→ ccstatusline-gradient: avvio onboarding (npx)${RST}"
    npx -y ccstatusline-gradient@latest --onboard || echo "${YEL}Onboarding ccstatusline interrotto/non completato.${RST}"
  else
    echo "${YEL}npx non trovato: installa Node.js, poi: npx -y ccstatusline-gradient@latest --onboard${RST}"
  fi
fi

echo "${GRN}Fatto.${RST}"
