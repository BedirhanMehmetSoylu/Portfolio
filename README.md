# Bedirhan Soylu – Portfolio

Persönliches Portfolio als Junior Fullstack Entwickler (Angular & Python/Django). Die Seite stellt mich vor, zeigt Skills und Projekte aus Frontend und Backend und bietet ein Kontaktformular.

**🔗 Live:** [www.bedirhan-soylu.de](https://www.bedirhan-soylu.de)

![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A522.22-5FA04E?logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Hosting-Vercel-000000?logo=vercel&logoColor=white)

---

## Highlights

- **Prerendering (SSG) mit Hydration:** Alle Seiten werden beim Build als fertiges HTML erzeugt. Suchmaschinen und KI-Suchen sehen sofort den kompletten Inhalt, im Browser übernimmt Angular das HTML, ohne es neu zu zeichnen.
- **Zoneless Change Detection:** Kein `zone.js`. Alle Komponenten nutzen `OnPush`, Updates laufen gezielt über Events, Signals und `markForCheck()`.
- **Aktuelles Angular 22:** Schrittweise von Angular 17 migriert, jede Hauptversion einzeln gebaut, getestet und visuell verglichen.
- **Barrierefreiheit:** Semantisches HTML (Landmarks, Überschriften-Hierarchie), komplette Tastaturbedienung mit sichtbarem Fokus, beschriftete Formularfelder, Screenreader-Ansagen und Unterstützung für „Bewegung reduzieren“.
- **Performance:** Optimierte AVIF-Bilder mit festen Maßen gegen Layout-Sprünge, Lazy Loading, selbst gehostete Schriften mit Preload, nachgeladene Unterseiten und Cache-Header. Die Download-Menge beim Seitenaufruf hat sich dadurch etwa halbiert (von rund 1,5 MB auf unter 0,8 MB).
- **SEO:** Eigene Titel pro Seite, Canonical-URLs, `robots.txt`, Sitemap, Open-Graph-Tags und strukturierte Daten (JSON-LD).
- **Zweisprachig (DE/EN):** Deutsch ist direkt im Bundle enthalten und sofort sichtbar, Englisch wird bei Bedarf nachgeladen.

## Tech-Stack

| Bereich | Technologien |
|---|---|
| Framework | Angular 22 (Standalone Components, Zoneless, `@if`/`@for`) |
| Sprache & Styles | TypeScript 6, SCSS |
| Rendering | `@angular/ssr`, statisches Prerendering (`outputMode: "static"`), Client-Hydration |
| Mehrsprachigkeit | `@ngx-translate/core` 18 |
| Animationen | AOS (nachgeladen, respektiert „Bewegung reduzieren“) |
| Kontaktformular | Vercel Serverless Function (`api/sendMail.js`) mit Nodemailer |
| Build & Tests | `@angular/build` (esbuild), Karma + Jasmine |
| Hosting | Vercel (statische Auslieferung, Cache-Header über `vercel.json`) |

## Projekte im Portfolio

| Projekt | Bereich | Stack | Links |
|---|---|---|---|
| **Join** | Frontend | Angular, TypeScript, Firebase | [Live](https://join.bedirhan-soylu.de/) · [GitHub](https://github.com/BedirhanMehmetSoylu/Join) |
| **El Pollo Loco** | Frontend | JavaScript (OOP), HTML, CSS | [Live](https://elpolloloco.bedirhan-soylu.de/) · [GitHub](https://github.com/BedirhanMehmetSoylu/El-Pollo-Loco) |
| **Pokedex** | Frontend | JavaScript, REST-API | [Live](https://pokedex.bedirhan-soylu.de/) · [GitHub](https://github.com/BedirhanMehmetSoylu/Pokedex) |
| **Coderr** | Backend | Python, Django, REST | [Live](https://coderr.bedirhan-soylu.de/) · [GitHub](https://github.com/BedirhanMehmetSoylu/Coderr-Backend) |
| **Kanmind** | Backend | Python, Django, REST | [Live](https://kanmind.bedirhan-soylu.de/) · [GitHub](https://github.com/BedirhanMehmetSoylu/KanMind-Backend) |
| **Videoflix** | Backend | Python, Django, Redis | [Live](https://videoflix.bedirhan-soylu.de/) · [GitHub](https://github.com/BedirhanMehmetSoylu/Videoflix-Backend) |
| **Quizly** | Backend | Python, Django REST Framework, JWT, Whisper, Gemini API, yt-dlp | [Demo-Video](https://youtu.be/Y1HgYNzrFAg) · [GitHub](https://github.com/BedirhanMehmetSoylu/Quizly-Backend) |

## Projektstruktur

```
├── api/
│   └── sendMail.js            # Serverless Function für das Kontaktformular
├── src/
│   ├── app/
│   │   ├── home/              # Startseite, setzt die Sektionen zusammen
│   │   ├── hero/              # Einstieg mit Name und Kurzvorstellung
│   │   ├── about-me/          # Über mich
│   │   ├── my-skills/         # Skills (Frontend/Backend umschaltbar)
│   │   ├── portfolio/         # Projekte (Frontend/Backend umschaltbar)
│   │   ├── reviews/           # Referenzen
│   │   ├── contact/           # Kontaktformular
│   │   ├── navbar/ · mobile-menu/ · footer/
│   │   ├── legal-notice/      # Impressum (lazy geladen)
│   │   ├── privacy-policy/    # Datenschutzerklärung (lazy geladen)
│   │   ├── shared/            # NavigationService, Test-Hilfen
│   │   ├── app.config.ts          # Browser-Konfiguration (Zoneless, Hydration, i18n)
│   │   ├── app.config.server.ts   # Konfiguration fürs Prerendering
│   │   ├── app.routes.ts          # Routen inkl. Seitentitel und robots
│   │   └── app.routes.server.ts   # Render-Modus pro Route (Prerender)
│   ├── assets/                # Bilder (AVIF), Schriften, Übersetzungen (i18n)
│   ├── main.ts / main.server.ts
│   ├── robots.txt · sitemap.xml
│   └── index.html             # Meta-Tags, Open Graph, JSON-LD
├── vercel.json                # Cache-Header
└── .nvmrc                     # Node-Version
```

## Technische Entscheidungen

- **Statisches Prerendering statt Server-Rendering:** Die Inhalte ändern sich nur mit einem neuen Deployment. Deshalb wird beim Build gerendert. Es gibt keinen Node-Server zur Laufzeit, Vercel liefert nur statische Dateien aus.
- **Frontend/Backend-Umschalter mit `[hidden]` statt `@if`:** Beide Varianten stehen im vorgerenderten HTML, damit auch die Backend-Projekte für Suchmaschinen sichtbar sind. Die inaktive Variante ist versteckt und wird auch von Screenreadern nicht vorgelesen.
- **Deutsch im Bundle:** Verhindert eine Seite ohne Text, während die Übersetzungsdatei lädt, und ermöglicht deutsches Prerendering ohne HTTP-Request.
- **Browser-only-Code abgesichert:** `localStorage`, `IntersectionObserver` und AOS laufen nur im Browser (`isPlatformBrowser`, `afterNextRender`), damit das Prerendering im Build funktioniert.

## Lokal starten

**Voraussetzung:** Node.js ≥ 22.22.3. Mit [nvm](https://github.com/nvm-sh/nvm) wird die passende Version aus der `.nvmrc` gewählt.

```bash
git clone https://github.com/BedirhanMehmetSoylu/Portfolio.git
cd Portfolio

nvm use        # Node-Version aus .nvmrc
npm ci         # Abhängigkeiten exakt nach package-lock.json
npm start      # Dev-Server auf http://localhost:4200
```

| Befehl | Beschreibung |
|---|---|
| `npm start` | Dev-Server mit Live-Reload |
| `npm run build` | Production-Build inkl. Prerendering nach `dist/portfolio/browser/` |
| `npm test` | Unit-Tests mit Karma |
| `npx http-server dist/portfolio/browser` | Production-Build lokal ansehen |

> Das Kontaktformular funktioniert lokal nicht. Die Serverless Function läuft nur auf Vercel.

## Deployment

Jeder Push auf `main` wird automatisch auf Vercel gebaut und veröffentlicht. Für das Kontaktformular müssen in Vercel zwei Umgebungsvariablen gesetzt sein:

| Variable | Inhalt |
|---|---|
| `EMAIL_USER` | Gmail-Adresse, über die versendet wird und an die die Anfragen gehen |
| `EMAIL_APP_PASSWORD` | Gmail-App-Passwort (nicht das normale Konto-Passwort) |

## Kontakt

**Bedirhan Mehmet Soylu**
📧 bedirhanmehmetsoylu@gmail.com
💼 [LinkedIn](https://www.linkedin.com/in/bedirhan-soylu/)
🐙 [GitHub](https://github.com/BedirhanMehmetSoylu)
