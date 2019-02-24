import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../../app/app.config";

@Injectable()
export class CinemaService {
  constructor(private http: HttpClient) {

  }

  getCinemaData (movieId): Observable<any> {
    let url = "/cinema";
    return this.http.get<any>(AppConfig.getUrl() + url,{
      params: {
        movieId: movieId
      }
    }).pipe();
  }
}