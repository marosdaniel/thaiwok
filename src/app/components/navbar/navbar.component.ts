import {LanguageService} from '../../services/language/language.service';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user.model';

declare var $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: User;

  constructor(public auth: AuthService, public language: LanguageService) {
  }

  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.user = user;
    });
    this.autoCollapseNavbar();
  }


  private autoCollapseNavbar() {
    $('.autoCollapse').on('click', () => {
      ($('.navbar-collapse')as any).collapse('hide');
    });
  }
}
