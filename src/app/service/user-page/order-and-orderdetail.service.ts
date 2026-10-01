import { AuthService } from './../auth.service';
import { StaticService } from './../static.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderAndOrderdetailService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private staticService: StaticService
  ) {}

  public saveOrder(
    username: string,
    fullname: string,
    address: string,
    phone: string,
    note: string,
    paymentmethod: string
  ): Observable<any> {
    let order = {
      username: username,
      fullname: fullname,
      address: address,
      phone: phone,
      note: note,
      paymentmethod: paymentmethod,
    };
    const ApiUrl = '/rest/order/saveorder';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      order,
      httpOptions
    );
  }

  public saveOrderDetail(
    orderRespone: any,
    ShopCartList: any
  ): Observable<any> {
    let orderdetail = {
      orderid: orderRespone.id,
      list: ShopCartList,
    };
    const ApiUrl = '/rest/orderdetail/saveorderdetail';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      orderdetail,
      httpOptions
    );
  }

  public loadAllOrderByUsername(username: string): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/order/getbyusername/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl + username,
      httpOptions
    );
  }

  public loadAllOrderDetailByOrderId(id: string): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/order/getdetailbyorder/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl + id,
      httpOptions
    );
  }
}
