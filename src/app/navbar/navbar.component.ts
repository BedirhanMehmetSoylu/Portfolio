import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnDestroy, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, TranslateModule, MobileMenuComponent],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavbarComponent implements AfterViewInit, OnDestroy {
  protected readonly nav = inject(NavigationService);
  private readonly translate = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);

  currentLang: string = 'de';
  activeSection: string = '';
  isOpen = false;
  imageIndex = 0;
  imageSequence = [
    'assets/img/navbar/burger_1.png',
    'assets/img/navbar/burger_2.png',
    'assets/img/navbar/burger_3.png',
    'assets/img/navbar/burger_4.png'
  ];

  @ViewChild('burgerButton') private burgerButton?: ElementRef<HTMLButtonElement>;

  private animationIntervalId: ReturnType<typeof setInterval> | null = null;
  private sectionObserver: IntersectionObserver | null = null;

  private readonly observedSections = ['about', 'skills', 'portfolio', 'contact'];
  // Eine Sektion gilt als aktiv, sobald sie diese Linie (px von oben) kreuzt
  private readonly activeLineOffset = 150;

  get currentBurgerImage(): string {
    return this.imageSequence[this.imageIndex];
  }

  constructor() {
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('de');

    const savedLang = localStorage.getItem('lang');
    const langToUse = savedLang || 'de';
    this.currentLang = langToUse;
    this.translate.use(langToUse);
    document.documentElement.lang = langToUse;
  }

  ngAfterViewInit(): void {
    this.observeSections();
  }

  ngOnDestroy(): void {
    this.clearAnimationInterval();
    this.sectionObserver?.disconnect();
  }

  /**
   * Ersetzt den früheren Scroll-Listener, der bei jedem Scroll-Event alle Sektionen
   * ausgemessen hat. Der Beobachtungsbereich ist auf eine 1px-Linie bei
   * activeLineOffset geschrumpft – der Callback feuert nur, wenn eine Sektion sie kreuzt.
   * Auf Impressum/Datenschutz gibt es die Sektionen nicht; dann passiert nichts.
   */
  private observeSections(): void {
    this.sectionObserver?.disconnect();
    const bottomMargin = window.innerHeight - this.activeLineOffset - 1;
    this.sectionObserver = new IntersectionObserver(entries => {
      const active = entries.find(entry => entry.isIntersecting);
      if (active) {
        this.activeSection = active.target.id;
        this.cdr.markForCheck();
      }
    }, { rootMargin: `-${this.activeLineOffset}px 0px -${bottomMargin}px 0px` });

    for (const id of this.observedSections) {
      const el = document.getElementById(id);
      if (el) this.sectionObserver.observe(el);
    }
  }

  private clearAnimationInterval(): void {
    if (this.animationIntervalId !== null) {
      clearInterval(this.animationIntervalId);
      this.animationIntervalId = null;
    }
  }

  switchLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }

  toggleMenu(): void {
    if (!this.isOpen) {
      this.animateOpen();
      document.body.style.overflow = 'hidden';
    } else {
      this.animateClose();
      document.body.style.overflow = '';
    }
    this.isOpen = !this.isOpen;
  }

  animateOpen(): void {
    this.clearAnimationInterval();
    let step = 0;
    this.animationIntervalId = setInterval(() => {
      this.imageIndex = step;
      step++;
      if (step >= this.imageSequence.length) {
        this.clearAnimationInterval();
      }
      this.cdr.markForCheck();
    }, 50);
  }

  animateClose(): void {
    this.clearAnimationInterval();
    let step = this.imageSequence.length - 1;
    this.animationIntervalId = setInterval(() => {
      this.imageIndex = step;
      step--;
      if (step < 0) {
        this.clearAnimationInterval();
      }
      this.cdr.markForCheck();
    }, 50);
  }

  // Escape schließt das Mobile-Menü und gibt den Fokus an den Burger-Button zurück
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.toggleMenu();
      this.burgerButton?.nativeElement.focus();
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    // Linie hängt von der Fensterhöhe ab → Observer neu aufsetzen
    this.observeSections();
    if (window.innerWidth > 900 && this.isOpen) {
      this.isOpen = false;
      this.imageIndex = 0;
      document.body.style.overflow = '';
    }
  }
}