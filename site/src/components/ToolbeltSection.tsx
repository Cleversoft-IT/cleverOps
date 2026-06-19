import { ArrowUpRight } from "lucide-react";
import { MicroLabel } from "./MicroLabel";
import { CommandBlock } from "./CommandBlock";
import { tools } from "@/lib/tools";
import { catalog } from "@/lib/skills";

export function ToolbeltSection() {
  return (
    <section id="toolbelt" className="border-t border-[var(--border)] px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <MicroLabel>Toolbelt</MicroLabel>
        <h2 className="mt-4 text-balance font-mono text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
          I CLI che rendono l&apos;agente migliore<span className="cursor-blink">_</span>
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-lg text-[var(--muted-foreground)]">
          Binari di sistema (non skill): ricerca veloce, refactor strutturali, operazioni
          GitHub. Per usarli non serve nessuna skill — basta installarli. Tutti in una
          riga col comando qui sotto, o uno alla volta.
        </p>

        <div className="mt-6 max-w-xl">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            Installa tutto il toolbelt
          </span>
          <div className="mt-2.5">
            <CommandBlock command={`npx github:${catalog.repo} --toolbelt -y`} size="md" emphasize="--toolbelt" />
          </div>
        </div>

        <div className="mt-10 grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {tools.map((t) => (
            <article
              key={t.bin}
              className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition-colors hover:bg-[color-mix(in_oklch,var(--card)_94%,var(--foreground))]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                  {t.group}
                </span>
                {t.external && (
                  <span className="rounded-md border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
                    esterna
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <h3 className="font-mono text-lg font-semibold tracking-[-0.01em] text-[var(--card-foreground)]">
                  {t.bin}
                </h3>
                {t.replaces && (
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">↔ {t.replaces}</span>
                )}
              </div>
              <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-[var(--muted-foreground)]">
                {t.what}
              </p>

              <div className="mt-4 border-t border-[var(--border)] pt-4">
                <CommandBlock command={t.install} />
                {t.install2 && (
                  <p className="mt-2 font-mono text-[11px] text-[var(--muted-foreground)]">
                    o <span className="text-[var(--card-foreground)]">{t.install2}</span>
                  </p>
                )}
                <a
                  href={t.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-[var(--muted-foreground)] transition-colors hover:text-brand"
                >
                  docs <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
