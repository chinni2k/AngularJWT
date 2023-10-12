import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/auth_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'RMS';
  private justLoggedIn = false; // Flag to track login status

  router = inject(Router);
  authService = inject(AuthService);
  constructor() {
    const Token = this.authService.getToken();
    this.authService.isTokenExpired(Token);
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      // Swal.fire({
      //   icon: 'warning',
      //   title: 'Warning',
      //   text: 'If you want to login page Please do Logout',
      // }).then(() => {
      this.router.navigate(['main/dashboard']);
    }

    //});
    // } else if (location.pathname === 'auth/login') {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Warning',
    //     text: 'If you want to login page Please do Logout',
    //   });
    // }
    //this.unl  oadNotification(eventValue:any);
  }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   $event.returnValue = true;
  //   Swal.fire({
  //     icon: 'warning',
  //     title: 'Are you sure you want to leave ?',
  //     text: 'If you want to go Login page. Please do logout',
  //     showCancelButton: true,
  //   });
  // }

  // async checkToke    nAndHandle() {
  //   const token = 'your-token-here'; // Replace with the actual token
  //   try {
  //     const isExpired = await this.authService.isTokenExpired(token);
  //     if (isExpired) {
  //       this.handleExpiredToken();
  //     } else {
  //       this.handleValidToken();
  //     }
  //   } catch (error) {
  //     console.error('Error checking token:', error);
  //     // Handle error appropriately, e.g., show a message to the user
  //   }
  // }
  // handleValidToken() {}
  // handleExpiredToken() {
  //   // const Token = localStorage.getItem('token');
  //   // this.authService.isTokenExpired(Token);
  //   this.authService.logout();
  // }
}
