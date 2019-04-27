import { Component, OnInit } from '@angular/core';
 import {MatTableDataSource, MatDialog} from '@angular/material';
 import {User} from '../../_models/user';
import { UserService, AlertService, AuthenticationService } from 'src/app/_services';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.sass']
})
export class AllusersComponent implements OnInit {
  userData = [];
  roles;
  userDataSource = new MatTableDataSource<User>(this.userData);
  displayedColumns = [
    'userID',
    'Username',
    'Surname',
    'Othernames',
    'Role',
    'Status',
    'btn'
  ];
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
    private auth: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userService.getDepartmentsAndRoles().subscribe(res => {
      this.roles = res['roles'];
    });
    this.userService.getAllUsers().subscribe(arg => {
      this.userData = arg;
      this.userDataSource = new MatTableDataSource<User>(this.userData);
    });
  }
  openDialog(type): void {
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
      if (!result.invalid) {
        this.onSubmit(result);
      }
    });
  }
blockUser(id) {
  this.userService.block(id)
  .subscribe(
    res => {
      this.userData = res['users'];
      this.userDataSource = new MatTableDataSource<User>(this.userData);
     this.alertService.success(res['info'].toString());
    }
  );
}
  onSubmit(data) {
    this.submitted = true;
    // stop here if form is invalid

    this.loading = true;
    this.userService.register(data).subscribe(res => {
      this.loading = false;
      this.submitted = false;
      this.loadingModal.close();
      this.alertService.success(res.toString());
    });
  }
}
