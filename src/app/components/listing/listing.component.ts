import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  @Input() data: any[];
  @Input() variant: String;

  constructor() { }

  ngOnInit() {
    // console.log(this.variant);
  }

}
