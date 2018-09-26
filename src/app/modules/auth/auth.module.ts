import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from '../../routing/auth.routing.module';

import {SignupPageComponent} from './signup-page/signup-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {HttpLoaderFactory} from '../../services/translate/translate.service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    SignupPageComponent,
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MDBBootstrapModule.forRoot(),

  ],
  exports: [
  ]
})
export class AuthModule {

}
