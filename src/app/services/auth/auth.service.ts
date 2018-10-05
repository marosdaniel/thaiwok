import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {auth} from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable, of} from 'rxjs';
import 'rxjs/add/observable/of';
import {switchMap} from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {CartService} from '../cart/cart.service';
import {StorageService} from '../storage/storage.service';
import {CommonService} from '../common/common.service';
import {User} from '../../models/user.model';
import {SnotifyConfigService} from '../snotify/snotify-config.service';
import {LanguageService} from '../language/language.service';
import {successLoginToaster, successPasswordUpdateToaster, successSignupToaster} from '../../config/toaster.config';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;


  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private storageService: StorageService,
    private cartService: CartService,
    private commonService: CommonService,
    private snotify: SnotifyConfigService,
    private languageService: LanguageService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  ////// OAuth Methods /////
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        // return this.updateUserData(credential.user);
        // use own save functionality
        // return this.updateUser(credential.user);
      })
      .catch(error => this.handleError(error));
  }


  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        this.snotify
          .onSuccess(this.languageService.actualLanguage === 'hu' ? successLoginToaster.titleText.hu : successLoginToaster.titleText.en,
            this.languageService.actualLanguage === 'hu' ? successLoginToaster.bodyText.hu : successLoginToaster.bodyText.en);
        // return this.updateUserData(credential.user); // if using firestore
        // use own save functionality
        return this.updateUser(credential.user);
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.snotify
          .onSuccess(this.languageService.actualLanguage === 'hu' ? successSignupToaster.titleText.hu : successSignupToaster.titleText.en,
            this.languageService.actualLanguage === 'hu' ? successSignupToaster.bodyText.hu : successSignupToaster.bodyText.en);
        this.navigateToProfile();
        // return this.updateUserData(credential.user); // if using firestore
        // use own save functionality
        return this.updateUser(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.snotify
          .onSuccess(this.languageService.actualLanguage === 'hu' ? successLoginToaster.titleText.hu : successLoginToaster.titleText.en,
            this.languageService.actualLanguage === 'hu' ? successLoginToaster.bodyText.hu : successLoginToaster.bodyText.en);
        this.navigateToProfile();
        // return this.updateUserData(credential.user);
        // use own save functionality
        // return this.updateUser(credential.user);  // ez reseteli loginkor a user adatait, így nem maradnak meg a mentések
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.snotify
          .onSuccess(this.languageService.actualLanguage === 'hu' ? successPasswordUpdateToaster.titleText.hu : successPasswordUpdateToaster.titleText.en,
            this.languageService.actualLanguage === 'hu' ? successPasswordUpdateToaster.bodyText.hu : successPasswordUpdateToaster.bodyText.en);
      })
      .catch(error => this.handleError(error));
  }

  updateEmail (newEmail) {
   const user = firebase.auth().currentUser;
    user.updateEmail(newEmail).then(function() {
      // Update successful.
    }).catch(error => this.handleError(error));
  }


  private navigateToProfile() {
    this.router.navigate(['/profile/personal-info']);
  }

  public navigateToHome() {
  this.router.navigate(['/home']);
  }

  // logout
  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/'])
      .then(() => {
        this.storageService.clearThaiWokLocalStorages();
      });
        this.commonService.pageRefresh();
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.snotify
      .onError(error.name, error.message);
  }


  public updateUser(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    // save user to firebase
    return userRef.set(JSON.parse( JSON.stringify(user)));  // ez milyen hack?! :D
  }
}
