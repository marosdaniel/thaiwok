export class Address {
  country?: string;
  county?: string;
  zipCode?: number|string;
  city?: string;
  street?: string;
  houseNumber?: number|string;
  floor?: number|string;
  door?: number|string;
  bell?: number|string;

  constructor() {
    this.country = 'Magyarország';
    this.county = 'Csongrád megye';
    this.zipCode = '';
    this.city = 'Szeged';
    this.street = '';
    this.houseNumber = '';
    this.floor = '';
    this.door = '';
    this.bell = '';
  }
}
