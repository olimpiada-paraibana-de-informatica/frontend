import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnoResultado } from './anoResultado';
import { Resultado } from './resultado';
import { DataStudent } from './dataStudent';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  constructor(private http: HttpClient) { }

  getAnoResultados() : Observable<AnoResultado[]>{

    return this.http.get<any>(`${environment.apiBaseUrl}/api/results/category-years`);
    
  }
  
  getResultByYearAndType(ano, type) : Observable<Resultado>{
    
    return this.http.get<any>(`${environment.apiBaseUrl}/api/results/champions?ano=${ano}&tipo=${type}`);

  
  }

}
