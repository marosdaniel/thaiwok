import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../../../services/cart/cart.service';
import {CommonService} from '../../../../services/common/common.service';
import {Item} from '../../../../models/item.model';
import {MeatTypeEnum} from '../../../../models/enums/meatType.enum';
import {LanguageService} from '../../../../services/language/language.service';
import {SnotifyConfigService} from '../../../../services/snotify/snotify-config.service';
import {
  alreadyAddedToFavoritesToaster,
  errorSaveToaster,
  noSelectedMealToaster, successAddToFavoritesToaster, successRemoveFromFavoritesToaster,
  successSaveToaster
} from '../../../../config/toaster.config';
import {AuthService} from '../../../../services/auth/auth.service';
import {User} from '../../../../models/user.model';
declare var $: any;


@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit {
  @Input() item: any;  // model kellene?
  @Input() variant: String;
  public user: User;
  private favorites: any[];
  public flipped = false;
  public cartItem: Item = {};

  public meatType: MeatTypeEnum;
  public selectedItem: boolean;
  public indexer: number;

  constructor(
    private cartService: CartService,
    private commonService: CommonService,
    public languageService: LanguageService,
    private snotify: SnotifyConfigService,
    public auth: AuthService) {
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.user = user;
    });
    this.selectedItem = false;
    this.cartItem = {
        number: 0,
        name: '',
        meatType: '',
        price: 0
    };
    this.indexer = 0;
  }

  // FLIPPING CARD
  public flip() {
    this.flipped = !this.flipped;
  }

  // CART ACTIONS
  addToCart(): void {
    if (!this.selectedItem) {
      this.snotify
        .onError(this.languageService.actualLanguage === 'hu' ? noSelectedMealToaster.titleText.hu : noSelectedMealToaster.titleText.en,
          this.languageService.actualLanguage === 'hu' ? noSelectedMealToaster.bodyText.hu : noSelectedMealToaster.bodyText.en);
      return;
    }
    this.initializeCartItem();

    this.cartService.addToCart(this.cartItem);
    this.selectedItem = false;
    this.commonService.uncheckCheckedRadio();
  }

  public selectItem() {
    this.selectedItem = true;
  }

  public setIndex(index) {
    this.indexer = index;
  }

  // pass data when selecting which type of meat has been selected
  private initializeCartItem() {
    this.cartItem.number = this.item.id;
    this.cartItem.name = this.item.name;
    this.cartItem.price = this.item.price[this.indexer].price;
    this.cartItem.meatType = this.item.price[this.indexer].name;
  }

  // FAVORITES
  public updateFavorites(item) {
    let canIPush = true;
    if (!this.user.favorites) {
      this.user.favorites = [];
    }
    if (this.user.favorites.length === 0) {
      this.user.favorites.push(item);
      this.updateUser();
    } else {
      for (let i = 0; i < this.user.favorites.length; i++) {
        if (this.user.favorites[i]['name'] === item['name']) {
          if (this.variant !== 'favorite') {
            this.snotify.onError(this.languageService.actualLanguage === 'hu' ? alreadyAddedToFavoritesToaster.titleText.hu : alreadyAddedToFavoritesToaster.titleText.en,
              this.languageService.actualLanguage === 'hu' ? alreadyAddedToFavoritesToaster.bodyText.hu : alreadyAddedToFavoritesToaster.bodyText.en);
          }
          canIPush = false;
          if (this.variant === 'favorite') {
            this.user.favorites.splice(i, 1);
            this.updateUser();
            this.snotify.onSuccess(this.languageService.actualLanguage === 'hu' ? successRemoveFromFavoritesToaster.titleText.hu : successRemoveFromFavoritesToaster.titleText.en,
              this.languageService.actualLanguage === 'hu' ? successRemoveFromFavoritesToaster.bodyText.hu : successRemoveFromFavoritesToaster.bodyText.en);
          }
          break;
        }
      }
      if (canIPush) {
        this.user.favorites.push(item);
        this.updateUser();
        this.snotify.onSuccess(this.languageService.actualLanguage === 'hu' ? successAddToFavoritesToaster.titleText.hu : successAddToFavoritesToaster.titleText.en,
          this.languageService.actualLanguage === 'hu' ? successAddToFavoritesToaster.bodyText.hu : successAddToFavoritesToaster.bodyText.en);
      }
    }
  }


  // SAVE USER
  private updateUser() {
    this.auth.updateUser(this.user)
      .then(() => {
        // this.snotify.onSuccess(this.languageService.actualLanguage === 'hu' ? successSaveToaster.titleText.hu : successSaveToaster.titleText.en,
        //   this.languageService.actualLanguage === 'hu' ? successSaveToaster.bodyText.hu : successSaveToaster.bodyText.en);
      })
      .catch(() => {
      this.snotify.onError(this.languageService.actualLanguage === 'hu' ? errorSaveToaster.titleText.hu : errorSaveToaster.titleText.en,
        this.languageService.actualLanguage === 'hu' ? errorSaveToaster.bodyText.hu : errorSaveToaster.bodyText.en);
    });
  }
}
