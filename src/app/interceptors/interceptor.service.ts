import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const headers = new HttpHeaders({
      'x-token': this.token
    })

    const reqClon = req.clone({
      headers
    });
    
    return next.handle( reqClon )
      .pipe(
        catchError ( this.manejarError )
      );

  }


  manejarError( error:HttpErrorResponse ){
    return throwError('Error: '+error);
  }

}
