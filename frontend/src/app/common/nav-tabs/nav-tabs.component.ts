import { Component , OnInit } from '@angular/core';
import { ResponsiveService } from './../../services/responsive.service';


@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrl: './nav-tabs.component.scss'
})
export class NavTabsComponent implements OnInit {
  isMobile: boolean = false;
  showDropDown = false;

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    this.responsiveService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;      
    });
  }
  toggleDD(){
    this.showDropDown = !this.showDropDown;
    console.log(this.showDropDown);
    
  }
}
