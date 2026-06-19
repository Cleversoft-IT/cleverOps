import { Terminal } from "lucide-react";
import { CommandBlock } from "./CommandBlock";
import { catalog } from "@/lib/skills";

const TARGETS = [
  { key: "claude", label: "Claude Code", dir: "~/.claude/skills" },
  { key: "codex", label: "Codex CLI", dir: "~/.codex/skills" },
  { key: "project", label: "Progetto", dir: "<progetto>/.claude/skills" },
];

export function InstallerSection() {
  const repo = catalog.repo;
  return (
    <section id="installa" className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance font-mono text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
          Una riga e sei operativo<span className="cursor-blink">_</span>
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-lg text-[var(--muted-foreground)]">
          L&apos;installer <code className="font-mono text-[0.95em] text-[var(--card-foreground)]">cleverops</code> è una
          TUI: scegli dove installare (Claude Code, Codex, o un progetto), quali skill e
          se in copia o symlink. Oppure passa i flag e salti le domande.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
              <Terminal className="h-4 w-4 text-brand" /> Interattivo
            </div>
            <p className="mt-2 flex-1 font-sans text-sm text-[var(--muted-foreground)]">
              La TUI guidata: ti chiede tutto.
            </p>
            <div className="mt-4 border-t border-[var(--border)] pt-4">
              <CommandBlock command={`npx github:${repo}`} />
            </div>
          </div>

          <div className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
              <Terminal className="h-4 w-4 text-brand" /> Tutto, senza domande
            </div>
            <p className="mt-2 flex-1 font-sans text-sm text-[var(--muted-foreground)]">
              Tutte le skill su Claude Code, nessuna conferma.
            </p>
            <div className="mt-4 border-t border-[var(--border)] pt-4">
              <CommandBlock command={`npx github:${repo} --all --target claude -y`} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
            Target supportati
          </p>
          <div className="mt-3 grid gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
            {TARGETS.map((t) => (
              <div key={t.key} className="bg-[var(--card)] p-4">
                <div className="font-mono text-sm font-medium text-[var(--card-foreground)]">{t.label}</div>
                <code className="mt-1 block font-mono text-xs text-[var(--muted-foreground)]">{t.dir}</code>
                <code className="mt-2 block font-mono text-[11px] text-brand">--target {t.key}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
