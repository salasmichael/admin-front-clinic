import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { environment } from 'src/environments/environment';
import { tap,map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google:any;

let base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, 
              private router:Router,
              private ngzone:NgZone) { }

  logout(){
    const email=localStorage.getItem('email')|| '';

    google.accounts.id.revoke(email, ()=>{
      this.ngzone.run(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.router.navigateByUrl('/login');
      })
    })
   

  }

  login( formData:LoginForm ){
    return this.http.post(`${base_url}/login`,formData)
              .pipe(
                tap( (res:any ) =>{
                    localStorage.setItem('token', res.token);
                })
              )
  }

  loginGoogle( token:string ){
    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap( (res:any ) =>{
          localStorage.setItem('token', res.token);
          localStorage.setItem('email',res.email)

      })
    )
  }

  validarToken():Observable<boolean> {
   const token =  localStorage.getItem('token') || '';

   return this.http.get(`${ base_url }/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap( (res:any ) =>{
          localStorage.setItem('token', res.token);
      }),
      map( res => true),
      catchError( error => of(false) )
    )
  }

 

}
