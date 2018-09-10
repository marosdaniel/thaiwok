import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundPageComponent} from '../modules/common/not-found-page/not-found-page.component';
import {HomePageComponent} from '../modules/common/home-page/home-page.component';
import {MenuPageComponent} from '../modules/menu/menu-page/menu-page.component';
import {AboutUsPageComponent} from '../modules/common/about-us-page/about-us-page.component';
import {ContactPageComponent} from '../modules/common/contact-page/contact-page.component';
import {DeliveryAndPaymentPageComponent} from '../modules/common/delivery-and-payment-page/delivery-and-payment-page.component';
import {LoginPageComponent} from '../modules/auth/login-page/login-page.component';
import {SignupPageComponent} from '../modules/auth/signup-page/signup-page.component';
import {ProfilePageComponent} from '../modules/user/profile-page/profile-page.component';
import {AuthGuard} from '../services/auth/auth.guard';
import {AppetizersPageComponent} from '../modules/menu/menu-page/appetizers-page/appetizers-page.component';
import {SoupsPageComponent} from '../modules/menu/menu-page/soups-page/soups-page.component';
import {FriedRiceAndNoodlesPageComponent} from '../modules/menu/menu-page/fried-rice-and-noodles-page/fried-rice-and-noodles-page.component';
import {MainDishesWithRicePageComponent} from '../modules/menu/menu-page/main-dishes-with-rice-page/main-dishes-with-rice-page.component';
import {DessertsPageComponent} from '../modules/menu/menu-page/desserts-page/desserts-page.component';
import {ProfilePersonalInfoComponent} from '../modules/user/profile-page/profile-personal-info/profile-personal-info.component';
import {ProfileDeliveryInfoComponent} from '../modules/user/profile-page/profile-delivery-info/profile-delivery-info.component';
import {ProfileHistoryComponent} from '../modules/user/profile-page/profile-history/profile-history.component';
import {CartComponent} from '../modules/order/cart-page/cart/cart.component';
import {SummaryComponent} from '../modules/order/summary-page/summary/summary.component';
import {CartPageComponent} from '../modules/order/cart-page/cart-page.component';
import {SummaryPageComponent} from '../modules/order/summary-page/summary-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'menu', component: MenuPageComponent,
    children: [
      {path: '', redirectTo: '/menu/appetizers', pathMatch: 'full'},
      {path: 'appetizers', component: AppetizersPageComponent},
      {path: 'soups', component: SoupsPageComponent},
      {path: 'fried-rice-and-noodles', component: FriedRiceAndNoodlesPageComponent},
      {path: 'main-dishes-with-rice', component: MainDishesWithRicePageComponent},
      {path: 'desserts', component: DessertsPageComponent}
    ]
  },
  {path: 'aboutus', component: AboutUsPageComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'delivery', component: DeliveryAndPaymentPageComponent},
  {path: 'payment', component: DeliveryAndPaymentPageComponent},
  {path: 'delivery-and-payment', component: DeliveryAndPaymentPageComponent},
  {path: 'payment', component: DeliveryAndPaymentPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '/profile/personal-info', pathMatch: 'full'},
      {path: 'personal-info', component: ProfilePersonalInfoComponent, canActivate: [AuthGuard]},
      {path: 'delivery-info', component: ProfileDeliveryInfoComponent, canActivate: [AuthGuard]},
      {path: 'previous-orders', component: ProfileHistoryComponent, canActivate: [AuthGuard]}
    ]},
  {path: 'cart', component: CartPageComponent},
  {path: 'order-summary', component: SummaryPageComponent},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}

// export const routingComponents = [ NotFoundPageComponent, ... ];
