import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from '../../../../models/user.model';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-profile-history',
  templateUrl: './profile-history.component.html',
  styleUrls: ['./profile-history.component.scss']
})
export class ProfileHistoryComponent implements OnInit {

  public user: User;
  public hasHistory: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.user = user;
      this.hasHistory = this.user.history.length>0;
    });
  }

}
