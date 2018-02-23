import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BaseProvider {
  public baseUrl :string =`http://api.pennyearn.com:3011/v1/info-push`
  constructor(public http: HttpClient) {
    console.log('Hello BaseProvider Provider');
  }

  getCats(){
    return this.http.get(`${this.baseUrl}/get-categories`)
  }

  getSnypse() {
    return this.http.get(`${this.baseUrl}/get-snypse`)
  }

}
