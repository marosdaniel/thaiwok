import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('hu');

  }
  switchLanguage(language: string) {
    this.translate.use(language);
    this.actualLanguage = language;
  }
  actualLanguage = this.translate.getBrowserLang();


}
