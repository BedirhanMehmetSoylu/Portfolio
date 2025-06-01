import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, MobileMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
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

  get currentBurgerImage(): string {
    return this.imageSequence[this.imageIndex];
  }

  constructor(private router: Router, private translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('lang');
    const langToUse = savedLang || 'en';
    this.currentLang = langToUse;
    translate.use(langToUse);
  }

  switchLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  goHome() {
    this.router.navigate(['/']);
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
    let step = 0;
    const interval = setInterval(() => {
      this.imageIndex = step;
      step++;
      if (step >= this.imageSequence.length) {
        clearInterval(interval);
      }
    }, 50);
  }

  animateClose(): void {
    let step = this.imageSequence.length - 1;
    const interval = setInterval(() => {
      this.imageIndex = step;
      step--;
      if (step < 0) {
        clearInterval(interval);
      }
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
