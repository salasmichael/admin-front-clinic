import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { tap,map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { CargarUsuario } from 'src/app/interfaces/cargar-usuarios.interface';

const base_url =  environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor( private http: HttpClient ) { }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role || 'USER_ROLE';
  }

  get uid():string {
    return this.usuario.uid || '';
  }
  
  guardarLocalStorage( token: string, menu: any ) {

    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );

  }
    

  crearUsuario( formData:RegisterForm ){
   return this.http.post(`${base_url}/usuarios`,formData)
      .pipe(
        tap( (resp: any) => {
          this.guardarLocalStorage( resp.token, resp.menu );
        })
      )
  }

  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {
    data = {
      ...data,
      role: this.usuario.role!
    }

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data );

  }

  cargarUsuarios( desde: number = 0 ) {

    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url )
      .pipe(
        map( resp => {
          const usuarios = resp.usuarios.map( 
            user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )  
          );
          return {
            total: resp.total,
            usuarios
          };
        })
      )
  }


  eliminarUsuario( usuario: Usuario ) {    
      const url = `${ base_url }/usuarios/${ usuario.uid }`;
      return this.http.delete( url );
  }

  guardarUsuario( usuario: Usuario ) {

    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario );

  }

  validarToken(): Observable<boolean> {
    
    return this.http.get(`${ base_url }/login/renew`).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
        
        this.guardarLocalStorage( resp.token, resp.menu );

        return true;
      }),
      catchError( error => of(false) )
    );

  }





}
