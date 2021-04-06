import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private minLength = 5;
  user: FormGroup;
  validationError = false;
  validationMessages = {
    email: [
      { type: 'required', message: 'Username is required.' },
      { type: 'email', message: 'Invalid email.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: `Must be at least ${this.minLength} characters long.`,
      },
    ],
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.user = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(this.minLength)],
      ],
      reminder: [false],
    });
  }

  login() {
    if (this.user.invalid) {
      this.validationError = true;
      return;
    }
    this.validationError = false;
    console.log('Ok!');
  }

  get emailErrors() {
    return this.user.controls.email.errors;
  }

  get passwordErrors() {
    return this.user.controls.password.errors;
  }

  getErrorMessage(field: string, errorList: ValidationErrors) {
    const errorKey = Object.keys(errorList)[0];
    const errors = this.validationMessages[field];
    return errors?.find((validationMessage) => validationMessage.type === errorKey).message;
  }
}
