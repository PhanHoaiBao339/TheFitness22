import { Observable } from 'rxjs';
import { StaticService } from './../static.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  constructor(
    private httpClient: HttpClient,
    private staticService: StaticService
  ) {}

  public getByProductId(id: string): Observable<any> {
    // let token: string = '';
    // this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/size/getbyidproduct/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl + id,
      httpOptions
    );
  }
}
