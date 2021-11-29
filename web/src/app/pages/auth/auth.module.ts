import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {FuncModule} from '../../func/func.module';
import {AuthRoutingModule} from './auth-routing.module';


@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        FuncModule
    ],
})
export class AuthModule {
}
