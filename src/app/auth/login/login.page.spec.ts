import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show errors with empty values', () => {
    component.login();
    expect(component.validationError).toBeTruthy();
  });

  it('should show errors with invalid values', () => {
    component.user.controls.email.setValue('invalid');
    component.user.controls.password.setValue('0');
    component.login();
    expect(component.validationError).toBeTruthy();
  });

  it('should success with valid values', () => {
    component.user.controls.email.setValue('valid@email.com');
    component.user.controls.password.setValue('12345');
    component.login();
    expect(component.validationError).toBeFalsy();
  });

  it('should retrieve email validation error messages', () => {
    let validationError = component.getErrorMessage('email', {required: true});
    expect(validationError).toBeDefined();
    validationError = component.getErrorMessage('email', {email: true});
    expect(validationError).toBeDefined();
  });

  it('should retrieve password validation error messages', () => {
    let validationError = component.getErrorMessage('password', {required: true});
    expect(validationError).toBeDefined();
    validationError = component.getErrorMessage('password', {minlength: true});
    expect(validationError).toBeDefined();
  });


  it('should not retrieve validation error message', () => {
    const validationError = component.getErrorMessage('invalidKey', {invalidValidationError: true});
    expect(validationError).toBeUndefined();
  });

});
