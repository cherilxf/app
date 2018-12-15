import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {

  }

  getData() {
    let api = "http://a.itying.com/api/productlist";
    this.http.get(api).subscribe(function(data){
      console.log(data);
      return data;
    },function(err){
      console.log(err);
    });
  }
}