import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss', './hero.component.responsive.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  protected readonly nav = inject(NavigationService);
  public readonly translate = inject(TranslateService);
}