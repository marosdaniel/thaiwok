export class ShippingInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string | number;
  shippingAddress: object;
  paymentOption: string;
  noteForMeal?: string;
  noteForShipping?: string;
  shippingPrice: number;
  orderPrice: number;
  fullPrice: number;
  orderDate: string;

  constructor(shippingInfoObject) {
    this.firstName = shippingInfoObject.firstName;
    this.lastName = shippingInfoObject.lastName;
    this.phoneNumber = shippingInfoObject.phoneNumber;
    this.shippingAddress = shippingInfoObject.shippingAddress;
    this.paymentOption = shippingInfoObject.paymentOption;
    this.noteForMeal = shippingInfoObject.noteForMeal;
    this.noteForShipping = shippingInfoObject.noteForShipping;
    this.shippingPrice = shippingInfoObject.shippingPrice;
    this.orderPrice = shippingInfoObject.orderPrice;
    this.fullPrice = shippingInfoObject.fullPrice;
    this.orderDate = shippingInfoObject.orderDate;
  }


}
