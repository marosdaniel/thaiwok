import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class SnotifyConfigService {

  style = 'material';
  title = 'Snotify title!';
  body = 'Lorem ipsum dolor sit amet!';
  timeout = 3000;
  position: SnotifyPosition = SnotifyPosition.rightBottom;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = false;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 80;

  constructor(private snotifyService: SnotifyService) {}

  /*
  Change global configuration
   */
  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }

  onSuccess(titleText: string, bodyText: string) {
    this.snotifyService.success(bodyText, titleText, this.getConfig());
  }
  onInfo(titleText: string, bodyText: string) {
    this.snotifyService.info(bodyText, titleText, this.getConfig());
  }
  onError(titleText: string, bodyText: string) {
    this.snotifyService.error(bodyText, titleText, this.getConfig());
  }
  onWarning(titleText: string, bodyText: string) {
    this.snotifyService.warning(bodyText, titleText, this.getConfig());
  }
  onSimple(bodyText: string, titleText: string) {

    // const icon = `assets/custom-svg.svg`;
    const icon = `https://placehold.it/48x100`;

    this.snotifyService.simple(bodyText, titleText, {
      ...this.getConfig(),
      icon: icon
    });
  }

  onClear() {
    this.snotifyService.clear();
  }
}
