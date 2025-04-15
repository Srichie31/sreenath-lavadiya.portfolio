import { Component,OnInit } from '@angular/core';
import { ResponsiveService } from './../services/responsive.service';
import projects from '../../assets/data/projects.json'



@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  standalone: false,
  styleUrl: './work.component.scss'
})
export class WorkComponent implements OnInit {
  isMobile: boolean = false;
  projects:any = projects

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    console.log(projects);
    
    this.responsiveService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
  openProject(link:any){
    window.location.href = link
  }

}


