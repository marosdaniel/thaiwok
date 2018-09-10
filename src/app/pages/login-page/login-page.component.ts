import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as Izitoast from 'izitoast';
import {errorEmailFormat, errorNoEmail, errorPassReset, successLoginToaster} from '../../common/toasters/toasters';
import {CommonService} from '../../services/common/common.service';


type FormErrors = { [u in UserFields]: string };
type UserFields = 'email' | 'password';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  userForm: FormGroup;
  newUser = true; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
  };

  constructor(public auth: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  // --------------------------------------------
  // FUNCTIONS FOR LOGIN
  // --------------------------------------------

  signup() {
    this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']);
  }

  login() {
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
  }

  resetPassword() {
    if (this.userForm.value['email'] == '') {
      Izitoast.default.show(errorNoEmail);

    } else {
      if (this.commonService.isValidMailFormat(this.userForm.value['email'])) {

        if (!this.passReset) {

          this.auth.resetPassword(this.userForm.value['email'])
            .then(() => this.passReset = true);
        }
        else {
          Izitoast.default.show(errorPassReset);
          return;
        }
      } else {
        Izitoast.default.show(errorEmailFormat);
      }
    }

  }

  toggleForm() {
    this.newUser = !this.newUser;
  }





  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });

    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${(messages as { [key: string]: string })[key]} `;
              }
            }
          }
        }
      }
    }
  }


  /// Social Login
  async signInWithGithub() {
    await this.auth.githubLogin();
    return await this.afterSignIn();
  }

  async signInWithGoogle() {
    await this.auth.googleLogin();
    return await this.afterSignIn();
  }

  async signInWithFacebook() {
    await this.auth.facebookLogin();
    await this.afterSignIn();
  }

  async signInWithTwitter() {
    await this.auth.twitterLogin();
    return await this.afterSignIn();
  }

  /// Anonymous Sign In
  async signInAnonymously() {
    await this.auth.anonymousLogin();
    return await this.afterSignIn();
  }

  /// Shared
  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    return this.router.navigate(['/profile']);
  }


}