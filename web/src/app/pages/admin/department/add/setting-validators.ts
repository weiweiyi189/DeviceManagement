import {AbstractControl, ValidationErrors} from '@angular/forms';

export class SettingValidators {
  static isRightWebhook(control: AbstractControl): ValidationErrors | null {
    const webhook = control.value;
    if (webhook) {
      if (checkWebhook(webhook)) {
        return null
      }
      return {isRightWebhook: 'webhook校验错误'}
    }
    return null;
  }
}

// tslint:disable-next-line:typedef
function checkWebhook(val: string) {
  const myReg = /(http|https)\S*/;
  return myReg.test(val);
}
