import { RouterModule, Routes } from '@angular/router';
import { AddHubComponent } from './components/add-hub/add-hub.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AddStateComponent } from './components/add-state/add-state.component';
import { LocationComponent } from './location.component';

export const routes: Routes = [
  {
    path: 'location',
    component: LocationComponent,
    data: { breadcrumb: 'location' },

    children: [
      { path: '', redirectTo: 'location', pathMatch: 'full' },
      {
        path: 'add-location',
        component: AddLocationComponent,
        data: { breadcrumb: '' },
      },
      {
        path: 'add-state',
        component: AddStateComponent,
        data: { breadcrumb: 'add-state' },
      },
      {
        path: 'add-hub',
        component: AddHubComponent,
        data: { breadcrumb: 'add-hub' },
      },
    ],
  },
];

export const LocationRouterRoutes = RouterModule.forChild(routes);
