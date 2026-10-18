import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MobileMenuComponent implements AfterViewInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input() currentLang: string = 'en';
  @Input() activeSection: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() switchLangEvent = new EventEmitter<string>();

  // Menü wird per @if neu erzeugt: Fokus direkt auf den ersten Link setzen,
  // damit Tastatur- und Screenreader-Nutzer im geöffneten Menü landen
  ngAfterViewInit(): void {
    this.host.nativeElement.querySelector('a')?.focus();
  }

  switchLang(lang: string): void {
    this.switchLangEvent.emit(lang);
  }

  closeMenu(): void {
    this.close.emit();
  }
}