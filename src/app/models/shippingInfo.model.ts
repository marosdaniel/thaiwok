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

  constructor(firstName, lastName, phoneNumber, shippingAddress, paymentOption, noteForMeal, noteForShipping, shippingPrce, orderPrice, fullPrice, orderDate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.shippingAddress = shippingAddress;
    this.paymentOption = paymentOption;
    this.noteForMeal = noteForMeal;
    this.noteForShipping = noteForShipping;
    this.shippingPrice = shippingPrce;
    this.orderPrice = orderPrice;
    this.fullPrice = fullPrice;
    this.orderDate = orderDate;
  }


}
