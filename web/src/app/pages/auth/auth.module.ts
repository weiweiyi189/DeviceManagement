import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FuncModule} from '../../func/func.module';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginModule} from './login/login.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FuncModule,
    LoginModule
  ],
})
export class AuthModule {
}
