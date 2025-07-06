import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ResponsiveService } from './../services/responsive.service';

import { faEnvelope, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faFacebook,
  faXTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit {
  isMobile: boolean = false;
  
  constructor(private fb: FormBuilder,private responsiveService: ResponsiveService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      body: ['', [Validators.required]],
    });
  }
  contactForm: any;
  logos: any = {
    instagram: faInstagram,
    fb: faFacebook,
    twitter: faXTwitter,
    linkedIn: faLinkedin,
  };
  ngOnInit(): void {
    this.responsiveService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  phone = faPhone;
  mail = faEnvelope;
  send = faPaperPlane
  onSubmit() {
    console.log(this.contactForm.value);
    let mailToLink = `mailto:sreenath.ab11@gmail.com?subject=${this.contactForm.value.subject}&body=${this.contactForm.value.body}`
    window.location.href = mailToLink
  }
}
