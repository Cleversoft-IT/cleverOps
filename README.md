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

Due metodi, complementari.

### A) Plugin nativo Claude Code (consigliato — installa tutto)

```bash
claude plugin marketplace add Cleversoft-IT/cleverOps
claude plugin install cleverops@cleverops
```

Usa il sistema di plugin ufficiale (`.claude-plugin/marketplace.json`): le
skill si caricano on-demand, l'aggiornamento è `claude plugin update`. Per il
repo privato serve essere autenticati (`gh auth login`).

### B) Script guidato (subset / progetto / hosting)

Per scegliere **cosa** installare e **dove** (utente, Codex, o un singolo
progetto), in symlink o copia:

```bash
git clone git@github.com:Cleversoft-IT/cleverOps.git && cd cleverOps
./install.sh                         # TUI interattiva (fzf o menu a numeri)
```

Non interattivo (es. provisioning di un nuovo hosting):

```bash
./install.sh --target project --project /var/www/sito --copy --all -y
./install.sh --target claude,codex --link --skills drupal-expert,plan-auditor
```

| Quando | Modalità |
|---|---|
| Macchina di sviluppo tua | `--link` (symlink: single-source, si aggiorna col repo) |
| Nuovo hosting / effimero | `--copy` (file autonomi, non dipende dal repo) |
| Singolo progetto | `--target project` → installa in `<progetto>/.claude/` |

Lo script fa backup di eventuali skill omonime non-symlink prima di sovrascrivere.

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
