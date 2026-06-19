# Cleversoft / akkaz Design System

A design system distilled from [akkaz/AIportfolio](https://github.com/akkaz/AIportfolio) — the source code of **akkaz.dev**, the AI-powered personal portfolio of **Gio Marco Baglioni** (aka `akkaz`), AI Engineer & Full-Stack Developer based in Valle Camonica, Italy.

The site has one product surface: a **marketing landing page + an integrated AI chat** (at `/chat`) that talks to visitors as akkaz himself, using tools to surface projects, skills, articles, availability, etc. Everything in this design system flows from that one surface.

---

## Sources

- **Codebase:** `akkaz/AIportfolio` (private GitHub repo) — Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, Framer Motion, Vercel AI SDK.
- **Live site:** https://akkaz.dev
- **Applied Cleversoft example:** `sito/at-group-evoluzione-dati/` in the source project.
- **Primary language:** Italian (`lang="it"`, locale `it_IT`).
- **Author:** Gio Marco Baglioni — giomarco@cleversoft.it, [@akkaz on GitHub](https://github.com/akkaz), [LinkedIn](https://linkedin.com/in/giomarcobaglioni).

---

## Index

- `README.md` — this file (context, content, visuals, iconography).
- `colors_and_type.css` — CSS variables for brand, neutrals, semantic tokens, type scale.
- `fonts.css` — Google Fonts imports (DM Sans + Geist Mono).
- `assets/` — logos, icon.
- `preview/` — individual cards that populate the Design System tab.
- `ui_kits/portfolio.html` — full-page composition: sticky nav, hero with chat composer, services grid, featured projects (cards + changelog rows), contact with dual cards, footer. Use as the starting template for a new landing or for copying any individual section.
- `SKILL.md` — Claude Code / Agent Skills manifest.

---

## Content fundamentals

**Language:** Italian, always. The entire UI copy, system prompts, tooling labels and navigation are in Italian. English shows up as a second layer — in **tech terms** (`prompt engineering`, `multi-agent`, `RAG`, `MCP`, `Open to work`) and in the brand taglines (`AI-Powered`). Never use full-English sentences next to Italian ones; keep the English surgical.

**Voice:** First person, second-person-singular (`dai del tu a tutti`). Casual, direct, punchy. The chat agent's system prompt puts it bluntly — it speaks AS akkaz, not as "an assistant". Sentences are short. No corporate hedging.

> Examples from production copy:
> - "Su internet sono **akkaz**, ed è lì che mi trovi di solito."
> - "Trasformo idee in prodotti che funzionano. Ho costruito di tutto, dal software per pilotare droni ad agenti AI autonomi. Codice pulito, consegna veloce, niente fuffa."
> - "Scelgo la tecnologia giusta per il tuo problema, non quella che mi è più comoda."
> - "Nessun vendor lock-in_"
> - "Costruiamo qualcosa insieme_"

**Casing:**
- **Headings:** sentence-case, mono font. ("Servizi", "Progetti", "About", "Costruiamo qualcosa insieme_")
- **Micro-labels above headings:** `UPPERCASE` mono, tracking `0.12em`, 10–11px, muted zinc color, prefixed by a 1×1 brand dot. ("COSA FACCIO", "CHI SONO", "LAVORI IN EVIDENZA").
- **Buttons:** `UPPERCASE` mono, tracking `0.04em`, small. ("CHATTA CON ME", "ESPLORA IL SITO", "PRENOTA UNA CALL").
- **Tech chips / badges:** mixed-case mono ("Next.js", "LangGraph", "Python").

**Punctuation + signature glyphs:**
- The **blinking underscore** `_` ends most display titles as a terminal cursor: `Gio Marco Baglioni_`, `Costruiamo qualcosa insieme_`, `Nessun vendor lock-in_`. Always rendered in `--brand` color, animated `blink 1s step-end infinite`.
- Plus signs `+` prefix CTAs and stat items — literal `<span>+</span>` in brand color before label text.
- ASCII dashed boxes `┌ ─ ─ ┐ │ │ └ ─ ─ ┘` live as decorative corners on the hero + contact section. Pure typographic decoration in `--zinc-700/40`.
- Em-dashes and middle-dots (`·`, `&middot;`) separate inline subtitle fragments ("AI Engineer · Full-Stack Developer · Valle Camonica").

**Emoji:** README uses them generously (🤖 ✨ 🚀 🏗️ 🌱 🎯 🔖). **UI does not.** Zero emoji in the actual app chrome, hero, services, contact sections. The system is intentionally typographic. Treat emoji as README/docs-only.

**Vibe:** Indie-hacker terminal. Confident, lightly playful, zero sales-y corporate. Think "agno.com meets Linear changelog". The word "fuffa" (Italian for "fluff/BS") appearing in marketing copy sets the tone.

---

## Visual foundations

**Colors.** One brand color — coral red `#ff4017` (`--brand`) — used sparingly: section-heading bullet dots, cursor underscore, CTA button fill, key link hovers, the `AKKAZ.` wordmark dot. Everything else is zinc-scale neutrals in `oklch()` (zinc-100 → zinc-950). Backgrounds: `#f0f0f0` in light, `~zinc-950` in dark. Dark-section blocks (contact, ai-expertise) use solid `zinc-950` even in light mode — intentional "chapter break" inversion.

**Type.** Two fonts — **DM Sans** (body paragraphs) and **Geist Mono** (every heading, label, button, stat number, and tech chip). This is unusual: mono is the primary identity. Tracking-tight `-0.02em` on displays, tracking-`0.12em` `UPPERCASE` on micro-labels, tracking-`0.04em` on buttons. Weights: 400, 500, 600, 700. Heading sizes are responsive clamps; display hero hits ~72px.

**Spacing.** 4px grid via Tailwind defaults. Sections are `py-16 sm:py-24` (64–96px vertical). Content max-width is `max-w-5xl` (64rem / 1024px) — never full-bleed text. Structural xl-only vertical rails (`border-x border-zinc-500/20` on a centered `max-w-6xl` div) run fixed-position full-height, "framing" the content page like terminal window borders.

**Backgrounds.** Flat solid colors (`#f0f0f0`, `zinc-950`). **No gradients in the UI.** No photography. No hand-drawn illustrations. No repeating patterns. The only decorative elements are ASCII dashed corners and structural border lines. Imagery appears only inside project cards (fetched from MongoDB) and uses Unsplash/Aceternity domains.

**Motion.** Framer Motion everywhere, single signature easing `cubic-bezier(0.19, 1, 0.22, 1)` (`ease-out-expo`-ish). Entry animations: `opacity 0→1, y: 20→0`, duration 0.5–0.7s, stagger 0.06–0.12s between items. `whileInView` with `viewport={{ once: true, margin: '-100px' }}` is the pattern. The blinking cursor uses CSS `step-end` (hard on/off, not smooth). Scroll hint uses a subtle bouncing `y: [0, 6, 0]` loop. **No bounce/spring overshoots.** No parallax. No scroll-hijacking.

**Hover states.** Consistent across the UI:
- **Text links / icons:** `text-zinc-400/500 → text-brand`. No color shift on background.
- **Outline buttons:** `border-zinc-300/50 → border-brand/40 + text-brand`.
- **Filled brand buttons:** `bg-brand → bg-brand-dark`.
- **Cards/services (desktop):** `bg-white → bg-zinc-50` (light) or `zinc-900 → zinc-800` (dark).
- **Trailing arrow:** `group-hover:translate-x-0.5` (2px nudge).

**Press states.** `active:scale-[0.98]` on primary CTA buttons. Nothing on text buttons.

**Borders.** Subtle, everywhere. Default `border-zinc-200/60` (light) or `zinc-700/40` (dark). Section dividers are `border-t border-zinc-500/20`. Cards in a grid use `gap-px` with a `bg-zinc-200/60` wrapper — this creates **hairline separators between cells** (clever grid-as-gap pattern). Borders do most of the work; shadow is minimal.

**Shadows.** Shadow scale is tiny. Buttons use `shadow-xs`. Cards use `shadow-sm`. The only `shadow-lg` is the floating scroll-to-top pill. No colored glows. No inner shadows.

**Backdrop blur.** Appears on sticky/floating chrome: the centered top nav pill (`backdrop-blur-xl` + `bg-white/80`), the bottom chat input area (`backdrop-blur-md`), the scroll-to-top button. Never on content cards.

**Corner radii.** `--radius: 0.625rem` (10px) base. Scale: `sm 6px · md 8px · lg 10px · xl 14px`. Buttons use `md`. Cards use `lg`. The brand icon box itself is rounded `lg` (not pilled). No fully-pill `rounded-full` except on tiny 1px bullet dots and avatars.

**Cards.** Thin border (`border-zinc-200/60`), `bg-white/70` with `backdrop-blur-sm`, rounded `lg`, `shadow-sm`. Content padded `p-5`–`p-6`. Services grid collapses to stacked cards on mobile, fuses into a `gap-px` grid-unit on desktop — the **card has no border on desktop**, separation comes from the grid gap trick.

**Protection gradients vs capsules.** No gradient overlays. No capsules. Identity markers are **bullet dots** (`h-1 w-1 rounded-full bg-brand`) and the **blinking underscore**.

**Transparency + blur.** Used on floating nav, chat input, scroll-to-top — anywhere that overlaps content. Content itself is never transparent. `bg-white/80`, `bg-zinc-900/80` are the standard semi-transparent fills.

**Layout rules.**
- Fixed top-center nav pill (`fixed top-3 left-1/2 -translate-x-1/2 z-50`).
- Structural vertical rails visible only on `xl:` screens.
- Floating chat CTA and scroll-to-top both bottom-left/right at `bottom-6`.
- Section dividers are single `border-t` lines between `<Section>` components.

**Tech chips / stack badges.** Tiny `rounded-md` pills, `px-2 py-0.5`, mono `text-xs`, `border-zinc-200/60`, no background. Inline list with small `gap-1.5`. These represent tech stacks on service cards and project rows.

**The "changelog row"** pattern (Featured Projects): `border-t` separator rows, 140px left gutter for category label in brand-color mono caps, flexible middle column for title + tech chips, 32px right arrow button with brand outline. A very Linear/Vercel-changelog feel.

---

## Iconography

**Primary icon set:** **[Lucide React](https://lucide.dev/)** (`lucide-react@^0.483.0`). Used everywhere — social icons (`Github`, `Linkedin`, `Mail`), navigation icons (`ArrowUp`, `ArrowRight`, `ArrowDown`, `Compass`, `Info`), service icons (`Bot`, `Code2`, `GraduationCap`, `Terminal`), skills icons (`Code`, `Cpu`, `Server`, `Wrench`, `Brain`, `PenTool`), misc (`CalendarCheck`, `AlertCircle`, `RotateCcw`, `Square`, `ChevronDown`, `ChevronUp`, `Sun`, `Moon`, `Monitor`, `Bot`).

**Secondary:** **[Tabler Icons React](https://tabler.io/icons)** (`@tabler/icons-react`) — mostly in shadcn extension components.

**Stroke style:** Default Lucide — stroke-width 2, 24×24 viewBox, rounded line-caps. Rendered at `h-3 w-3` (12px), `h-3.5 w-3.5` (14px), `h-4 w-4` (16px), `h-5 w-5` (20px), `h-6 w-6` (24px), `h-7 w-7` / `h-8 w-8` for the hero bot avatar.

**Color usage:**
- Default state: `text-zinc-400` (light) / `text-zinc-500` (dark).
- Hover state: `text-brand`.
- On service cards: icons are `text-brand` at rest (the single brand-color accent per card).
- Inside the hero chat bot: white on brand fill (`text-white` on `bg-brand`).

**No icon font, no custom SVG sprite.** All icons come from Lucide's tree-shakable React imports. The app has exactly one custom SVG: `public/icon.svg` (favicon — a pink/purple gradient rounded square with a white "a"). **That favicon does not match the site's visual system** — it's clearly a leftover from an earlier design.

**Emoji:** Not used in UI. Only in README docs and commit messages.

**ASCII art as iconography:** `┌ ─ ─ ┐` and `_` blinking cursor — these function as the brand's "iconographic vocabulary" far more than the favicon does. Terminal glyphs + the `+` prefix char.

**For this design system:** Icons are loaded via Lucide's static CDN SVG endpoint (`https://unpkg.com/lucide-static@0.483.0/icons/*.svg`) inside the UI kit so we don't need a React build step.

### 🚩 Iconography substitution flag
- The only custom asset `public/icon.svg` (pink-purple gradient favicon) visually conflicts with the rest of the brand (coral `#ff4017`, mono type). Treat it as legacy. For new brand marks, use the mono wordmark `assets/akkaz-wordmark-*.svg` + brand-dot, not the gradient favicon.
- Missing assets: **no production logo file ships in the repo**. The wordmark lives only as inline JSX (`AKKAZ<span>.</span>`) in `site-footer.tsx`. We reconstructed `assets/akkaz-wordmark-light.svg` / `-dark.svg` from that JSX. Confirm with the user before using for anything production-facing.

---

## Font substitution flag

- **Geist Mono** is loaded via the `geist` npm package in production (bundles the font as a next/font asset). The project did not ship `.ttf`/`.woff2` files; we load Geist Mono from **Google Fonts** instead (as of early 2025 it's available there). Visually identical at the weights used (400/500/600/700), but if pixel-perfect metrics matter for print output, ask the user for the official Geist Mono static files to drop into `fonts/`.
- **DM Sans** is a Google Font — loaded directly, no substitution needed.
