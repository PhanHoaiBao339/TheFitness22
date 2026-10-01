import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';
import { StaticService } from './../static.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryManagerService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private staticService: StaticService
  ) {}

  public getAllDetail(): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/categoriesdetail/admin/all';
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

  public getAll(): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/categories/all';
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

  public saveDetail(categorydetail: any): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/categoriesdetail/admin/save';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      categorydetail,
      httpOptions
    );
  }

  public updateDetail(categorydetail: any): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/categoriesdetail/admin/update';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.put(
      this.staticService.rootUrl + ApiUrl,
      categorydetail,
      httpOptions
    );
  }

  public deleteDetail(id: string): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/categoriesdetail/admin/delete/';
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

  public getOne(id: string): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/categoriesdetail/';
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

  public save(category: any): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/categories/admin/save';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      category,
      httpOptions
    );
  }

  public update(category: any): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/categories/admin/update';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.put(
      this.staticService.rootUrl + ApiUrl,
      category,
      httpOptions
    );
  }

  public delete(id: string): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/categories/admin/delete/';
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
