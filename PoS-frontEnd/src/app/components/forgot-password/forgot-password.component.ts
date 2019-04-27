import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import {first, catchError} from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition
  // ...
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  animations: [
    trigger('fade-shift', [
      state('void', style({ transform: 'translateX(500px)' })),
      transition(':enter', [
        animate(1500)
      ])
    ]),
    trigger('fade-in', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate(4000)
      ])
    ]),
    trigger('fade-in-slide', [
      state('void', style({ opacity: 0, transform: 'translateY(-40px)' })),
      transition(':enter', [
        animate(2000)
      ])
    ]),
    trigger('slide-in-right', [
      state('void', style({ transform: 'translateX(-40px)' })),
      transition(':enter', [
        animate(2000)
      ])
    ]),
    trigger('slide-in-left', [
      state('void', style({ transform: 'translateX(40px)' })),
      transition(':enter', [
        animate(2000)
      ])
    ])
  ],
  styleUrls: ['../login/login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {
    message: any;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;
  hide = true;
  redirect = environment.redirectUrl;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      useremail: ['', [Validators.required, Validators.email]]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  getErrorMessage(field: string) {
    if (field === 'email') {
      return this.f.useremail.errors.required
        ? 'email is required'
        : this.f.useremail.errors.email
        ? 'you must enter a valid email'
        : '';
    }

  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .forgotPassword(this.f.useremail.value);
      this.loading = false;
  }
}
