import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(private loginService:LoginService) { }

  logout(){
    this.loginService.logout();
  }

}
