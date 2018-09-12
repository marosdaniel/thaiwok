import { Injectable } from '@angular/core';
import {FirebaseService} from '../firebase/firebase.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenHoursService {

  private openHours: any[];
  private exceptionalDays: Observable<{}[]>;
  private month;
  private date;
  private day;
  private hours;

  constructor(private firebaseService: FirebaseService) {
    this.date = new Date();
    this.getDateData();
    this.exceptionalDays = this.getExceptionalDays();
  }

  getOpenHours() {
    return this.firebaseService.getOpenHoursObservable();
  }

  private getExceptionalDays() {
    return this.firebaseService.getExceptionalDaysObservable();
  }

  private getDateData() {
    this.month = this.date.getMonth() + 1;  // months start from 0
    this.day = this.date.getDate();
    this.hours = this.date.getHours();
  }


  isExceptionalDay(){

  }

  isItOpen() {
    // this.getDateData();
    if(this.day>=0 && this.day<7) {
      if(this.hours>=11 && this.hours<22){
        return true;
      }
      else return false;
    }
    else return false;
  }
}
