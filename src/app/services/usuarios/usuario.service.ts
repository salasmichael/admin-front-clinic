import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

const base_url =  environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) { }

  crearUsuario( formData:RegisterForm ){
   return this.http.post(`${base_url}/usuarios`,formData)
      .pipe(
        tap( (res:any ) =>{
            localStorage.setItem('token', res.token);
        })
      )
  }


}
