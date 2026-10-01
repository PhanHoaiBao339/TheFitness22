import { StaticService } from './../static.service';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private staticService: StaticService
  ) { }

  public getAll(): Observable<any> {
    let token: string = '';
    this.authService.getLoggedToken().subscribe((data) => (token = data));
    const ApiUrl = '/rest/blog/allactive';
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

    const ApiUrl = '/rest/blog/getone/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl + id,
      httpOptions
    );
  }

  public getBlogByTopic(topic:string):Observable<any>{

    const ApiUrl = '/rest/blog/getblog/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.httpClient.get(
      this.staticService.rootUrl + ApiUrl + topic,
      httpOptions
    );
  }
}
