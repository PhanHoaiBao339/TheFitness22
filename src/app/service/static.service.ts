import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  constructor() { }

  // public rootUrl = 'http://localhost:8080';
  public rootUrl = 'https://web-fitness-online.herokuapp.com';

}
