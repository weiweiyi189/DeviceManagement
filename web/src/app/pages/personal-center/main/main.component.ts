import {Component, OnInit} from '@angular/core';
import {User} from '../../../func/User';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  /**
   * 当前登录用户
   */
  currentUser: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getCurrentLoginUser$()
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }
}
