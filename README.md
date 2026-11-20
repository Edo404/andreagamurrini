# andreagamurrini.com — dr.gam

Sito ufficiale di dr.gam (Andrea Gamurrini), in **Next.js 16** (React 19) e pubblicato su **Cloudflare Workers** con [OpenNext](https://opennext.js.org/cloudflare).
Il modulo contatti invia le email con **Resend**.

- Pagina unica (home con le sezioni Musica, Video, Galleria e Stampa) più 4 pagine: Storia, White Coal, Archivio live, Contatti. Tutto in 3 lingue:
  - inglese alla radice (`/`, `/bio`, …);
  - italiano sotto `/it/…`;
  - spagnolo sotto `/es/…`.
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

## Pubblicazione automatica

Il repo è collegato al Worker `andreagamurrini` (Cloudflare Workers Builds).
Ogni push su `main` fa partire da solo `npx opennextjs-cloudflare build` e poi `npx opennextjs-cloudflare deploy`.
Indirizzo attuale: https://andreagamurrini.edoardo-gamurrini.workers.dev (il dominio non è ancora collegato).

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
| Dischi, video, stampa, foto, link social | `src/data/catalog.ts` |
| Testi dell'interfaccia e titoli SEO (EN/IT/ES) | `src/data/ui.ts` |
| Biografia, citazioni della stampa, testo White Coal (EN/IT/ES) | `src/data/texts.json` |
| Archivio dei concerti 2016–2019 | `src/data/events.json` |
| Galleria | `src/data/gallery.json` |
| Immagini (WebP già ottimizzate) | `public/media/` |

Per aggiungere un singolo o un video basta aggiungere una voce in cima a `RELEASES` o `VIDEOS` in `catalog.ts`.

## Design

Il sito è ridisegnato da zero, partendo dal nome: "dr" viene dal cuore del nome Andrea, "gam" dal cognome, cioè sentimento e ragione.

- **Due voci tipografiche:**
  - **Instrument Serif** corsivo per la parte emotiva;
  - **Bricolage Grotesque** pesante per quella razionale;
  - **DM Mono** per le etichette.
- **Colori:** nero vulcanico caldo (Fuerteventura), testo color osso, un solo accento rosso brace (`#e8492f`).
- **Elementi ricorrenti:**
  - grana leggera su tutto il sito;
  - nastri che scorrono;
  - vinili che escono dalle buste;
  - timbro rotante "Alchemy is everything, my friend";
  - triangolo del fuoco alchemico come separatore.
- **Animazioni:** comparsa allo scroll solo in CSS (`animation-timeline: view()`), disattivate con "riduci movimento".
- **Video:** caricano YouTube (youtube-nocookie) solo al clic.
- **Pagine:** la home contiene Musica, Video, Galleria e Stampa. Ogni sezione mostra 6 o 9 elementi, e il pulsante "Altri" apre il resto. Storia, White Coal, Contatti e Archivio live (dal footer) sono pagine a parte.
  - I vecchi indirizzi Wix `/records`, `/videos`, `/gallery` e `/stampa` portano alla sezione corrispondente della home.
  - Gli indirizzi di Wix restano validi.
  - `/white-coal-records` reindirizza a `/white-coal#records`.
