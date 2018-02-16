import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable()
export class BaseService {
  basePath: string = "http://localhost:5350/v1/realtime"
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


  public getProd() {
    return this.http.get(`${this.basePath}/get-categories`)
  }

}
