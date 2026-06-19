---
name: cleversoft-design
description: Use when creating or reviewing interfaces, websites, mockups, screenshots, visual assets, copy, or prototypes that must match the Cleversoft/akkaz visual design system.
---

# Cleversoft / akkaz Design System

Read `references/design-system.md` before making brand, layout, copy, or asset decisions. Read `references/cleversoft-contacts.md` when creating contact blocks, footers, business cards, proposals, email CTAs, team sections, or copy that names the Cleversoft team. Use the bundled CSS, previews, UI kit, screenshots, uploads, and SVG assets as concrete references rather than recreating the system from memory.

If creating visual artifacts such as slides, mockups, screenshots, or throwaway prototypes, copy the needed assets into the target workspace and create static HTML or project-native files the user can view. If working on production code, copy only the needed assets and adapt the rules to the existing stack.

Key rules to remember for this visual system:

1. **Italian-first copy.** UI text is Italian, tech terms stay English. Second-person-singular (`tu`). Short, punchy, anti-corporate sentences.
2. **Mono type is the identity.** Geist Mono for every heading, label, button, stat, and chip. DM Sans only for body paragraphs.
3. **One brand color.** `#ff4017` coral red. Used on: bullet dots, the blinking `_` cursor, CTA fills, key link hovers, the `AKKAZ.` wordmark dot. Nothing else gets color.
4. **Signature glyphs.** Blinking `_` at end of display titles. ASCII dashed corners (`┌ ─ ─ ┐`). `+` prefix on CTAs. 1×1 brand-dot before every micro-label.
5. **Micro-labels** above every section heading: uppercase mono, 10px, tracking `0.12em`, preceded by `•` brand dot.
6. **No gradients. No emoji in UI. No custom illustration. No photography in chrome.**
7. **Icons:** Lucide React in app code, or Lucide static SVGs for plain HTML prototypes. Default muted zinc -> brand on hover.
8. **Motion:** Framer Motion, single easing `cubic-bezier(0.19, 1, 0.22, 1)`, `opacity+y:20→0`, 0.5–0.7s, stagger 0.06–0.12s. No springs.
9. **Cards:** thin `border-zinc-200/60`, `bg-white/70`, `rounded-lg`, `shadow-sm`, `p-5/p-6`. Grid-of-cards uses `gap-px` on a `bg-zinc-200/60` wrapper — hairline cell separators.
10. **Sections:** `py-16 sm:py-24`, `max-w-5xl` content, `border-t border-zinc-500/20` dividers.

Bundled resources:

- `references/design-system.md` — full brand, copy, layout, motion, and iconography rules.
- `references/cleversoft-contacts.md` — verified Cleversoft IT, Gio Marco, and Stefano contact references from the local site.
- `colors_and_type.css` and `fonts.css` — design tokens and font imports.
- `assets/` — wordmarks, logo, and icon files.
- `preview/` — focused component and token previews.
- `ui_kits/portfolio.html` — full-page portfolio composition to reuse for prototypes.
- `screenshots/` and `uploads/` — visual references for generated or captured assets.

When the user invokes this skill without any other guidance, ask what they want to build or design, then act as an expert brand designer who outputs HTML artifacts or production code depending on the target.
