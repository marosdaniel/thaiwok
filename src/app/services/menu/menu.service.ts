import {Injectable} from '@angular/core';
import {FirebaseService} from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public categories = {
    APPETIZERS: 'appetizers',
    DESSERTS: 'desserts',
    FRIED_RICE_AND_NOODLES: 'fried_rice_and_noodles',
    MAIN_DISHES_WITH_RICE: 'main_dishes_with_rice',
    SOUPS: 'soups'
  };

  constructor(
    private firebaseService: FirebaseService
  ) {
  }

  public getMenuItems(category: String) {
    return this.firebaseService.getMenuObservable(category);
  }
}
