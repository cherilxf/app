import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../../app/app.config";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class PersonalCenterService {
  constructor(private http: HttpClient) {

  }

  editUserNickName_service(accound,name): Observable<any> {
    const url = `${AppConfig.getUrl()}/personal_center/editInfo/user_nickname`;

    let reqParam = {
      "accound": accound,
      "edit_nickname": name
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }

  editUserSex_service(accound,sex): Observable<any> {
    const url = `${AppConfig.getUrl()}/personal_center/editInfo/user_sex`;

    let reqParam = {
      "accound": accound,
      "edit_sex": sex
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }

  editUserBirthday_service(accound,birthday): Observable<any> {
    const url = `${AppConfig.getUrl()}/personal_center/editInfo/user_birthday`;

    let reqParam = {
      "accound": accound,
      "edit_birthday": birthday
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }

  editUserDescription_service(accound,description): Observable<any> {
    const url = `${AppConfig.getUrl()}/personal_center/editInfo/user_description`;

    let reqParam = {
      "accound": accound,
      "edit_description": description
    };
    return this.http.post<any>(url, reqParam, httpOptions).pipe();
  }
}