import {Injectable} from '@angular/core';
import * as Izitoast from 'izitoast';
import {successAddToCartToaster} from '../../common/toasters/toasters';
import {CartItem} from '../../models/cartItem.model';
import {ShippingInfo} from '../../models/shippingInfo.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private nextId: number;

  constructor() {
    let cartItems = this.getCartItems();

    if (cartItems.length == 0) {
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
    Izitoast.default.show(successAddToCartToaster);
  }

  public getCartItems(): CartItem[] {
    let localStorageItem = JSON.parse(localStorage.getItem('cartItems'));
    return localStorageItem == null ? [] : localStorageItem.cartItems;
  }

  public deleteCartItem(indexOfItem: number) {
    let cartItems = this.getCartItems();
    cartItems.splice(indexOfItem, 1);
    this.setLocalStorageCartItems(cartItems);
  }


  // not used but good solution
  public removeCartItem(id: number): void {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter((cartItem) => {
      cartItem.id != id;
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
    let localStorageShippingInfo = JSON.parse((localStorage.getItem('shippingInfo')));
    return localStorageShippingInfo == null ? {} : localStorageShippingInfo;
  }

  public addToShippingInfo(shippingInfoObject: ShippingInfo) {

    let info = new ShippingInfo(
      shippingInfoObject.firstName,
      shippingInfoObject.lastName,
      shippingInfoObject.phoneNumber,
      shippingInfoObject.shippingAddress,
      shippingInfoObject.paymentOption,
      shippingInfoObject.noteForMeal,
      shippingInfoObject.noteForShipping,
      shippingInfoObject.shippingPrice,
      shippingInfoObject.orderPrice,
      shippingInfoObject.fullPrice,
      shippingInfoObject.orderDate);
    this.setLocalStorageShippingInfo(info);
  }

}



