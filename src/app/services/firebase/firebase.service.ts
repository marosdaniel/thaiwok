import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  public getMenuObservable(category: String) {
    return this.db.list(`/menu/${category}`).valueChanges();
  }
}
