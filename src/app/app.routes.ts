import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Impressum und Datenschutz werden erst beim Aufruf geladen (eigener Chunk),
// damit sie das Start-Bundle der Startseite nicht vergrößern
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'legal-notice',
    loadComponent: () => import('./legal-notice/legal-notice.component').then(m => m.LegalNoticeComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
  },
  { path: '**', redirectTo: '' },
];
