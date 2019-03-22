import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../../app/app.config";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class CinemaService {
  constructor(private http: HttpClient) {

  }

  getCinemaData_service (movieId): Observable<any> {
    const url = `${AppConfig.getUrl()}/cinema/by_movieId`;
    let reqParam = {
      movieId: movieId
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }
}