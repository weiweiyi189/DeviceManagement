import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncModule } from './func/func.module';
import { PartModule } from './part/part.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {YunzhiInterceptor} from './net/yunzhi.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { RepairComponent } from './pages/user/repair/repair.component';
import { UserComponent } from './pages/user/user/user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {YzUploaderModule} from '@yunzhi/ng-common';
import {AttachmentService} from './service/attachment.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FuncModule,
    PartModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    YzUploaderModule.forRoot({
      uploaderService: AttachmentService
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: YunzhiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
