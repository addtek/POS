import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { DetailerComponent } from '../detailer/detailer.component';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  title = 'App Dashboard | SPOS';
  data;
  users = null;
  stock = null;
  revenue = null;
  sold = null;
  constructor(
    private titleService: Title,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
     this.titleService.setTitle(this.title);
     this.userService.getDashboard()
       .subscribe(res => {
        this.users = res.users;
        this.stock = res.stock;
        this.revenue = res.revenue;
        this.sold = res.sales;
       });

  }
 openDialog(active): void {
    // const dialogRef = this.dialog.open(DetailerComponent, {
    //   width: '800px',
    //   disableClose: false,
    //   data: {
    //     active: active
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   // if (!result.invalid) {this.generateTimeTable();
    //   //  }
    // });
  }
}
