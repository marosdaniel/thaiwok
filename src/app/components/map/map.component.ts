import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: number = 46.253980;
  lng: number = 20.145810;
  labelFormat = {
    text: 'Thai Wok Express'
  };

  constructor() {
  }

  ngOnInit() {

  }

}
