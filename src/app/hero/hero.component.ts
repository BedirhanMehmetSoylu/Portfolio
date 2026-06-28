import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss', './hero.component.responsive.scss']
})
export class HeroComponent {
  protected readonly nav = inject(NavigationService);
  public readonly translate = inject(TranslateService);

  buttonFontSize: string = '16px';

  constructor() {
    this.loadButtonFontSize();
    this.translate.onLangChange.subscribe(() => this.loadButtonFontSize());
  }

  loadButtonFontSize() {
    this.translate.get('HERO.LETS_TALK_FONT_SIZE').subscribe((size: string) => {
      this.buttonFontSize = size || '16px';
    });
  }
}
