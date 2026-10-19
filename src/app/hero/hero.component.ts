import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
    selector: 'app-hero',
    imports: [TranslatePipe],
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.scss', './hero.component.responsive.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  protected readonly nav = inject(NavigationService);
  public readonly translate = inject(TranslateService);
}