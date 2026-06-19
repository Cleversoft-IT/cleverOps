export function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
      <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
      {children}
    </span>
  );
}
