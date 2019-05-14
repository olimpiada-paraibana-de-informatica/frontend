import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetidorService {

  constructor(private http: HttpClient) { }

  createCompetidoresByExcel(file) {
    return this.http.post<any[]>(`${environment.apiBaseUrl}/api/delegates/excel/schools/competitors`, file);
  }

  getCompetidoresByDelegado(){
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/delegates/competitors`)
  }

  downloadPlanilhaEx(){
    return this.http.get(`${environment.apiBaseUrl}/api/delegates/excel/schools/competitors/download`, {responseType: 'blob'});
  }

  getSegundaFase(){
    console.log("TODO Service");
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/delegates/competitors`);
  }

}
