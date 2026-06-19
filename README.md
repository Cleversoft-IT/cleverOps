# cleverOps

Skill, agent e prompt **DevOps / AI** di Cleversoft IT (e akkaz).
Fonte unica per le _agent skill_ riutilizzabili tra **Claude Code** e
**Codex**, così da eliminare le copie sparse nei singoli progetti.

## Struttura

```
cleverOps/
├── skills/      # agent skill (formato SKILL.md, compatibili Claude Code + Codex)
├── agents/      # agent custom (Claude Code)
├── legacy/      # materiale storico migrato (es. repo vibe-prompt archiviato)
└── install.sh   # crea i symlink in ~/.claude e ~/.codex
```

## Skill incluse

### Drupal
| Skill | Cosa fa |
|---|---|
| `drupal-expert` | Sviluppo Drupal 10/11: moduli, hook, DI, testing, Drush, pattern AI-assisted |
| `drupal-migration` | Migrate API, D7→D10/11, import CSV/JSON, plugin custom |
| `drupal-security` | Sicurezza proattiva: XSS, SQLi, CSRF, access control |
| `ddev-expert` | Ambienti DDEV: container, Xdebug, performance, CI/CD |
| `docker-local` | Docker Compose non-DDEV per sviluppo locale |

### Workflow AI
| Skill | Cosa fa |
|---|---|
| `plan-auditor` | Audit dei piani di implementazione prima dell'esecuzione (loop iterativo, fingerprint, contesto Drupal). Include `agents/openai.yaml` per Codex |
| `transcribe` | Audio → testo con Whisper locale, con pulizia e impaginazione del testo |

### DevOps & Frontend
| Skill | Cosa fa |
|---|---|
| `(skill interna rimossa)` | Deploy Cloudflare Pages, branch model stage→main, versioning semver |
| `ionic-skills` | Best practice app Ionic/Capacitor |
| `frontend-design` | Linee guida per interfacce distintive (anti "AI-slop") |
| `cleversoft-design` | Design system Cleversoft/akkaz: colori, tipografia, asset, preview |

## Agent

| Agent | Cosa fa |
|---|---|
| `cleversoft-preventivi-creator` | Crea preventivi professionali Cleversoft IT e genera la versione sito via `/crea-sito` |

## Installazione

### Via `npx` (consigliato) — installer TUI

Nessun clone, niente registry pubblico: parte direttamente dal repo privato
con la tua auth SSH e apre la TUI interattiva (scegli **dove**, **cosa** e
**come** installare).

```bash
npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git
```

Non interattivo (provisioning di un nuovo hosting/progetto):

```bash
npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git \
  --target project --project /var/www/sito --all -y
# rimozione:
npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git uninstall --target claude --all -y
```

| Flag | Effetto |
|---|---|
| `--target claude,codex,project` | dove installare (`project` → `<dir>/.claude/`) |
| `--project PATH` | cartella del progetto (default cwd) |
| `--all` / `--skills a,b` / `--agents x.md` | cosa installare |
| `--copy` / `--link` | copia (default) o symlink (solo da checkout git) |
| `--ccstatusline` | installa anche la statusline (vedi sotto) |
| `-y` | nessuna conferma |

> Via `npx` i file stanno nella cache npm effimera: l'installer usa sempre la
> **copia**. I symlink (single-source che si aggiorna col repo) sono possibili
> solo da un checkout: `git clone … && cd cleverOps && npm i && ./bin/cleverops.mjs`.

### Fallback senza Node — `install.sh`

Stessa logica in bash puro (TUI via `fzf` o menu a numeri), per macchine senza
Node:

```bash
git clone git@github.com:Cleversoft-IT/cleverOps.git && cd cleverOps && ./install.sh
```

### Componente extra: `ccstatusline-gradient`

La statusline che fa parte della suite **non è una skill** ma un pacchetto npm
a sé ([`akkaz/ccstatusline-gradient`](https://github.com/akkaz/ccstatusline-gradient)),
con un proprio wizard. L'installer guidato la propone come step finale, oppure:

```bash
npx -y ccstatusline-gradient@latest --onboard
# o, in install.sh:  ./install.sh --ccstatusline
```

> La skill `transcribe` richiede l'env Python `~/.whisper-env` con Whisper.

## Provenienza

Le skill sono state consolidate da: `akkaz/drupal-dev`,
`repo interni Cleversoft` (plan-auditor), `repo interni Cleversoft`,
`akkaz/AIportfolio`, e dalle install globali `~/.claude` / `~/.codex`.
Il repo `akkaz/vibe-prompt` è stato archiviato; i suoi prompt storici
sono in `legacy/vibe-prompt/`.
