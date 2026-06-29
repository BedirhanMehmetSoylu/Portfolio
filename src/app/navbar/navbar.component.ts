import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, MobileMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavbarComponent implements OnDestroy {
  protected readonly nav = inject(NavigationService);
  private readonly translate = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);

  currentLang: string = 'en';
  activeSection: string = '';
  isOpen = false;
  imageIndex = 0;
  imageSequence = [
    'assets/img/navbar/burger_1.png',
    'assets/img/navbar/burger_2.png',
    'assets/img/navbar/burger_3.png',
    'assets/img/navbar/burger_4.png'
  ];

  private animationIntervalId: ReturnType<typeof setInterval> | null = null;

  get currentBurgerImage(): string {
    return this.imageSequence[this.imageIndex];
  }

  constructor() {
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('lang');
    const langToUse = savedLang || 'en';
    this.currentLang = langToUse;
    this.translate.use(langToUse);
  }

  ngOnDestroy(): void {
    this.clearAnimationInterval();
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['about', 'skills', 'portfolio', 'contact'];
    for (let section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom > 150) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth > 900 && this.isOpen) {
      this.isOpen = false;
      this.imageIndex = 0;
      document.body.style.overflow = '';
    }
  }
}