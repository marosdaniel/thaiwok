import { Injectable } from '@angular/core';
import {szegedStreets, szegedStreetsArray, szegedStreetsObject} from '../../../assets/location/szegedStreets';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  // getStreets() {
  //   return new Promise(resolve => {
  //     window.setTimeout(() => {
  //       resolve(szegedStreetsObject);
  //     }, 500);
  //   });
  // }

  public getStreets() {
    return szegedStreetsArray;
  }

  getStreetsNew() {
    return szegedStreets;
  }

}
