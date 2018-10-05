import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import {SnotifyConfigService} from '../snotify/snotify-config.service';
import {LanguageService} from '../language/language.service';
import {mustBeLoggedInToaster} from '../../config/toaster.config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private snotify: SnotifyConfigService,
    private languageService: LanguageService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          // console.log('access denied');
          this.snotify.onWarning(this.languageService.actualLanguage === 'hu' ? mustBeLoggedInToaster.titleText.hu : mustBeLoggedInToaster.titleText.en,
            this.languageService.actualLanguage === 'hu' ? mustBeLoggedInToaster.bodyText.hu : mustBeLoggedInToaster.bodyText.en);
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
