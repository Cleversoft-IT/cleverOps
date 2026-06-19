---
name: cleversoft-design-system
description: Design system aziendale di Cleversoft (software house, Valle Camonica). Usa questa skill quando crei o revisioni interfacce, siti, landing, preventivi, mockup, screenshot, asset visivi, copy o prototipi che devono rispettare l'identità visiva Cleversoft. Formato compatibile impeccable (PRODUCT.md + DESIGN.md).
---

# Cleversoft Design System

L'identità visiva di **Cleversoft IT** — terminale indie-hacker, un solo coral
`#ff4017`, tipografia monospace, zero fuffa. Questa skill è la **fonte di verità** del
brand aziendale e supera la vecchia skill `cleversoft-design` (incentrata sul profilo
personale akkaz, ora legacy).

## Da leggere prima di lavorare

1. **`PRODUCT.md`** — strategia: register, audience, scopo, personalità di marca,
   anti-reference, principi. Il "chi / cosa / perché". Leggilo prima di qualsiasi
   decisione di brand, copy o layout.
2. **`DESIGN.md`** — sistema visivo in formato [Google Stitch](https://stitch.withgoogle.com/docs/design-md/format/):
   token (frontmatter YAML) + 6 sezioni (Overview, Colors, Typography, Elevation,
   Components, Do's and Don'ts). Il "come appare".
3. **`tokens/tokens.css`** + **`tokens/fonts.css`** — token CSS concreti (variabili
   brand/zinc/semantici, tipografia, radii, ombre, spacing, easing) e import font.

Usa i file bundlati (CSS, preview, ui kit, asset SVG) come riferimenti concreti invece
di ricostruire il sistema a memoria.

## Le 10 regole da ricordare

1. **Italiano-first.** Copy in italiano, seconda persona singolare (`tu`), frasi corte e schiette, anti-corporate. Inglese solo sui termini tecnici.
2. **Mono = identità.** Geist Mono per ogni heading, label, bottone, numero, chip. DM Sans solo nei paragrafi (`<p>`).
3. **Un solo colore brand.** Coral `#ff4017` (light) / `#ff5a33` (dark), ≤10% di schermata. Niente altri accenti.
4. **Glifi-firma.** Cursore `_` coral lampeggiante in coda ai titoli "parlanti", angoli ASCII `┌ ─ ┐`, prefisso `+` sui CTA, dot brand 1×1 prima di ogni micro-label.
5. **Micro-label** sopra le sezioni: mono UPPERCASE 10px, tracking `0.12em`, con dot coral. Sistema deliberato, una per sezione, mai due di fila.
6. **Niente gradienti. Niente glassmorphism (decorativo). Niente emoji UI. Niente Inter. Niente stock photo / illustrazioni decorative.**
7. **Icone:** Lucide (stroke 2, line-cap arrotondati). Default `zinc-400/500` → coral in hover.
8. **Motion:** easing unico `cubic-bezier(0.19, 1, 0.22, 1)`, `opacity+y:20→0`, 0.5–0.7s, stagger 0.06–0.12s. No bounce/spring. `prefers-reduced-motion` obbligatorio.
9. **Card:** bordo `zinc-200/60`, `bg-white`, `rounded-lg` (10px), `shadow-sm`, `p-5/p-6`. Griglie desktop con `gap-px` su wrapper `zinc-200/60` (separatori hairline). Mai nested card.
10. **Sezioni:** `py-16 sm:py-24`, contenuto `max-w-5xl`, divisori `border-t border-zinc-500/20`. Blocchi `zinc-950` come stacco di capitolo anche in light.

## Risorse bundlate

- `PRODUCT.md` / `DESIGN.md` — documenti strategico + visivo (formato impeccable/Stitch).
- `.impeccable/design.json` — sidecar: componenti drop-in (HTML/CSS), motion, ombre, breakpoint, narrative.
- `tokens/tokens.css` · `tokens/fonts.css` — token e font.
- `assets/` — wordmark light/dark, logo, icon Cleversoft.
- `preview/` — preview mirate di componenti e token (colori, tipografia, bottoni, card, hero, radii, spacing).
- `ui_kits/landing.html` — composizione full-page (nav, hero, griglia servizi, progetti, contatti, footer) da riusare come template di partenza.
- `references/cleversoft-contacts.md` — contatti aziendali verificati (azienda, team, regole UI).

## Output a seconda del target

- **Artefatti visivi** (slide, mockup, screenshot, prototipi usa-e-getta): copia gli
  asset necessari nel workspace e genera HTML statico (o file nativi del progetto) che
  l'utente possa aprire. Linka `tokens/tokens.css` o incolla le variabili.
- **Codice di produzione**: copia solo gli asset necessari e adatta le regole allo stack
  esistente (in Cleversoft di solito Next.js + Tailwind 4 con `@theme inline`, oppure
  Drupal per i gestionali). Non reinventare i token: riusa quelli del progetto.

## Integrazione con impeccable

`PRODUCT.md` e `DESIGN.md` sono nel formato della skill **impeccable**
(`npx impeccable install`). Per lavorare su un progetto Cleversoft con i comandi
`/impeccable`:

1. Copia `PRODUCT.md` e `DESIGN.md` (e la cartella `.impeccable/`) nella root del
   progetto target.
2. I comandi `/impeccable` (`craft`, `shape`, `polish`, `critique`, `audit`, `live`…)
   leggeranno automaticamente questi file e resteranno on-brand.
3. Per rigenerare/aggiornare il sistema da codice reale: `/impeccable document` dentro
   un prodotto Cleversoft (es. cleverForm) e riporta qui gli aggiornamenti.

## Quando invocata senza altre istruzioni

Chiedi cosa l'utente vuole costruire o progettare, poi agisci come brand designer
esperto di Cleversoft: produci artefatti HTML o codice di produzione a seconda del
target, sempre dentro le regole di `PRODUCT.md` e `DESIGN.md`.
