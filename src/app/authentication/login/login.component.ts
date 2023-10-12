import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidator } from 'src/app/helpers/formValidator';
import Swal from 'sweetalert2';
import { AuthService } from '../auth_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  _authService = inject(AuthService);
  _router = inject(Router);
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // if (this._authService.isLoggedIn()) {
    //   Swal.fire({
    //     icon:'error',
    //     text:'If you want to go to login page. Please do Logout.!'
    //   })
    //   this._router.navigate(['main/dashboard']);
    // }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  /**-------------------------this is first one that Created first--------------------------------*/
  onSubmit() {
    //debugger;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const login = this.loginForm.value;
      this._authService.login(login).subscribe({
        next: (data) => {
          console.log(data.message);
          this.loginForm.reset();
          this._authService.storeToken(data.token);

          if (this._authService.isLoggedIn()) {
            this._router.navigate(['/main/dashboard']).then(()=>Swal.fire({
              icon: 'success',
              text: `${data.message}`,
              confirmButtonColor: '#1783aa',
            }));
          }         
        },
        error: (error) => {
          console.log(error.error.message);
          Swal.fire({
            icon: 'error',
            text: `${error.error.message}`,
            confirmButtonColor: '#1783aa',
          });
        },
      });
    } else {
      FormValidator.validateAllFormsFields(this.loginForm);
      Swal.fire({
        icon: 'error',
        text: 'Please enter the Details',
        confirmButtonColor: '#1783aa',
      });
    }
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     console.log(this.loginForm.value);
  //     const login = this.loginForm.value;
  //     this._authService.login(login).subscribe({
  //       next: (data) => {
  //         console.log(data.message);
  //         this.loginForm.reset();
  //         Swal.fire({
  //           icon: 'success',
  //           text: `${data.message}`,
  //         });
  //         this._router.navigate(['/main/dashboard']);
  //       },
  //       error: (error) => {
  //         console.log(error.error.message);

  //         Swal.fire({
  //           icon: 'error',
  //           html: `<div style="text-align: left">${this.formatErrorMessages(
  //             error.error.message
  //           )}</div>`,
  //         });
  //       },
  //     });
  //   } else {
  //     FormValidator.validateAllFormsFields(this.loginForm);
  //     Swal.fire({
  //       icon: 'error',
  //       text: 'Please enter the Details',
  //     });
  //   }
  // }

  // private formatErrorMessages(messages: string[]): string {
  //   const formattedMessages = messages.map((msg) => `- ${msg}`).join('<br>');
  //   return `Errors:<br>${formattedMessages}`;
  // }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     console.log(this.loginForm.value);
  //     const login = this.loginForm.value;
  //     this._authService.login(login).subscribe({
  //       next: (data) => {
  //         console.log(data.message);
  //         this.loginForm.reset();
  //         Swal.fire({
  //           icon: 'success',
  //           text: `${data.message}`,
  //         });
  //         this._router.navigate(['/main/dashboard'])
  //       },
  //       error: (error) => {
  //         console.log(error.error.message);

  //         Swal.fire({
  //           icon: 'error',
  //           html: `<div class="error-messages">${this.formatErrorMessages(error.error.message)}</div>`,
  //         });
  //       },
  //     });
  //   } else {
  //     FormValidator.validateAllFormsFields(this.loginForm);
  //     Swal.fire({
  //       icon: 'error',
  //       text: 'Please enter the Details',
  //     });
  //   }
  // }

  // private formatErrorMessages(messages: string[]): string {
  //   const formattedMessages = messages.map(msg => `- ${msg}`).join('\n');
  //   return `Errors:\n${formattedMessages}`;
  // }
}
