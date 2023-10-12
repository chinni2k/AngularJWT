// import { Injectable } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';
// import Swal from 'sweetalert2';

// @Injectable({
//   providedIn: 'root',
// })
// export class ErrorHandlerService2_o {
//   constructor() {}

//   handleError(error: any): void {
//     let errorMessage = 'An error occurred';

//     if (error instanceof HttpErrorResponse) {
//       errorMessage = this.getHttpErrorMessage(error);
//     } else if (typeof error === 'string') {
//       errorMessage = error;
//     } else if (error && error.message) {
//       errorMessage = error.message;
//     }

//     this.showErrorMessage(errorMessage);
//     console.error('An error occurred:', error);
//   }

//   private getHttpErrorMessage(error: HttpErrorResponse): string {
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       return 'Client-side error occurred';
//     } else {
//       // Server-side error
//       if (error.status === 0) {
//         return 'Server unavailable';
//       } else if (error.status === 400) {
//         return 'Bad request';
//       } else if (error.status === 401) {
//         return 'Unauthorized';
//       } else if (error.status === 403) {
//         return 'Forbidden';
//       } else if (error.status === 404) {
//         return 'Resource not found';
//       } else if (error.status === 500) {
//         return 'Internal server error';
//       } else {
//         return 'An error occurred';
//       }
//     }
//   }

//   private showErrorMessage(message: string): void {
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: message,
//       timer: 5000,
//       timerProgressBar: true,
//       showConfirmButton: false,
//     });
//   }
// }
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

//Better Way of error Handler for both Client Side and ServerSide
export class ErrorHandlerService2_o {
  _router = inject(Router);
  constructor() {}

  public handleError(error: any): void {
    let errorMessage = 'An error occurred';

    if (error instanceof HttpErrorResponse) {
      errorMessage = this.getHttpErrorMessage(error);
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && error.message) {
      errorMessage = error.message;
    }
    this.showErrorMessage(errorMessage);
    console.error('An error occurred:', error);
  }

  private getHttpErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return 'An error occurred on the client side';
    } else {
      // Server-side error
      if (error.status === 0) {
        return 'Server unavailable';
      } else if (error.status === 400) {
        return 'Bad request';
      } else if (error.status === 401) {
        return 'Unauthorized';
      } else if (error.status === 403) {
        return 'Forbidden';
      } else if (error.status === 404) {
        return 'Resource not found';
      } else if (error.status === 500) {
        // Try to extract the server error message if available
        const serverErrorMessage = this.getServerErrorMessage(error);
        return serverErrorMessage || 'Internal server error';
      } else {
        return 'An error occurred';
      }
    }
  }

  private getServerErrorMessage(error: HttpErrorResponse): string | null {
    if (
      error.error &&
      typeof error.error === 'object' &&
      'message' in error.error
    ) {
      return error.error.message;
    }
    return null;
  }

  private showErrorMessage(message: string): void {
    Swal.fire({
      icon: 'error',
      titleText: message,
      text: `An Error Occured Please do Login`,
      //text: message,
      //timer: 5000,
      timerProgressBar: true,
      showConfirmButton: true,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      showCloseButton: true,
      confirmButtonColor: '#1783aa',
      confirmButtonText: 'Okay',
    }).then(() => this._router.navigate(['auth/login']));
  }
}
