import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-about-me',
    imports: [TranslateModule],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMeComponent {

}
