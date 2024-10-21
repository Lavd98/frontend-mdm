import { Component } from '@angular/core';
import { LoginData } from '../../interfaces/login.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  loginData: LoginData = JSON.parse(localStorage.getItem('user') || '{}');

  constructor() {}


}
