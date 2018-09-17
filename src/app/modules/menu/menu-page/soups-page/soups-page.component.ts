import {Component, OnInit} from '@angular/core';

import {menuTypes} from '../../../../config/menu-types.config';
import {MenuService} from '../../../../services/menu/menu.service';

@Component({
  selector: 'app-soups-page',
  templateUrl: './soups-page.component.html',
  styleUrls: ['./soups-page.component.scss']
})
export class SoupsPageComponent implements OnInit {

  public variant: String;
  public soups: any[];
  public isLoading = true;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {

    this.menuService.getMenuItems(this.menuService.categories.SOUPS)
      .subscribe(result => {
        this.soups = result;
        this.isLoading = false;
      });

    this.variant = menuTypes.SOUPS;

  }

}
