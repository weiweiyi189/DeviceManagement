import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {CommonService} from '../../service/common.service';
import {User} from "../../func/User";
import {AuthService} from "../../service/auth.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  color: string;
  currentUser: User;
  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService) {
  }
  ngOnInit(): void {
    this.color = 'blue';
    this.init();
  }
  init(): void {
    this.authService.getCurrentLoginUser$()
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

  logout(): void {
    this.userService.logout()
      .subscribe(() => {
      }, () => {
      }, () => {
        this.router.navigateByUrl('');
      });
  }


  ngOnDestroy(): void {
  }
}
