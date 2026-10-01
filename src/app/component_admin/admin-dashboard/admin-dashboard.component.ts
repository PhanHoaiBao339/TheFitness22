import { StaticService } from './../../service/static.service';
import { StatisticalService } from './../../service/admin-page/statistical.service';
import { OrderManagerService } from './../../service/admin-page/order-manager.service';
import { OrderDetailManagerService } from './../../service/admin-page/order-detail-manager.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private staticService: StaticService,
    private statisticalService: StatisticalService,
    private orderManagerService: OrderManagerService,
    private orderDetailManagerService: OrderDetailManagerService
  ) {}

  public rootUrl: string =
    this.staticService.rootUrl + '/downloadFile/products/';
  public listOrderByDate: any[] = [];
  public revenueToday: number = 0;
  public salesToday: number = 0;
  public revenueMonth: number = 0;
  public salesMonth: number = 0;
  public revenueYear: any[] = [];
  public salesYear: any[] = [];
  public bestAndless: any;
  public loading1: boolean = true;
  public loading2: boolean = true;

  ngOnInit(): void {
    this.getStatisticalYear();
    this.getOrderTodaySale();
    this.getStatisticalMonth();
    this.loadBestSellerAndLessSeller();
  }

  private getOrderTodaySale() {
    this.orderManagerService.getAllByToday().subscribe((data) => {
      this.listOrderByDate = data;
      this.totalToday();
    });
  }

  private totalToday() {
    this.listOrderByDate.forEach((item: any) => {
      this.revenueToday += item.totalpricetoday;
      this.salesToday += item.totalquantitytoday;
    });
  }

  private getStatisticalMonth() {
    this.statisticalService.getStatisticalMonth().subscribe((data) => {
      this.revenueMonth = data.totalpricemonth;
      this.salesMonth = data.totalquantitymonth;
    });
  }

  private getStatisticalYear() {
    this.loading2 = false;
    this.statisticalService.getStatisticalYear().subscribe((data) => {
      this.revenueYear = data.listtotalpriceyear;
      this.salesYear = data.listtotalquantityear;
      this.WorldwideSalesChart();
    });
  }

  private loadBestSellerAndLessSeller() {
    this.loading1 = true;
    this.statisticalService
      .getStatisticalBestSelerAndLess()
      .subscribe((data) => {
        this.bestAndless = data;
        this.loading1 = false;
      });
  }

  private WorldwideSalesChart() {
    // var ctx1 = <HTMLCanvasElement>$('#worldwide-sales').get(0);
    // var myChart1 = new Chart(ctx1, {
    //   type: 'bar',
    //   data: {
    //     labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    //     datasets: [
    //       {
    //         label: 'USA',
    //         data: [15, 30, 55, 65, 60, 80, 95],
    //         backgroundColor: 'rgba(0, 156, 255, .7)',
    //       },
    //       {
    //         label: 'UK',
    //         data: [8, 35, 40, 60, 70, 55, 75],
    //         backgroundColor: 'rgba(0, 156, 255, .5)',
    //       },
    //       {
    //         label: 'AU',
    //         data: [12, 25, 45, 55, 65, 70, 60],
    //         backgroundColor: 'rgba(0, 156, 255, .3)',
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //   },
    // });

    // Salse & Revenue Chart
    var ctx2 = <HTMLCanvasElement>$('#salse-revenue').get(0);
    var myChart2 = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: 'Salse',
            data: this.salesYear,
            backgroundColor: 'rgba(0, 156, 255, .5)',
            fill: true,
          },
          {
            label: 'Revenue',
            data: this.revenueYear,
            backgroundColor: 'rgba(0, 156, 255, .3)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,

      },
    });
    // Single Line Chart
    // var ctx3 = <HTMLCanvasElement>$('#line-chart').get(0);
    // var myChart3 = new Chart(ctx3, {
    //   type: 'line',
    //   data: {
    //     labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
    //     datasets: [
    //       {
    //         label: 'Salse',
    //         fill: false,
    //         backgroundColor: 'rgba(0, 156, 255, .3)',
    //         data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15],
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //   },
    // });

    // Single Bar Chart
    // var ctx4 = <HTMLCanvasElement>$('#bar-chart').get(0);
    // var myChart4 = new Chart(ctx4, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Italy', 'France', 'Spain', 'USA', 'Argentina'],
    //     datasets: [
    //       {
    //         backgroundColor: [
    //           'rgba(0, 156, 255, .7)',
    //           'rgba(0, 156, 255, .6)',
    //           'rgba(0, 156, 255, .5)',
    //           'rgba(0, 156, 255, .4)',
    //           'rgba(0, 156, 255, .3)',
    //         ],
    //         data: [55, 49, 44, 24, 15],
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //   },
    // });

    // // Pie Chart
    // var ctx5 = <HTMLCanvasElement>$('#pie-chart').get(0);
    // var myChart5 = new Chart(ctx5, {
    //   type: 'pie',
    //   data: {
    //     labels: ['Italy', 'France', 'Spain', 'USA', 'Argentina'],
    //     datasets: [
    //       {
    //         backgroundColor: [
    //           'rgba(0, 156, 255, .7)',
    //           'rgba(0, 156, 255, .6)',
    //           'rgba(0, 156, 255, .5)',
    //           'rgba(0, 156, 255, .4)',
    //           'rgba(0, 156, 255, .3)',
    //         ],
    //         data: [55, 49, 44, 24, 15],
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //   },
    // });

    // // Doughnut Chart
    // var ctx6 = <HTMLCanvasElement>$('#doughnut-chart').get(0);
    // var myChart6 = new Chart(ctx6, {
    //   type: 'doughnut',
    //   data: {
    //     labels: ['Italy', 'France', 'Spain', 'USA', 'Argentina'],
    //     datasets: [
    //       {
    //         backgroundColor: [
    //           'rgba(0, 156, 255, .7)',
    //           'rgba(0, 156, 255, .6)',
    //           'rgba(0, 156, 255, .5)',
    //           'rgba(0, 156, 255, .4)',
    //           'rgba(0, 156, 255, .3)',
    //         ],
    //         data: [55, 49, 44, 24, 15],
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //   },
    // });
  }
}
