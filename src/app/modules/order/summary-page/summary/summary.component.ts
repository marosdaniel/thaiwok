import {Component, EventEmitter, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {CartService} from '../../../../services/cart/cart.service';
import {CommonService} from '../../../../services/common/common.service';
import {StorageService} from '../../../../services/storage/storage.service';
import {User} from '../../../../models/user.model';
import {CartItem} from '../../../../models/cartItem.model';
import {ShippingInfo} from '../../../../models/shippingInfo.model';
import * as firebase from 'firebase';
import {LanguageService} from '../../../../services/language/language.service';
import {Address} from '../../../../models/address.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public user: User;
  public isLoading: boolean;
  public isCheckedASZF: boolean;
  public isSelectedAddress: boolean;
  public addresses: any[];
  public isNewAddress: boolean;
  public paymentOptions: Object[];
  public cartItems: CartItem[];
  public shippingFee: number;
  public shippingInfo: ShippingInfo;
  public newAddress: object;
  public cities: any[];
  public tempFirstName: string;
  public tempLastName: string;
  public tempPhoneNumber: string | number;

  constructor(public auth: AuthService,
              private cartService: CartService,
              private commonService: CommonService,
              private storageService: StorageService,
              public languageService: LanguageService) {
  }

  ngOnInit() {
    this.isCheckedASZF = false;
    this.isSelectedAddress = false;
    this.user = new User();
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //   } else {
    //     // No user is signed in.
    //     console.log('nincs bejelentkezett user')
    //   }
    // });
    this.auth.user.subscribe(user => {
      this.user = user;
      this.isLoading = false;
      this.addresses = this.user && this.user.addresses;
      this.tempFirstName = this.user && this.user.firstName;
      this.tempLastName = this.user && this.user.lastName;
      this.tempPhoneNumber = this.user && this.user.phoneNumber;
    });
    this.isNewAddress = true;
    this.paymentOptions = [
      {id: 1, option: 'Készpénz'},
      // {id: 2, option: 'Bankkártya'}
    ];
    this.commonService.uncheckCheckedRadio(); // ez itt nem megy
    this.cartItems = this.cartService.getCartItems();
    this.shippingFee = this.commonService.shippingFee;
    this.shippingInfo = {
      firstName: this.tempFirstName || '',
      lastName: this.tempLastName || '',
      phoneNumber: this.tempPhoneNumber || '',
      shippingAddress: {},
      paymentOption: '',
      noteForMeal: '',
      noteForShipping: '',
      shippingPrice: this.shippingFee,
      orderPrice: 0,
      fullPrice: 0,
      orderDate: ''
    };
    this.newAddress = new Address();
    this.cities = [
      {id: 1, name: 'Szeged'},
      {id: 2, name: 'Tápé'}
    ];
    ($('#modal-success-order')as any).modal();
  }

  public finishOrderProcess() {
    // if everything is OK
    if (this.user) {
      // add ordered items to database -> clear localstorage -> send email notification

    } else {

    }
    // send email notification
    this.storageService.clearLocalStorageVariable('shippingInfo');
    this.storageService.clearLocalStorageVariable('cartItems');
    // this.openModal();
  }

  cartItemSummary = () => {
    let summ = 0;
    const cartItems = this.cartService.getCartItems();
    for (let i = 0; i < cartItems.length; i++) {
      summ += cartItems[i].details['price'];
    }
    return summ;
  }

  selectAddress(address) {
    this.isSelectedAddress = true;
    // add to shippinginfo
    this.shippingInfo.shippingAddress = address;
  }

  addNewAddress() {
    this.isNewAddress = false;
  }

  private addShippingInfo() {
    this.setOrderDate();
    this.setUserData();
    this.setPrice();
    this.cartService.addToShippingInfo(this.shippingInfo);
  }

  private addToHistory() {
    if (this.user) {

      if (typeof this.user.history === 'undefined'){
        this.user.history = [];
      }
      this.user.history.push(this.shippingInfo);
      this.auth.updateUser(this.user);
    } else {

    }
  }

  test() {
    this.addShippingInfo();
    this.addToHistory();
  }

  private setOrderDate() {
    this.shippingInfo.orderDate = new Date(Date.now()).toLocaleString();
  }

  private setPrice() {
    this.shippingInfo.orderPrice = this.cartItemSummary();
    this.shippingInfo.fullPrice = this.shippingInfo.shippingPrice + this.shippingInfo.orderPrice;
  }

  private setUserData() {
    this.shippingInfo.firstName = this.user && this.user.firstName ? this.user.firstName : this.tempFirstName;
    this.shippingInfo.lastName = this.user && this.user.lastName ? this.user.lastName : this.tempLastName;
    this.shippingInfo.phoneNumber = this.user && this.user.phoneNumber ? this.user.phoneNumber : this.tempPhoneNumber;
  }

  private openModal() {
    // this.modalActions.emit({action:"modal",params:['open']});
    ($('#modal-success-order')as any).modal('open');
  }

  onHidden(event: any) {
    console.log(event);
    this.auth.navigateToHome();
  }


}
