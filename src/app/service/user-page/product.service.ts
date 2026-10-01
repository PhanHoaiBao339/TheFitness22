import { StaticService } from './../static.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpClient: HttpClient,
    private staticService: StaticService
  ) {}

  public getProductDetail(id: string): Observable<any> {
    const ApiUrl = '/rest/products/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl + id,
      httpOptions
    );
  }

  public getProteins(): Observable<any> {
    const ApiUrl = '/rest/products/allprotein';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl,
      httpOptions
    );
  }

  public getAccessorys(): Observable<any> {
    const ApiUrl = '/rest/products/allaccessory';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl,
      httpOptions
    );
  }

  public getAllProducts(): Observable<any> {
    const ApiUrl = '/rest/products/allproduct';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl,
      httpOptions
    );
  }

  public getAllProductByCategory(idcate: string): Observable<any> {
    const ApiUrl = '/rest/products/categoryid/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl + idcate,
      httpOptions
    );
  }

  public sortList(type: string, list: any): Observable<any> {
    const ApiUrl = '/rest/products/sort/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl + type,
      list,
      httpOptions
    );
  }
}
