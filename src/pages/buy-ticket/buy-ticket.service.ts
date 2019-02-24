import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../../app/app.config";

@Injectable()
export class BuyTicketService {
  constructor(private http: HttpClient) {

  }

  getCinemaDetailData (cinemaId): Observable<any> {
    let url = "/cinema/detail";
    return this.http.get<any>(AppConfig.getUrl() + url,{
      params: {
        cinemaId: cinemaId
      }
    }).pipe();
  }
}