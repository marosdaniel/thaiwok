import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public user: User;
  public isLoading: boolean = true;

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.user = user;
      this.isLoading = false;
    });
  }

  public updateUser() {
    this.auth.updateUser(this.user)
      .then(() => {
      });
  }
}
