import { ChangeDetectionStrategy, Component, inject, DOCUMENT } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterOutlet, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';

const SITE_URL = 'https://www.bedirhan-soylu.de';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'portfolio';

  private readonly router = inject(Router);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe((event: NavigationEnd) => {
      const tree = this.router.parseUrl(event.urlAfterRedirects);
      if (!tree.fragment) {
        window.scrollTo(0, 0);
      }
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
