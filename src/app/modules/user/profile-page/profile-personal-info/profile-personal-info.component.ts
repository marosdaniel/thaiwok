import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import * as firebase from 'firebase';
import {CommonService} from '../../../../services/common/common.service';
import {User} from '../../../../models/user.model';
import {SnotifyConfigService} from '../../../../services/snotify/snotify-config.service';
import {LanguageService} from '../../../../services/language/language.service';
import {errorSaveToaster, successSaveToaster} from '../../../../config/toaster.config';


@Component({
  selector: 'app-profile-personal-info',
  templateUrl: './profile-personal-info.component.html',
  styleUrls: ['./profile-personal-info.component.scss']
})
export class ProfilePersonalInfoComponent implements OnInit {
  public user: User;
  public isLoading = true;
  public isEditable = false;
  public newEmail: string;
  public currentUser;
  public validMailFormat: boolean;

  constructor(public auth: AuthService,
              private commonService: CommonService,
              private snotify: SnotifyConfigService,
              private languageService: LanguageService) {}

  ngOnInit() {
    this.user = new User();
    this.auth.user.subscribe(user => {
      this.user = user;
      this.isLoading = false;
    });

    this.newEmail = '';
    this.currentUser = firebase.auth().currentUser;
    this.validMailFormat = this.commonService.isValidMailFormat(this.newEmail);
  }

  logout() {
    this.auth.signOut();
  }

  public updateUser() {
    this.auth.updateUser(this.user)
      .then(() => {
        this.snotify.onSuccess(this.languageService.actualLanguage === 'hu' ? successSaveToaster.titleText.hu : successSaveToaster.titleText.en,
          this.languageService.actualLanguage === 'hu' ? successSaveToaster.bodyText.hu : successSaveToaster.bodyText.en);
        this.isEditable = false;
      }).catch(() => {
      this.snotify.onError(this.languageService.actualLanguage === 'hu' ? errorSaveToaster.titleText.hu : errorSaveToaster.titleText.en,
        this.languageService.actualLanguage === 'hu' ? errorSaveToaster.bodyText.hu : errorSaveToaster.bodyText.en);
    });
  }

  public editUser () {
    this.isEditable = true;
  }

  public updateEmail() {
    this.auth.updateEmail(this.newEmail);
    this.newEmail = '';
  }

}
