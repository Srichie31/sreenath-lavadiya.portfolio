import { Component,OnInit } from '@angular/core';
import { ResponsiveService } from './../services/responsive.service';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  standalone: false,
  styleUrl: './work.component.scss'
})
export class WorkComponent implements OnInit {
  isMobile: boolean = false;

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    this.responsiveService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
  openProject(link:any){
    window.location.href = link
  }

}


