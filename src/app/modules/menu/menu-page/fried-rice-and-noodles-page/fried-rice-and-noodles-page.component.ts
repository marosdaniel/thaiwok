import {Component, OnInit} from '@angular/core';

import {menuTypes} from '../../../../config/menu-types.config';
import {MenuService} from '../../../../services/menu/menu.service';

@Component({
  selector: 'app-fried-rice-and-noodles-page',
  templateUrl: './fried-rice-and-noodles-page.component.html',
  styleUrls: ['./fried-rice-and-noodles-page.component.scss']
})
export class FriedRiceAndNoodlesPageComponent implements OnInit {

  public variant: String;
  public friedRiceAndNoodles: any[];

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {

    this.menuService.getMenuItems(this.menuService.categories.FRIED_RICE_AND_NOODLES)
      .subscribe(result => {
        this.friedRiceAndNoodles = result;
      });

    this.variant = menuTypes.FRIED_RICE_AND_NOODLES;
  }

}
