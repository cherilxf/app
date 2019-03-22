import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError } from 'rxjs/operators';
import 'rxjs/Rx';

import { AppConfig } from "../../app/app.config";

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {

  }

  getReyingMovieData_service(start, count): Observable<any> {

    let url = "/movie/reying_movie";
    return this.http.get<any>(AppConfig.getUrl() + url, {
      params: {
        start: start,
        count: count
      }
    }).pipe();
  }

  getComesoonMovieData_service(start,count): Observable<any> {

    let url = "/movie/comesoon_movie";
    return this.http.get<any>(AppConfig.getUrl() + url, {
      params: {
        start: start,
        count: count
      }
    }).pipe();
  }
}