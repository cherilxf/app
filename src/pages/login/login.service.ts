import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {

  }
}