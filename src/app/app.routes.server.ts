import { RenderMode, ServerRoute } from '@angular/ssr';

// Alle Routen werden beim Build als fertiges HTML erzeugt (SSG).
// Es gibt keinen Server zur Laufzeit – Vercel liefert nur statische Dateien aus.
export const serverRoutes: ServerRoute[] = [
  { path: '**', renderMode: RenderMode.Prerender },
];
