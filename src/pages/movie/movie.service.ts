import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {

  }
}