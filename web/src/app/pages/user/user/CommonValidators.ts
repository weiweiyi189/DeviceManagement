import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from "../../../func/User";

@Injectable({
  providedIn: 'root'
})
export class CommonValidators {
  constructor(private httpClient: HttpClient,
              private userService: UserService) {
  }

  /**
   * 验证方法，用户名不存在验证通过
   * @param control FormControl
   */
  usernameNotExist(user?: User): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value === '') {
        return of(null);
      }
      console.log(user);
      return this.userService.existByUsername(control.value).pipe(map(exists => {
        if (user) {
          console.log(15);
          return exists && user.username !== control.value ? {usernameExist: true} : null;
        }
        return exists ? {usernameExist: true} : null;
      }));
    };
  }

}

