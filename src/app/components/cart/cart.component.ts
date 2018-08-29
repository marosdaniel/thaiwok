import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {CommonService} from '../../services/common/common.service';
import {StorageService} from '../../services/storage/storage.service';
import {CartItem} from '../../models/cartItem.model';
import {LanguageService} from '../../services/language/language.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() private cartItem: CartItem;

  public cartItems: CartItem[];
  public shippingFee: number;

  constructor(private cartService: CartService, private commonService: CommonService, private storageService: StorageService, private languageService: LanguageService) {

  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.shippingFee = this.commonService.shippingFee;
  }

  removeCartItem(indexOfItem): void {
    this.cartService.deleteCartItem(indexOfItem);
    this.cartItems = this.cartService.getCartItems();
    // popup dobódhatna
  }

  removeCartItems():void {
    this.storageService.clearWholeLocalStorage();
    this.commonService.pageRefresh();
  }

  cartItemSummary = () => {
    let summ:number = 0;
    let cartItems = this.cartService.getCartItems();
    for(let i = 0; i<cartItems.length; i++) {
      summ+=cartItems[i].details['price'];
    }
    return summ;
  }

}
