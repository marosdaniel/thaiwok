import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {urls} from '../../config/firebase-database-urls.config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {
  }

  public getMenuObservable(category: String) {
    return this.db.list(`${urls.MENU}${category}`).valueChanges();
  }

  public getOpenHoursObservable() {
    return this.db.list(`${urls.OPEN_HOURS}`).valueChanges();
  }
}
