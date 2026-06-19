"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Tone = "default" | "dark";
type Size = "sm" | "md";

export function CommandBlock({
  command,
  prefix = "$",
  tone = "default",
  size = "sm",
  className = "",
}: {
  command: string;
  prefix?: string;
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  const tones: Record<Tone, { box: string; code: string }> = {
    default: {
      box: "border-[var(--border)] bg-[var(--background)]",
      code: "text-[var(--card-foreground)]",
    },
    dark: {
      box: "border-[var(--zinc-800)] bg-[var(--zinc-900)]",
      code: "text-[var(--zinc-200)]",
    },
  };
  const t = tones[tone];

  const sizes: Record<Size, { code: string; prefix: string; pad: string; btn: string; icon: string }> = {
    sm: {
      code: "text-[13px] leading-[1.5]",
      prefix: "text-[13px] leading-[1.5]",
      pad: "px-3 py-2.5",
      btn: "h-7 w-7",
      icon: "h-3.5 w-3.5",
    },
    md: {
      code: "text-[15px] leading-[1.55]",
      prefix: "text-[15px] leading-[1.55]",
      pad: "px-4 py-3.5",
      btn: "h-8 w-8",
      icon: "h-4 w-4",
    },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-start gap-2.5 rounded-md border ${s.pad} ${t.box} ${className}`}>
      <span className={`select-none font-mono font-medium text-brand ${s.prefix}`} aria-hidden>
        {prefix}
      </span>
      {/* Comando completo: wrappa su più righe, niente scroll orizzontale */}
      <code
        className={`min-w-0 flex-1 whitespace-pre-wrap break-all font-mono ${s.code} ${t.code}`}
      >
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Comando copiato" : "Copia comando"}
        className={`grid shrink-0 place-items-center rounded-md text-[var(--muted-foreground)] transition-colors hover:text-brand ${s.btn}`}
      >
        {copied ? <Check className={`${s.icon} text-brand`} /> : <Copy className={s.icon} />}
      </button>
    </div>
  );
}
