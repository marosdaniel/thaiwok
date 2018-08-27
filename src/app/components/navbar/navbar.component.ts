import {LanguageService} from '../../services/language/language.service';
import {Component, EventEmitter, OnInit} from '@angular/core';
import * as M from 'materialize-css';
import {AuthService} from '../../services/auth/auth.service';
import {MaterializeAction} from 'angular2-materialize';
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, public language: LanguageService) {
  }

  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
    $(".button-collapse").sideNav({
      menuWidth: 240,
      // closeOnClick: true
    });

    $('.sidenav-close').click( () => {
      $('.button-collapse').sideNav('hide');
    });

    $('.dropdown-menu-types-desktop').dropdown({
        inDuration: 300,
        outDuration: 225,
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
      }
    );

  }
  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }


}
