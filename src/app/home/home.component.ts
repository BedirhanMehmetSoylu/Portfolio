import { afterNextRender, ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { ContactComponent } from '../contact/contact.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-home',
    imports: [HeroComponent, AboutMeComponent, MySkillsComponent, PortfolioComponent, ReviewsComponent, ContactComponent, NavbarComponent, FooterComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {
  constructor() {
    // Nur im Browser und erst nach dem ersten Rendern: AOS greift auf window/document zu.
    // Der dynamische Import lädt AOS als eigenen Chunk – es ist nicht mehr Teil des Start-Bundles.
    afterNextRender(() => {
      import('aos').then(({ default: AOS }) => AOS.init({
        duration: 1000,
        once: true,
        // Bei "Bewegung reduzieren" im Betriebssystem keine Einblend-Animationen
        disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      }));
    });
  }
}
