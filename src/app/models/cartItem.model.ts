export class CartItem {
  id: number;
  details: object;

  constructor(id: number, details: object) {
    this.id = id;
    this.details = details;
  }
}
