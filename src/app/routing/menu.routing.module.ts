import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MenuPageComponent} from '../modules/menu/menu-page/menu-page.component';
import {AppetizersPageComponent} from '../modules/menu/menu-page/appetizers-page/appetizers-page.component';
import {SoupsPageComponent} from '../modules/menu/menu-page/soups-page/soups-page.component';
import {FriedRiceAndNoodlesPageComponent} from '../modules/menu/menu-page/fried-rice-and-noodles-page/fried-rice-and-noodles-page.component';
import {MainDishesWithRicePageComponent} from '../modules/menu/menu-page/main-dishes-with-rice-page/main-dishes-with-rice-page.component';
import {DessertsPageComponent} from '../modules/menu/menu-page/desserts-page/desserts-page.component';

const menuRoutes: Routes = [
  {path: '', component: MenuPageComponent,
    children: [
      {path: '', redirectTo: '/appetizers', pathMatch: 'full'},
      {path: 'appetizers', component: AppetizersPageComponent},
      {path: 'soups', component: SoupsPageComponent},
      {path: 'fried-rice-and-noodles', component: FriedRiceAndNoodlesPageComponent},
      {path: 'main-dishes-with-rice', component: MainDishesWithRicePageComponent},
      {path: 'desserts', component: DessertsPageComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(menuRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MenuRoutingModule {

}
