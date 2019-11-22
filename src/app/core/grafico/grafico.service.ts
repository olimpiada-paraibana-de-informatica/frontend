import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {


  constructor(private http: HttpClient) { }

  getGraphObi(){

    console.log("(`${environment.apiBaseUrl}/api/graphs/obi` ", `${environment.apiBaseUrl}/api/graphs/obi`);


    return this.http.get<any>(`${environment.apiBaseUrl}/api/graphs/obi`);
    
  }
  getGraphSbc(){

    return this.http.get<any>(`${environment.apiBaseUrl}/api/graphs/sbc`);
    
  }
  getChampionInternacional(){

    return this.http.get<any>(`${environment.apiBaseUrl}/api/international_champions`);
    
  }
}
