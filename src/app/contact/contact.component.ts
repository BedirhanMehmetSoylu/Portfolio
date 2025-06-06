import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', './contact.component.responsive.scss']
})
export class ContactComponent {
  submitted = false;
  success = false;

  http = inject(HttpClient);

  contactData = {
    name: "",
    email: "",
    message: ""
  }

  mailTest = false;

  constructor(private router: Router) { }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  post = {
    endPoint: 'https://bedirhan-soylu.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.success = true;
            ngForm.resetForm();
            this.submitted = false;

            setTimeout(() => {
              this.success = false;
            }, 3000);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('The email was sent successfully!'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
    }
  }
}
