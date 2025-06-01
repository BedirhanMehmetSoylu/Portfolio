import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
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

  mailTest = true;

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // onSubmit(form: NgForm) {
  //   this.submitted = true;

  //   console.log(this.submitted);

  //   if (form.invalid || !form.value.privacy) {
  //     return;
  //   }

  //   const formData = {
  //     name: form.value.name,
  //     email: form.value.email,
  //     message: form.value.message,
  //   };

  //   this.sendEmail(formData);

  //   this.submitted = false;
  // }

  sendEmail(formData: any) {
    const serviceID = 'service_53udtyv';
    const templateID = 'template_t0lar7o';
    const userID = 'L2X7IfJE1sjU3NQOw';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then(() => {
        alert('Nachricht wurde erfolgreich gesendet!');
      }, (error) => {
        console.error('E-Mail Fehler:', error);
        alert('Beim Senden der Nachricht ist ein Fehler aufgetreten.');
      });
  }

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
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
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      this.success = true;
      console.log(this.contactData);
      ngForm.resetForm();
      this.submitted = false;

      setTimeout(() => {
        this.success = false;
      }, 3000);
    }
  }

}
