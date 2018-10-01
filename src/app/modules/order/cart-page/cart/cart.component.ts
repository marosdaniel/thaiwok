import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../../../services/cart/cart.service';
import {CommonService} from '../../../../services/common/common.service';
import {StorageService} from '../../../../services/storage/storage.service';
import {CartItem} from '../../../../models/cartItem.model';
import {LanguageService} from '../../../../services/language/language.service';
import {CurrencyService} from '../../../../services/currency/currency.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() private cartItem: CartItem;

  public cartItems: CartItem[];
  public shippingFee: number;
  public usedCurrencies = [];
  public allCurrencies = [];

  constructor(
    private cartService: CartService,
    private commonService: CommonService,
    private storageService: StorageService,
    private languageService: LanguageService,
    private currencyService: CurrencyService) {

  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.shippingFee = this.commonService.shippingFee;
    this.currencyService.getUsedCurrencies()
      .subscribe(result => {
        this.usedCurrencies = result;
      });
    this.currencyService.getAllCurrencies()
      .subscribe(result => {
        this.allCurrencies = result;
      });
  }

  removeCartItem(indexOfItem): void {
    this.cartService.deleteCartItem(indexOfItem);
    this.cartItems = this.cartService.getCartItems();
    // popup dobódhatna
  }

  removeCartItems(): void {
    this.storageService.clearWholeLocalStorage();
    this.commonService.pageRefresh();
  }

  cartItemSummary = () => {
    let sum = 0;
    const cartItems = this.cartService.getCartItems();
    for (let i = 0; i < cartItems.length; i++) {
      sum += cartItems[i].details['price'];
    }
    return sum;
  }

}
