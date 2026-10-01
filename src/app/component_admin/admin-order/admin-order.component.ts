import { OrderDetailManagerService } from './../../service/admin-page/order-detail-manager.service';
import { OrderManagerService } from './../../service/admin-page/order-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss'],
})
export class AdminOrderComponent implements OnInit {
  constructor(
    private orderManagerService: OrderManagerService,
    private orderDetailManagerService: OrderDetailManagerService
  ) {}

  ngOnInit(): void {
    this.loadAllOrder();
    this.loadAllOrderDetail();
  }

  public loading1: boolean = true;
  public loading2: boolean = true;
  public listAllOrder: any[] = [];
  public listAllOrderDetail: any[] = [];
  public listAllOrderDetailRoot: any[] = [];
  // public listAllOrderDetail: any = {
  //   extradetails: '',
  //   id: 0,
  //   orderProduct: {
  //     id: 0,
  //   },
  //   price: 0,
  //   product: {},
  //   quantity: 0,
  // };
  // public listAllOrderDetailRoot: any = {
  //   extradetails: '',
  //   id: 0,
  //   orderProduct: {
  //     id: 0,
  //   },
  //   price: 0,
  //   product: {},
  //   quantity: 0,
  // };

  public showDetail(idorder: number) {
    this.listAllOrderDetail = Object.assign(
      this.listAllOrderDetailRoot,
      idorder
    ).filter(
      (item: { orderProduct: { id: number } }) =>
        item.orderProduct.id == idorder
    );
    document.getElementById('nav-table-orderdetail-tab')?.click();
  }

  public allDetail() {
    this.listAllOrderDetail = this.listAllOrderDetailRoot;
  }

  public refresh(){
    this.loadAllOrder();
    this.loadAllOrderDetail();
  }

  public totalPrice(listOrderDetail: any[]) {
    for (let i = 0; i < this.listAllOrder.length; i++) {
      const element = this.listAllOrder[i];
      let total = 0;
      let list = Object.assign(listOrderDetail, element.id).filter(
        (item: { orderProduct: { id: number } }) =>
          item.orderProduct.id == element.id
      );
      list.forEach((element: { price: number }) => {
        total += element.price;
      });
      element.totalprice = total;
      if (i == this.listAllOrder.length - 1) {
        this.loading1 = false;
      }
    }
  }

  private loadAllOrder() {
    this.loading1 = true;
    this.orderManagerService.getAll().subscribe((data) => {
      this.listAllOrder = data;
    });
  }

  private loadAllOrderDetail() {
    this.loading2 = true;
    this.orderDetailManagerService.getAll().subscribe((data) => {
      this.listAllOrderDetailRoot = data;
      this.listAllOrderDetail = data;
      this.loading2 = false;
      this.totalPrice(data);
    });
  }
}
