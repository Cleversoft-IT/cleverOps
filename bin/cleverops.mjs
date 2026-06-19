#!/usr/bin/env node
// cleverOps — installer TUI per le skill/agent DevOps·AI di Cleversoft IT.
// Distribuito come pacchetto npm: `npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git`
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import {
  intro, outro, multiselect, select, confirm, text,
  isCancel, cancel, note, log, spinner,
} from '@clack/prompts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = join(__dirname, '..');
const SKILLS_DIR = join(PKG_ROOT, 'skills');
const AGENTS_DIR = join(PKG_ROOT, 'agents');
const HOME = os.homedir();

// Eseguito da un checkout git (dev) o dalla cache npx (effimera)?
// I symlink hanno senso solo da un checkout stabile; via npx vanno in copia.
const IS_DEV_CHECKOUT = fs.existsSync(join(PKG_ROOT, '.git'));

const listSkills = () => fs.existsSync(SKILLS_DIR)
  ? fs.readdirSync(SKILLS_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort() : [];
const listAgents = () => fs.existsSync(AGENTS_DIR)
  ? fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md')).sort() : [];

const TARGET_DIRS = {
  claude:  { skills: join(HOME, '.claude', 'skills'),  agents: join(HOME, '.claude', 'agents') },
  codex:   { skills: join(HOME, '.codex', 'skills'),   agents: join(HOME, '.codex', 'agents') },
};
const projectDirs = (p) => ({ skills: join(p, '.claude', 'skills'), agents: join(p, '.claude', 'agents') });

// ---------- arg parsing (non interattivo) ----------
function parseArgs(argv) {
  const a = { _: [], flags: {} };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--copy') a.flags.mode = 'copy';
    else if (t === '--link') a.flags.mode = 'link';
    else if (t === '--all') a.flags.all = true;
    else if (t === '-y' || t === '--yes') a.flags.yes = true;
    else if (t === '--ccstatusline') a.flags.cc = true;
    else if (t === '--no-ccstatusline') a.flags.cc = false;
    else if (t === '--toolbelt') a.flags.toolbelt = true;
    else if (t === '--impeccable') a.flags.impeccable = true;
    else if (t === '--target') a.flags.target = argv[++i];
    else if (t === '--project') a.flags.project = argv[++i];
    else if (t === '--skills') a.flags.skills = argv[++i];
    else if (t === '--agents') a.flags.agents = argv[++i];
    else if (t === '-h' || t === '--help') a.flags.help = true;
    else a._.push(t);
  }
  return a;
}

const HELP = `cleverOps installer

Uso:
  npx git+ssh://git@github.com/Cleversoft-IT/cleverOps.git        # TUI interattiva
  cleverops uninstall                                             # rimozione guidata

Flag non interattivi (provisioning):
  --target claude,codex,project   dove installare
  --project PATH                  cartella progetto (per target project; default cwd)
  --copy | --link                 copia (default via npx) o symlink (solo da checkout git)
  --all                           tutte le skill e gli agent
  --skills a,b   --agents x.md    selezione specifica
  --ccstatusline                  installa anche ccstatusline-gradient (npx)
  --toolbelt                      installa il toolbelt CLI (rg, fd, tree, ast-grep, gh)
  --impeccable                    installa impeccable (design system, esterno via npx)
  -y, --yes                       nessuna conferma
`;

// ---------- core install ----------
function backupIfNeeded(dst) {
  if (fs.existsSync(dst) && !fs.lstatSync(dst).isSymbolicLink()) {
    const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
    const bak = `${dst}.bak-${stamp}`;
    fs.renameSync(dst, bak);
    return basename(bak);
  }
  fs.rmSync(dst, { recursive: true, force: true });
  return null;
}

function place(src, dst, mode) {
  fs.mkdirSync(dirname(dst), { recursive: true });
  const bak = backupIfNeeded(dst);
  if (mode === 'link') fs.symlinkSync(src, dst);
  else fs.cpSync(src, dst, { recursive: true });
  return bak;
}

function doInstall({ targets, project, mode, skills, agents }) {
  const results = [];
  for (const t of targets) {
    const dirs = t === 'project' ? projectDirs(project) : TARGET_DIRS[t];
    for (const s of skills) {
      const src = join(SKILLS_DIR, s);
      if (!fs.existsSync(src)) { results.push(`✗ skill inesistente: ${s}`); continue; }
      const bak = place(src, join(dirs.skills, s), mode);
      results.push(`✓ [${t}] skills/${s}${bak ? `  (backup: ${bak})` : ''}`);
    }
    for (const ag of agents) {
      const src = join(AGENTS_DIR, ag);
      if (!fs.existsSync(src)) { results.push(`✗ agent inesistente: ${ag}`); continue; }
      const bak = place(src, join(dirs.agents, ag), mode);
      results.push(`✓ [${t}] agents/${ag}${bak ? `  (backup: ${bak})` : ''}`);
    }
  }
  return results;
}

function doUninstall({ targets, project, skills, agents }) {
  const results = [];
  for (const t of targets) {
    const dirs = t === 'project' ? projectDirs(project) : TARGET_DIRS[t];
    for (const s of skills) {
      const dst = join(dirs.skills, s);
      if (fs.existsSync(dst) || fs.lstatSync(dst, { throwIfNoEntry: false })) {
        fs.rmSync(dst, { recursive: true, force: true }); results.push(`✓ rimossa [${t}] ${s}`);
      }
    }
    for (const ag of agents) {
      const dst = join(dirs.agents, ag);
      if (fs.existsSync(dst)) { fs.rmSync(dst, { recursive: true, force: true }); results.push(`✓ rimosso [${t}] ${ag}`); }
    }
  }
  return results;
}

function runCcstatusline() {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  log.info('Avvio onboarding ccstatusline-gradient…');
  const r = spawnSync(npx, ['-y', 'ccstatusline-gradient@latest', '--onboard'], { stdio: 'inherit' });
  if (r.status !== 0) log.warn('ccstatusline: onboarding non completato.');
}

function runToolbelt() {
  if (process.platform === 'win32') { log.warn('Toolbelt: script non supportato su Windows; vedi skill ai-dev-toolbelt.'); return; }
  const script = join(PKG_ROOT, 'extras', 'toolbelt', 'install.sh');
  if (!fs.existsSync(script)) { log.warn('Toolbelt: install.sh non trovato.'); return; }
  log.info('Installo il toolbelt CLI (rg · fd · tree · ast-grep · gh)…');
  const r = spawnSync('bash', [script], { stdio: 'inherit' });
  if (r.status !== 0) log.warn('Toolbelt: installazione non completata (vedi output sopra).');
}

function runImpeccable() {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  log.info('Installo impeccable (design system, dipendenza esterna)…');
  const r = spawnSync(npx, ['-y', 'impeccable', 'install'], { stdio: 'inherit' });
  if (r.status !== 0) log.warn('impeccable: installazione non completata.');
}

const bail = (v) => { if (isCancel(v)) { cancel('Annullato.'); process.exit(0); } return v; };

// ---------- non interattivo ----------
function nonInteractive(args, uninstall) {
  const f = args.flags;
  const targets = (f.target || 'claude').split(',').map(s => s.trim()).filter(Boolean);
  const project = f.project || process.cwd();
  const mode = f.mode || 'copy';
  const allSkills = listSkills(), allAgents = listAgents();
  const skills = f.all ? allSkills : (f.skills ? f.skills.split(',').map(s => s.trim()) : []);
  const agents = f.all ? allAgents : (f.agents ? f.agents.split(',').map(s => s.trim()) : []);
  const results = uninstall
    ? doUninstall({ targets, project, skills, agents })
    : doInstall({ targets, project, mode, skills, agents });
  console.log(results.join('\n'));
  if (!uninstall && f.cc) runCcstatusline();
  if (!uninstall && f.toolbelt) runToolbelt();
  if (!uninstall && f.impeccable) runImpeccable();
}

// ---------- interattivo ----------
async function interactive(uninstall) {
  intro(uninstall ? 'cleverOps — rimozione' : 'cleverOps — installer');

  const targets = bail(await multiselect({
    message: 'Dove?',
    options: [
      { value: 'claude', label: 'Claude Code (utente)', hint: '~/.claude' },
      { value: 'codex', label: 'Codex (utente)', hint: '~/.codex' },
      { value: 'project', label: 'Progetto', hint: 'cartella corrente → .claude/' },
    ],
    required: true,
  }));

  let project = process.cwd();
  if (targets.includes('project')) {
    project = bail(await text({ message: 'Path del progetto', initialValue: process.cwd() }));
  }

  let mode = 'copy';
  if (!uninstall) {
    if (IS_DEV_CHECKOUT) {
      mode = bail(await select({
        message: 'Modalità',
        options: [
          { value: 'link', label: 'Symlink', hint: 'single-source: si aggiorna col repo (dev)' },
          { value: 'copy', label: 'Copia', hint: 'file autonomi (hosting/standalone)' },
        ],
        initialValue: 'link',
      }));
    } else {
      note('Eseguito via npx (cache effimera): installo in copia.\nPer i symlink, clona il repo ed esegui ./bin/cleverops.mjs.', 'Modalità');
    }
  }

  const skills = bail(await multiselect({
    message: uninstall ? 'Quali skill rimuovere?' : 'Quali skill installare?',
    options: listSkills().map(s => ({ value: s, label: s })),
    required: false,
  }));
  const agentOpts = listAgents();
  const agents = agentOpts.length ? bail(await multiselect({
    message: uninstall ? 'Quali agent rimuovere?' : 'Quali agent installare?',
    options: agentOpts.map(a => ({ value: a, label: a })),
    required: false,
  })) : [];

  if (!skills.length && !agents.length) { outro('Niente selezionato.'); return; }

  const ok = bail(await confirm({
    message: `${uninstall ? 'Rimuovo' : 'Installo'} ${skills.length} skill + ${agents.length} agent su [${targets.join(', ')}]${uninstall ? '' : ` (${mode})`}?`,
  }));
  if (!ok) { outro('Annullato.'); return; }

  const s = spinner(); s.start(uninstall ? 'Rimozione…' : 'Installazione…');
  const results = uninstall
    ? doUninstall({ targets, project, skills, agents })
    : doInstall({ targets, project, mode, skills, agents });
  s.stop(uninstall ? 'Rimozione completata' : 'Installazione completata');
  note(results.join('\n'), 'Risultato');

  if (!uninstall && skills.includes('transcribe') && !fs.existsSync(join(HOME, '.whisper-env'))) {
    log.warn("La skill 'transcribe' richiede l'env Python ~/.whisper-env con Whisper (assente).");
  }
  if (!uninstall) {
    const cc = bail(await confirm({ message: 'Installare anche ccstatusline-gradient (statusline AI)?', initialValue: false }));
    if (cc) runCcstatusline();

    const tb = bail(await confirm({ message: 'Installare il toolbelt CLI (rg, fd, tree, ast-grep, gh)?', initialValue: false }));
    if (tb) runToolbelt();

    const imp = bail(await confirm({ message: 'Installare impeccable (design system, dipendenza esterna)?', initialValue: false }));
    if (imp) runImpeccable();
  }
  outro('Fatto. Riavvia Claude Code per caricare le novità.');
}

// ---------- main ----------
const args = parseArgs(process.argv.slice(2));
if (args.flags.help) { console.log(HELP); process.exit(0); }
const uninstall = args._[0] === 'uninstall' || args._[0] === 'remove';
const hasFlags = args.flags.all || args.flags.skills || args.flags.agents || args.flags.target || args.flags.toolbelt || args.flags.impeccable;
if (hasFlags && !process.stdout.isTTY || (hasFlags && args.flags.yes)) {
  nonInteractive(args, uninstall);
} else {
  interactive(uninstall).catch(e => { console.error(e); process.exit(1); });
}
