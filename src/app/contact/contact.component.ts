import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert("Bitte alle Pflichtfelder ausfüllen und Datenschutz bestätigen.");
      return;
    }

    const formData = {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
    };

    this.sendEmail(formData);
  }

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

}
