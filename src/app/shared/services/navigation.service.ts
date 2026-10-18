import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Centralizes navigation and scrolling logic that was previously duplicated
 * across multiple components (hero, navbar, my-skills, footer, contact,
 * and portfolio).
 */
@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly router = inject(Router);

  /**
   * Smoothly scrolls to a section on the current page.
   * Respects the OS setting "reduce motion" by jumping instantly instead.
   * Does nothing if the target element is not yet present in the DOM.
   */
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  /**
   * Logo click behavior:
   * - If already on the home page, scrolls smoothly to the hero section.
   * - Otherwise navigates to the home route.
   *
   * This replaces the previous duplicated click bindings
   * (scrollToSection + goHome logic).
   */
  goHome(): void {
    if (this.router.url === '/') {
      this.scrollToSection('hero');
    } else {
      this.router.navigate(['/']);
    }
  }
}
