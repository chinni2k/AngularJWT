import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Assuming you're using Angular Material Snackbar
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: any): void {
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
      return 'Client-side error occurred';
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
        return 'Internal server error';
      } else {
        return 'An error occurred';
      }
    }
  }

  private showErrorMessage(message: string): void {
    // this.snackBar.open(message, 'Close', {
    //   duration: 5000, // Display the snackbar for 5 seconds
    // });
    Swal.fire({
      icon: 'error',
      title: 'error',
      text: `${message}`,
      timer: 5000,
    });
  }
}
