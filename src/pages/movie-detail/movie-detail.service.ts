import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../../app/app.config";

@Injectable()
export class MovieDetailService {
  constructor(private http: HttpClient) {

  }

  getMovieDetailData (movieId): Observable<any> {
    let url = "/movie/detail";
    return this.http.get<any>(AppConfig.getUrl() + url,{
      params: {
        movieId: movieId
      }
    }).pipe();
  }
}