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
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {UserIdleModule} from 'angular-user-idle';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// COMPONENTS
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// MODULES
import {AuthModule} from './modules/auth/auth.module';
import {MenuModule} from './modules/menu/menu.module';
import {OrderModule} from './modules/order/order.module';
import {UserModule} from './modules/user/user.module';
import {OwnCommonModule} from './modules/common/own-common.module';
import {SharedModule} from './modules/shared/shared.module';

// PAGES
import {NotFoundPageComponent} from './modules/common/not-found-page/not-found-page.component';

// SERVICES
import {FirebaseService} from './services/firebase/firebase.service';
import {AuthService} from './services/auth/auth.service';
import {AuthGuard} from './services/auth/auth.guard';
import {LanguageService} from './services/language/language.service';
import {CartService} from './services/cart/cart.service';
import {CommonService} from './services/common/common.service';
import {StorageService} from './services/storage/storage.service';
import {OpenHoursService} from './services/open-hours/open-hours.service';
import {HttpLoaderFactory} from './services/translate/translate.service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

// PIPES
import { FilterPipe } from './pipes/filter.pipe';
// import { SortPipe } from './pipes/sort.pipe';

// NGX BOOTSTRAP MODULES


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainComponent,
    HeaderComponent,
    NavbarComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    HttpClientModule,
    FormsModule,
    NgbModule,

    // OWN MODULES
    AuthModule,
    // MenuModule,  // it will be lazy loaded
    OrderModule,
    // UserModule,  // it will be lazy loaded
    OwnCommonModule,
    SharedModule,

    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),

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


    // MAIN ROUTING SETTINGS FOR LAST ROUTER-CHECK
    AppRoutingModule

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
    OpenHoursService,
    HttpLoaderFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private static HttpLoaderFactory: any;
}
