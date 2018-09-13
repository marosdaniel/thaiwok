import {Component, OnInit} from '@angular/core';
import {OpenHoursService} from '../../../../services/open-hours/open-hours.service';
import {LanguageService} from '../../../../services/language/language.service';
import {Observable} from 'rxjs';
import {AngularFireList} from 'angularfire2/database';
import {FirebaseService} from '../../../../services/firebase/firebase.service';

@Component({
  selector: 'app-open-hours',
  templateUrl: './open-hours.component.html',
  styleUrls: ['./open-hours.component.scss']
})
export class OpenHoursComponent implements OnInit {
  openHours;
  exceptionalDays;
  isLoading: boolean = true;

  constructor(
    private firebaseService: FirebaseService,
    private openHoursService: OpenHoursService,
    public languageService: LanguageService) {
  }

  ngOnInit() {
    this.openHours = this.openHoursService.getOpenHours()
      .subscribe(result => {
        this.openHours = result;
      });
    this.exceptionalDays = this.openHoursService.getExceptionalDays()
      .subscribe(result => {
        this.exceptionalDays = result;
      });
    this.isLoading = false;
  }

}
