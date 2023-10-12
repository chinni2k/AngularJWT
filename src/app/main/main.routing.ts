import { Injectable, NgModule } from '@angular/core';
import {
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from '@angular/router';
import { authGuard } from '../authentication/guards/auth.guard';
//import { LocationComponent } from './components/Location/Location.component';
import { AboutUsComponent } from './components/aboutUs/aboutUs.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        canActivate: [authGuard],
        data: {
          breadcrumb: 'dashboard',
        },
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'about',
        component: AboutUsComponent,
        title: 'About',
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact',
      },
      {
        path: '',
        loadChildren: () =>
          import('../main/components/location/location.module').then(
            (m) => m.LocationModule
          ),
      },

      {
        path: '**',
        redirectTo: 'Dashboard',
      },
    ],
  },
];

//Angular v15 features from dynamic page title.
@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  override updateTitle(snapshot: RouterStateSnapshot) {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      document.title = `RMS - ${title}`;
    } else {
      document.title = `RMS - Home`;
    }
  }
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
  ],
})
export class MainRoutes {}
