import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../../../app/app.config";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {

  }

  login_service(loginData): Observable<any> {
    const url = `${AppConfig.getUrl()}/personal_center/login`;

    let reqParam = {
      "accound": loginData.accound,
      "password": loginData.password
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }

  register_service(registerData): Observable<any> {
    const url = `${AppConfig.getUrl()}/personal_center/register`;

    let reqParam = {
      "registerData": registerData
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }
}