import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})

export class MobileMenuComponent {
  @Input() currentLang: string = 'en';
  @Input() activeSection: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() switchLangEvent = new EventEmitter<string>();

  switchLang(lang: string): void {
    this.switchLangEvent.emit(lang);
  }

  closeMenu(): void {
    this.close.emit();
  }
}
