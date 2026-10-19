import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
    selector: 'app-portfolio',
    imports: [TranslateModule],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent {
  protected readonly nav = inject(NavigationService);

  selectedCategory: 'frontend' | 'backend' = 'frontend';

  selectCategory(category: 'frontend' | 'backend') {
    this.selectedCategory = category;
  }
}