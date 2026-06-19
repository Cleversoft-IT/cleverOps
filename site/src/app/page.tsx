import { Hero } from "@/components/Hero";
import { MicroLabel } from "@/components/MicroLabel";
import { SkillExplorer } from "@/components/SkillExplorer";
import { AgentCard } from "@/components/AgentCard";
import { InstallerSection } from "@/components/InstallerSection";
import { catalog } from "@/lib/skills";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* INSTALLER — subito dopo l'hero: l'install è la prima cosa */}
      <InstallerSection />

      {/* SKILL */}
      <section id="skill" className="border-t border-b border-[var(--border)] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <MicroLabel>Il catalogo</MicroLabel>
          <h2 className="mt-4 text-balance font-mono text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            {catalog.counts.skills} skill, una per ogni mestiere<span className="cursor-blink">_</span>
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-lg text-[var(--muted-foreground)]">
            Filtra per categoria o cerca per nome. Ogni card ha il comando pronto: copialo e
            installa solo quella che ti serve.
          </p>
          <div className="mt-10">
            <SkillExplorer />
          </div>
        </div>
      </section>

      {/* AGENT */}
      <section id="agent" className="border-b border-[var(--border)] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <MicroLabel>Agent</MicroLabel>
          <h2 className="mt-4 text-balance font-mono text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            Non solo skill: anche agent dedicati<span className="cursor-blink">_</span>
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-lg text-[var(--muted-foreground)]">
            Gli agent sono subagent specializzati di Claude Code, con prompt e strumenti propri.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {catalog.agents.map((a) => (
              <AgentCard key={a.name} agent={a} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
