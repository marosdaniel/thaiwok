import {Injectable} from '@angular/core';
import {CartItem} from '../../models/cartItem.model';
import {ShippingInfo} from '../../models/shippingInfo.model';
import {LanguageService} from '../language/language.service';
import {SnotifyConfigService} from '../snotify/snotify-config.service';
import {successAddToCart} from '../../config/toaster.config';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private nextId: number;

  constructor(public languageService: LanguageService,
              private snotify: SnotifyConfigService) {
    let cartItems = this.getCartItems();

    if (cartItems.length === 0) {
      this.nextId = 0;
    } else {
      let maxId = cartItems[cartItems.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  // CARTITEMS

  public addToCart(cartItemObject: object): void {

    let cartItem = new CartItem(this.nextId, cartItemObject);
    let cartItems = this.getCartItems();
    cartItems.push(cartItem);

    this.setLocalStorageCartItems(cartItems);
    this.nextId++;
    this.snotify.onSuccess(this.languageService.actualLanguage === 'hu' ? successAddToCart.titleText.hu : successAddToCart.titleText.en,
      this.languageService.actualLanguage === 'hu' ? successAddToCart.bodyText.hu : successAddToCart.bodyText.en);
  }

  public getCartItems(): CartItem[] {
    const localStorageItem = JSON.parse(localStorage.getItem('cartItems'));
    return localStorageItem == null ? [] : localStorageItem.cartItems;
  }

  public deleteCartItem(indexOfItem: number) {
    const cartItems = this.getCartItems();
    cartItems.splice(indexOfItem, 1);
    this.setLocalStorageCartItems(cartItems);
  }


  // not used but good solution
  public removeCartItem(id: number): void {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter((cartItem) => {
      return cartItem.id !== id;
    });
    this.setLocalStorageCartItems(cartItems);
  }

  private setLocalStorageCartItems(cartItems: CartItem[]): void {
    localStorage.setItem('cartItems', JSON.stringify({cartItems}));
  }

  private setLocalStorageShippingInfo(shippingInfo: ShippingInfo): void {
    localStorage.setItem('shippingInfo', JSON.stringify({shippingInfo}));
  }

  public getShippingInfo(): ShippingInfo {
    const localStorageShippingInfo = JSON.parse((localStorage.getItem('shippingInfo')));
    return localStorageShippingInfo == null ? {} : localStorageShippingInfo;
  }

  public addToShippingInfo(shippingInfoObject: ShippingInfo) {
    this.setLocalStorageShippingInfo(new ShippingInfo(shippingInfoObject));
  }

}



