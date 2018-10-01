import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private _allCurrencyUrl = 'https://pkgstore.datahub.io/core/currency-codes/codes-all_json/data/3878667291c4a12eff7f4294013da4e5/codes-all_json.json';
  private _usedCurrencyUrl = '/assets/currency/currency.json';

  constructor(private http: HttpClient) { }

  getAllCurrencies(): Observable<any> {
    return this.http.get<any[]>(this._allCurrencyUrl);
  }
  getUsedCurrencies(): Observable<any> {
    return this.http.get<any[]>(this._usedCurrencyUrl);
  }
}
