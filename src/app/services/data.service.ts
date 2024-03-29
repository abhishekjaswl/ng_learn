import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../interfaces/data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _http: HttpClient) {}

  getData(): Observable<Data[]> {
    return this._http.get<any>(
      'https://634d2e67f5d2cc648e9eb0da.mockapi.io/hrdata'
    );
  }
}
