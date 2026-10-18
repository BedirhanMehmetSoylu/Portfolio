import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// "title" setzt der Router automatisch als Browser-Tab-Titel.
// data.robots wird in AppComponent als <meta name="robots"> übernommen:
// Impressum und Datenschutz sollen nicht in den Suchergebnissen erscheinen.
//
// Impressum und Datenschutz werden erst beim Aufruf geladen (eigener Chunk),
// damit sie das Start-Bundle der Startseite nicht vergrößern
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Bedirhan Soylu | Junior Fullstack Entwickler (Angular, Python/Django)',
  },
  {
    path: 'legal-notice',
    loadComponent: () => import('./legal-notice/legal-notice.component').then(m => m.LegalNoticeComponent),
    title: 'Impressum | Bedirhan Soylu',
    data: { robots: 'noindex, follow' },
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    title: 'Datenschutzerklärung | Bedirhan Soylu',
    data: { robots: 'noindex, follow' },
  },
  { path: '**', redirectTo: '' },
];
