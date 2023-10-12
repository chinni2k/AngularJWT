import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth_services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private _route: Router) {}

  router = inject(Router);
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myToken = this._authService.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }, // "Bearer "+myToken
      });
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (
            error.status === 401 ||
            this._authService.isTokenExpired(localStorage.getItem('token'))
          ) {
            Swal.fire({
              icon: 'warning',
              title: 'token gets expired',
              text: 'Token is expired.Please Do login again Iam from interceptor',
            }).then(() => this.router.navigate(['auth/login']));
          }
        }
        return throwError(() => error);
      })
    );
  }
}
