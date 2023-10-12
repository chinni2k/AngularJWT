import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../errorHandler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    // Add more headers here if needed
  });

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
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
