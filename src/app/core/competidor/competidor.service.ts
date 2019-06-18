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

  competidoresByExcelSegundaFase(file, id) {
    return this.http.post<any[]>(`${environment.apiBaseUrl}/api/delegates/excel/schools/${id}/level_two`, file);
  }

  getCompetidores(){
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/competitors?size=100`);
  }

  porcentagemClassificadosSegundaFase(porcentagem){
    return this.http.post<any[]>(`${environment.apiBaseUrl}/api/competitors/levels?percentage=${porcentagem}`,{});

  }

  getCompetidoresByDelegado(){
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/delegates/competitors?size=100`);
  }

  downloadPlanilhaEx(){
    return this.http.get(`${environment.apiBaseUrl}/api/delegates/excel/schools/competitors/download`, {responseType: 'blob'});
  }

  getSegundaFase(){
    console.log("TODO Service");
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/delegates/competitors`);
  }

  downloadSegundaFase(id){
    return this.http.get(`${environment.apiBaseUrl}/api/delegates/excel/schools/${id}/level_two/download`,{responseType: 'blob'});
  }

  postAward(id, typeAward: string){
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/competitors/${id}/rewarding?award=${typeAward}`);
  }

  getRanking(categoria){
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/competitors/ranking?category="Iniciação 1`);
  }

  downloadCertificado(id,award){
    return this.http.get(`${environment.apiBaseUrl}/api/office/competitors/${id}/awards/download?award=${award}`,  {responseType: 'blob'});
  }


}
