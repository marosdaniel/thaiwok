import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    ($('.parallax')as any).parallax();
    $('app-main').children().removeClass("container");
  }

  ngOnDestroy() {
    $('app-main').children().addClass("container");
  }

}
