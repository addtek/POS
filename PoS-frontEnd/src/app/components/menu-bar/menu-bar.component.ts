import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { SidenavService } from 'src/app/_services/sideNavService';
import { AppComponent } from 'src/app/app.component';
import { AlertService, UserService, AuthenticationService } from 'src/app/_services';
import { FormGroup } from '@angular/forms';
import { UserProfileComponent } from '../user-profile/user-profile.component';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.sass']
})
export class MenuBarComponent implements OnInit {
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
  hide = true;
  notify: Array<any>;
  loadingModal;
  constructor(
    private dialog: MatDialog,
    private sidenav: SidenavService,
    private userService: UserService,
    private auth: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

  }

  toggleSideNav() {
    this.sidenav.toggle();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UserProfileComponent, {
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
      if (!result.invalid) { this.onSubmit(result); }
    });
  }

  onSubmit(data) {
    this.submitted = true;
    // stop here if form is invalid
    this.loading = true;
    this.userService.update(data)
      .subscribe(
        res => {
          this.loading = false;
          this.submitted = false;
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.auth.updateUser(data);
          this.alertService.success(res.toString());
        }
      );
  }

  logout() {
    this.auth.logoutUser(this.auth.currentUserValue.id);
  }
}
