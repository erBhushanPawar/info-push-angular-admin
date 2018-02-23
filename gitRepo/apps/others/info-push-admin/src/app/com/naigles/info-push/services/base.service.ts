import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable()
export class BaseService {
  //basePath: string = "http://api.pennyearn.com:3011/v1/info-push"
  basePath = "http://localhost:5350/v1/info-push"
  constructor(private http: HttpClient) { 




  }
  public saveCategory(contents : any){
    return this.http.post(`${this.basePath}/add-category`, contents)
  }

  public saveSnypse(contents: any) {
    return this.http.post(`${this.basePath}/add-snypse`, contents)
  }

  public getCat(){
    return this.http.get(`${this.basePath}/get-categories`)
  }

  public updateSnypse(query :Object, contents:any) {
    let filter = []
    Object.keys(query).forEach(k => {
      filter.push(`${k}=${query[k]}`)
    });
    return this.http.put(`${this.basePath}/update-snypse?${filter.join("&")}`, contents)
  }

  public updateCat(query: Object, contents: any) {
    let filter = []
    Object.keys(query).forEach(k => {
      filter.push(`${k}=${query[k]}`)
    });
    console.log(">>>", contents)
    return this.http.put(`${this.basePath}/update-category?${filter.join("&")}`, contents)
  }

  public getSnypse() {
    return this.http.get(`${this.basePath}/get-snypse`)
  }

}
