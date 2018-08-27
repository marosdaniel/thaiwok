import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundPageComponent} from '../pages/not-found-page/not-found-page.component';
import {HomePageComponent} from '../pages/home-page/home-page.component';
import {MenuPageComponent} from '../pages/menu-page/menu-page.component';
import {AboutUsPageComponent} from '../pages/about-us-page/about-us-page.component';
import {ContactPageComponent} from '../pages/contact-page/contact-page.component';
import {DeliveryAndPaymentPageComponent} from '../pages/delivery-and-payment-page/delivery-and-payment-page.component';
import {LoginPageComponent} from '../pages/login-page/login-page.component';
import {SignupPageComponent} from '../pages/signup-page/signup-page.component';
import {ProfilePageComponent} from '../pages/profile-page/profile-page.component';
import {AuthGuard} from '../services/auth/auth.guard';
import {AppetizersPageComponent} from '../pages/menu-page/appetizers-page/appetizers-page.component';
import {SoupsPageComponent} from '../pages/menu-page/soups-page/soups-page.component';
import {FriedRiceAndNoodlesPageComponent} from '../pages/menu-page/fried-rice-and-noodles-page/fried-rice-and-noodles-page.component';
import {MainDishesWithRicePageComponent} from '../pages/menu-page/main-dishes-with-rice-page/main-dishes-with-rice-page.component';
import {DessertsPageComponent} from '../pages/menu-page/desserts-page/desserts-page.component';
import {ProfilePersonalInfoComponent} from '../components/profile-personal-info/profile-personal-info.component';
import {ProfileDeliveryInfoComponent} from '../components/profile-delivery-info/profile-delivery-info.component';
import {ProfileHistoryComponent} from '../components/profile-history/profile-history.component';
import {CartComponent} from '../components/cart/cart.component';
import {SummaryComponent} from '../components/summary/summary.component';
import {CartPageComponent} from '../pages/cart-page/cart-page.component';
import {SummaryPageComponent} from '../pages/summary-page/summary-page.component';


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
