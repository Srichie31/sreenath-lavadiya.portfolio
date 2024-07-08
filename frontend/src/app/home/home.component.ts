import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  faInstagram,
  faFacebook,
  faXTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import * as anime from 'animejs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  logos: any = {
    instagram: faInstagram,
    fb: faFacebook,
    twitter: faXTwitter,
    linkedIn: faLinkedin,
  };
  constructor() {}

  ngOnInit(): void {}
}
