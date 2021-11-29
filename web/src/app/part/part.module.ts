import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import {SizeSelectComponent} from './size-select/size-select.component';
import {PageComponent} from './page/page.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [MenuComponent, HeaderComponent, LayoutComponent, NavComponent, SizeSelectComponent, PageComponent],
  exports: [
    MenuComponent,
    HeaderComponent,
    LayoutComponent,
    NavComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class PartModule {
}
