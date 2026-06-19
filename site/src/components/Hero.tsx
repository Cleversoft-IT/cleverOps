import { ArrowRight } from "lucide-react";
import { MicroLabel } from "./MicroLabel";
import { CommandBlock } from "./CommandBlock";
import { catalog } from "@/lib/skills";

export function Hero() {
  const { counts, categories } = catalog;
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* angoli ASCII — decorazione firma */}
      <pre aria-hidden className="pointer-events-none absolute left-4 top-24 hidden font-mono text-xs leading-none text-[var(--zinc-300)] sm:block dark:text-[var(--zinc-700)]">┌</pre>
      <pre aria-hidden className="pointer-events-none absolute right-4 top-24 hidden font-mono text-xs leading-none text-[var(--zinc-300)] sm:block dark:text-[var(--zinc-700)]">┐</pre>

      <div className="mx-auto max-w-5xl">
        <MicroLabel>Claude Code · Codex · Skills</MicroLabel>
        <h1 className="mt-5 text-balance font-mono text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-6xl">
          Le nostre skill DevOps,
          <br />
          pronte all&apos;uso<span className="cursor-blink">_</span>
        </h1>
        <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-[var(--muted-foreground)]">
          Il toolkit di Cleversoft per Claude Code e Codex: Drupal, DevOps, AI e il design
          system aziendale. Installale in una riga, copiale dove ti servono — niente fuffa.
        </p>

        <div className="mt-9 max-w-xl">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            Installa tutto in una riga
          </span>
          <div className="mt-2.5">
            <CommandBlock command={`npx github:${catalog.repo}`} size="md" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#installa"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.04em] text-white shadow-xs transition-[background,transform] hover:bg-brand-dark active:scale-[0.98]"
          >
            <span className="text-white/70">+</span> Come si installa
          </a>
          <a
            href="/come-funziona"
            className="group inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.04em] text-[var(--card-foreground)] transition-colors hover:border-brand/40 hover:text-brand"
          >
            Come funziona
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-[var(--muted-foreground)]">
          <span><span className="text-[var(--card-foreground)]">{counts.skills}</span> skill</span>
          <span aria-hidden className="text-[var(--zinc-300)] dark:text-[var(--zinc-700)]">·</span>
          <span><span className="text-[var(--card-foreground)]">{counts.agents}</span> agent</span>
          <span aria-hidden className="text-[var(--zinc-300)] dark:text-[var(--zinc-700)]">·</span>
          <span><span className="text-[var(--card-foreground)]">{categories.length}</span> categorie</span>
        </div>
      </div>
    </section>
  );
}
