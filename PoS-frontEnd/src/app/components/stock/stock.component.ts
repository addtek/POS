import { Component, OnInit, ViewChild, QueryList, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import {UserService} from '../../_services/index';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/appservice.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ChartViewerComponent } from '../chart-viewer/chart-viewer.component';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface STOCK {
  id: number;
  category: string;
  itemName: string;
  numberInStock: number;
  pricePerItem: any;
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent implements OnInit {
  addStockFormGroup;
  stock = [];
  editedItems = [];
  displayedColumns: string[] = ['Select', 'Item', 'Quantity', 'Price', 'Action'];
  dataSource = new MatTableDataSource<STOCK>(this.stock);
  title = 'Stock Management';
  categories;
  matchFound = false;
  editingStart = false;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  private user;
  isLoadingResults = true;
  selection = new SelectionModel<STOCK>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('stockQty') quantity: ElementRef;
  constructor(
    private element: ElementRef,
    private titleService: Title,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private auth: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.titleService.setTitle(this.title);
    this.user = this.auth.currentUserValue;
    this.addStockFormGroup = this._formBuilder.group({
      cat: ['', Validators.required],
      itemName: ['', Validators.required],
      qty: ['', [Validators.required, Validators.pattern('^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$')]],
      price: ['', [Validators.required, Validators.pattern('^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$')]],
    });
    this.userService.getStock()
    .subscribe( res => {
      this.categories = res.categories;
      this.stock = res.stock;
      this.dataSource = new MatTableDataSource<STOCK>(res.stock);
      this.dataSource.paginator = this.paginator;
      this.paginator.pageIndex = 0;
       this.isLoadingResults = false;
    }
    ,
     catchError ( (err: HttpErrorResponse) => {
       if (this.isLoadingResults) {
         this.isLoadingResults = !this.isLoadingResults;
       }
       return Observable.throw(err);
     })
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  enableInput($this): void {
    const inputEl = $this.target as HTMLElement;
     inputEl.setAttribute('readonly', 'true');
   }
 showChart() {
   const dialogRef = this.dialog.open(ChartViewerComponent, {
     width: '1400px',
     data: { data: this.selection.selected }
   });
 }
  removeFromStock(id: number) {
    const index = this.stock.findIndex(obj => obj['id'] === id), item = this.stock[index],
     data = [];
    data.push(item);
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '300px',
        data: {itemName: item.itemName, message: 'Are you sur you want to delete item'}
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result.confirm) {
          this.userService.dropStockItem(this.user.id, data, this.user.token)
            .subscribe(
              res => {
                this.stock = res.stock;
                this.dataSource = new MatTableDataSource<any>(this.stock);
                this.dataSource.paginator = this.paginator;
                this.openSnackBar('item deleted successfully', '');
              }
            );
          }
      });

  }
  updateStock() {
    this.userService.updateStock(this.user.id, this.user.token, this.editedItems)
      .subscribe(
        res => {
          this.stock = res;
          this.dataSource = new MatTableDataSource<any>(this.stock);
          this.dataSource.paginator = this.paginator;
          this.editingStart = false;
          this.openSnackBar('item updated successfully', '');
          this.editedItems = [];
        },
         catchError ( (err: HttpErrorResponse) => {
           this.editingStart = false;
           return Observable.throw(err);
         })
        );
  }

  addToStock() {
        if (!this.addStockFormGroup.invalid) {
          this.userService.addItemToStock(
            {
              category: this.addStockFormGroup.controls.cat.value,
              itemName: this.addStockFormGroup.controls.itemName.value,
              quantity: this.addStockFormGroup.controls.qty.value,
              price: this.addStockFormGroup.controls.price.value
            },
              this.user.id,
              this.user.token,
            )
      .subscribe(
        res => {
          this.stock = res;
          this.dataSource = new MatTableDataSource<STOCK>(this.stock);
          this.dataSource.paginator = this.paginator;
          this.dataSource.paginator.lastPage();
          this.openSnackBar('item added successfully', '');
        }
      );
    }
  }
  updatePrice (id: number, el) {
    const qtyField = this.element.nativeElement.querySelectorAll('.stockQty'),
      priceField = this.element.nativeElement.querySelectorAll('.stockPrice'),
    newQty = qtyField[el].value, newPrice = priceField[el].value;
    if (this.editedItems.length > 0) {
      let fInd, matchFound;
      for (let i = 0; i < this.editedItems.length; i++) {
        if (this.editedItems[i].itemID === id) {
          matchFound = true;
          fInd = i;
          break;
        }
      }
      if (matchFound) {
        this.editedItems[fInd].qty = parseInt(newQty, 10);
        this.editedItems[fInd].price = parseInt(newPrice, 10);

      } else {
        this.editedItems.push({ itemID: id, qty: parseInt(newQty, 10),  price: parseInt(newPrice, 10)});

      }

    } else {
      this.editedItems.push({ itemID: id, qty: parseInt(newQty, 10) , price: parseInt(newPrice, 10)});
    }
    if (!this.editingStart) { this.editingStart = true; }
  }
  stockQuantity (id: number, type: number, el) {
    const qtyField = this.element.nativeElement.querySelectorAll('.stockQty'),
      priceField = this.element.nativeElement.querySelectorAll('.stockPrice');
    let newQty, newPrice ;

      if (type === 1) {
        qtyField[el].value = parseInt(qtyField[el].value, 10) + 1; newQty = qtyField[el].value; newPrice = priceField[el].value;
      }
    if (type === 0 && parseInt(qtyField[el].value, 10) > 0) { qtyField[el].value = parseInt(qtyField[el].value, 10) - 1;
      newQty = qtyField[el].value; newPrice = priceField[el].value;
    }

    if (this.editedItems.length > 0) {
      let fInd, matchFound;
      for (let i = 0; i < this.editedItems.length; i++) {
      if (this.editedItems[i].itemID === id) {
        matchFound = true;
        fInd = i;
        break;
      } }
      if (matchFound) {
        this.editedItems[fInd].qty = parseInt(newQty, 10);
        this.editedItems[fInd].price = parseInt(newPrice, 10);

      } else {
        this.editedItems.push({ itemID: id, qty: parseInt(newQty, 10), price: parseInt(newPrice, 10) });

      }

    } else {
      this.editedItems.push({ itemID: id, qty: parseInt(newQty, 10), price: parseInt(newPrice, 10) });
    }

    if (!this.editingStart) {this.editingStart = true; }
    }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });

  }
   /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  hasUnsavedData(): Boolean {
    return this.editedItems.length ? true : false;
  }
  confirm(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '400px',
        data: { itemName: null, message: 'You have unsaved changes! If you leave, your changes will be lost.' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.confirm) {
          return resolve();
        } else {
          return reject();
        }
      });

    });
  }
}
