import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../authentication/auth_services/auth.service';
import { UserStoreService } from '../authentication/auth_services/user-store.service';
import { TokenInterceptor } from '../authentication/interceptor/token.interceptor';

import { MatTabsModule } from '@angular/material/tabs';
//import { LocationComponent } from './components/Location/Location.component';
import { CustomBreadcrumbsService } from 'src/utils/custom-breadcrumbs.service';
import { AboutUsComponent } from './components/aboutUs/aboutUs.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home.component';
import { PagenotFoundComponent } from './components/pagenotFound/pagenotFound.component';
import { UserslistComponent } from './components/userslist/userslist.component';
import { MainComponent } from './main.component';
import { MainRoutes } from './main.routing';
import { MainEmployeeService } from './services/main-employee.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainRoutes,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    //LocationModule
  ],
  declarations: [
    MainComponent,
    DashboardComponent,
    AboutUsComponent,
    ContactComponent,
    HomeComponent,
    PagenotFoundComponent,
    UserslistComponent,
    //LocationComponent,
  ],
  providers: [
    AuthService,
    MainEmployeeService,
    UserStoreService,
    CustomBreadcrumbsService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class MainModule {}
