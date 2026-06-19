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

```bash
./install.sh            # symlink di skill e agent in ~/.claude e ~/.codex
./install.sh --copy     # copia invece di symlinkare
```

Dopo l'installazione le skill sono disponibili in Claude Code e Codex.
La skill `transcribe` richiede l'env Python `~/.whisper-env` con Whisper.

## Provenienza

Le skill sono state consolidate da: `akkaz/drupal-dev`,
`repo interni Cleversoft` (plan-auditor), `repo interni Cleversoft`,
`akkaz/AIportfolio`, e dalle install globali `~/.claude` / `~/.codex`.
Il repo `akkaz/vibe-prompt` è stato archiviato; i suoi prompt storici
sono in `legacy/vibe-prompt/`.
