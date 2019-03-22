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
export class GenreService {
  constructor(private http: HttpClient) {

  }

  getMovieGenreData_service(movieTag): Observable<any> {
    const url = `${AppConfig.getUrl()}/movie/genre`;

    let reqParam = {
      "movieTag": movieTag
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }
}