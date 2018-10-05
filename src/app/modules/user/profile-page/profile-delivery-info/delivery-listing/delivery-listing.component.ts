import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../../../services/auth/auth.service';
import {User} from '../../../../../models/user.model';
import {Address} from '../../../../../models/address.model';
import {SnotifyConfigService} from '../../../../../services/snotify/snotify-config.service';
import {LanguageService} from '../../../../../services/language/language.service';
import {errorSaveToaster, successSaveToaster} from '../../../../../config/toaster.config';

@Component({
  selector: 'app-delivery-listing',
  templateUrl: './delivery-listing.component.html',
  styleUrls: ['./delivery-listing.component.scss']
})
export class DeliveryListingComponent implements OnInit, AfterViewInit {

  @Output() isEditingAddress = new EventEmitter<boolean>();
  @Output() emitAddressEvent = new EventEmitter<Address>();
  @Output() emitAddressNumber = new EventEmitter<Number>();

  public user: User;
  public isEditable = false;
  public newAddress: Address;
  private indexOfAddressToDelete: number;
  public indexOfAddress;

  constructor(private auth: AuthService,
              private snotify: SnotifyConfigService,
              private languageService: LanguageService) {
  }

  ngOnInit() {

    this.auth.user.subscribe(user => {
      this.user = user;
    });
    this.newAddress = new Address();
  }

  ngAfterViewInit() {
  }

  private updateUser() {
    this.auth.updateUser(this.user)
      .then(() => {
        this.snotify.onSuccess(this.languageService.actualLanguage === 'hu' ? successSaveToaster.titleText.hu : successSaveToaster.titleText.en,
          this.languageService.actualLanguage === 'hu' ? successSaveToaster.bodyText.hu : successSaveToaster.bodyText.en);
        this.isEditable = false;
      }).catch(() => {
      this.snotify.onError(this.languageService.actualLanguage === 'hu' ? errorSaveToaster.titleText.hu : errorSaveToaster.titleText.en,
        this.languageService.actualLanguage === 'hu' ? errorSaveToaster.bodyText.hu : errorSaveToaster.bodyText.en);
    });
  }

  public deleteAddress() {
    this.user.addresses.splice(this.indexOfAddressToDelete, 1);
    this.updateUser();
  }

  public showEditAddressField(address: Address, index) {
    console.log(this.user.addresses);
    this.isEditingAddress.emit(true);
    this.emitAddressNumber.emit(index);
    this.emitAddressEvent.emit(address);
  }

  public openDeleteAddressConfirmationModal(index) {
    this.indexOfAddressToDelete = index;
  }
}
