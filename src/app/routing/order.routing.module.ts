import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {CartPageComponent} from '../modules/order/cart-page/cart-page.component';
import {SummaryPageComponent} from '../modules/order/summary-page/summary-page.component';

const orderRoutes: Routes = [
  {path: 'cart', component: CartPageComponent},
  {path: 'order-summary', component: SummaryPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(orderRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule {

}
