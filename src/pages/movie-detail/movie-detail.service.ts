import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MovieDetailService {
  constructor(private http: HttpClient) {

  }
}