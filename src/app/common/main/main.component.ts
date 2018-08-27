import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../services/menu/menu.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public appetizers: any[];
  constructor(private menuService: MenuService) {
  }

  public ngOnInit() {
    this.menuService.getMenuItems(this.menuService.categories.APPETIZERS)
      .subscribe(result => {
        this.appetizers = result;
      });
  }

}
