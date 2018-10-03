import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {AuthService} from '../../../../../services/auth/auth.service';
import {User} from '../../../../../models/user.model';
import * as Izitoast from 'izitoast';
import {errorSaveToaster, successSaveToaster} from '../../../../../config/toasters/toasters';
import {Address} from '../../../../../models/address.model';
import {RemoveConfirmationModalComponent} from '../../../../../components/modals/remove-confirmation-modal/remove-confirmation-modal.component';
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-delivery-listing',
  templateUrl: './delivery-listing.component.html',
  styleUrls: ['./delivery-listing.component.scss']
})
export class DeliveryListingComponent implements OnInit, AfterViewInit {

  @Output() isEditingAddress = new EventEmitter<boolean>();
  @Output() emitAddressEvent = new EventEmitter<Address>();
  @Output() emitAddressNumber = new EventEmitter<Number>();
  @ViewChildren(RemoveConfirmationModalComponent) removeConfirmationModal: RemoveConfirmationModalComponent;
  @ViewChildren('frame') confirmationModal: ModalDirective;
  @ViewChild('myModal') myModal: RemoveConfirmationModalComponent;

  public user: User;
  public isEditable = false;
  public newAddress: Address;
  private indexOfAddressToDelete: number;
  public indexOfAddress;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {

    this.auth.user.subscribe(user => {
      this.user = user;
    });
    this.newAddress = new Address();
    // ($('#modal-delete-address')as any).modal();
  }

  ngAfterViewInit() {
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

  public deleteAddress() {
    this.user.addresses.splice(this.indexOfAddressToDelete, 1);
    this.updateUser();
    // this.confirmationModal.nativeElement.hide();
  }

  public showEditAddressField(address: Address, index) {
    console.log(this.user.addresses);
    this.isEditingAddress.emit(true);
    this.emitAddressNumber.emit(index);
    this.emitAddressEvent.emit(address);
  }

  public openDeleteAddressConfirmationModal(index) {
    this.indexOfAddressToDelete = index;
    // this.removeConfirmationModal.openModal();
  }
  public test(index) {
    this.indexOfAddressToDelete = index;
    // this.confirmationModal.nativeElement.show();
    this.confirmationModal.show();
  }
}
