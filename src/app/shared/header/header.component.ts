import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService,
               private router: Router,
               private loginService:LoginService ) {
    this.usuario = usuarioService.usuario;
    
  }

  logout() {
    this.loginService.logout();
  }

  buscar( termino: string ) {

    if ( termino.length === 0  ) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

}
