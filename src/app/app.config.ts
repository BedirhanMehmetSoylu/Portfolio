import { ApplicationConfig, Injectable, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, withXhr } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
    provideRouter(routes),
    provideHttpClient(withXhr(), withInterceptorsFromDi()),

    // fallbackLang ersetzt das frühere setDefaultLang('de') in der Navbar
    provideTranslateService({
      loader: provideTranslateLoader(HybridTranslateLoader),
      fallbackLang: 'de',
    }),
  ]
};
