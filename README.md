# andreagamurrini.com — dr.gam

Copia fedele del sito Wix di dr.gam, rifatta in **Next.js 16** (React 19) e pubblicata su **Cloudflare Workers** con [OpenNext](https://opennext.js.org/cloudflare).
Il modulo contatti invia le email con **Resend**.

- 10 pagine × 3 lingue, con gli stessi URL di Wix:
  - inglese alla radice (`/`, `/bio`, …);
  - italiano sotto `/it/…`;
  - spagnolo sotto `/es/…`.
- Desktop (≥1000px): ogni elemento è nella stessa posizione che aveva su Wix (griglia di 980px).
- Mobile: gli stessi contenuti scorrono in colonna, con menu ad hamburger.
- Tutte le pagine sono statiche (generate al build). L'unica parte dinamica è `POST /api/contact`.

## Comandi

```bash
npm install
npm run dev        # sviluppo locale (http://localhost:3000)
npm run build      # build Next.js
npm run preview    # build OpenNext + anteprima nel runtime Cloudflare (wrangler)
npm run deploy     # build OpenNext + pubblicazione su Cloudflare
```

> Su Windows, `wrangler dev` può fallire con `SQLITE_CANTOPEN`. In quel caso aggiungi
> `--persist-to <cartella-corta>` oppure usa WSL.

## Primo deploy su Cloudflare

1. **Accesso:** `npx wrangler login`.
2. **Resend:**
   - aggiungi il dominio `andreagamurrini.com` su resend.com;
   - inserisci nel DNS di Cloudflare i record SPF/DKIM che Resend indica;
   - crea una API key.
3. **Variabili** in `wrangler.jsonc` → `vars`:
   - `CONTACT_TO_EMAIL`: l'indirizzo che riceve i messaggi (più indirizzi separati da virgola);
   - `CONTACT_FROM_EMAIL`: un mittente del dominio verificato, es. `dr.gam website <noreply@andreagamurrini.com>`.
4. **Segreto:** `npx wrangler secret put RESEND_API_KEY`.
5. **Pubblicazione:** `npm run deploy`.
6. **Dominio:**
   - in Cloudflare → Workers & Pages → `andreagamurrini` → Settings → Domains & Routes, aggiungi `www.andreagamurrini.com` e `andreagamurrini.com`;
   - il dominio deve essere una zona del tuo account Cloudflare;
   - reindirizza `andreagamurrini.com` → `www.andreagamurrini.com` (regola di Redirect), perché il sito canonico è su `www`.
7. **Distacco da Wix:**
   - in Wix scollega il dominio;
   - disdici il piano solo dopo aver verificato che il nuovo sito risponda.

Per provare il modulo in locale, copia `.dev.vars.example` in `.dev.vars` e lancia `npm run preview`.

## Dove stanno i contenuti

| Cosa | Dove |
| --- | --- |
| Testi, posizioni, immagini e video di ogni pagina | `src/content/pages/<lingua>/<pagina>.json` |
| Voci di menu, titoli e descrizioni SEO | `src/content/site.json` |
| Link social del footer | `src/lib/content.ts` (`SOCIAL`) |
| Testi dell'interfaccia (menu, messaggi del modulo) | `src/lib/i18n.ts` (`UI`) |
| Immagini (WebP già ottimizzate) | `public/media/` |

Ogni elemento di pagina ha coordinate `x, y, w, h` in pixel sulla griglia desktop di 980px, come nell'editor Wix:

- `text`: paragrafi HTML con stile;
- `image`: con `href` opzionale;
- `video`: `youtubeId`;
- `box`: riquadro colorato;
- `gallery`, `events`, `contactForm`.

Per aggiungere un video, per esempio, si copia un elemento `video` e si cambiano `youtubeId`, `title` e la posizione.
Se un testo si allunga, gli elementi sotto di lui vengono spinti in basso in automatico (come su Wix).

## Come è stato fatto

- `scripts/import-wix.mjs` ha convertito le pagine Wix catturate con un browser headless (layout a 1366px, 3 lingue) nei JSON di `src/content` e ha scaricato e ottimizzato le immagini.
- `scripts/fix-futura-bold.mjs` ha sistemato un dettaglio tipografico.
- Servivano una sola volta: d'ora in poi i JSON sono la fonte dei contenuti.

### Differenze rispetto a Wix

- **Font:** i font di Wix non sono liberi. Al loro posto:
  - DIN Next Light → **Barlow**;
  - Futura Light → **Jost**;
  - Jura, Trirong e Cormorant restano gli stessi (Google Fonts, ospitati dal sito).
- **Video:** mostrano l'anteprima e caricano il player YouTube (youtube-nocookie) solo al clic. Le pagine sono molto più leggere.
- **Galleria:** masonry a 2 colonne con lightbox (frecce e tasto Esc).
- **Chat:** la chat Wix ("Chattiamo!") e le statistiche TWIPLA non sono state riportate, perché erano servizi di Wix.
- **Icone:** quelle social sono di [Simple Icons](https://simpleicons.org). Amazon non è incluso nella libreria, quindi ha una "a".
- **Sfondo mancante:** lo sfondo di *White Coal Records* era un'immagine rotta anche su Wix. Resta il colore di fondo.
