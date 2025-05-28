import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  iamHeight: string = 'auto';
  buttonFontSize: string = '16px';

  constructor(public translate: TranslateService) {
    this.loadTranslationHeight();
    this.loadButtonFontSize();

    // Sprache wechseln = Höhe neu laden
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslationHeight();
      this.loadButtonFontSize();
    });
  }

  loadTranslationHeight() {
    this.translate.get('HERO.IAM_HEIGHT').subscribe((height: string) => {
      this.iamHeight = height || 'auto';
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
