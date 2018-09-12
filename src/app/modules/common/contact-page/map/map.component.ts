import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import 'here-js-api/scripts/mapsjs-core';
import 'here-js-api/scripts/mapsjs-service';
import 'here-js-api/scripts/mapsjs-ui';
import 'here-js-api/scripts/mapsjs-mapevents';
import 'here-js-api/scripts/mapsjs-clustering';
import 'here-js-api/scripts/mapsjs-places';
import {appCode, appId} from '../../../../../environments/map.apikey';

declare var H: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit, AfterViewInit {

  private platform: any;
  private pixelRatio: any;
  private defaultLayers: any;
  private map: any;
  private behavior: any;
  private ui: any;

  @ViewChild("map")
  public mapElement: ElementRef;

  constructor() {

  }

  ngOnInit() {
    this.platform = new H.service.Platform({
      app_id: appId,
      app_code: appCode,
      useHTTPS: true
    });
    this.pixelRatio = window.devicePixelRatio || 1;
    this.defaultLayers = this.platform.createDefaultLayers({
      tileSize: this.pixelRatio === 1 ? 256 : 512,
      ppi: this.pixelRatio === 1 ? undefined : 320
    });
    this.map = new H.Map(document.getElementById('map'),
    this.defaultLayers.normal.map, {pixelRatio: this.pixelRatio});
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
    this.moveMapToThaiWok(this.map)

  }


  ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    let map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 14,
        center: { lat: 37.7397, lng: -121.4252 }
      }
    );
  }

  private moveMapToThaiWok(map){
    map.setCenter({lat:46.253979, lng:20.145809});
    map.setZoom(17);
  }

}
