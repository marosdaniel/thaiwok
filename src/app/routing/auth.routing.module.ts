import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {LoginPageComponent} from '../modules/auth/login-page/login-page.component';
import {SignupPageComponent} from '../modules/auth/signup-page/signup-page.component';

const authRoutes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
