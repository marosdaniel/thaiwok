import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from '../modules/common/home-page/home-page.component';
import {AboutUsPageComponent} from '../modules/common/about-us-page/about-us-page.component';
import {ContactPageComponent} from '../modules/common/contact-page/contact-page.component';
import {DeliveryAndPaymentPageComponent} from '../modules/common/delivery-and-payment-page/delivery-and-payment-page.component';

const commonRoutes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'aboutus', component: AboutUsPageComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'delivery', component: DeliveryAndPaymentPageComponent},
  {path: 'payment', component: DeliveryAndPaymentPageComponent},
  {path: 'delivery-and-payment', component: DeliveryAndPaymentPageComponent},
  {path: 'payment', component: DeliveryAndPaymentPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(commonRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OwnCommonRoutingModule {

}
