import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

declare const google:any;

let base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuario!: Usuario;


  constructor(private http:HttpClient, 
              private router:Router,
              private ngzone:NgZone) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }


  guardarLocalStorage( token: string, menu: any ) {

    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );

  }
            

  logout(){
    const email = localStorage.getItem('email')|| '';
    if(!email){
      localStorage.removeItem('menu');
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
      return 
    }
    google.accounts.id.revoke(email, ()=>{
      this.ngzone.run(()=>{
        localStorage.removeItem('menu');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.router.navigateByUrl('/login');
      })
    })
   

  }

  login( formData:LoginForm ){
    return this.http.post(`${base_url}/login`,formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('email',resp.email)
          this.guardarLocalStorage( resp.token, resp.menu );
        })
      );
  }

  loginGoogle( token:string ){
    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap( (resp: any) => {
        console.log(resp);
        
        localStorage.setItem('email',resp.email)
        this.guardarLocalStorage( resp.token, resp.menu );
      })
    );
  }

 

}
