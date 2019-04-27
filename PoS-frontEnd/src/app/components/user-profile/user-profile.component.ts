import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, AuthenticationService } from 'src/app/_services';
import { AlertService } from 'src/app/_services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  private subscription: Subscription;
  message: any;
  regForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;
  hide = true;
  departments: [];
  roles: [
    { role_id: 1, role_name: 'Admin' },
    { role_id: 2, role_name: 'User' }
  ];
  redirect = environment.redirectUrl;
  user;
  userRole;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getOptions();
     this.user = this.auth.currentUserValue;
     this.regForm = this.formBuilder.group({
       username: [{ value: this.user.un, disabled: false}, [Validators.required, Validators.minLength(6)]],
       sname: ['', [Validators.required, Validators.minLength(2)]],
       oname: ['', []],
       email: ['', [Validators.required, Validators.email]],
       phone: ['', [Validators.required]]
      });

    // this.regForm.controls.username.setValue(this.user.un);
    this.regForm.controls.sname.setValue(this.user.sn);
    this.regForm.controls.oname.setValue(this.user.on);
    this.regForm.controls.email.setValue(this.user.email);
    this.regForm.controls.phone.setValue(this.user.phoneNum);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onCancelClick(): void {
    this.dialogRef.close({ invalid: true });
  }
  // convenience getter for easy access to form fields
  get f() { return this.regForm.controls; }

  getErrorMessage(field: string) {

    switch (field) {
      case 'username':
      return this.f.username.errors.required ? 'You must enter a username' :
      this.f.username.errors.minlength ? 'username should not be less than ' + this.f.username.errors.minlength.requiredLength : '';
      // case 'password':
      //   return this.f.password.errors.required ? 'You must set password' :
      //     this.f.password.errors.minlength ? 'password should not be less than ' + this.f.password.errors.minlength.requiredLength : '';
      // case 'confirmpassword':
      //   return this.regForm.hasError('passwordMismatch') ?
      //   'Password Mismatch' : '';
      case 'sname':
        return this.f.sname.errors.required ? 'You must enter last name' :
          this.f.sname.errors.minlength ? 'last name can\'t be less than ' + this.f.sname.errors.minlength.requiredLength : '';
      case 'oname':
        return this.f.oname.errors.required ? 'You must enter other names' :
          this.f.oname.errors.minlength ? 'other names can\'t be less than ' + this.f.oname.errors.minlength.requiredLength : '';
      case 'email':
      return this.f.email.errors.required ? 'You must enter email' :
      this.f.email.errors.email ? 'you must provide a valid email address' : '';
      case 'phone':
      return this.f.phone.errors.required ? 'You must enter your phone number' : '';
      case 'role':
      return this.f.role.errors.required ? 'You must select a role' : '';

      default:
      break;
    }

  }
  getOptions() {
    this.userService.getDepartmentsAndRoles()
    .subscribe(
      res => {
        this.roles = res['roles'];
        });
  }
  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (!this.regForm.invalid) {
      this.loading = true;
      this.dialogRef.close({
        invalid: false,
        id: this.user.id,
        sn: this.regForm.controls.sname.value,
        on: this.regForm.controls.oname.value,
        un: this.regForm.controls.username.value,
        phoneNum: this.regForm.controls.phone.value,
        email: this.regForm.controls.email.value,
        userRole: this.user.userRole,
        token: this. user.token
      });
    }
  }
}
// export const confirmPassword: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
//   if (formGroup.get('password').value === formGroup.get('confirmpassword').value) {
//     return null;
//   } else {
//     return { passwordMismatch: true };
//   }
// };
