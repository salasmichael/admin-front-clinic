import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private loginService:LoginService,
                private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

    return this.loginService.validarToken()
      .pipe(
        tap( estaAutenticado =>{
          if( !estaAutenticado ){
            this.router.navigateByUrl('/login');
          }
        })
      )


  }
  
}
