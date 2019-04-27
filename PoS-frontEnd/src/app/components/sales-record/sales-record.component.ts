import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/_services';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemDropComponent } from '../item-drop/item-drop.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';

export interface SALE {
  id: number;
  itemName: string;
  quantity: number;
  price: any;
  created_at: any;
}

@Component({
  selector: 'app-sales-record',
  templateUrl: './sales-record.component.html',
  styleUrls: ['./sales-record.component.sass']
})
export class SalesRecordComponent implements OnInit {
  title = 'Sales Record';
  formGroup;
  dateData = {
    start: moment(new Date()).subtract(1, 'days'),
    end: moment(new Date()).subtract(1, 'days'),
  };
  displayedColumns: string[] = ['Item', 'Quantity', 'Price', 'DateSold', 'btn'];

  salesData = [];
sDate = this.dateData.start;
eDate = this.dateData.end;
  public pageSize = 10;

  saleBtnDisabled = false;
  isLoadingResults = false;
  private user;
  salesDataSource = new MatTableDataSource<SALE>(this.salesData);
  @ViewChild('paginator', { read: MatPaginator }) paginator: MatPaginator;
  constructor(
    private titleService: Title,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private auth: AuthenticationService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.user = this.auth.currentUserValue;
    this.formGroup = this._formBuilder.group({
      sDate: ['', ],
      eDate: ['', ],
    });
   this.showRecord();
  }
/** preview record */
showRecord () {
   this.isLoadingResults = true;
   this.userService.loadSalesRecord(
     this.sDate.format('YYYY-MM-DD'),
      this.eDate.format('YYYY-MM-DD')
    )
    .subscribe (
      res => {
         this.salesData = res;
        this.salesDataSource = new MatTableDataSource<SALE>(this.salesData);
        this.salesDataSource.paginator = this.paginator;
        this.isLoadingResults = false;
      },
      catchError((err: HttpErrorResponse) => {
         if (this.isLoadingResults) {
      this.isLoadingResults = !this.isLoadingResults;
    }
        return Observable.throw(err);
      })
    );
}
  removeFromSales(id: number) {
    const index = this.salesData.findIndex(obj => obj['id'] === id), item = this.salesData[index];
    if (item.quantity > 1) {
      const dialogref = this.dialog.open(
        ItemDropComponent, {
          width: '500px',
          data: { data: item }
        });
      dialogref.afterClosed().subscribe(
        result => {
          if (result.drop) {
            this.userService.dropSalesItem(this.user.id, { item: item.id, extra: result }, this.user.token)
              .subscribe(
                res => {
                 this.showRecord();
                  this.openSnackBar('1 Item dropped', '');
                }
              );
          }
        }
      );
    } else {

      this.userService.dropSalesItem(this.user.id, item.id, this.user.token)
        .subscribe(
          res => {
            this.showRecord();
            this.openSnackBar('1 Item dropped', '');
          }
        );
    }
  }
  openSnackBar(message: string, action: string) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 4000,
    });
    snackBarRef.onAction().subscribe(() => {
      // this.router.navigate(['app/stock/management']);
    });
  }
/** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.salesData.map( s => s.price).reduce( (acc, value) => acc + value, 0);
  }
}
