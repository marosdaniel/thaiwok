import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '../../app.module';

import {SignupPageComponent} from './signup-page/signup-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    SignupPageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class AuthModule {

}
