import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/authentication/auth_services/auth.service';
import { ErrorHandlerService2_o } from '../errorHandler/errorHandler-2.o/error-handler-2.o.service';

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  token = inject(AuthService);
 
  myToken = this.token.getToken();
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
       
    // Add more headers here if needed
  });

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService2_o
  ) {}

  create(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data, { headers: this.defaultHeaders }).pipe(
      catchError((error) => {
        this.errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }

  read(url: string): Observable<T[]> {
    return this.http.get<T[]>(url, { headers: this.defaultHeaders }).pipe(
      catchError((error) => {
        this.errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }

  update(url: string, data: T): Observable<T> {
    return this.http.put<T>(url, data, { headers: this.defaultHeaders }).pipe(
      catchError((error) => {
        this.errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }

  delete(url: string): Observable<void> {
    return this.http.delete<void>(url, { headers: this.defaultHeaders }).pipe(
      catchError((error) => {
        this.errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }
}
