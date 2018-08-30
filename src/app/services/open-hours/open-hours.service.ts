import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenHoursService {

  private date;
  private day;
  private hours;

  constructor() {
    this.date = new Date();
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
