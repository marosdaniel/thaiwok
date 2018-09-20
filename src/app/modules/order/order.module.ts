import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '../../services/translate/translate.service';
import {OrderRoutingModule} from '../../routing/order.routing.module';
import {FormsModule} from '@angular/forms';

import {CartPageComponent} from './cart-page/cart-page.component';
import {CartComponent} from './cart-page/cart/cart.component';
import {SummaryPageComponent} from './summary-page/summary-page.component';
import {SummaryComponent} from './summary-page/summary/summary.component';


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
    })
  ]
})
export class OrderModule {

}
