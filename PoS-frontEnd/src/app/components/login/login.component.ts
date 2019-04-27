import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
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

import {AlertService, AuthenticationService} from '../../_services';
import { environment } from 'src/environments/environment';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  private subscription: Subscription;
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
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {

    // redirect if already logged in
    if (this.authenticationService.currentUserValue) {
      const currentUserRole = this.authenticationService.currentUserValue.userRole;
      switch (currentUserRole) {
        case 'SA':
        this.router.navigate([this.redirect.Admin]);
          break;
        case 'MAN':
        this.router.navigate([this.redirect.Admin]);
          break;
        case 'SM':
          this.router.navigate([this.redirect.Admin]);
          break;
        case 'MS':
          this.router.navigate([this.redirect.Admin]);
          break;
        case 'Tech':
          this.router.navigate([this.redirect.Admin]);
          break;
          default:
          this.router.navigate([this.redirect.Admin]);
          break;
      }
      // this.router.navigate(['/academics/clearance']);
      // console.log(this.authenticationService.currentUserValue);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  getErrorMessage(field: string) {
    if (field === 'username') {
      return this.f.username.errors.required ? 'You must enter a username' :
        this.f.username.errors.minlength ? 'username should not be less than ' + this.f.username.errors.minlength.requiredLength : '';

    } else if (field === 'password') {
      return this.f.password.errors.required ? 'You must enter your password' :
        this.f.password.errors.minlength ? 'password should not be less than ' + this.f.password.errors.minlength.requiredLength : '';

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
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
          const currentUserRole = data.userRole;
            switch (currentUserRole) {
              case 'SA':
                this.router.navigate([this.redirect.Admin]);
                break;
              case 'MAN':
                this.router.navigate([
                  this.redirect.Admin
                ]);
                break;
              case 'SM':
                this.router.navigate([
                  this.redirect.Admin
                ]);
                break;
              default:
                this.router.navigate([this.redirect.Department]);
                break;
            }
        }, (error: HttpErrorResponse ) => {
          this.loading = false;
        });
  }

}
