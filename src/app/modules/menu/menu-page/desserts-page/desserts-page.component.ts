import { Component, OnInit } from '@angular/core';

import { menuTypes } from '../../../../config/menu-types.config';
import {MenuService} from '../../../../services/menu/menu.service';

@Component({
  selector: 'app-desserts-page',
  templateUrl: './desserts-page.component.html',
  styleUrls: ['./desserts-page.component.scss']
})
export class DessertsPageComponent implements OnInit {

  public variant: String;
  public desserts: any[];
  public isLoading = true;


  constructor(private menuService: MenuService) { }

  ngOnInit() {

    this.menuService.getMenuItems(this.menuService.categories.DESSERTS)
      .subscribe(result => {
        this.desserts = result;
        this.isLoading = false;
      });

    this.variant = menuTypes.DESSERTS;

  }

}
