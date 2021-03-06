import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {OrderRoutingModule} from '../../routing/order.routing.module';
import {FormsModule} from '@angular/forms';

import {CartPageComponent} from './cart-page/cart-page.component';
import {CartComponent} from './cart-page/cart/cart.component';
import {SummaryPageComponent} from './summary-page/summary-page.component';
import {SummaryComponent} from './summary-page/summary/summary.component';
import {HttpLoaderFactory} from '../../services/translate/translate.service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {SharedModule} from '../shared/shared.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {SnotifyModule} from 'ng-snotify';


@NgModule({
  declarations: [
    CartPageComponent,
    CartComponent,
    SummaryPageComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrderRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MDBBootstrapModule.forRoot(),
    SharedModule,
    NgSelectModule,
    SnotifyModule
  ]
})
export class OrderModule {

}
