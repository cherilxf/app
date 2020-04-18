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
export class BuyTicketService {
  constructor(private http: HttpClient) {

  }

  getCinemaData_service (cinemaId): Observable<any> {
    const url = `${AppConfig.getUrl()}/cinema/by_cinemaId`;
    let reqParam = {
      cinemaId: cinemaId
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }

  addOrderData_service (orderData): Observable<any> {
    const url = `${AppConfig.getUrl()}/buy_ticket/add_ticketOrder`;
    let reqParam = {
      orderData: orderData
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }
}