import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MenuRoutingModule} from '../../routing/menu.routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';

// COMPONENTS
import {MenuPageComponent} from './menu-page/menu-page.component';
import {AppetizersPageComponent} from './menu-page/appetizers-page/appetizers-page.component';
import {DessertsPageComponent} from './menu-page/desserts-page/desserts-page.component';
import {FriedRiceAndNoodlesPageComponent} from './menu-page/fried-rice-and-noodles-page/fried-rice-and-noodles-page.component';
import {MainDishesWithRicePageComponent} from './menu-page/main-dishes-with-rice-page/main-dishes-with-rice-page.component';
import {SoupsPageComponent} from './menu-page/soups-page/soups-page.component';
import {ListingComponent} from './listing/listing.component';
import {ListingItemComponent} from './listing/listing-item/listing-item.component';
import {HttpLoaderFactory} from '../../services/translate/translate.service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    MenuPageComponent,
    AppetizersPageComponent,
    DessertsPageComponent,
    FriedRiceAndNoodlesPageComponent,
    MainDishesWithRicePageComponent,
    SoupsPageComponent,
    ListingComponent,
    ListingItemComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    MenuRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    MDBBootstrapModule.forRoot(),
    NgSelectModule
  ]
})
export class MenuModule {

}
