import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import * as izitoast from 'iziToast';
import {errorSaveToaster, successSaveToaster} from '../../../../config/toasters/toasters';
import * as firebase from 'firebase';
import {CommonService} from '../../../../services/common/common.service';
import {User} from '../../../../models/user.model';


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

  constructor(public auth: AuthService, private commonService: CommonService) {}

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
        izitoast.default.show(successSaveToaster);
        this.isEditable = false;
      }).catch(() => {
      izitoast.default.show(errorSaveToaster);
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
