import { AuthService } from './../auth.service';
import { StaticService } from './../static.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsManagerService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private staticService: StaticService
  ) {}

  public getAll(): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/products/all';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl,
      httpOptions
    );
  }

  public getOne(id: string): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/products/';
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

  public save(product: any): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/products/admin/save';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      product,
      httpOptions
    );
  }

  public update(product: any): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/products/admin/update';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.put(
      this.staticService.rootUrl + ApiUrl,
      product,
      httpOptions
    );
  }

  public delete(id: string): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/products/admin/delete/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.delete(
      this.staticService.rootUrl + ApiUrl + id,
      httpOptions
    );
  }
}
