import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {UserRoutingModule} from '../../routing/user.routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '../../services/translate/translate.service';

import {ProfilePageComponent} from './profile-page/profile-page.component';
import {ProfilePersonalInfoComponent} from './profile-page/profile-personal-info/profile-personal-info.component';
import {ProfileDeliveryInfoComponent} from './profile-page/profile-delivery-info/profile-delivery-info.component';
import {ProfileHistoryComponent} from './profile-page/profile-history/profile-history.component';
import { DeliveryListingComponent } from './profile-page/profile-delivery-info/delivery-listing/delivery-listing.component';
import {DeliveryEditComponent} from './profile-page/profile-delivery-info/delivery-edit/delivery-edit.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfilePersonalInfoComponent,
    ProfileDeliveryInfoComponent,
    ProfileHistoryComponent,
    DeliveryListingComponent,
    DeliveryEditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MDBBootstrapModule.forRoot(),
    SharedModule
  ]
})
export class UserModule {

}
