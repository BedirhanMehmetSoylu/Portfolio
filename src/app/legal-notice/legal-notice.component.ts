import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-legal-notice',
    imports: [NavbarComponent, FooterComponent, TranslatePipe],
    templateUrl: './legal-notice.component.html',
    styleUrls: ['./legal-notice.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalNoticeComponent {

}