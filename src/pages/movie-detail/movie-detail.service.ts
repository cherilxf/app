import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../../app/app.config";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class MovieDetailService {
  constructor(private http: HttpClient) {

  }

  getMovieDetailData_service (movieId): Observable<any> {
    const url = `${AppConfig.getUrl()}/movie/detail`;

    let reqParam = {
      movieId: movieId
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }

  getCommentData_service (movieId): Observable<any> {
    const url = `${AppConfig.getUrl()}/movie/comment`;

    let reqParam = {
      movieId: movieId
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }
}