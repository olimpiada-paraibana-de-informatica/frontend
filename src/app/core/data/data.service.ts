import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getDatas(){
    return this.http.get<any>(`${environment.apiBaseUrl}/api/dates`);
  }
  
  updateDatas(obj){
    return this.http.put<any>(`${environment.apiBaseUrl}/api/dates`, obj);

  }

}
