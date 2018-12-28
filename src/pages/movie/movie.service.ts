import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {AppConfig} from "../../app/app.config";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {

  }

  getReyingMovieData (): Observable<any> {

    let url = "/movie/reying_movie";
    return this.http.get<any>(AppConfig.getUrl() + url).pipe();
  }

  getComesoonMovieData (): Observable<any> {

    let url = "/movie/comesoon_movie";
    return this.http.get<any>(AppConfig.getUrl() + url).pipe();
  }
}