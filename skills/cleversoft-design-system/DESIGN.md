---
name: Cleversoft Design System
description: Software house della Valle Camonica — identità terminale, mono, un solo coral, zero fuffa.
colors:
  brand: "#ff4017"
  brand-light: "#ff6640"
  brand-dark: "#e63610"
  brand-dark-mode: "#ff5a33"
  background: "#f0f0f0"
  surface: "#ffffff"
  zinc-50: "#fafafa"
  zinc-100: "#f4f4f5"
  zinc-200: "#e4e4e7"
  zinc-300: "#d4d4d8"
  zinc-400: "#a1a1aa"
  zinc-500: "#71717a"
  zinc-600: "#52525b"
  zinc-700: "#3f3f46"
  zinc-800: "#27272a"
  zinc-900: "#18181b"
  zinc-950: "#09090b"
  destructive: "#e5484d"
typography:
  display:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  full: "9999px"
spacing:
  section-y: "clamp(4rem, 8vw, 6rem)"
  card-pad: "20px"
  card-pad-lg: "24px"
  chip-pad: "2px 8px"
  content-max: "64rem"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.zinc-50}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.brand-dark}"
    textColor: "{colors.zinc-50}"
    rounded: "{rounded.md}"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.zinc-800}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
    typography: "{typography.label}"
  button-outline-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.brand}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.zinc-800}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-pad-lg}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.zinc-600}"
    rounded: "{rounded.md}"
    padding: "{spacing.chip-pad}"
    typography: "{typography.label}"
  micro-label:
    backgroundColor: "{colors.background}"
    textColor: "{colors.zinc-500}"
    typography: "{typography.label}"
---

# Design System: Cleversoft

## 1. Overview

**Creative North Star: "Il manuale del terminale"**

Cleversoft non assomiglia a una software house: assomiglia a uno strumento che un
tecnico bravo userebbe volentieri. Il sistema prende il vocabolario del terminale —
font monospace, un cursore `_` che lampeggia, angoli ASCII `┌ ─ ┐`, il prefisso `+`,
il punto coral come bullet — e lo usa come **identità di marca**, non come costume.
Funziona perché è onesto: Cleversoft *scrive davvero* software, quindi il mono è
letterale, non decorativo. La densità è bassa e arieggiata sulle superfici brand
(landing, preventivi), alta e funzionale dentro le app.

L'estetica è **indie-hacker confidente**: superfici piatte, un solo colore che parla,
la tipografia che fa tutto il lavoro pesante. Rifiuta esplicitamente ciò che
Cleversoft era prima — i preventivi a **gradiente blu, font Inter e glassmorphism**,
il "corporate SaaS generico". Rifiuta anche la deriva opposta, l'editorial-magazine
(serif corsivo + drop cap), perché non siamo una rivista: siamo un manuale tecnico
con personalità. Il test: se sembra fatto da un'AI o da una landing-page-factory,
è sbagliato.

**Key Characteristics:**
- Un solo colore brand (coral `#ff4017`), tutto il resto è scala zinc neutra.
- Mono (Geist Mono) per **ogni** heading, label, bottone, numero, chip. DM Sans solo per i paragrafi.
- Glifi-firma: cursore `_` lampeggiante, prefisso `+`, angoli ASCII, dot brand 1×1.
- Superfici piatte, bordi sottili, ombre minime. Niente gradienti, niente glass.
- Italiano-first, voce diretta; inglese solo sui termini tecnici.
- Blocchi `zinc-950` come "stacco di capitolo" anche in light mode.

## 2. Colors

Palette monocromatica zinc con **un solo accento** che porta tutto il significato.

### Primary
- **Coral Cleversoft** (`#ff4017`): l'unico colore della marca. Compare con parsimonia —
  riempimento dei CTA primari, cursore `_`, dot prima delle micro-label, hover dei link
  e delle icone chiave, il punto del wordmark `CLEVERSOFT.`. In dark mode si schiarisce
  a `#ff5a33` per reggere il contrasto sul `zinc-950`. Hover dei fill: `#e63610` (brand-dark).

### Neutral
- **Zinc 950 / 900** (`#09090b` / `#18181b`): inchiostro del testo display e heading su
  light; sfondo dei blocchi "stacco di capitolo" e dello sfondo dark globale.
- **Zinc 800 / 700** (`#27272a` / `#3f3f46`): testo body principale, bordi su dark.
- **Zinc 500 / 400** (`#71717a` / `#a1a1aa`): testo muted, micro-label, icone a riposo,
  paragrafi secondari. *Attenzione contrasto:* non usare `zinc-400` come testo body su
  sfondi chiari — è per caption e stati disattivi.
- **Zinc 200 / 100 / 50** (`#e4e4e7` / `#f4f4f5` / `#fafafa`): bordi (`zinc-200/60`),
  fill di card in hover, superfici alternate.
- **Background** (`#f0f0f0`): lo sfondo light di sistema — **non** bianco puro. Le card
  vere sono bianche (`#ffffff`) e "galleggiano" sul grigio.

I token semantici (`--foreground`, `--card`, `--muted-foreground`, `--border`...) sono
definiti in OKLCH in `tokens/tokens.css` e restano la fonte canonica per il codice; qui
sopra sono espressi in hex/zinc per la leggibilità e la compatibilità Stitch.

### Named Rules
**La regola della Voce Unica.** Il coral copre ≤ 10% di qualsiasi schermata. La sua
rarità è il punto: quando appare, *significa* qualcosa (azione, stato, accento). Mai
coral su testo lungo, mai due coral diversi nella stessa vista, mai coral "per
ravvivare".

**La regola dello Stacco di Capitolo.** Una sezione `zinc-950` piena (contatti,
expertise AI, hero del preventivo) può comparire **anche in light mode**, come
inversione voluta che spezza il ritmo. È un gesto editoriale, non un dark-mode toggle.

## 3. Typography

**Display/Heading Font:** Geist Mono (con `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`)
**Body Font:** DM Sans (con `ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** Geist Mono — la stessa del display: è l'identità.

**Character:** un monospace tecnico ma morbido (Geist) accoppiato a un grottesco
umanista caldo (DM Sans). Il contrasto è sull'asse mono↔proporzionale, non su due sans
simili. Il mono è inusuale come font primario: è proprio questo a rendere Cleversoft
riconoscibile a colpo d'occhio.

### Hierarchy
- **Display** (Geist Mono 600, `clamp(2.5rem, 6vw, 4.5rem)` → ~40–72px, lh 1.05,
  tracking `-0.02em`): titolo della hero. Spesso chiuso dal cursore `_` coral.
- **Headline** (Geist Mono 600, `clamp(2rem, 4vw, 3rem)`, lh 1.1, tracking `-0.02em`):
  titoli di sezione (`H1/H2`). Sentence-case, non uppercase.
- **Title** (Geist Mono 600, `clamp(1.5rem, 3vw, 2.25rem)`, lh 1.15): sotto-titoli,
  titoli di card grandi.
- **Body** (DM Sans 400, `1.125rem`, lh 1.6): paragrafi e descrizioni. Colore
  `zinc-500/600`. Tetto di lunghezza riga 65–75ch.
- **Label** (Geist Mono 500, `0.625rem` → 10px, tracking `0.12em`, UPPERCASE): la
  **micro-label firma** sopra le sezioni, preceduta dal dot coral 1×1. Bottoni e chip
  usano la stessa famiglia a 12px con tracking `0.04em`.

### Named Rules
**La regola del Mono Sovrano.** Tutto ciò che non è un paragrafo di prosa è in mono:
heading, label, bottoni, numeri, statistiche, chip tecnici, prezzi. DM Sans appare
**solo** dentro `<p>`. Se un titolo è in sans, è un bug.

**La regola del Cursore.** Il cursore `_` coral chiude i titoli che "parlano"
(`Costruiamo qualcosa insieme_`, `Nessun vendor lock-in_`), animato `blink 1s step-end
infinite`. È un accento, non un orpello: uno per vista, non su ogni riga.

## 4. Elevation

Sistema **piatto per principio**. La profondità nasce da bordi sottili e dal layering
tonale (grigio di sistema vs bianco delle card vs blocchi zinc-950), non dalle ombre.
Le ombre esistono ma sono minuscole e quasi sempre statiche; nessun glow colorato, mai
inner-shadow.

### Shadow Vocabulary
- **xs** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.04)`): bottoni a riposo.
- **sm** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 1px 0 rgb(0 0 0 / 0.04)`): card.
- **md** (`0 4px 10px -2px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.05)`): popover, dropdown.
- **lg** (`0 10px 24px -6px rgb(0 0 0 / 0.10), 0 4px 8px -4px rgb(0 0 0 / 0.06)`): **solo**
  per chrome flottante (pill scroll-to-top, nav). Un solo `lg` per pagina.

### Named Rules
**La regola del Bordo-prima-dell'Ombra.** Per separare due superfici si usa un bordo
hairline (`1px` `zinc-200/60`), non un'ombra. Le ombre rispondono solo a stato/flottamento.

**La regola del gap-px.** Nelle griglie di card su desktop la separazione è un
`gap: 1px` su un wrapper `background: zinc-200/60`: le celle diventano bianche e i gap
fanno da linee hairline. La card **non ha bordo proprio** in questa modalità.

## 5. Components

### Buttons
- **Shape:** angoli morbidi `8px` (`{rounded.md}`). Mai pill, mai spigolo vivo.
- **Primary:** fill coral (`#ff4017`), testo `zinc-50`, label mono UPPERCASE 12px
  tracking `0.04em`, padding `10px 18px`. Spesso prefissato da un `+` coral letterale.
- **Hover / Focus:** fill → `brand-dark` (`#e63610`); `active:scale(0.98)`; focus
  `outline: 2px solid var(--ring)` offset 2px.
- **Outline (secondario):** bordo `zinc-300/50`, testo `zinc-800`; hover → bordo
  `brand/40` + testo coral. Nessun fill.
- **Ghost / link:** testo `zinc-400/500` → coral in hover; freccia di coda con
  `translate-x: 2px` in hover. Nessun cambio di sfondo.

### Chips / Stack badges
- **Style:** pill rettangolari `rounded-md`, padding `2px 8px`, mono 12px, bordo
  `zinc-200/60`, **nessuno sfondo**. Lista inline con `gap` ~6px.
- **State:** servono a elencare stack tecnici (`Next.js`, `Drupal`, `Python`) e
  metadati; mixed-case, non uppercase. In varianti semantiche (es. modulo "evergreen"
  vs "applied") l'uno resta outline zinc, l'altro è brand-tinted.

### Cards / Containers
- **Corner Style:** `10px` (`{rounded.lg}`).
- **Background:** bianco (`#ffffff`) sul grigio di sistema; su dark, `zinc-900`.
- **Shadow Strategy:** `sm` a riposo (vedi Elevation); nelle griglie desktop, niente
  bordo proprio → separazione via `gap-px` (regola del gap-px).
- **Border:** `1px` `zinc-200/60` quando la card è isolata.
- **Internal Padding:** `20px`–`24px` (`{spacing.card-pad}` / `card-pad-lg`).
- **Hover (desktop):** `bg-white → zinc-50` (light) / `zinc-900 → zinc-800` (dark).
  Mai nested cards.

### Inputs / Fields
- **Style:** bordo `1px` `zinc-200`/`input`, sfondo `surface`, `rounded-lg`, testo body.
- **Focus:** `outline: 2px solid var(--ring)` offset 2px (no glow colorato).
- **Error / Disabled:** bordo `destructive` (`#e5484d`) + testo errore mono piccolo;
  disabled a opacità ridotta, cursore `not-allowed`.

### Navigation
- **Style:** pill flottante centrata in alto (`fixed top-3 left-1/2 -translate-x-1/2`),
  `backdrop-blur-xl` + `bg-white/80`, bordo hairline, `rounded-full` o `xl`.
- **Typography:** voci mono 12–13px; default `zinc-500`, hover/active coral.
- **Mobile:** collassa a menu; rail verticali strutturali visibili solo da `xl:`.

### Micro-label (componente firma)
Sopra ogni titolo di sezione: dot coral `1×1` `rounded-full` + testo mono UPPERCASE
10px tracking `0.12em` colore `zinc-500` (es. `• COSA FACCIAMO`, `• IL TEAM`). È un
**sistema di marca dichiarato e deliberato**, non lo scaffolding "eyebrow" generico —
ma proprio per questo va usato con misura: una per sezione, mai due di fila.

### ASCII corners + cursore (decorazione firma)
Angoli `┌ ─ ─ ┐ │ │ └ ─ ─ ┘` in `zinc-700/40` come cornice tipografica su hero e
blocco contatti; cursore `_` coral lampeggiante in coda ai titoli "parlanti". Pura
decorazione tipografica, zero immagini.

## 6. Do's and Don'ts

### Do:
- **Do** usare un solo colore brand: coral `#ff4017` (light) / `#ff5a33` (dark), ≤10% di schermata (regola della Voce Unica).
- **Do** mettere in Geist Mono ogni heading, label, bottone, numero e chip; DM Sans solo nei `<p>`.
- **Do** separare le superfici con bordi hairline `1px zinc-200/60` e con il trucco `gap-px` nelle griglie — non con le ombre.
- **Do** usare i glifi-firma con misura: cursore `_` coral, prefisso `+`, dot brand 1×1, angoli ASCII.
- **Do** tenere superfici piatte e ombre minime (`xs`/`sm`); un solo `shadow-lg` per pagina, solo per chrome flottante.
- **Do** scrivere copy italiano, diretto, in seconda persona singolare; l'inglese solo sui termini tecnici.
- **Do** usare i blocchi `zinc-950` come stacco di capitolo anche in light mode.
- **Do** verificare il contrasto: body ≥ 4.5:1; mai `zinc-400` come testo di lettura su fondo chiaro.
- **Do** usare icone Lucide (stroke 2, line-cap arrotondati), `zinc-400/500` a riposo → coral in hover.

### Don't:
- **Don't** usare **gradienti** — né blu `#0ea5e9→#0284c7`/`#3b82f6→#1e40af` né altri (è il vecchio preventivo Cleversoft legacy che stiamo cancellando). Niente `background-clip: text` con gradiente.
- **Don't** usare **glassmorphism** decorativo (card bianche traslucide con `backdrop-filter: blur`); il blur è ammesso solo sul chrome flottante che si sovrappone al contenuto.
- **Don't** usare il font **Inter** o stack `system-ui` come voce primaria: la voce è Geist Mono + DM Sans.
- **Don't** cadere nel template SaaS: hero-metricone + statistiche + accento gradient; griglie infinite di card identiche icona+titolo+testo.
- **Don't** mettere l'eyebrow uppercase tracciato sopra *ogni* sezione come riempimento — la micro-label è un sistema deliberato, usala con misura, mai due di fila.
- **Don't** usare emoji nella UI/chrome, né stock photo "business handshake", né illustrazioni 3D/blob decorativi.
- **Don't** usare bordi laterali colorati (`border-left/right` > 1px come stripe), nested cards, o ombre colorate/glow.
- **Don't** far sembrare la pagina "generata da un'AI": niente cream/beige di default, niente editorial serif+corsivo dove non c'entra.
