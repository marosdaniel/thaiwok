import {Component, OnInit} from '@angular/core';

import {menuTypes} from '../../../../config/menu-types.config';
import {MenuService} from '../../../../services/menu/menu.service';

@Component({
  selector: 'app-appetizers-page',
  templateUrl: './appetizers-page.component.html',
  styleUrls: ['./appetizers-page.component.scss']
})
export class AppetizersPageComponent implements OnInit {
  public variant: String;
  public appetizers: any[];
  public isLoading = true;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.getMenuItems(this.menuService.categories.APPETIZERS)
      .subscribe(result => {
        this.appetizers = result;
        this.isLoading = false;
      });
    this.variant = menuTypes.APPETIZERS;
  }

}
