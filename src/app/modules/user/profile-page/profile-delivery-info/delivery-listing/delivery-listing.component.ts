import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../../../services/auth/auth.service';
import {User} from '../../../../../models/user.model';
import * as Izitoast from 'izitoast';
import {errorSaveToaster, successSaveToaster} from '../../../../../config/toasters/toasters';
import {Address} from '../../../../../models/address.model';

@Component({
  selector: 'app-delivery-listing',
  templateUrl: './delivery-listing.component.html',
  styleUrls: ['./delivery-listing.component.scss']
})
export class DeliveryListingComponent implements OnInit {

  @Output() isEditingAddress = new EventEmitter<boolean>();
  @Output() emitAddressEvent = new EventEmitter<Address>();
  @Output() emitAddressNumber = new EventEmitter<Number>();

  public user: User;
  public isEditable = false;
  public newAddress: Address;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {

    this.auth.user.subscribe(user => {
      this.user = user;
    });
    this.newAddress = new Address();
  }

  private updateUser() {
    this.auth.updateUser(this.user)
      .then(() => {
        Izitoast.default.show(successSaveToaster);
        this.isEditable = false;
      }).catch(() => {
      Izitoast.default.show(errorSaveToaster);
    });
  }

  public deleteAddress(index) {
    this.user.addresses.splice(index, 1);
    this.updateUser();
  }

  public showEditAddressField(address: Address, index) {
    this.isEditingAddress.emit(true);
    this.emitAddressNumber.emit(index);
    this.emitAddressEvent.emit(address);
  }
}
