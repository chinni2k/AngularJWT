import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlerService2_o } from 'src/app/main/utils/errorHandler/errorHandler-2.o/error-handler-2.o.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Authconstant } from './auth_constants/auth_constant';
import { IAuthService } from './auth_service_interface/IAuthService';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  http = inject(HttpClient);
  route = inject(Router);
  _errorHandler = inject(ErrorHandlerService2_o);
  baseUrl = environment.apiUrl;
  private payloadData: any;
  currentUser: any;
  constructor() {
    this.payloadData = this.decodedToken();
  }

  signUp(user: any) {
    const URL = this.baseUrl + Authconstant.REGISTER;
    return this.http.post<any>(URL, user).pipe(
      catchError((error) => {
        this._errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }

  login(user: any) {
    //debugger;
    const URL = this.baseUrl + Authconstant.LOGIN;
    return this.http.post<any>(URL, user).pipe(
      catchError((error) => {
        this._errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }

  //storing the token to local storage
  storeToken(tokenvalue: string) {
    return localStorage.setItem('token', tokenvalue);
  }

  //getting token from local storage when ever I need
  getToken() {
    return localStorage.getItem('token');
  }

  // return where the user is loggedin or not as boolean(T or F).
  //description if token is there means they logged in else not logged in.
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['auth/login']);
  }

  //gets expiry time and date from the Token
  //for token expiry it will send popup and sends the message and redirect to login page
  isTokenExpired(token: any): boolean {
    try {
      const decodedToken: any = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Using Math.floor for consistent integer comparison

      if (decodedToken.exp < currentTime) {
        Swal.fire({
          icon: 'warning',
          text: 'Your session has expired. Please log in again.',
        }).then(() => this.route.navigate(['auth', 'login']));
        return true;
      }

      return false; // Token is not expiredq
    } catch (error) {
      return true; // Token decoding or other error occurred
    }
  }


  //Decodes the Token 
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if (this.payloadData) {
      return this.payloadData.unique_name;
    }
  }

  getUserRoleFromToken() {
    if (this.payloadData) {
      return this.payloadData.role;
    }
  }

  // setCurrentUser(token: string) {
  //   const payload = JSON.parse(atob(token.split('.')[1]));
  //   this.currentUser.name = payload.name;
  // }

  // tokenExpiry(token: string):any {
  //   try {
  //     const decodedToken: any = jwt_decode(token);
  //     const currentTime = new Date().getTime() / 1000;
  //     if (decodedToken.exp < currentTime) {
  //       Swal.fire({
  //         icon: 'warning',
  //         text: 'Token is get Expired Please Login Again.',
  //       }).then(() => this.route.navigate(['auth/login']));
  //       return false;
  //     }
  //   } catch (error) {
  //     return true;
  //   }
  // }
}
