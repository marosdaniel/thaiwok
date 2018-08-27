import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../app/services/firebase/firebase.service';
import {LanguageService} from './services/language/language.service';
import {AuthService} from './services/auth/auth.service';
import {UserIdleService} from 'angular-user-idle';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import {Subscription} from 'rxjs/Subscription';
import {StorageService} from './services/storage/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  menu: any[];

  public constructor(
    private firebaseService: FirebaseService,
    private language: LanguageService,
    private auth: AuthService,
    private userIdle: UserIdleService,
    private storageService: StorageService
  ) {

  }

  public ngOnInit() {
    let category: string;
    this.firebaseService.getMenuObservable(category).subscribe(result => {
      this.menu = result;
    });

    // multiple events for trigger timer restart
//     // First, create a separate observable for each event:
//     const scrollEvents$    = Observable.fromEvent($element, 'scroll');
//     const wheelEvents$     = Observable.fromEvent($element, 'wheel');
//     const touchMoveEvents$ = Observable.fromEvent($element, 'touchmove');
//     const touchEndEvents$  = Observable.fromEvent($element, 'touchend');
//
// // Then, merge all observables into one single stream:
//     const allEvents$ = Observable.merge(
//       scrollEvents$,
//       wheelEvents$,
//       touchMoveEvents$,
//       touchEndEvents$
//     );

    this.subscription =
      Observable.fromEvent(document, 'mousemove')
        .subscribe(e => {
          // console.log(e); // log mouse event
          this.restart();
        });

    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => {
      if (count == 600) { // timeout in sec
        // console.log(count);
        if(this.auth.user){
          this.auth.signOut();
        } else {
          this.storageService.clearThaiWokLocalStorages();
        }
      }
    });

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() =>
      console.log('letelt az inaktivitási idő'));
  }

  // --------------------------------------------
  // FUNCTIONS FOR USER IDLE
  // --------------------------------------------
  private stop() {
    this.userIdle.stopTimer();
  }

  private stopWatching() {
    this.userIdle.stopWatching();
  }

  private startWatching() {
    this.userIdle.startWatching();
  }

  private restart() {
    this.userIdle.resetTimer();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
