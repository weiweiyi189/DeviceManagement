import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {YzSubmitButtonTestModule} from '../../../func/yz-submit-button/yz-submit-button-test.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../../service/auth.service';
import {of} from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        YzSubmitButtonTestModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login', () => {
    component.loginForm.patchValue({username: '456', password: '123'});
    const authService = TestBed.inject(AuthService) as AuthService;
    let params;
    spyOn(authService, 'login').and.callFake(p => {
      params = p;
      return of();
    });
    component.login();
    expect(authService.login).toHaveBeenCalled();
    expect(params.username).toEqual('456');
    expect(params.password).toEqual('123');
  });
});
