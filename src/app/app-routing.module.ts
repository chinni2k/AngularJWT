import { Injectable, NgModule } from '@angular/core';
import {
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from '@angular/router';
import { authGuard } from './authentication/guards/auth.guard';
import { PagenotFoundComponent } from './main/components/pagenotFound/pagenotFound.component';

const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () =>import('./authentication/auth.module').then((m) => m.AuthModule),
  // },
  // {
  //   path: 'main',
  //   loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  // },

  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/auth.module').then((m) => m.AuthModule),
    title: 'auth',
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    title: 'main',
    canActivateChild: [authGuard],
  },
  {
    path: '**',
    component: PagenotFoundComponent,
    title: 'Page Not Found',
  },
];
@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  override updateTitle(snapshot: RouterStateSnapshot) {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      document.title = `RMS | ${title}`;
    } else {
      document.title = `RMS`;
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
  ],
})
export class AppRoutingModule {}
