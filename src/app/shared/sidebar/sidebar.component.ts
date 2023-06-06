import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';


import { Usuario } from '../../models/usuario.model';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;

  constructor( public sidebarService: SidebarService,
               private usuarioService: UsuarioService,
               ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
