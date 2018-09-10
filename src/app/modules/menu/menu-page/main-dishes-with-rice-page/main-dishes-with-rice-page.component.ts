import {Component, OnInit} from '@angular/core';

import {menuTypes} from '../../../../config/menu-types.config';
import {MenuService} from '../../../../services/menu/menu.service';

@Component({
  selector: 'app-main-dishes-with-rice-page',
  templateUrl: './main-dishes-with-rice-page.component.html',
  styleUrls: ['./main-dishes-with-rice-page.component.scss']
})
export class MainDishesWithRicePageComponent implements OnInit {

  public variant: String;
  public mainDishesWithRice: any[];

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {

    this.menuService.getMenuItems(this.menuService.categories.MAIN_DISHES_WITH_RICE)
      .subscribe(result => {
        this.mainDishesWithRice = result;
      });

    this.variant = menuTypes.MAIN_DISHES_WITH_RICE;

  }

}
