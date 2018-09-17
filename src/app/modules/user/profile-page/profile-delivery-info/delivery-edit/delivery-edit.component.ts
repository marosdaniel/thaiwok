import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from '../../../../../models/address.model';
import {LocationService} from '../../../../../services/location/location.service';
import {AuthService} from '../../../../../services/auth/auth.service';
import {User} from '../../../../../models/user.model';
import * as Izitoast from 'izitoast';
import {errorSaveToaster, successSaveToaster} from '../../../../../config/toasters/toasters';

@Component({
  selector: 'app-delivery-edit',
  templateUrl: './delivery-edit.component.html',
  styleUrls: ['./delivery-edit.component.scss']
})
export class DeliveryEditComponent implements OnInit, AfterViewInit {

  @Output() isEditingAddress = new EventEmitter<boolean>();
  @Input() addressToShare: Address;
  @Input() index: number;

  private user: User;
  public cities: any[];

  constructor(private auth: AuthService, private location: LocationService) {
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.user = user;
    });
    this.cities = [
      {id: 1, name: 'Szeged'},
      {id: 2, name: 'Tápé'}
    ];
  }

  ngAfterViewInit() {
    this.location.getStreets().then(streets => {
      ($('.autocomplete') as any).autocomplete({
        data: streets,
        limit: 8,
        minlength: 3,
        onAutocomplete: (street) => {
          this.addressToShare.street = street;
        }
      });
    });
  }

  private updateUser() {
    this.auth.updateUser(this.user)
      .then(() => {
        Izitoast.default.show(successSaveToaster);
      }).catch(() => {
      Izitoast.default.show(errorSaveToaster);
    });
  }

  private resetAddressToShare() {
    this.addressToShare = new Address();
    this.index = undefined;
  }

  private addNewAddress(address) {
    if (!this.user.addresses) {
      this.user.addresses = [];
    }
    this.user.addresses.push(address);
  }

  private modifyExistingAddress(address, index) {
    this.user.addresses[index] = address;
  }

  public saveUserData() {

    if (typeof(this.index) === 'undefined') {
      this.addNewAddress(this.addressToShare);
    } else {
      this.modifyExistingAddress(this.addressToShare, this.index);
    }
    this.isEditingAddress.emit(false);
    this.updateUser();
    this.resetAddressToShare();
  }

  public closeEditAddressField() {
    this.isEditingAddress.emit(false);
  }

  private addActiveClassToLabels() {
    if ($('input').text() !== '') {
      $('label').addClass('active');
    }
  }

}
