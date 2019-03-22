import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppConfig} from "../../app/app.config";
import {Observable} from "rxjs/Observable";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class RankingListService {
  constructor(private http: HttpClient) {

  }

  getMovieRankingData_service(rankingTab): Observable<any> {
    const url = `${AppConfig.getUrl()}/movie/ranking`;

    let reqParam = {
      "rankingTag": rankingTab
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }
}