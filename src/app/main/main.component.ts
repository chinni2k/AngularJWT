import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomBreadcrumbsService } from 'src/utils/custom-breadcrumbs.service';
import { AuthService } from '../authentication/auth_services/auth.service';
import { NameService } from '../authentication/auth_services/name.service';
import { UserStoreService } from '../authentication/auth_services/user-store.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  _router = inject(Router);
  _authService = inject(AuthService);
  //_intercept = inject(TokenInterceptor);
  scrolled: boolean = false;
  fullName!: string;

  _storeService = inject(UserStoreService);
  _nameService = inject(NameService);

  _activatedRoute = inject(ActivatedRoute);
  _breadCrumsService = inject(CustomBreadcrumbsService);

  constructor() {}

  ngOnInit() {
    //debugger;
    // if (this._authService.isLoggedIn()) {
    //   this._router.navigate(['main/dashboard']);
    // }
    // const Token = localStorage.getItem('token');
    // if (this._authService.isTokenExpired(Token)) {
    //   return true;
    // } else {
    //   return false;
    // }
    // if (this._authService.isLoggedIn()) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Warning',
    //     text: 'If you want to login page Please do Logout',
    //   }).then(() => {
    //     this._router.navigate(['main/dashboard']);
    //   });
    // }
    // if (this._authService.isLoggedIn()) {
    // }

    
  }
}
