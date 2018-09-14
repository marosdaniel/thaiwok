import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from '../../../../../models/address.model';

@Component({
  selector: 'app-delivery-edit',
  templateUrl: './delivery-edit.component.html',
  styleUrls: ['./delivery-edit.component.scss']
})
export class DeliveryEditComponent implements OnInit {

  // public address: Address;

  @Output() isEditingAddress = new EventEmitter<boolean>();
  @Input() addressToShare: Address;

  constructor() { }

  ngOnInit() {
  }

  public closeEditAddressField() {
    this.isEditingAddress.emit(false);
  }

}
