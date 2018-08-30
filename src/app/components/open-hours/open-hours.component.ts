import { Component, OnInit } from '@angular/core';
import {OpenHoursService} from '../../services/open-hours/open-hours.service';
import {openHours} from '../../config/open-hours.config';
import {LanguageService} from '../../services/language/language.service';

@Component({
  selector: 'app-open-hours',
  templateUrl: './open-hours.component.html',
  styleUrls: ['./open-hours.component.scss']
})
export class OpenHoursComponent implements OnInit {
  openHours: any[];

  constructor(private openHoursService: OpenHoursService, public languageService: LanguageService) { }

  ngOnInit() {
    this.openHours = openHours;
  }

}
