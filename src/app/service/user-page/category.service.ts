import { StaticService } from './../static.service';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient,
    private staticService: StaticService
    ) { }

  public getCategoryByProduct(idproduct: string): Observable<any> {
    const ApiUrl = '/rest/categories/productid';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.get(this.staticService.rootUrl + ApiUrl + '?id=' + idproduct, httpOptions);
  }

  public getAllCategory(): Observable<any> {
    const ApiUrl = '/rest/categoriesdetail/all';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.get(this.staticService.rootUrl + ApiUrl, httpOptions);
  }

  public getCategoryDetail(id: string): Observable<any> {
    const ApiUrl = '/rest/categoriesdetail/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.get(this.staticService.rootUrl + ApiUrl + id, httpOptions);
  }



}
