import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { StaticService } from './../static.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private staticService: StaticService
  ) {}

  public uploadeImage(folder: string, file: any): Observable<any> {
    let token: string ='';
    this.authService.getLoggedToken().subscribe(
      data => token = data
    )
    var formData = new FormData();
    formData.append('file', file);
    const ApiUrl = '/uploadFile/' + folder;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.httpClient.post(
      this.staticService.rootUrl + ApiUrl,
      formData,
      httpOptions
    );
  }
}
