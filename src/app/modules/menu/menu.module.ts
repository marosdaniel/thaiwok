import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MenuRoutingModule} from '../../routing/menu.routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';
import {HttpClient} from '@angular/common/http';
import {MaterializeModule} from 'angular2-materialize';
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
    MenuRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MaterializeModule,
    SharedModule
  ]
})
export class MenuModule {

}
