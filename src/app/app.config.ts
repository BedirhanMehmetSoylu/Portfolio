import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, withXhr } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, of } from 'rxjs';
import de from '../assets/i18n/de.json';

/**
 * Deutsch (Standardsprache) ist direkt im Bundle enthalten und steht sofort bereit –
 * ohne zusätzlichen HTTP-Request, in dem die Seite sonst ohne Text dasteht.
 * Englisch wird weiterhin erst bei Bedarf per HTTP nachgeladen.
 */
export class HybridTranslateLoader implements TranslateLoader {
  private readonly httpLoader: TranslateHttpLoader;

  constructor(http: HttpClient) {
    this.httpLoader = new TranslateHttpLoader(http, 'assets/i18n/', '.json');
  }

  getTranslation(lang: string): Observable<object> {
    return lang === 'de' ? of(de) : this.httpLoader.getTranslation(lang);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new HybridTranslateLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withXhr(), withInterceptorsFromDi()),

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        }
      })
    )
  ]
};
