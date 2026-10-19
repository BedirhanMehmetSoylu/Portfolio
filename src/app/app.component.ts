import { ChangeDetectionStrategy, Component, inject, DOCUMENT, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta } from '@angular/platform-browser';
import { RouterOutlet, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';

const SITE_URL = 'https://www.bedirhan-soylu.de';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'portfolio';

  private readonly router = inject(Router);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe((event: NavigationEnd) => {
      const tree = this.router.parseUrl(event.urlAfterRedirects);
      if (this.isBrowser && !tree.fragment) {
        window.scrollTo(0, 0);
      }
      // Läuft bewusst auch beim Vorrendern: so steht pro Route das richtige
      // robots/Canonical schon im ausgelieferten HTML
      this.updateSeoTags(event.urlAfterRedirects);
    });
  }

  /**
   * Hält robots, Canonical-URL und og:url passend zur aktuellen Route.
   * Ohne das hätten Impressum/Datenschutz die Canonical-URL der Startseite
   * aus index.html – Google würde sie als Duplikat der Startseite werten.
   */
  private updateSeoTags(url: string): void {
    const path = url.split(/[?#]/)[0];
    const pageUrl = SITE_URL + path;

    this.meta.updateTag({ name: 'robots', content: this.deepestRouteData(this.router.routerState.snapshot.root)['robots'] ?? 'index, follow' });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl);
  }

  private deepestRouteData(route: ActivatedRouteSnapshot): Record<string, string> {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data;
  }
}
