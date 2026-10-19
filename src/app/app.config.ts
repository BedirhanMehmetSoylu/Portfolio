import { ApplicationConfig, Injectable, inject, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { TranslateLoader, TranslationObject, provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import de from '../assets/i18n/de.json';

/**
 * Deutsch (Standardsprache) ist direkt im Bundle enthalten und steht sofort bereit –
 * ohne zusätzlichen HTTP-Request, in dem die Seite sonst ohne Text dasteht.
 * Englisch wird erst bei Bedarf per HTTP nachgeladen.
 */
@Injectable()
export class HybridTranslateLoader implements TranslateLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string): Observable<TranslationObject> {
    return lang === 'de' ? of(de) : this.http.get<TranslationObject>(`assets/i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Ohne zone.js: Angular aktualisiert nur, wenn ein Event, ein Signal oder markForCheck()
    // eine Änderung meldet. Alle Komponenten sind OnPush und dafür bereits vorbereitet.
    provideZonelessChangeDetection(),
    provideRouter(routes),
    // Seit Angular 22 nutzt HttpClient standardmäßig fetch – passend fürs Vorrendern
    provideHttpClient(),
    // Übernimmt das vorgerenderte HTML, statt es neu zu zeichnen; Klicks während
    // des Ladens werden nach dem Start nachgeholt (Event Replay)
    provideClientHydration(withEventReplay()),

    // fallbackLang ersetzt das frühere setDefaultLang('de') in der Navbar
    provideTranslateService({
      loader: provideTranslateLoader(HybridTranslateLoader),
      fallbackLang: 'de',
    }),
  ]
};
