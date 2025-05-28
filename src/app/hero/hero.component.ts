import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss', './hero.component.responsive.scss']
})
export class HeroComponent {
  iamHeight: string = 'auto';
  buttonFontSize: string = '16px';

  constructor(public translate: TranslateService) {
    this.loadButtonFontSize();

    // Sprache wechseln
    this.translate.onLangChange.subscribe(() => {
      this.loadButtonFontSize();
    });
  }

  loadButtonFontSize() {
    this.translate.get('HERO.LETS_TALK_FONT_SIZE').subscribe((size: string) => {
      this.buttonFontSize = size || '16px';
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }
}
