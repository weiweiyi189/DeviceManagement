import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ForgetComponent} from './forget.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../../service/auth.service';
import {of} from 'rxjs';

describe('LoginComponent', () => {
  let component: ForgetComponent;
  let fixture: ComponentFixture<ForgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgetComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reset', () => {
    component.forgetForm.patchValue({username: '456', password: '123'});
    const authService = TestBed.inject(AuthService) as AuthService;
    let params;
    spyOn(authService, 'login').and.callFake(p => {
      params = p;
      return of();
    });
    component.reset();
    expect(authService.login).toHaveBeenCalled();
    expect(params.username).toEqual('456');
    expect(params.password).toEqual('123');
  });
});
