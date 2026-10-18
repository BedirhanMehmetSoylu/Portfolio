import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-about-me',
    imports: [CommonModule, TranslateModule],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMeComponent {

}
