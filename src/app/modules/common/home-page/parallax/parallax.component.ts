import {Component, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements OnInit, OnDestroy {


  constructor() { }

  ngOnInit() {
    $('app-main').children().removeClass('container');
  }

  ngOnDestroy() {
    $('app-main').children().addClass('container');
  }

}
