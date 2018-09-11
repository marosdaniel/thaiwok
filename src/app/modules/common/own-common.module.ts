import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';
import {HttpClient} from '@angular/common/http';
import {MaterializeModule} from 'angular2-materialize';

import {AboutUsPageComponent} from './about-us-page/about-us-page.component';
import {ContactPageComponent} from './contact-page/contact-page.component';
import {OpenHoursComponent} from './contact-page/open-hours/open-hours.component';
import {DeliveryAndPaymentPageComponent} from './delivery-and-payment-page/delivery-and-payment-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {CarouselComponent} from './home-page/carousel/carousel.component';
import {ParallaxComponent} from './home-page/parallax/parallax.component';
import {OwnCommonRoutingModule} from '../../routing/own-common.routing.module';

@NgModule({
  declarations: [
    AboutUsPageComponent,
    ContactPageComponent,
    OpenHoursComponent,
    DeliveryAndPaymentPageComponent,
    HomePageComponent,
    CarouselComponent,
    ParallaxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OwnCommonRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MaterializeModule
  ]
})
export class OwnCommonModule {

}