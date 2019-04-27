import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService, AuthenticationService, UserService } from 'src/app/_services';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from '../register/register.component';
import { AllusersComponent } from '../allusers/allusers.component';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  private subscription: Subscription;
  message: any;
  regForm: FormGroup;
  loading = false;
  submitted = false;
  lname: string;
  oname: string;
  username: string;
  phone: string;
  role: string;
  password: string;
  email: string;
  returnUrl: String;
  hide = true;
  loadingModal;
  redirect = environment.redirectUrl;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
openDialog(type): void {
  const showConponent = type === 'reg' ? RegisterComponent : null;
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px',
      disableClose: true,
      data: {
        lname: this.lname,
        oname: this.oname,
        username: this.username,
        phone: this.phone,
        password: this.password,
        email: this.email,
        role: this.role
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result.invalid) {this.onSubmit(result); }
    });
  }
openUsersDialog(type): void {

    const dialogRef = this.dialog.open(AllusersComponent, {
      width: '600px',
      disableClose: true,
      data: {
        lname: this.lname,
        oname: this.oname,
        username: this.username,
        phone: this.phone,
        password: this.password,
        email: this.email,
        role: this.role
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result.invalid) {this.onSubmit(result); }
    // });
  }
  showLoading() {
    this.loadingModal = this.dialog.open(
      LoadingComponent,
    {  width: '600px',
    disableClose: true,
    data: {
      loading: this.loading
    }}
    ) ;
    this.loadingModal.afterClosed().subscribe(result => {
    });
  }
  onSubmit(data) {
    this.submitted = true;
    // stop here if form is invalid
    this.showLoading();
    this.loading = true;
    this.userService.register(data)
      .subscribe(
        res => {
          this.loading = false;
          this.submitted = false;
          this.loadingModal.close();
          this.alertService.success(res.toString());
        }
      );
  }
}

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./settings.component.sass']
})
export class LoadingComponent implements OnInit {
  colorType = ['primary', 'accent', 'warn'];
  intialcolor = 'primary';
  mode = 'indeterminate';
  value = 50;
  canChangeColor: Boolean = true;
  constructor(
    public dialogRef: MatDialogRef<LoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit() {
    this.changeColor();
  }
  changeColor() {
      this.intialcolor = this.colorType[Math.floor(Math.random() * this.colorType.length)];
     setTimeout(() => {
       this.changeColor();
     }, 200);
  }
}
