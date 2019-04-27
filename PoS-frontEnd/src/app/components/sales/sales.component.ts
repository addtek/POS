import { Component, OnInit, ViewChild, QueryList, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { UserService, AuthenticationService } from 'src/app/_services';
import { Router } from '@angular/router';
import { ItemDropComponent } from '../item-drop/item-drop.component';

export interface STOCK {
  id: number;
  category: string;
  itemName: string;
  numberInStock: number;
  pricePerItem: any;
  minQty: number;
}
export interface SALE {
  id: number;
  itemName: string;
  quantity: number;
  price: any;
}
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.sass']
})
export class SalesComponent implements OnInit {
  displayedColumns: string[] = ['Item', 'Quantity', 'Price', 'btn'];
  availdisplayedColumns: string[] = ['Item', 'Quantity', 'Price', 'btn'];
  salesData = [];
  stockData = [];
  public pageSize = 10;
  title = 'Sales Management';
  public currentPage = 0;
  public totalSize = 0;
  public stockPageSize = 10;
  public stockCurrentPage = 0;
  public stockTotalSize = 0;
  saleBtnDisabled = false;
  isLoadingResults = true;
  salesDataSource = new MatTableDataSource<SALE>(this.salesData);
  stockDataSource = new MatTableDataSource<STOCK>(this.stockData);
  @ViewChild('paginator', {read: MatPaginator}) paginator: MatPaginator;
  @ViewChild('stockpaginator', {read: MatPaginator}) stockpaginator: MatPaginator;
  @ViewChild('qtyInput') quantity: QueryList<HTMLInputElement>;
  private user;
  constructor(
    private titleService: Title,
    private userService: UserService,
    private auth: AuthenticationService,
    private element: ElementRef,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.stockpaginator.pageIndex = 0;
    this.user = this.auth.currentUserValue;
    this.userService.getAllCategory()
    .subscribe(
      res => {
        this.stockData = res.stock;
        this.stockDataSource = new MatTableDataSource <STOCK>(this.stockData);
        this.stockTotalSize = this.stockData.length;
        this.stockDataSource.paginator = this.stockpaginator;
        this.salesData = res.today_sales;
        this.isLoadingResults = false;
        this.salesDataSource = new MatTableDataSource<SALE>(this.salesData);
        this.totalSize = this.salesData.length;
        this.salesDataSource.paginator = this.paginator;
      }
    );
    this.salesDataSource.paginator = this.paginator;
  }
  private iterator() {
  const end = (this.stockCurrentPage + 1) * this.stockPageSize;
  const start = this.stockCurrentPage * this.stockPageSize;
  const part = this.stockData.slice(start, end);
  this.stockDataSource =  new MatTableDataSource<STOCK>(part);
}
  public handleStockPage(e: any) {
    this.stockCurrentPage = e.pageIndex;
    this.stockPageSize = e.pageSize;
    this.iterator();
  }
  applyFilter(filterValue: string) {
    this.salesDataSource.filter = filterValue.trim().toLowerCase();
    if (this.salesDataSource.paginator) {
      this.salesDataSource.paginator.firstPage();
    }
  }

  applyStockFilter(filterValue: string) {
    this.stockDataSource.filter = filterValue.trim().toLowerCase();
    if (this.stockDataSource.paginator) {
      this.stockDataSource.paginator.firstPage();
    }
  }

  removeFromSales(id: number) {
    const index = this.salesData.findIndex(obj => obj['id'] === id), item = this.salesData[index];
    if (item.quantity > 1) {
      const dialogref = this.dialog.open(
        ItemDropComponent, {
          width: '500px',
          data: { data: item }
         });
         dialogref.afterClosed().subscribe (
           result => {
            if (result.drop) {
             this.userService.dropSalesItem(this.user.id, {item: item.id, extra: result}, this.user.token )
            .subscribe(
              res => {
                this.salesData = res.sales;
                this.salesDataSource = new MatTableDataSource<any>(this.salesData);
                this.salesDataSource.paginator = this.paginator;
                this.salesDataSource.paginator.lastPage();
                this.stockData = res.stock;
                this.stockDataSource = new MatTableDataSource<any>(this.stockData);
                this.stockDataSource.paginator = this.stockpaginator;
                this.openSnackBar('1 Item dropped', '');
              }
            );
          }
           }
         );
    } else {

      this.userService.dropSalesItem(this.user.id, item.id, this.user.token )
      .subscribe(
        res => {
          this.salesData = res.sales;
          this.salesDataSource = new MatTableDataSource<any>(this.salesData);
          this.salesDataSource.paginator = this.paginator;
          this.salesDataSource.paginator.lastPage();
          this.stockData = res.stock;
          this.stockDataSource = new MatTableDataSource<any>(this.stockData);
          this.stockDataSource.paginator = this.stockpaginator;
          this.openSnackBar('1 Item dropped', '');
        }
      );
    }
  }
  addToSales(id: number, el) {
    this.saleBtnDisabled = true;
    const index = this.stockData.findIndex(obj => obj['id'] === id),
    item = this.stockData[index], qtyField =  this.element.nativeElement.querySelectorAll('.salesQty');
    let val ;

      val = qtyField[el].value ;  qtyField[el].value = 1;

    this.userService.addSalesItem(
      this.user.id,
      {
        itemName: item.itemName,
        quantity: val,
        price: item.pricePerItem * val
      },
      this.user.token)
    .subscribe(
      res => {
        this.salesData = res.sales;
        this.stockData = res.stock;
        this.salesDataSource = new MatTableDataSource<any>(this.salesData);
        this.salesDataSource.paginator = this.paginator;
        this.salesDataSource.paginator.lastPage();
        this.stockDataSource = new MatTableDataSource<any>(this.stockData);
        this.stockDataSource.paginator = this.stockpaginator;
         this.openSnackBar('Item added to sales', '');
      }
    );
    this.saleBtnDisabled = false;
  }

  itemQuantity (id: number, type: number, el) {

    const index = this.stockData.findIndex( obj => obj['id'] === id ),
    item = this.stockData[index],
    qtyField = this.element.nativeElement.querySelectorAll('.salesQty');

      if (type === 0 && parseInt(qtyField[el].value, 10) - 1 < 1) {
        this.openSnackBar('Quatity can\'t be less than 1', '');
        return;
      }
      if (type === 1 &&
       (parseInt(qtyField[el].value, 10) === item.numberInStock || parseInt(qtyField[el].value, 10) > item.numberInStock)) {
        this.openSnackBar('stock limit reached', 'add more Stock');
        return;
      }
      if (type === 1 && parseInt(qtyField[el].value, 10) < item.numberInStock) {
        qtyField[el].value = parseInt(qtyField[el].value, 10) + 1; return;
      }
      if (type === 0 && parseInt(qtyField[el].value, 10) > 1) {qtyField[el].value = parseInt(qtyField[el].value, 10) - 1;  return; }
  }
  openSnackBar(message: string, action: string) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 4000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['app/stock/management']);
    });
  }
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.salesData.map( s => s.price).reduce( (acc, value) => acc + value, 0);
  }
}
