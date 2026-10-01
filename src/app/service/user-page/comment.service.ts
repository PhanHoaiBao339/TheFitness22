import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StaticService } from './../static.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private httpClient: HttpClient,
    private staticService: StaticService
  ) {}

  public save(comment: any): Observable<any> {
    const ApiUrl = '/rest/comment/savecommentproduct';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      comment,
      httpOptions
    );
  }

  public update(comment: any): Observable<any> {
    const ApiUrl = '/rest/comment/updatecomment';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.put(
      this.staticService.rootUrl + ApiUrl,
      comment,
      httpOptions
    );
  }

  public getAllByProduct(idproduct: string): Observable<any> {
    const ApiUrl = '/rest/comment/allbyproduct/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl + idproduct,
      httpOptions
    );
  }

  public delete(id: number): Observable<any> {
    const ApiUrl = '/rest/comment/delete/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.delete(
      this.staticService.rootUrl + ApiUrl + id,
      httpOptions
    );
  }


}
