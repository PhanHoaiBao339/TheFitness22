import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { StaticService } from '../static.service';

@Injectable({
  providedIn: 'root'
})
export class BlogManagerService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private staticService: StaticService
    ) {}

  public getAll(): Observable<any>{
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/blog/all';
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
    const ApiUrl = '/rest/blog/getone/';
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

  public save(blog: any): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/blog/save';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      blog,
      httpOptions
    );
  }

  public update(blog: any): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/blog/update';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.put(
      this.staticService.rootUrl + ApiUrl,
      blog,
      httpOptions
    );
  }

  public delete(id: string): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/blog/delete/';
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
