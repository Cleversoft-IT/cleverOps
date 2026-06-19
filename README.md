<div align="center">

```
        _                       ___
   ____| | _____   _____ _ __  / _ \ _ __  ___
  / ___| |/ _ \ \ / / _ \ '__|| | | | '_ \/ __|
 | (__ | |  __/\ V /  __/ |   | |_| | |_) \__ \
  \___|_|\___| \_/ \___|_|    \___/| .__/|___/
                                   |_|
```

**La toolbox AI/DevOps di Cleversoft IT** · _una sola fonte, condivisa tra Claude Code e Codex_

![skills](https://img.shields.io/badge/skills-11-ff4017?style=flat-square)
![agents](https://img.shields.io/badge/agents-1-ff4017?style=flat-square)
![Claude Code](https://img.shields.io/badge/Claude_Code-✓-blue?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-✓-blue?style=flat-square)
![install](https://img.shields.io/badge/install-npx_one--liner-22c55e?style=flat-square)

</div>

---

## ⚡ Installa adesso

Una riga, dentro Claude Code (col `!` davanti per eseguirla nella shell):

```bash
! npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git
```

Parte una **TUI interattiva**: scegli *dove* installare, *cosa* installare, confermi. Fine.
Niente clone, niente registry pubblico — gira dal repo privato con la tua chiave SSH.

> 💡 Non serve sapere altro per iniziare. Le sezioni sotto servono solo quando vuoi
> personalizzare o capire cosa fa ogni pezzo.

### Ricette pronte all'uso

| Voglio… | Comando |
|---|---|
| 🎛️ **Scegliere a mano** (consigliato) | `npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git` |
| 🌍 **Tutto, per tutti i progetti** | `… --target claude,codex --all -y` |
| 📁 **Tutto, solo in questo progetto** | `… --target project --project . --all -y` |
| 🎯 **Solo alcune skill** | `… --target claude --skills drupal-expert,plan-auditor -y` |
| 🧹 **Disinstallare** | `… uninstall --target project --project . --all -y` |

<sub>`…` = `npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git`</sub>

---

## 📦 Cosa c'è dentro

> A colpo d'occhio. La spiegazione estesa di ciascuna è [più sotto](#-le-skill-in-dettaglio).

### 🟧 Drupal

| Skill | In una riga |
|---|---|
| `drupal-expert` | Sviluppo Drupal 10/11, filosofia *research-first* (contrib prima del custom) |
| `drupal-migration` | Migrate API: D7→D10/11, import CSV / JSON / API, process plugin |
| `drupal-security` | Sicurezza proattiva: blocca SQL injection, XSS, access bypass *mentre scrivi* |
| `ddev-expert` | Ambienti DDEV: container, servizi, Xdebug, performance, CI/CD |
| `docker-local` | Sviluppo locale con Docker Compose (non-DDEV) |

### 🟦 Workflow AI

| Skill | In una riga |
|---|---|
| `plan-auditor` | Revisiona i piani di implementazione *prima* di scrivere codice |
| `transcribe` | Audio → testo con Whisper locale (GPU), ripulito e impaginato |

### 🟩 DevOps & Frontend

| Skill | In una riga |
|---|---|
| `(skill interna rimossa)` | Deploy PWA su Cloudflare Pages: branch model, versioning, rollback |
| `ionic-skills` | App Ionic/Capacitor: tab, paywall, RevenueCat, AdMob, i18n |
| `frontend-design` | Interfacce distintive e production-grade, anti "AI-slop" |
| `cleversoft-design-system` | **Design system aziendale Cleversoft** (formato impeccable: PRODUCT.md + DESIGN.md), token, asset, preview |
| `cleversoft-design` | ⚠️ Legacy (superata da `cleversoft-design-system`): design system Cleversoft/akkaz |

### 🤖 Agent

| Agent | In una riga |
|---|---|
| `cleversoft-preventivi-creator` | Intervista il cliente e genera preventivi professionali Cleversoft IT |

---

<br>

# 📖 La documentazione completa

Da qui in poi è la parte di riferimento: come funziona l'installer, cosa fa ogni
skill nel dettaglio, le opzioni avanzate e la struttura del repo.

## Come funziona l'installer

- **`npx git+ssh://…`** clona il repo in una cartella temporanea, installa le
  dipendenze ed esegue l'installer. Non serve pubblicare il pacchetto su npm.
- **Dove installa** (lo scegli nella TUI, anche più di uno insieme):
  - **Progetto** → `<cartella>/.claude/` — *solo quel progetto*, non globale.
  - **Claude Code (utente)** → `~/.claude/` — disponibile in tutti i progetti.
  - **Codex (utente)** → `~/.codex/`.
- **Copia vs symlink**: via `npx` i file vivono in una cache effimera, quindi
  l'installer **copia** (file autonomi). Il **symlink** — single source che si
  aggiorna automaticamente col repo — è disponibile solo eseguendo da un checkout
  git locale (`./install.sh --link`). È l'opzione giusta se sviluppi le skill:
  modifichi una volta nel repo e l'aggiornamento si propaga ovunque.
- **Sicuro**: se trova una skill omonima non-symlink, ne fa il **backup**
  (`.bak-<timestamp>`) prima di sovrascrivere. Niente viene perso per sbaglio.

## 🔧 Le skill in dettaglio

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
  con metadati, opzione `--timestamps`. Usa la **GPU NVIDIA** in automatico se
  presente (`--device cuda` per forzarla, `--device cpu` per escluderla) e
  stampa sempre quale device sta usando. Richiede l'env `~/.whisper-env`.

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
- **`cleversoft-design-system`** — **design system aziendale Cleversoft**, fonte di
  verità del brand. In formato [impeccable](https://impeccable.style)/Google Stitch:
  `PRODUCT.md` (strategia, voice, anti-reference) + `DESIGN.md` (token, 6 sezioni) +
  sidecar `.impeccable/design.json` (componenti drop-in). Include token CSS
  (coral `#ff4017`, Geist Mono / DM Sans), asset SVG, preview HTML e un UI kit.
  Da usare per creare interfacce, landing, preventivi, mockup o asset branded.
- **`cleversoft-design`** — ⚠️ **Legacy.** Versione precedente incentrata sul profilo
  personale akkaz; mantenuta per retrocompatibilità ma **superata da
  `cleversoft-design-system`**. Per nuovo lavoro usa quest'ultima.

### 🤖 Agent

- **`cleversoft-preventivi-creator`** — agent Claude Code che intervista il
  cliente e genera **preventivi professionali Cleversoft IT** (software,
  consulenza, microservizi AI, web app) con i dati fiscali corretti; può
  produrre la versione sito interattiva con `/crea-sito`.

## ⚙️ Installazione — opzioni avanzate

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

## 🗂️ Struttura del repo

```
cleverOps/
├── bin/cleverops.mjs   # installer TUI (Node, @clack/prompts) → npx
├── install.sh          # installer fallback in bash (senza Node)
├── package.json        # pacchetto npm (private), bin `cleverops`
├── skills/             # le agent skill (SKILL.md, Claude Code + Codex)
├── agents/             # gli agent (Claude Code)
└── legacy/             # materiale storico (es. prompt del repo vibe-prompt)
```

## 📜 Provenienza

Skill consolidate da `akkaz/drupal-dev`, `repo interni Cleversoft` (plan-auditor),
`repo interni Cleversoft`, `akkaz/AIportfolio` e dalle install globali
`~/.claude` / `~/.codex`. Il repo `akkaz/vibe-prompt` è stato archiviato e i
suoi prompt storici sono in `legacy/vibe-prompt/`.
