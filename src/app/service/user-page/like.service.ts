import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StaticService } from './../static.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(
    private httpClient: HttpClient,
    private staticService: StaticService
  ) {}

  public save(like: any): Observable<any> {
    const ApiUrl = '/rest/like/save';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      like,
      httpOptions
    );
  }

  public getLike(like: any): Observable<any> {
    const ApiUrl = '/rest/like/findbyidproandidacc';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      like,
      httpOptions
    );
  }

  public getAllByAccount(username: string): Observable<any> {
    const ApiUrl = '/rest/like/getallbyaccount/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl + username,
      httpOptions
    );
  }
}
