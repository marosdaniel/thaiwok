import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  actualLanguage = this.storageService.getLocalStorageLanguage() || this.translate.getBrowserLang();

  constructor(private translate: TranslateService, private storageService: StorageService) {
    translate.setDefaultLang(this.storageService.getLocalStorageLanguage() || 'hu');

  }
  switchLanguage(language: string) {
    this.translate.use(language);
    this.storageService.setLocalStorageLanguage(language);
    this.actualLanguage = language;
  }
}
