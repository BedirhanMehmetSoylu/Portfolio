# Bedirhan Soylu — Portfolio

Persönliches Portfolio als Fullstack-Webanwendung, gebaut mit Angular. Präsentiert Skills, Projekte (Frontend & Backend) und einen Kontaktweg.

**🔗 Live:** [bedirhan-soylu.de](https://www.bedirhan-soylu.de) <!-- ggf. Domain anpassen -->

<!-- 📸 Screenshot / GIF der Startseite hier einfügen -->

## Über das Projekt

Ich bin Junior Fullstack Entwickler mit Fokus auf Angular im Frontend und Python/Django im Backend. Dieses Portfolio dient als zentrale Anlaufstelle für meine Projekte und Bewerbungsunterlagen und zeigt gleichzeitig, wie ich eine produktionsnahe Angular-Anwendung strukturiere.

## Features

- 🌍 Mehrsprachig (DE/EN) via `@ngx-translate`
- 📱 Vollständig responsive (Mobile-first)
- ⚡ Standalone Components (Angular 17), OnPush Change Detection
- ✉️ Kontaktformular mit E-Mail-Versand
- 📄 Impressum & Datenschutzerklärung (DSGVO-konform)
- 🎬 Scroll-Animationen mit AOS

## Tech-Stack

| Bereich       | Technologien |
|---------------|--------------|
| Frontend      | Angular 17, TypeScript, SCSS |
| UI/Animation  | Angular Material (Dialog), AOS |
| i18n          | @ngx-translate/core |
| Kontaktformular | PHP (`sendMail.php`) |

## Projektstruktur

```
src/app/
├── hero/            # Startbereich mit Kurzvorstellung
├── about-me/         # Über mich
├── my-skills/        # Skills-Übersicht
├── portfolio/         # Projektübersicht (Frontend/Backend Filter)
├── reviews/          # Referenzen/Testimonials
├── contact/          # Kontaktformular
├── navbar / mobile-menu / footer
├── legal-notice/      # Impressum
└── privacy-policy/    # Datenschutzerklärung
```

## Lokal starten

Voraussetzung: Node.js (empfohlen: aktuelle LTS-Version) und Angular CLI.

```bash
# Repository klonen
git clone https://github.com/BedirhanMehmetSoylu/Portfolio.git
cd Portfolio

# Abhängigkeiten installieren
npm install

# Dev-Server starten
ng serve
```

Die Anwendung läuft danach unter `http://localhost:4200/`.

### Build

```bash
ng build
```

Die Build-Artefakte liegen anschließend im `dist/`-Verzeichnis.

## Kontakt

**Bedirhan Mehmet Soylu**
📧 bedirhanmehmetsoylu@gmail.com
💼 [LinkedIn](https://www.linkedin.com/in/bedirhan-soylu-65b703367/)
🐙 [GitHub](https://github.com/BedirhanMehmetSoylu)
