import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private jwtAuth: JwtHelperService,
    private router: Router,
    private tokenService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Verificar si la solicitud es para la ruta de login
    if (req.url.includes('/login')) {
      return next.handle(req);
    }

    const modReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return next.handle(modReq).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            if (localStorage.getItem('token')) {
              if (this.jwtAuth.isTokenExpired(localStorage.getItem('token'))) {
                localStorage.clear();
                this.router.navigate(['/login']);
              }
            } else {
              alert('Credenciales invalidas');
            }
            break;
          default:
            alert('En el momento no podemos procesar la solicitud');
        }
        return throwError(error.error);
      })
    );
  }
}
