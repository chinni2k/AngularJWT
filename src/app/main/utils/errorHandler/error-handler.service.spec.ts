import { Injectable } from '@angular/core';
//import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    // Swal.fire({
    //   icon: 'error',
    //   text: `${error.message} Iam from Error handling service`,
    //   showCancelButton: true,
    //   confirmButtonColor: '#1783aa',
    //   showCloseButton:true
    // });

    //this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
  }
}
