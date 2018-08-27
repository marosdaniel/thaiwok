import {Component, Directive, OnInit} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-tab',
  templateUrl: './menu-tab.component.html',
  styleUrls: ['./menu-tab.component.scss']
})
export class MenuTabComponent implements OnInit {
  location: Location;
  MENU_TYPE_URLS: {
    appetizers: 'appetizers';
    soups: 'soups';
    friedRiceAndNoodles: 'fried-rice-and-noodles';
    mainDishesWithRice: 'main-dishes-with-rice';
    desserts: 'desserts';
  }


  constructor(location: Location) {
    // this.location = location;
  }

  ngOnInit() {
  }

}
