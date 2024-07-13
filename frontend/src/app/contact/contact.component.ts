import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faEnvelope, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import tt from '@tomtom-international/web-sdk-maps';
import {
  faInstagram,
  faFacebook,
  faXTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit {
  constructor(private fb: FormBuilder) {
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
    const map = tt.map({
      key: 'RX9bBILnKFxeOhR8qruAdRXSaTYUSEix',
      container: 'map',
      center: [77.647701, 12.841785],
      zoom: 14,
      style:
        'https://api.tomtom.com/style/1/style/20.4.5-*/?map=basic_night&poi=poi_main',
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    createMarker([77.647701, 12.841785]);
    function createMarker(position: any) {
      // add marker to map
      new tt.Marker().setLngLat(position).addTo(map);
    }
  }

  phone = faPhone;
  mail = faEnvelope;
  send = faPaperPlane
  // "mailto:email@address.com?subject=Hello world&body=Line one%0DLine two"
  onSubmit() {
    console.log(this.contactForm.value);
    let mailToLink = `mailto:sreenath.ab11@gmail.com?subject=${this.contactForm.value.subject}&body=${this.contactForm.value.body}`
    window.location.href = mailToLink
  }
}
