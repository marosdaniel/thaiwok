import {Injectable, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnInit {

  public shippingFee: number;

  constructor() {
    this.shippingFee = 300;

  }

  ngOnInit(){
  }

  public uncheckCheckedRadio(){
    ($('input[type="radio"]') as any).prop('checked', false);
  }

  public pageRefresh() {
    window.location.reload();
  }

  public isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
      return false;
    }

    return true;
  }
}
