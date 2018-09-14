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
import * as Izitoast from 'iziToast';
import {successLoginToaster, successPasswordUpdateToaster, successSignupToaster} from '../../config/toasters/toasters';
import {CartService} from '../cart/cart.service';
import {StorageService} from '../storage/storage.service';
import {CommonService} from '../common/common.service';
import {User} from '../../models/user.model';



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
    private commonService: CommonService
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
        Izitoast.default.show(successLoginToaster);
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
        Izitoast.default.show(successLoginToaster);
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
        Izitoast.default.show(successSignupToaster);
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
        Izitoast.default.show(successLoginToaster);
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
      .then(() => Izitoast.default.show(successPasswordUpdateToaster))
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
    Izitoast.default.show({
        title: 'ERROR',
        class: 'iziToast-color-red',
        message: error.message,
        icon: 'fa fa-times-circle',
        closeOnEscape: true,
        timeout: 3000
    })
  }


  public updateUser(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    // save user to firebase
    return userRef.set(JSON.parse( JSON.stringify(user)));  // ez milyen hack?! :D
  }
}
