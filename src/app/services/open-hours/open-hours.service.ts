import { Injectable } from '@angular/core';
import {FirebaseService} from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class OpenHoursService {

  private openHours: any[];
  private exceptionalDays: any[];
  private date;
  private day;
  private hours;

  constructor(private firebaseService: FirebaseService) {
    this.date = new Date();
  }

  getOpenHours() {
    return this.firebaseService.getOpenHoursObservable();
  }

  private getExceptionalDays() {

  }

  getDateData() {
    this.day = this.date.getDay();
    this.hours = this.date.getDay();
  }

  isItOpen() {
    this.getDateData();
    if(this.day>=0 && this.day<7) {
      if(this.hours>=11 && this.hours<22){
        return true;
      }
      else return false;
    }
    else return false;
  }
}
