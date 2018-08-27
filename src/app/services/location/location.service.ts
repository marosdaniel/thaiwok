import { Injectable } from '@angular/core';
import {szegedStreetsObject} from '../../../assets/location/szegedStreets';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getStreets() {
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve(szegedStreetsObject);
      }, 500)
    });
  }
}
