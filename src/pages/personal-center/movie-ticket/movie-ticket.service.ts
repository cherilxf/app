import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../../../app/app.config";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class MovieTicketService {
  constructor(private http: HttpClient) {

  }

  getTicketData_service(accound): Observable<any> {
    const url = `${AppConfig.getUrl()}/ticket/get_ticketOrder`;

    let reqParam = {
      "user_accound": accound
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }

  delTicketData_service(orderId): Observable<any> {
    const url = `${AppConfig.getUrl()}/ticket/del_ticketOrder`;

    let reqParam = {
      "order_id": orderId
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }
}