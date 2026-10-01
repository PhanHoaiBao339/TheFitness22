import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { StaticService } from './../static.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private staticService: StaticService
  ) { }

  public getStatisticalMonth(): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe(
      data => token = data
    )
    const ApiUrl = '/rest/statistical/admin/allbymonth';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }

    return this.httpClient.get(this.staticService.rootUrl + ApiUrl, httpOptions);
  }

  public getStatisticalYear(): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe(
      data => token = data
    )
    const ApiUrl = '/rest/statistical/admin/statisticsyear';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    return this.httpClient.get(this.staticService.rootUrl + ApiUrl, httpOptions);
  }

  public getStatisticalBestSelerAndLess(): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe(
      data => token = data
    )
    const ApiUrl = '/rest/statistical/admin/productbestseller';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    return this.httpClient.get(this.staticService.rootUrl + ApiUrl, httpOptions);
  }


}
