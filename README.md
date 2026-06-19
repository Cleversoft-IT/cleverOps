# cleverOps

Suite **DevOps / AI** di Cleversoft IT (e akkaz): le _agent skill_ e gli
_agent_ riutilizzabili, in un'unica fonte condivisa tra **Claude Code** e
**Codex**, così da eliminare le copie sparse nei singoli progetti.

## Quick start

Nella sessione Claude Code (col `!` davanti per eseguirlo nella shell):

```
! npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git
```

Parte una **TUI interattiva**: scegli *dove* installare, *cosa* installare e
confermi. Niente clone, niente `npm publish`, niente registry pubblico — gira
direttamente dal repo privato usando la tua autenticazione SSH a GitHub.

## Come funziona

- **`npx git+ssh://…`** clona il repo in una cartella temporanea, installa le
  dipendenze ed esegue l'installer. Non serve pubblicare il pacchetto.
- **Dove installa** (lo scegli nella TUI, anche più di uno insieme):
  - **Progetto** → `<cartella>/.claude/` — *solo quel progetto*, non globale.
  - **Claude Code (utente)** → `~/.claude/` — disponibile in tutti i progetti.
  - **Codex (utente)** → `~/.codex/`.
- **Copia vs symlink**: via `npx` i file vivono in una cache effimera, quindi
  l'installer **copia** (file autonomi). Il symlink — single source che si
  aggiorna col repo — è disponibile solo eseguendo da un checkout git.
- **Sicuro**: se trova una skill omonima non-symlink, ne fa il **backup**
  (`.bak-<timestamp>`) prima di sovrascrivere. C'è anche `uninstall`.

## Cosa puoi installare

### 🟧 Drupal

- **`drupal-expert`** — sviluppo Drupal 10/11. Filosofia *research-first*
  (cerca un modulo contrib su drupal.org prima di scrivere codice custom),
  PSR-4 e dependency injection, hook vs event subscriber, testing
  (Unit/Kernel/Functional), scaffolding via Drush, compatibilità D10→D11,
  pattern di sviluppo AI-assistito. Si attiva su Drupal, Drush, Twig, moduli, temi.
- **`drupal-migration`** — Migrate API. Migrazioni D7→D10/11 (connessione DB
  legacy), import da **CSV / JSON / API**, process plugin
  (`static_map`, `entity_lookup`, `sub_process`…), source/process plugin
  custom, comandi Drush e debug.
- **`drupal-security`** — sicurezza **proattiva**, si auto-attiva mentre scrivi
  form, controller, query o gestisci input utente: previene SQL injection
  (query builder + placeholder), XSS (`#plain_text` vs `#markup`, escaping
  Twig), access bypass (`accessCheck(TRUE)`), CSRF, upload non sicuri.
- **`ddev-expert`** — ambienti **DDEV**: setup progetti, container, servizi
  custom (Redis/Solr), Xdebug, file sync, performance, comandi custom, CI/CD.
- **`docker-local`** — sviluppo locale con **Docker Compose** (non-DDEV):
  lifecycle up/down, `exec`/`run`, debug log/porte/permessi, pattern
  php/db/nginx, wrapper Makefile.

### 🟦 Workflow AI

- **`plan-auditor`** — revisiona i **piani di implementazione** come auditor
  senior *prima* di scrivere codice. Loop iterativo (audit → revisione →
  re-audit) con fingerprint SHA-256 per non rileggere piani invariati,
  discovery automatica dei piani in `.claude/plans`, `~/.claude/plans`,
  `.codex/plans`, classificazione dei rilievi (risolti/parziali/non
  risolti/superati) e sezione dedicata a Drupal. Può anche auditare le
  modifiche *implementate* rispetto al piano approvato. Include
  `agents/openai.yaml` per usarlo da Codex.
- **`transcribe`** — audio (mp3, wav, m4a, mp4…) → testo con **Whisper**
  locale. Non un blob grezzo: segmenta in paragrafi sulle pause, ripulisce
  (filler "ehm/uhm", spazi, punteggiatura, maiuscole), esporta in `txt` o `md`
  con metadati, opzione `--timestamps`. Richiede l'env `~/.whisper-env`.

### 🟩 DevOps & Frontend

- **`(skill interna rimossa)`** — deploy **Cloudflare Pages** per PWA: branch model
  `stage` (preview) → `main` (produzione), merge in main sempre esplicito,
  versioning semver obbligatorio, comandi `wrangler`, procedura di rollback.
- **`ionic-skills`** — best practice app **Ionic/Capacitor** (Angular/React/Vue):
  requisiti obbligatori (onboarding, paywall, settings), navigazione a tab,
  RevenueCat, AdMob, i18n.
- **`frontend-design`** — linee guida per interfacce distintive e
  production-grade, **anti "AI-slop"**: design thinking (scopo/tono/vincoli),
  tipografia, colore, animazione, layout, cliché da evitare.
- **`cleversoft-design`** — **design system** Cleversoft/akkaz: palette
  (coral `#ff4017`), tipografia (Geist Mono / DM Sans), componenti, CSS, asset
  SVG e preview HTML. Da usare per creare interfacce, mockup o asset branded.

### 🤖 Agent

- **`cleversoft-preventivi-creator`** — agent Claude Code che intervista il
  cliente e genera **preventivi professionali Cleversoft IT** (software,
  consulenza, microservizi AI, web app) con i dati fiscali corretti; può
  produrre la versione sito interattiva con `/crea-sito`.

## Installazione — opzioni avanzate

Flag per uso non interattivo (es. provisioning di un nuovo hosting):

```bash
# tutto, dentro un progetto specifico
npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git \
  --target project --project /var/www/sito --all -y

# solo alcune skill, a livello utente (Claude + Codex)
npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git \
  --target claude,codex --skills drupal-expert,plan-auditor -y

# rimozione
npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git \
  uninstall --target project --project . --all -y
```

| Flag | Effetto |
|---|---|
| `--target claude,codex,project` | dove installare (`project` → `<dir>/.claude/`) |
| `--project PATH` | cartella del progetto (default: cwd) |
| `--all` · `--skills a,b` · `--agents x.md` | cosa installare |
| `--copy` / `--link` | copia (default) o symlink (solo da checkout git) |
| `--ccstatusline` | installa anche la statusline (vedi sotto) |
| `-y` | nessuna conferma |

### Fallback senza Node — `install.sh`

Stessa logica in bash puro (TUI via `fzf` o menu a numeri), per macchine senza
Node:

```bash
git clone git@github.com:Cleversoft-IT/cleverOps.git && cd cleverOps && ./install.sh
```

### Componente extra: `ccstatusline-gradient`

La statusline che completa la suite **non è una skill** ma un pacchetto npm a sé
([`akkaz/ccstatusline-gradient`](https://github.com/akkaz/ccstatusline-gradient)),
con un proprio wizard. L'installer la propone come step finale, oppure:

```bash
npx -y ccstatusline-gradient@latest --onboard
```

## Struttura del repo

```
cleverOps/
├── bin/cleverops.mjs   # installer TUI (Node, @clack/prompts) → npx
├── install.sh          # installer fallback in bash (senza Node)
├── package.json        # pacchetto npm (private), bin `cleverops`
├── skills/             # le agent skill (SKILL.md, Claude Code + Codex)
├── agents/             # gli agent (Claude Code)
└── legacy/             # materiale storico (es. prompt del repo vibe-prompt)
```

## Provenienza

Skill consolidate da `akkaz/drupal-dev`, `repo interni Cleversoft` (plan-auditor),
`repo interni Cleversoft`, `akkaz/AIportfolio` e dalle install globali
`~/.claude` / `~/.codex`. Il repo `akkaz/vibe-prompt` è stato archiviato e i
suoi prompt storici sono in `legacy/vibe-prompt/`.
