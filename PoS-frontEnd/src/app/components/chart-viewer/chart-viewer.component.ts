import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Chart from 'chart.js';
@Component({
  selector: 'app-chart-viewer',
  templateUrl: './chart-viewer.component.html',
  styleUrls: ['./chart-viewer.component.sass']
})
export class ChartViewerComponent implements OnInit {
 chart = [];
 barChartData;
 itemNames = [];
 today = [];
 week = [];
 month = [];
 all = [];
color = Chart.helpers.color;
  constructor(
    public dialogRef: MatDialogRef<ChartViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data.data.forEach(stockItem => {
      this.itemNames.push(stockItem.itemName);
      this.today.push(stockItem.todaySales.total);
      this.week.push(stockItem.weekSales.total);
      this.month.push(stockItem.monthSales.total);
      this.all.push(stockItem.allSales.total);
    });
    this.barChartData = {
      labels: this.itemNames,
      datasets: [{
        label: 'All Time Sales',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: this.month}
      // }, {
      //   label: 'This Week',
      //   backgroundColor: 'rgba(255, 206, 86, 0.2)',
      //   borderColor: 'rgba(255, 206, 86, 0.2)',
      //   borderWidth: 1,
      //   data: this.week
      // }
      // , {
      //   label: 'This Month',
      //   backgroundColor: 'rgba(75, 192, 192, 0.2)',
      //   borderColor: 'rgba(75, 192, 192, 1)',
      //   borderWidth: 1,
      //   data: this.month
      // }
      // , {
      //   label: 'All Time',
      //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
      //   borderColor: 'rgba(255,99,132,1)',
      //   borderWidth: 1,
      //   data: this.all
      // }
    ]

    };
   }

  ngOnInit() {
    this.chart = new Chart('stockCanvas', {
      type: 'line',
      data: this.barChartData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
