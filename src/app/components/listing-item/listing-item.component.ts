import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import {CartService} from '../../services/cart/cart.service';
import * as Izitoast from 'izitoast';
import {errorNoSelectedItemToaster} from '../../common/toasters/toasters';
import {CommonService} from '../../services/common/common.service';
import {Item} from '../../models/item.model';
import {MeatTypeEnum} from '../../models/meatType.enum';
declare var $:any;


@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit {
  @Input() item: any;
  @Input() variant: String;

  public cartItem: Item = {};

  // public meatType: string;
  public meatType: MeatTypeEnum;
  public selectedItem: boolean;
  public indexer: number;

  constructor(private cartService: CartService, private commonService: CommonService) {
  }

  ngOnInit() {
    this.selectedItem = false;
    this.cartItem = {
        number: 0,
        name: '',
        meatType: '',
        price: 0
    }
    this.indexer = 0;
  }

  modalActions = new EventEmitter<string|MaterializeAction>();

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  private closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  addToCart():void {
    if(!this.selectedItem) {
      //create toaster message for no selected item
      Izitoast.default.show(errorNoSelectedItemToaster);
      return
    }
    this.initilizeCartItem();

    this.cartService.addToCart(this.cartItem)
    this.selectedItem = false;
  }

  public selectItem() {
    this.selectedItem = true;
  }

  public backToItems() {
    this.commonService.uncheckCheckedRadio();
    this.closeModal();
  }

  public setIndex(index) {
    this.indexer = index;
  }

  // pass data when selecting which type of meat has been selected
  private initilizeCartItem() {
    this.cartItem.number = this.item.id;
    this.cartItem.name = this.item.name;
    this.cartItem.price = this.item.price[this.indexer].price;
    this.cartItem.meatType = this.item.price[this.indexer].name;
  }

}
