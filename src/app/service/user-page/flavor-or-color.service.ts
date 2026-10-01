import { StaticService } from './../static.service';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlavorOrColorService {

  constructor(private httpClient: HttpClient, private staticService: StaticService) { }

  public getFlavorOrColorByProduct(idproduct: string): Observable<any> {
    const ApiUrl = '/rest/flavororcolordetail/ofproductid?idproduct=';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.get(this.staticService.rootUrl + ApiUrl + idproduct, httpOptions);
  }
}
