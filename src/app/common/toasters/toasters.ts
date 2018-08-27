// IZITOASTER CONFIGS


// SUCCESS SAVE TOASTER
import {IziToastPosition} from 'izitoast';

export const successSaveToaster = {
  title: 'SUCCESS',
  class: 'iziToast-color-green',
  message: 'Sikeres mentés :)',
  icon: 'fa fa-check',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

// ERROR SAVE TOASTER
export const errorSaveToaster = {
  title: 'ERROR',
  class: 'iziToast-color-red',
  message: 'Sikertelen mentés :(',
  icon: 'fa fa-times-circle',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

// SUCCESS LOGIN TOASTER
export const successLoginToaster = {
  title: 'SUCCESS',
  class: 'iziToast-color-green',
  message: 'Sikeres bejelentkezés :)',
  icon: 'fa fa-check',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

// ERROR LOGIN TOASTER
export const errorLoginToaster = {
  title: 'ERROR',
  class: 'iziToast-color-red',
  message: 'Sikertelen bejelentkezés :(',
  icon: 'fa fa-times-circle',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

// SUCCESS SIGNUP TOASTER
export const successSignupToaster = {
  title: 'SUCCESS',
  class: 'iziToast-color-green',
  message: 'Sikeres regisztráció :)',
  icon: 'fa fa-check',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

// ERROR SIGNUP TOASTER
export const errorSignupToaster = {
  title: 'ERROR',
  class: 'iziToast-color-red',
  message: 'Sikertelen regisztráció :(',
  icon: 'fa fa-times-circle',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

export const successPasswordUpdateToaster = {
  title: 'Új jelszó',
  class: 'iziToast-color-green',
  message: 'Jelszófrissítés sikeres :)',
  icon: 'fa fa-check',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}


export const mustBeLoggedInToaster = {
  title: 'ERROR',
  class: 'iziToast-color-orange',
  message: 'Jelentkezz be!',
  icon: 'fa fa-exclamation-circle',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

// SUCCESS ORDER TOASTER
export const successOrderToaster = {
  title: 'SUCCESS',
  class: 'iziToast-color-green',
  message: 'Sikeres megrendelés :)',
  icon: 'fa fa-check',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

export const errorNoSelectedItemToaster = {
  title: 'ERROR',
  class: 'iziToast-color-red',
  message: 'Válassz ételt a kosárhoz adáshoz',
  icon: 'fa fa-exclamation-circle',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

export const successAddToCartToaster = {
  title: 'SUCCESS',
  class: 'iziToast-color-green',
  message: 'A termék a kosárba került',
  icon: 'fa fa-check',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

// ERROR WRONG EMAIL FORMAT
export const errorEmailFormat = {
  title: 'ERROR',
  class: 'iziToast-color-red',
  message: 'Hibás e-mail',
  icon: 'fa fa-times-circle',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

// ERROR WRONG EMAIL FORMAT
export const errorPassReset = {
  title: 'ERROR',
  class: 'iziToast-color-red',
  message: 'Új jelszavát már elküldtük e-mailben',
  icon: 'fa fa-times-circle',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}

// ERROR EMAIL IS MISSING
export const errorNoEmail = {
  title: 'ERROR',
  class: 'iziToast-color-red',
  message: 'Kérjük írja adja meg e-mail címét',
  icon: 'fa fa-times-circle',
  closeOnEscape: true,
  timeout: 3000,
  position: 'topRight' as IziToastPosition
}
