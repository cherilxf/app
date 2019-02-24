import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError } from 'rxjs/operators';
import 'rxjs/Rx';

import { AppConfig } from "../../app/app.config";

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {

  }

  getBannerImgsData (): Observable<any> {
    let url = "/home/banners";
    return this.http.get<any>(AppConfig.getUrl() + url).pipe();
  }
  getReyingMovieData (): Observable<any> {
    let url = "/home/reying_movie";
    return this.http.get<any>(AppConfig.getUrl() + url).pipe();
  }

  getComesoonMovieData (): Observable<any> {
    let url = "/home/comesoon_movie";
    return this.http.get<any>(AppConfig.getUrl() + url).pipe();
  }
}