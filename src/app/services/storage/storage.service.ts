import { Injectable } from '@angular/core';
import {CartItem} from '../../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public clearLocalStorageVariable(localStorageVariable: string) {
    localStorage.removeItem(localStorageVariable);
  }

  public clearThaiWokLocalStorages() {
      this.clearLocalStorageVariable('shippingInfo');
      this.clearLocalStorageVariable('cartItems');

  }

  public clearWholeLocalStorage() {
    localStorage.clear();
  }

  public setLocalStorageLanguage(language: string): void {
    localStorage.setItem('actualLanguage', JSON.stringify(language));
  }

  public getLocalStorageLanguage() {
    const localSotrageLanguage = JSON.parse(localStorage.getItem('actualLanguage'));
    return localSotrageLanguage == null ? '' : localSotrageLanguage;
  }
}
