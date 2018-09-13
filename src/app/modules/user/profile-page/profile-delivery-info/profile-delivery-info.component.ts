import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import * as Izitoast from 'izitoast';
import {errorSaveToaster, successSaveToaster} from '../../../../config/toasters/toasters';
import {LocationService} from '../../../../services/location/location.service';
import {User} from '../../../../models/user.model';
import {Address} from '../../../../models/address.model';
// import * as $ from 'jquery';
declare var $: any;


@Component({
  selector: 'app-profile-delivery-info',
  templateUrl: './profile-delivery-info.component.html',
  styleUrls: ['./profile-delivery-info.component.scss']
})
export class ProfileDeliveryInfoComponent implements OnInit, AfterViewInit {

  public user: User;
  public isLoading: boolean = true;
  public isEditable: boolean = false;
  public isAddingNewAddress: boolean = false;
  public isEditingAddress: boolean = false;
  public indexOfAddress: number;
  public newAddress: Address;
  public cities: any[];
  public address: Address;

  constructor(
    public auth: AuthService,
    private location: LocationService
  ) {
  }

  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
    this.cities = [
      {id: 1, name: 'Szeged'},
      {id: 2, name: 'Tápé'}
    ];

    this.auth.user.subscribe(user => {
      this.user = user;
      this.isLoading = false;
    });
    this.address = new Address();
    this.newAddress = new Address();
    this.indexOfAddress = 0;
  }

  ngAfterViewInit() {
    this.location.getStreets().then(streets => {
      ($('.autocomplete') as any).autocomplete({
        data: streets,
        limit: 8,
        minlength: 3,
        onAutocomplete: (street) => { this.user.addresses[this.indexOfAddress].street = street; }
      });
    });
  }


  public saveUserData() {
    this.isEditingAddress = false;
    this.updateUser();
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

  public editUser() {
    this.isEditable = true;
  }

  public editAddress(index) {
    this.isEditingAddress = true;
    this.indexOfAddress = index;
    this.isEditable = true;
  }

  public deleteAddress(index) {
    this.user.addresses.splice(index, 1);
    this.updateUser();
  }

  public createNewAddress() {
    this.isAddingNewAddress = true;
  }

  public addNewAddress() {
    if (!this.user.addresses) {
      this.user.addresses = [];
    }
    this.user.addresses.push(this.newAddress);

    this.isAddingNewAddress = false;
    this.updateUser();
    this.newAddress = this.address;
  }

  public cancel() {
    this.isAddingNewAddress = false;
    this.isEditingAddress = false;
  }
}
