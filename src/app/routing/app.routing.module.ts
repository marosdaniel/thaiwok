import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from '../modules/common/not-found-page/not-found-page.component';
import {HomePageComponent} from '../modules/common/home-page/home-page.component';
import {AboutUsPageComponent} from '../modules/common/about-us-page/about-us-page.component';
import {ContactPageComponent} from '../modules/common/contact-page/contact-page.component';
import {DeliveryAndPaymentPageComponent} from '../modules/common/delivery-and-payment-page/delivery-and-payment-page.component';
import {ProfilePageComponent} from '../modules/user/profile-page/profile-page.component';
import {AuthGuard} from '../services/auth/auth.guard';
import {ProfilePersonalInfoComponent} from '../modules/user/profile-page/profile-personal-info/profile-personal-info.component';
import {ProfileDeliveryInfoComponent} from '../modules/user/profile-page/profile-delivery-info/profile-delivery-info.component';
import {ProfileHistoryComponent} from '../modules/user/profile-page/profile-history/profile-history.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'aboutus', component: AboutUsPageComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'delivery', component: DeliveryAndPaymentPageComponent},
  {path: 'payment', component: DeliveryAndPaymentPageComponent},
  {path: 'delivery-and-payment', component: DeliveryAndPaymentPageComponent},
  {path: 'payment', component: DeliveryAndPaymentPageComponent},
  {
    path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '/profile/personal-info', pathMatch: 'full'},
      {path: 'personal-info', component: ProfilePersonalInfoComponent, canActivate: [AuthGuard]},
      {path: 'delivery-info', component: ProfileDeliveryInfoComponent, canActivate: [AuthGuard]},
      {path: 'previous-orders', component: ProfileHistoryComponent, canActivate: [AuthGuard]}
    ]
  },

  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
