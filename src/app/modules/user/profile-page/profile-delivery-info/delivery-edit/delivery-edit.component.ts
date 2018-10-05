import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from '../../../../../models/address.model';
import {LocationService} from '../../../../../services/location/location.service';
import {AuthService} from '../../../../../services/auth/auth.service';
import {User} from '../../../../../models/user.model';

@Component({
  selector: 'app-delivery-edit',
  templateUrl: './delivery-edit.component.html',
  styleUrls: ['./delivery-edit.component.scss']
})
export class DeliveryEditComponent implements OnInit, AfterViewInit {

  @Output() isEditingAddress = new EventEmitter<boolean>();
  @Input() addressToShare: Address;
  @Input() index: number;
  streets: any;
  streetsLoading = false;
  private user: User;
  public cities: any[];

  constructor(private auth: AuthService, private location: LocationService) {
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.user = user;
    });
    this.initLocations();
  }

  ngAfterViewInit() {

  }

  private initLocations() {
    this.cities = [
      {id: 1, name: 'Szeged'},
      {id: 2, name: 'Tápé'}
    ];
    this.streetsLoading = true;
    this.streets = this.location.getStreets();
    this.streetsLoading = false;
  }

  private updateUser() {
    this.auth.updateUser(this.user)
      .then(() => {
        // Izitoast.default.show(successSaveToaster);
      }).catch(() => {
      // Izitoast.default.show(errorSaveToaster);
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
}
