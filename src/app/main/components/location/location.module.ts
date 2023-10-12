import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AddHubComponent } from './components/add-hub/add-hub.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AddStateComponent } from './components/add-state/add-state.component';
import { LocationRouterRoutes } from './location-router.routing';
import { LocationComponent } from './location.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    LocationRouterRoutes,
    MatTabsModule,
  ],
  declarations: [
    LocationComponent,
    AddLocationComponent,
    AddStateComponent,
    AddHubComponent,
  ],
  // exports: [LocationComponent, AddLocationComponent, AddStateComponent],
})
export class LocationModule {}
