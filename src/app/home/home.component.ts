import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { ContactComponent } from '../contact/contact.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, AboutMeComponent, MySkillsComponent, PortfolioComponent, ReviewsComponent, ContactComponent, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
}
