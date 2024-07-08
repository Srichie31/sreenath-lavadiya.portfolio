import { Component } from '@angular/core';
import {faEnvelope,faPhone} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  phone = faPhone
  mail = faEnvelope

}
