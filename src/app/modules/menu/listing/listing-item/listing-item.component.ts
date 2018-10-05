import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../../../services/cart/cart.service';
import {CommonService} from '../../../../services/common/common.service';
import {Item} from '../../../../models/item.model';
import {MeatTypeEnum} from '../../../../models/enums/meatType.enum';
import {LanguageService} from '../../../../services/language/language.service';
import {SnotifyConfigService} from '../../../../services/snotify/snotify-config.service';
import {noSelectedMealToaster} from '../../../../config/toaster.config';
declare var $: any;


@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit {
  @Input() item: any;  // model kellene?
  @Input() variant: String;
  public flipped = false;
  public cartItem: Item = {};

  public meatType: MeatTypeEnum;
  public selectedItem: boolean;
  public indexer: number;

  constructor(
    private cartService: CartService,
    private commonService: CommonService,
    public languageService: LanguageService,
    private snotify: SnotifyConfigService) {
  }

  ngOnInit() {
    this.selectedItem = false;
    this.cartItem = {
        number: 0,
        name: '',
        meatType: '',
        price: 0
    };
    this.indexer = 0;
  }

  public flip() {
    this.flipped = !this.flipped;
  }

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

}
