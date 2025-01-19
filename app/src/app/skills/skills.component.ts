import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import {
  faAngular,
  faPython,
  faJava,
  faJs,
  faHtml5,
  faCss3,
  faSass,
  faBootstrap,
  faNodeJs,
  faAws,
  faAndroid,
  faGithub
  
} from '@fortawesome/free-brands-svg-icons';
import skills from '../../assets/data/skills.json';
import { ResponsiveService } from './../services/responsive.service';


@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SkillsComponent implements OnInit {
  isMobile: boolean = false;

  constructor(private responsiveService: ResponsiveService) {}
  icon = faGithub;
  sBtn : any = 'a'
  icons:any = {
    angular: faAngular,
    python: faPython,
    java: faJava,
    js: faJs,
    html : faHtml5,
    css : faCss3,
    sass : faSass,
    bootstrap : faBootstrap,
    node : faNodeJs,
    git:faGithub
  };
  skills: any = skills;
  allSkills: any = [];
  obj: any;
  iconKeys : any = Object.keys(this.icons)


  ngOnInit(): void {
    this.allSkills = skills;
    console.log(this.allSkills);
    this.responsiveService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
  filter(str: any) {
    this.sBtn = str
    if (str === 'a') {
      this.allSkills = skills;
    } else {
      this.allSkills = skills.filter((obj) => obj.type == str);
    }
  }
}
