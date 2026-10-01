import { Observable } from 'rxjs';
import { StaticService } from './../static.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(
    private httpClient: HttpClient,
    private staticService: StaticService
  ) { }

  public sendMail(email: any): Observable<any> {
    const ApiUrl = '/api/sendMail/verificationcode';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      email,
      httpOptions
    );
  }
}
