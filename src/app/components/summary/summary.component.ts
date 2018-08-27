import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {CartService} from '../../services/cart/cart.service';
import * as Izitoast from 'izitoast';
import {successOrderToaster} from '../../common/toasters/toasters';
import {CommonService} from '../../services/common/common.service';
import {StorageService} from '../../services/storage/storage.service';
import * as M from 'materializecss';
import {User} from '../../models/user.model';
import {CartItem} from '../../models/cartItem.model';
import {ShippingInfo} from '../../models/shippingInfo.model';
import * as firebase from 'firebase';

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

  constructor(private auth: AuthService,
              private cartService: CartService,
              private commonService: CommonService,
              private storageService: StorageService) {
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
    this.newAddress = {
      country: 'Magyarország',
      county: 'Csongrád megye',
      city: 'Szeged',
      street: '',
      houseNumber: '',
      floor: '',
      door: '',
      bell: ''
    };
    this.cities = [
      {id: 1, name: 'Szeged'},
      {id: 2, name: 'Tápé'}
    ];
  }

  public finishOrderProcess() {
    // if everything is OK
    if (this.user) {
      // add ordered items to database -> clear localstorage -> send email notification
      // Izitoast.default.show(successOrderToaster);
    } else {

    }
    // send email notification
    // this.storageService.clearThaiWokLocalStorages();
    this.storageService.clearLocalStorageVariable('shippingInfo');
    this.storageService.clearLocalStorageVariable('cartItems');

    this.auth.navigateToHome();
    Izitoast.default.show(successOrderToaster);
  }

  cartItemSummary = () => {
    let summ: number = 0;
    let cartItems = this.cartService.getCartItems();
    for (let i = 0; i < cartItems.length; i++) {
      summ += cartItems[i].details['price'];
    }
    return summ;
  };

  selectAddress() {
    this.isSelectedAddress = true;
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

  test() {
    this.addShippingInfo();
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


}
