import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
    selector: 'app-contact',
    imports: [CommonModule, FormsModule, TranslatePipe, RouterModule],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss', './contact.component.responsive.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  protected readonly nav = inject(NavigationService);
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  submitted = false;
  success = false;
  sendError = false;

  contactData = {
    name: "",
    email: "",
    message: ""
  }

  mailTest = false;

  post = {
    endPoint: '/api/sendMail',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    this.submitted = true;
    this.sendError = false;

    // Ungültiges Formular: alle Felder als "touched" markieren,
    // damit die Fehlermeldungen sichtbar (und vorlesbar) werden
    if (ngForm.form.invalid) {
      ngForm.form.markAllAsTouched();
      return;
    }

    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.success = true;
            ngForm.resetForm();
            this.submitted = false;
            this.cdr.markForCheck();

            setTimeout(() => {
              this.success = false;
              this.cdr.markForCheck();
            }, 3000);
          },
          error: (error) => {
            console.error(error);
            this.sendError = true;
            this.cdr.markForCheck();
          },
          complete: () => console.info('The email was sent successfully!'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
    }
  }
}