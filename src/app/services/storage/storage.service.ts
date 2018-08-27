import { Injectable } from '@angular/core';

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
}
