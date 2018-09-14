import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
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
export class ProfileDeliveryInfoComponent implements OnInit {

  @ViewChild('listing') listing;
  @ViewChild('edit') edit;
  @Input() sharedAddress: Address;

  public addressToShare: Address;
  public index: number;
  public user: User;
  public isLoading = true;
  public isEditable = false;
  public isAddingNewAddress = false;

  public isEditingAddress = false;

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
    // this.addressToShare = new Address();
    this.address = new Address();
    this.newAddress = new Address();
  }

  getListingAddress(address: Address) {
    this.listing.address = address;
  }
  getEditAddress(address: Address) {
    this.edit.address = address;
  }


  receiveEvent($event) {
    this.isEditingAddress = $event;
  }

  receiveAddress($event) {
    this.addressToShare = $event;
  }

  receiveAddressNumber($event) {
    this.index = $event;
  }
}
