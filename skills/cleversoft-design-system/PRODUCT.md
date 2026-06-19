# Product

> File strategico del design system **Cleversoft** in formato impeccable.
> Risponde a "chi / cosa / perché". Per il "come appare" vedi `DESIGN.md`.
> Ogni comando impeccable legge questo file prima di lavorare.

## Register

brand

> Nota sul register. Il default è `brand`: le superfici più rappresentative di
> Cleversoft sono di comunicazione — landing dei prodotti (cleverForm), preventivi
> interattivi, portfolio, pagine di progetto — dove **il design È il prodotto** e
> l'impressione del visitatore è ciò che stiamo costruendo. I prodotti applicativi
> veri e propri (gestionali Drupal, web-app, dashboard, wizard) ereditano lo stesso
> sistema visivo ma vanno trattati come superfici `product`: lì il design SERVE il
> compito (densità, stati completi, motion 150–250ms, font singolo). Override del
> register per-task quando lavori su un'app interna.

## Users

Due audience che pesano **alla pari** — nessuna guida sull'altra: ogni superficie deve
parlare a entrambe nello stesso momento, con una sola voce.

- **Decisori PMI e enti del territorio (Valle Camonica / Brescia e oltre).** Titolari,
  responsabili IT, uffici acquisti di aziende manifatturiere, di servizi e pubbliche
  amministrazioni che valutano un gestionale custom, una web-app, una consulenza
  strategica o un microservizio AI. Spesso **non sono tecnici**: arrivano da fogli
  Excel e processi manuali, diffidano del "fornitore IT che parla difficile" e devono
  giustificare una spesa internamente. Il loro lavoro: capire in fretta se Cleversoft
  è competente e affidabile, e cosa otterranno concretamente.
- **Aziende e team più tecnici** (reparti dev, startup, realtà che cercano formazione
  AI o microservizi su misura). Riconoscono e premiano la competenza reale; il tono
  "indie-hacker" e il lessico tecnico inglese chirurgico parlano la loro lingua.

Contesto d'uso: per lo più desktop in orario lavorativo, ma i preventivi e le landing
arrivano spesso via link su mobile. La lettura è scansione veloce, non studio.

## Product Purpose

Cleversoft IT è una software house della Valle Camonica che costruisce **software
gestionale su misura, web-app, consulenza strategica per l'innovazione e microservizi
basati su AI**. Il design system esiste per dare a tutte queste superfici **una sola
identità riconoscibile e con personalità** — l'opposto del "fornitore IT generico" e,
soprattutto, l'opposto del "sito generato da un'AI".

Il sistema deve far percepire in pochi secondi: *competenza concreta, consegna veloce,
niente fuffa.* Il successo è quando un decisore non tecnico si fida e un tecnico
rispetta — e quando una pagina Cleversoft non si potrebbe scambiare per un template
SaaS qualunque né per "una cosa fatta da un'AI".

## Brand Personality

**Tre parole: confidente · giocoso · indie.** (confident · playful · indie-hacker)

- **Tono di riferimento: il portfolio akkaz.dev.** È il metro del "tono giusto" — la
  stessa penna, applicata alla squadra. La voce è di **Cleversoft come team** ("noi",
  `SIAMO IN DUE`, `IL TEAM`, footer `MADE IN VALLE CAMONICA_`), ma con la stessa
  confidenza giocosa del sito personale, **non** un registro corporate più sobrio.
- **Voce.** Dai del **tu** a tutti. Frasi corte, affermative, un po' sfacciate; zero
  hedging aziendale. La parola "fuffa" può comparire: fissa il tono. Italiano sempre;
  l'inglese solo chirurgico sui termini tecnici (`prompt engineering`, `multi-agent`,
  `RAG`, `MCP`) e su tagline brevi. Mai frasi intere in inglese accanto all'italiano.
- **Emozioni da evocare.** "Questi sono bravi e diversi dal solito fornitore IT":
  competenza che non si prende troppo sul serio, una punta di sorpresa, fiducia che
  nasce dal craft più che dalle promesse.
- **Reference di feel.** **akkaz.dev** (riferimento primario e completo) e **agno.com**
  (terminale indie-hacker). Niente clone Linear/Vercel, niente deriva
  editorial-magazine, niente patina SaaS.
- **Vibe.** Terminale indie-hacker, confidente e giocoso — parlato in italiano di valle.

## Anti-references

Cosa **non** deve sembrare. Il primo è la **priorità assoluta**; gli altri sono peccati
già commessi nei vecchi preventivi che il sistema serve a cancellare.

- **"Sembra fatto da un'AI / da un template" — priorità n.1.** Se qualcuno può dire
  "questo l'ha generato un'AI" o "è il solito template" senza esitare, abbiamo fallito.
  Va passato il test di slop a **due livelli**: non indovinabile dalla sola categoria, e
  non indovinabile da categoria + anti-reference. Niente cream/beige/sand di default,
  niente navy-and-gold "fintech", niente editorial serif+corsivo fuori contesto, niente
  griglie di card-clone. Il metro del "giusto" è il tono di **akkaz.dev**.
- **Il vecchio preventivo Cleversoft (legacy).** Preventivi HTML con font Inter,
  **gradienti blu** (`#0ea5e9 → #0284c7`, `#3b82f6 → #1e40af`), glassmorphism
  (`backdrop-filter: blur` su card bianche traslucide) e badge gradient. "Corporate
  SaaS generico" da abbandonare: lo citiamo per nome.
- **Template SaaS da landing-page-factory.** Hero con metricone gigante + statistiche
  di contorno + accento gradient; eyebrow uppercase tracciato sopra *ogni* sezione come
  grammatica di riempimento.
- **Il fornitore IT che parla difficile.** Muri di testo, gergo per impressionare,
  promesse vaghe. Il nostro opposto: il preventivo che anche un non-tecnico capisce.
- **Stock photo "business handshake" e illustrazioni 3D a pacchetto.** Niente foto da
  banca-immagini nella UI/chrome, niente blob/illustrazioni decorative.

## Design Principles

Principi strategici (non regole visive — quelle stanno in `DESIGN.md`).

1. **Distintività e tono prima di tutto (anti-slop).** L'obiettivo n.1 è non sembrare
   generato da un'AI né un template: ogni superficie ha un punto di vista riconoscibile
   e **il tono di akkaz.dev**. "Medio" = invisibile. Nel dubbio, rischia la personalità.
2. **Pratica ciò che predichi.** Siamo una software house: il sito/preventivo *dimostra*
   competenza col proprio craft, non la dichiara. Un dettaglio curato vale più di
   "siamo esperti".
3. **Mostra, non raccontare.** Componenti visuali, numeri reali, esempi concreti al
   posto del wall-of-text. Prezzo e "cosa ottieni" in alto, non sepolti.
4. **Parla a entrambi senza abbassare il tono.** Tecnico e non-tecnico pesano alla pari:
   chiarezza per chi non è del mestiere *senza* diventare corporate o didascalico, e
   competenza riconoscibile dal tecnico. Mai far sentire stupido nessuno dei due.
5. **Una sola voce, sottratta all'osso.** Stessa palette, lessico e glifi (`_`, `+`, dot
   brand) ovunque; un solo colore brand, tipografia che fa il lavoro pesante, bordi al
   posto delle ombre. Se un elemento non serve al messaggio, esce.

## Accessibility & Inclusion

- **Target WCAG 2.1 AA.** Testo body ≥ 4.5:1 sul suo sfondo; testo grande (≥18px o
  bold ≥14px) ≥ 3:1; lo stesso vale per i placeholder. Attenzione al trabocchetto
  ricorrente: grigio muted (`zinc-400/500`) su sfondi chiari tinti — verificare e
  spingere verso l'inchiostro quando il contrasto è borderline.
- **Il colore non è mai l'unico segnale.** Il brand coral porta significato (CTA,
  stato attivo) ma è sempre accompagnato da testo, icona o posizione — utile anche
  per daltonismo (il coral/rosso-arancio è una banda critica).
- **`prefers-reduced-motion: reduce` non è opzionale.** Cursore lampeggiante, entrate
  `opacity+y`, hint di scroll: tutti devono avere alternativa istantanea/crossfade.
  Il contenuto è sempre visibile di default, mai gated da una transizione.
- **Focus visibile sempre.** `outline: 2px solid var(--ring)` con offset; mai
  `outline: none` senza un sostituto evidente.
- **Italiano-first reale.** `lang="it"`, copy comprensibile a un lettore non tecnico;
  i termini inglesi tecnici restano ma il senso deve arrivare dal contesto.
