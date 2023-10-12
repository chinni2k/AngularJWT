import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidator } from 'src/app/helpers/formValidator';
import Swal from 'sweetalert2';
import { AuthService } from '../auth_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm!: FormGroup;

  _authService = inject(AuthService);
  _router = inject(Router);
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      const login = this.signUpForm.value;
      this._authService.signUp(login).subscribe({
        next: (data) => {
          this.signUpForm.reset();
          console.log(data.message);

          Swal.fire({
            icon: 'success',
            text: `${data.message}`,
            confirmButtonColor: '#1783aa',
          });
          this._router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.log(error.error.message);

          Swal.fire({
            icon: 'error',
            text: `${error?.error.message}`,
            confirmButtonColor: '#1783aa',
          });
        },
      });
    } else {
      FormValidator.validateAllFormsFields(this.signUpForm);
      Swal.fire({
        icon: 'error',
        text: 'Please enter the Details',
        confirmButtonColor: '#1783aa',
      });
    }
  }
}
