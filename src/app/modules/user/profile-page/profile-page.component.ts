import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public user: User;

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.user = user;
    });
  }
}
