import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../services/auth/auth.guard';

import {ProfilePageComponent} from '../modules/user/profile-page/profile-page.component';
import {ProfilePersonalInfoComponent} from '../modules/user/profile-page/profile-personal-info/profile-personal-info.component';
import {ProfileDeliveryInfoComponent} from '../modules/user/profile-page/profile-delivery-info/profile-delivery-info.component';
import {ProfileHistoryComponent} from '../modules/user/profile-page/profile-history/profile-history.component';

const userRoutes: Routes = [
  {
    path: '', component: ProfilePageComponent, canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '/personal-info', pathMatch: 'full'},
      {path: 'personal-info', component: ProfilePersonalInfoComponent, canActivate: [AuthGuard]},
      {path: 'delivery-info', component: ProfileDeliveryInfoComponent, canActivate: [AuthGuard]},
      {path: 'previous-orders', component: ProfileHistoryComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {

}
