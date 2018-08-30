import {Address} from './address.model';
import {ShippingInfo} from './shippingInfo.model';

export class User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  phoneNumber?: string | number;
  firstName?: string;
  lastName?: string;
  paymentOption?: string;
  addresses?: Address[];
  history?: ShippingInfo[];
}
