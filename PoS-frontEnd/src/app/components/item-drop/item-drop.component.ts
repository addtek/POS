import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

export interface SALE {
  id: number;
  itemName: string;
  quantity: number;
  price: any;
}

@Component({
  selector: 'app-item-drop',
  templateUrl: './item-drop.component.html',
  styleUrls: ['./item-drop.component.sass']
})
export class ItemDropComponent implements OnInit {
  displayedColumns: string[] = ['Item', 'Quantity', 'Price', 'btn'];
  salesData;
  option = '';
  price = null;
  newQty = null;
  salesDataSource = new MatTableDataSource<SALE>(this.data.data);
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.salesData = this.data.data;
    this.salesDataSource = new MatTableDataSource<SALE>(this.data.data);
  }
  drop() {
    this.dialogRef.close({
      drop: true,
      type: this.option,
      newQty: this.newQty
    });

  }
  itemQuantity (type) {

    const  qtyField = this.element.nativeElement.querySelectorAll('.salesQty');

      if (type ===  0 && parseInt(qtyField[0].value, 10) - 1 > 0) {
        qtyField[0].value = parseInt(qtyField[0].value, 10) - 1;
        this.newQty = qtyField[0].value;
        this.price = (this.data.data.price / this.data.data.quantity) * parseInt(this.newQty, 10);
      }
      if (type ===  1 && parseInt(qtyField[0].value, 10) + 1 <= this.data.data.quantity) {
        qtyField[0].value = parseInt(qtyField[0].value, 10) + 1;
        this.newQty = qtyField[0].value;
        this.price = (this.data.data.price / this.data.data.quantity) * parseInt(this.newQty, 10);
      }
    }
}
