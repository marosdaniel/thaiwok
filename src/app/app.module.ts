import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './routing/app.routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterializeModule } from 'angular2-materialize';
import {UserIdleModule} from 'angular-user-idle';
import {AgmCoreModule} from '@agm/core';
import {apiKey} from '../environments/google.apikey';

// _
// | |
// ___ ___  _ __ ___  _ __   ___  _ __   ___ _ __ | |_ ___
// / __/ _ \| '_ ` _ \| '_ \ / _ \| '_ \ / _ \ '_ \| __/ __|
// | (_| (_) | | | | | | |_) | (_) | | | |  __/ | | | |_\__ \
// \___\___/|_| |_| |_| .__/ \___/|_| |_|\___|_| |_|\__|___/
// | |
// |_|

import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import {NotFoundPageComponent} from './modules/common/not-found-page/not-found-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './modules/common/home-page/carousel/carousel.component';
import { ListingComponent } from './modules/menu/listing/listing.component';
import { ListingItemComponent } from './modules/menu/listing/listing-item/listing-item.component';
import { ProfilePersonalInfoComponent } from './modules/user/profile-page/profile-personal-info/profile-personal-info.component';
import { ProfileDeliveryInfoComponent } from './modules/user/profile-page/profile-delivery-info/profile-delivery-info.component';
import { ProfileHistoryComponent } from './modules/user/profile-page/profile-history/profile-history.component';
import { CartComponent } from './modules/order/cart-page/cart/cart.component';
import { SummaryComponent } from './modules/order/summary-page/summary/summary.component';
import { ParallaxComponent } from './modules/common/home-page/parallax/parallax.component';
import { MapComponent } from './modules/common/contact-page/map/map.component';
import { OpenHoursComponent } from './modules/common/contact-page/open-hours/open-hours.component';


// MODULES
import {AuthModule} from './modules/auth/auth.module';




// PAGES

import { AboutUsPageComponent } from './modules/common/about-us-page/about-us-page.component';
import { ContactPageComponent } from './modules/common/contact-page/contact-page.component';
import { DeliveryAndPaymentPageComponent } from './modules/common/delivery-and-payment-page/delivery-and-payment-page.component';
import { HomePageComponent } from './modules/common/home-page/home-page.component';
import { MenuPageComponent } from './modules/menu/menu-page/menu-page.component';
import { ProfilePageComponent } from './modules/user/profile-page/profile-page.component';
import { AppetizersPageComponent } from './modules/menu/menu-page/appetizers-page/appetizers-page.component';
import { SoupsPageComponent } from './modules/menu/menu-page/soups-page/soups-page.component';
import { FriedRiceAndNoodlesPageComponent } from './modules/menu/menu-page/fried-rice-and-noodles-page/fried-rice-and-noodles-page.component';
import { MainDishesWithRicePageComponent } from './modules/menu/menu-page/main-dishes-with-rice-page/main-dishes-with-rice-page.component';
import { DessertsPageComponent } from './modules/menu/menu-page/desserts-page/desserts-page.component';
import { CartPageComponent } from './modules/order/cart-page/cart-page.component';
import { SummaryPageComponent } from './modules/order/summary-page/summary-page.component';




// SERVICES

import {FirebaseService} from './services/firebase/firebase.service';
import {AuthService} from './services/auth/auth.service';
import {AuthGuard} from './services/auth/auth.guard';
import {LanguageService} from './services/language/language.service';
import {CartService} from './services/cart/cart.service';
import {CommonService} from './services/common/common.service';
import {StorageService} from './services/storage/storage.service';
import {OpenHoursService} from './services/open-hours/open-hours.service';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainComponent,
    HeaderComponent,
    NotFoundPageComponent,
    NavbarComponent,
    CarouselComponent,
    AboutUsPageComponent,
    ContactPageComponent,
    DeliveryAndPaymentPageComponent,
    HomePageComponent,
    MenuPageComponent,
    ProfilePageComponent,
    AppetizersPageComponent,
    SoupsPageComponent,
    FriedRiceAndNoodlesPageComponent,
    MainDishesWithRicePageComponent,
    DessertsPageComponent,
    ListingComponent,
    ListingItemComponent,
    ProfilePersonalInfoComponent,
    ProfileDeliveryInfoComponent,
    ProfileHistoryComponent,
    CartComponent,
    SummaryComponent,
    CartPageComponent,
    ParallaxComponent,
    SummaryPageComponent,
    MapComponent,
    OpenHoursComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    HttpClientModule,
    FormsModule,
    MaterializeModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey} ),

    // Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
    // Default values: `idle` is 600 (10 minutes), `timeout` is 600 (10 minutes)
    // and `ping` is 120 (2 minutes).
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    UserIdleModule.forRoot({idle: 6, timeout: 600, ping: 12}), // initialized in app.component


    AuthModule // own modules,
  ],
  providers: [
    FirebaseService,
    LanguageService,
    AuthService,
    CartService,
    AuthGuard,
    CommonService,
    StorageService,
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy},
    OpenHoursService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private static HttpLoaderFactory: any;
}
