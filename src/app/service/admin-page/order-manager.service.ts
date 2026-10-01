import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';
import { StaticService } from './../static.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private staticService: StaticService
    ) { }

  public getAll(): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe(
      data => token = data
    )
    const ApiUrl = '/rest/order/admin/all';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    return this.httpClient.get(this.staticService.rootUrl + ApiUrl, httpOptions);
  }
  public getAllByToday(): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe(
      data => token = data
    )
    const ApiUrl = '/rest/order/admin/alltoday';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    return this.httpClient.get(this.staticService.rootUrl + ApiUrl, httpOptions);
  }
}
