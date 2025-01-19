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
import { ResponsiveService } from './../services/responsive.service';


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
  isMobile: boolean = false;

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    

    this.responsiveService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
