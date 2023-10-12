import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import { AuthService } from './auth_services/auth.service';
import { UserStoreService } from './auth_services/user-store.service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes,
    ReactiveFormsModule,  
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent,
    
  ],
  providers: [
    AuthService,
    UserStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  
})
export class AuthModule {}
