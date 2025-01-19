import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from './../services/responsive.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  isMobile: boolean = false;

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    this.responsiveService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;      
    });
  }
}
