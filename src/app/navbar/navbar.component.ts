import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  currentLang: string = 'en';

  constructor(private translate: TranslateService) {
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
}
